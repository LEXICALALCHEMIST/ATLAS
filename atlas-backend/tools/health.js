// tools/health.js — Purely dynamic health snapshot
const os = require('os');

function getHealth() {
  return {
    online: true,
    uptimeSeconds: Math.round(os.uptime()),
    cpuLoad: os.loadavg()[0],           // 1-minute average
    memoryFreeGB: Math.round(os.freemem() / (1024 ** 3)),
    totalMemoryGB: Math.round(os.totalmem() / (1024 ** 3)),
    diskFreeGB: "N/A",                  // TODO: add disk check
    temperature: "N/A",                 // TODO: platform specific
    battery: {
      charging: false,                  // TODO: detect on mobile/laptop
      level: 100
    },
    timestamp: new Date().toISOString()
  };
}

module.exports = { getHealth };