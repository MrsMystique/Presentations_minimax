const fs = require('fs');
const c = fs.readFileSync('Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md', 'utf8');
const m = c.match(/^### Слайд [^\n]*$/gm);
console.log('Total slides: ' + (m ? m.length : 0));
console.log('Headers:');
if (m) m.forEach((x, i) => console.log((i+1) + '. ' + x));
