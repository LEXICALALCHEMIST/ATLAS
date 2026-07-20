// atlas-backend/tools/nodeProfile.js
const os = require('os');
const fs = require('fs');

class NodeProfile {
  constructor() {
    this.nodeId = `node_${Date.now().toString(36)}`;
    this.profile = this.buildProfile();
  }

  buildProfile() {
    const isPi = fs.existsSync('/proc/cpuinfo') && 
                 fs.readFileSync('/proc/cpuinfo', 'utf8').includes('Raspberry');

    return {
      nodeId: this.nodeId,
      device: isPi ? "Raspberry Pi" : os.type(),
      resources: {
        totalRAM_GB: Math.round(os.totalmem() / (1024 ** 3)),
        freeRAM_GB: Math.round(os.freemem() / (1024 ** 3)),
        cpuCores: os.cpus().length,
        storageGB: "N/A",           // TODO: add disk detection
        bandwidth: "N/A"            // TODO: simple speed test later
      },
      health: {
        uptime: Math.round(os.uptime() / 3600), // hours
        online: true,
        temperature: "N/A"          // TODO: platform specific
      },
      ready: true,
      timestamp: new Date().toISOString()
    };
  }

  getProfile() {
    return this.profile;
  }

  announce() {
    console.log("🟢 Node announcing itself to ALL MIND:");
    console.log(JSON.stringify(this.profile, null, 2));
    // TODO: send to ALL MIND
    return this.profile;
  }
}

module.exports = NodeProfile;