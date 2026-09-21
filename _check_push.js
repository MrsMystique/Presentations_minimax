// Load script and intercept push
const fs = require('fs');
let out = [];
let pushCount = 0;
let suspiciousLines = [];
global.push = (s) => {
  pushCount++;
  if (s.indexOf('вложенности') >= 0) {
    suspiciousLines.push({ idx: pushCount, len: s.length, newlines: (s.match(/\n/g) || []).length });
    console.log('PUSH #' + pushCount + ' length=' + s.length + ' newlines=' + ((s.match(/\n/g) || []).length));
    console.log('  start: ' + s.substring(0, 50));
    console.log('  end:   ' + s.substring(s.length - 50));
  }
  out.push(s);
};
// Stub writeFileSync
fs.writeFileSync = (p, d) => { console.log('File would be: ' + d.length + ' chars'); };

require('./_write_v2_part1.js');
console.log('Total pushes: ' + pushCount);
console.log('Suspicious: ' + JSON.stringify(suspiciousLines));