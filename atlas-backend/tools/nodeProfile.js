// tools/nodeProfile.js
const fs = require('fs');
const path = require('path');
const os = require('os');
const { detectDevice } = require('./detect');
const { getHealth } = require('./health');

const IDENTITY_FILE = path.join(__dirname, '../data/node-identity.json');

class NodeProfile {
  constructor() {
    this.nodeId = this.loadOrCreateIdentity();
  }

  loadOrCreateIdentity() {
    try {
      if (fs.existsSync(IDENTITY_FILE)) {
        const data = JSON.parse(fs.readFileSync(IDENTITY_FILE, 'utf8'));
        return data.nodeId;
      }
    } catch (err) {}

    const newId = `atlas_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    
    const dir = path.dirname(IDENTITY_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(IDENTITY_FILE, JSON.stringify({
      nodeId: newId,
      created: new Date().toISOString()
    }, null, 2));

    return newId;
  }

  getProfile() {
    const device = detectDevice();
    const health = getHealth();

    const ready = 
      health.online &&
      health.cpuLoad < 0.85 &&
      health.memoryFreeGB > 1.5;

    return {
      // Protocol
      protocol: {
        version: 1
      },

      // Identity (static)
      nodeId: this.nodeId,
      device: {
        type: device.type,
        platform: device.platform,
        isPi: device.isPi,
        isStable: device.isStable
      },

      // Resources
      resources: {
        totalRAM_GB: device.totalMemoryGB,
        freeRAM_GB: health.memoryFreeGB,
        cpuCores: os.cpus().length
      },

      // Health (dynamic)
      health: {
        online: health.online,
        uptimeSeconds: health.uptimeSeconds,
        cpuLoad: health.cpuLoad,
        temperature: health.temperature,
        battery: health.battery
      },

      // Capabilities (object form - much better)
      capabilities: {
        storage: true,
        ram: true,
        compute: false,
        routing: true,
        broadcaster: device.isStable,   // Memory Sticks / Pis get this
        repair: device.isStable
      },

      ready,
      timestamp: new Date().toISOString()
    };
  }

  announce() {
    const profile = this.getProfile();
    console.log('🟢 ATLAS Node Profile v1:');
    console.log(JSON.stringify(profile, null, 2));
    return profile;
  }
}

module.exports = NodeProfile;