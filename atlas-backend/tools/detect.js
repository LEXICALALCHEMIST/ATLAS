// Simple device detection for ATLAS
const os = require('os');

function detectDevice() {
  const platform = os.platform();
  const totalMem = os.totalmem() / (1024 ** 3); // GB
  const isPi = require('fs').existsSync('/proc/cpuinfo') && 
               require('fs').readFileSync('/proc/cpuinfo', 'utf8').includes('Raspberry');

  let type = 'desktop';
  let recommendedPercent = 30; // default

  if (platform === 'android' || platform === 'ios' || totalMem < 6) {
    type = 'mobile';
    recommendedPercent = 15;
  } else if (isPi || totalMem < 8) {
    type = 'pi';
    recommendedPercent = 50;
  } else if (totalMem > 32) {
    type = 'high-end-desktop';
    recommendedPercent = 40;
  }

  return {
    type,
    totalMemoryGB: Math.round(totalMem),
    recommendedPercent,
    isStable: type === 'pi' || type === 'high-end-desktop'
  };
}

module.exports = { detectDevice };