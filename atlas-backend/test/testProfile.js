// tests/testProfile.js
const NodeProfile = require('../tools/nodeProfile');

console.log('=== ATLAS Node Profile Test ===\n');

const node = new NodeProfile();
const profile = node.getProfile();

console.log(JSON.stringify(profile, null, 2));

console.log('\n✅ Profile generated successfully\n');

console.log('Node ID:        ', profile.nodeId);
console.log('Protocol:       ', profile.protocol.version);
console.log('Device type:    ', profile.device.type);
console.log('Is Stable:      ', profile.device.isStable);
console.log('Total RAM:      ', profile.resources.totalRAM_GB, 'GB');
console.log('Free RAM:       ', profile.resources.freeRAM_GB, 'GB');
console.log('CPU Cores:      ', profile.resources.cpuCores);
console.log('CPU Load:       ', profile.health.cpuLoad);
console.log('Uptime:         ', Math.round(profile.health.uptimeSeconds / 3600), 'hours');
console.log('Ready:          ', profile.ready);
console.log('Capabilities:   ', Object.keys(profile.capabilities).filter(k => profile.capabilities[k]).join(', '));