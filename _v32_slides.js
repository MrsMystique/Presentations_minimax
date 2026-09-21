const fs = require('fs');
const c = fs.readFileSync('Чистовые слайды v3.2 — Проценты, пропорции, масштаб.md', 'utf8');
const m = c.match(/^### Слайд [^\n]*$/gm);
console.log('v3.2 total: ' + (m ? m.length : 0));
if (m) m.forEach(x => console.log('  ' + x));
