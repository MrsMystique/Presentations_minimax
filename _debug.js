// Дебаг: показывает, что попадает в sub.lines и что возвращает parseLines
const fs = require('fs');
const md = fs.readFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md', 'utf8');

// Имитирую парсинг как в _build_procenti_v3_3.js
const lines = md.split(/\r?\n/);
const stickerLineIdx = new Set();
const stickerByLine = new Map();
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].trim().match(/^<!--(?:STICKER|INLINE):([^>]+)-->$/);
  if (m) { stickerLineIdx.add(i); stickerByLine.set(i, m[1]); }
}

// Найдём h2/h3 секции
const h2Sections = [];
let curH2 = null;
for (let i = 0; i < lines.length; i++) {
  if (stickerLineIdx.has(i)) continue;
  const line = lines[i];
  const h2 = line.match(/^##\s+(.+)$/);
  if (h2) { if (curH2) h2Sections.push(curH2); curH2 = { title: h2[1].trim(), h3Sections: [], trailer: [] }; continue; }
  if (!curH2) continue;
  const h3 = line.match(/^###\s+(.+)$/);
  if (h3) { curH2.h3Sections.push({ title: h3[1].trim(), lines: [] }); continue; }
  if (curH2.h3Sections.length > 0) curH2.h3Sections[curH2.h3Sections.length - 1].lines.push(line);
  else curH2.trailer.push(line);
}
if (curH2) h2Sections.push(curH2);

// Найдём слайд 9 и покажем его lines
for (const sec of h2Sections) {
  for (const sub of sec.h3Sections) {
    if (sub.title.includes('Слайд 9. Перевод единиц')) {
      console.log('=== Слайд 9: sub.lines ===');
      sub.lines.forEach((l, i) => {
        const isSticker = l.trim().match(/^<!--(?:STICKER|INLINE):([^>]+)-->$/);
        console.log(`  [${i}] ${isSticker ? 'STICKER: ' + isSticker[1] : l.substring(0, 80)}`);
      });
    }
    if (sub.title.includes('Слайд 9.1.')) {
      console.log('\n=== Слайд 9.1: sub.lines ===');
      sub.lines.forEach((l, i) => {
        const isSticker = l.trim().match(/^<!--(?:STICKER|INLINE):([^>]+)-->$/);
        console.log(`  [${i}] ${isSticker ? 'STICKER: ' + isSticker[1] : l.substring(0, 80)}`);
      });
    }
  }
}
