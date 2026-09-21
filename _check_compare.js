const fs = require('fs');
const buf = fs.readFileSync('_write_v2_part1.js');
const lines = buf.toString('utf8').split('\n');
const l52 = lines[51];
console.log('L52 content (raw):');
console.log(JSON.stringify(l52));
console.log();
console.log('L52 length: ' + l52.length);
console.log();
// Test: extract string literal and evaluate
const match = l52.match(/^push\('(.*)'\);$/);
if (match) {
  console.log('Extracted string literal:');
  console.log(JSON.stringify(match[1]));
  console.log('Length: ' + match[1].length);
}
console.log();
console.log('Char 210-225 of L52:');
for (let i = 210; i < 225 && i < l52.length; i++) {
  process.stdout.write(l52[i] + '(' + l52.charCodeAt(i).toString(16) + ') ');
}