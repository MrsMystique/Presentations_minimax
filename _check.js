const fs = require('fs');
const md = fs.readFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md', 'utf8');
const idx = md.indexOf('### Слайд 24.4');
const end = md.indexOf('### Слайд 24.5', idx);
const section = md.slice(idx, end);
console.log('TEBE-HANA inline:', (section.match(/<!--INLINE:tebe-hana\.png-->/g) || []).length);
console.log('STICKER tebe-hana:', (section.match(/<!--STICKER:tebe-hana\.png-->/g) || []).length);
console.log('---');
console.log(section);
