// Дебаг: проверяем что попадает в slide.stickers для слайда 7.1
const fs = require('fs');
const md = fs.readFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md', 'utf8');

const lines = md.split(/\r?\n/);
const stickerLineIdx = new Set();
const stickerByLine = new Map();
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].trim().match(/^<!--STICKER:([^>]+)-->$/);
  if (m) { stickerLineIdx.add(i); stickerByLine.set(i, m[1]); }
}

function readStickersBefore(idx) {
  let j = idx - 1;
  const out = [];
  while (j >= 0) {
    if (stickerLineIdx.has(j)) {
      out.unshift(stickerByLine.get(j));
      j--;
    } else if (lines[j].trim() === '') {
      j--;
    } else {
      break;
    }
  }
  return out;
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
  if (h3) { curH2.h3Sections.push({ title: h3[1].trim(), lines: [], stickers: readStickersBefore(i) }); continue; }
  if (curH2.h3Sections.length > 0) curH2.h3Sections[curH2.h3Sections.length - 1].lines.push(line);
  else curH2.trailer.push(line);
}
if (curH2) h2Sections.push(curH2);

// Покажем stickers для слайдов 7.1, 9.1, 17.1
for (const sec of h2Sections) {
  for (const sub of sec.h3Sections) {
    const m = sub.title.match(/Слайд (\S+)\./);
    if (m && ['7.1', '9.1', '17.1'].includes(m[1])) {
      console.log(`${sub.title}: stickers = ${JSON.stringify(sub.stickers)}`);
    }
  }
}
