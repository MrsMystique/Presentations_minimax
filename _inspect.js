const fs = require('fs');
const mdPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
const md = fs.readFileSync(mdPath, 'utf8');

console.log('=== layfkhak контекст ===');
let m;
const re1 = /(.{0,120}<!--INLINE:layfkhak\.png-->.{0,120})/gs;
while ((m = re1.exec(md)) !== null) {
  console.log('  ' + m[1].replace(/\r?\n/g, ' | '));
}

console.log('\n=== syhraem-v-igru контекст ===');
const re2 = /(.{0,150}<!--INLINE:syhraem-v-igru\.png-->.{0,150})/gs;
while ((m = re2.exec(md)) !== null) {
  console.log('  ' + m[1].replace(/\r?\n/g, ' | '));
}

console.log('\n=== Все маркеры по слайдам ===');
const slides = md.split(/(?=^### Слайд )/gm);
for (const s of slides) {
  const m = s.match(/^### Слайд ([^.\n]+(?:\.\d+)?)/);
  if (!m) continue;
  const num = m[1];
  const stickers = [...s.matchAll(/<!--(?:STICKER|INLINE):([^>]+)-->/g)].map(x => x[1]);
  if (stickers.length > 0) {
    console.log(`Слайд ${num}: ${stickers.join(', ')}`);
  }
}
