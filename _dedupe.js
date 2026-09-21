const fs = require('fs');
const mdPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(mdPath, 'utf8');

// На каждом слайде 24.x оставляем только 1 TEBE-HANA (и тот, что не inline — STICKER)
const targets = ['24', '24.1', '24.2', '24.3', '24.4', '24.5', '24.6', '24.7', '24.8', '24.9'];

for (const n of targets) {
  const nextNum = (parseFloat(n) + 0.1).toString();
  const nextHeader = nextNum === '24.10' ? '### Слайд 24.10' : '### Слайд ' + nextNum;
  const header = '### Слайд ' + n;
  const headerIdx = md.indexOf(header);
  if (headerIdx < 0) continue;
  const nextIdx = md.indexOf(nextHeader, headerIdx);
  const sectionEnd = nextIdx > 0 ? nextIdx : md.length;
  const section = md.slice(headerIdx, sectionEnd);
  // Удаляем все INLINE:tebe-hana.png
  let count = 0;
  const cleaned = section.replace(/<!--INLINE:tebe-hana\.png-->\n?/g, () => {
    count++;
    return count === 1 ? '<!--INLINE:tebe-hana.png-->\n' : '';
  });
  md = md.replace(section, cleaned);
  console.log(`${n}: было ${count} TEBE-HANA inline, оставлено ${Math.min(count, 1)}`);
}

fs.writeFileSync(mdPath, md, 'utf8');
console.log('Готово');
