// Trace what push() actually receives
const fs = require('fs');
const path = require('path');

const scriptPath = path.resolve('_write_v2_part1.js');
const scriptSrc = fs.readFileSync(scriptPath, 'utf8');

// Inject a tracer that dumps full content of suspicious lines
const traced = scriptSrc.replace(
  'const push = (s) => out.push(s);',
  'const push = (s) => { if (s.indexOf("вложенности") >= 0) { console.log("PUSH len=" + s.length); console.log("FULL: [" + s + "]"); } out.push(s); };'
);

fs.writeFileSync('_traced_v2.js', traced, 'utf8');
require('./_traced_v2.js');