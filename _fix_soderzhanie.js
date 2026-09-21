// Восстановить «Слайд 2. Содержание» (сдвинулось в Слайд 3)
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

if (c.indexOf('### Слайд 3. Содержание') >= 0) {
  c = c.replace('### Слайд 3. Содержание', '### Слайд 2. Содержание');
  console.log('✓ Восстановлен «Слайд 2. Содержание»');
}

fs.writeFileSync(p, c, 'utf8');

const m = c.match(/^### Слайд [^\n]*$/gm);
console.log('Total: ' + m.length);
const cnt = {};
m.forEach(x => { const n = x.match(/### Слайд ([0-9.]+)/)[1]; cnt[n] = (cnt[n] || 0) + 1; });
Object.keys(cnt).forEach(k => { if (cnt[k] > 1) console.log('  CONFLICT ' + k + ': ' + cnt[k]); });
if (!Object.values(cnt).some(v => v > 1)) console.log('NO CONFLICTS');
