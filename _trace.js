// Trace what push() actually receives
const fs = require('fs');
const path = require('path');

const scriptPath = path.resolve('_write_v2_part1.js');
const scriptSrc = fs.readFileSync(scriptPath, 'utf8');

// Inject a tracer
const traced = scriptSrc.replace(
  'const push = (s) => out.push(s);',
  'const push = (s) => { console.log("PUSH len=" + s.length + " first100=[" + s.substring(0,100) + "]"); out.push(s); };'
);

fs.writeFileSync('_traced_v2.js', traced, 'utf8');
require('./_traced_v2.js');