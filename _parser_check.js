const fs = require('fs');
const c = fs.readFileSync('_build_procenti_v3_3.js', 'utf8');
const lines = c.split('\n');
let cnt = 0;
let cnt2 = 0;
for (const l of lines) {
  if (/^### Слайд \d/.test(l)) cnt++;
  if (/^### Слайд \d/.test(l)) cnt2++;
}
console.log('Regex matches:', cnt);
console.log('Total lines:', lines.length);

// Также поищем по другому regex
const m = c.match(/^### Слайд \d+/gm);
console.log('GM matches:', m ? m.length : 0);
