// Удаляет второй экземпляр Мостик 3
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');
const lines = md.split(/\r?\n/);
const idx = [];
for (let i = 0; i < lines.length; i++) {
  if (/^## Мостик 3\.\s/.test(lines[i])) idx.push(i);
}
console.log('Мостик 3 найден на строках:', idx);
if (idx.length < 2) { console.error('Дубль не найден'); process.exit(1); }
const startIdx = idx[1];
let endIdx = startIdx + 1;
while (endIdx < lines.length && !/^(##\s|###\s)/.test(lines[endIdx])) endIdx++;
const removeFrom = (lines[startIdx - 1] && lines[startIdx - 1].trim() === '') ? startIdx - 1 : startIdx;
const removed = lines.slice(removeFrom, endIdx);
console.log(`Удаляем строки ${removeFrom + 1}–${endIdx} (всего ${endIdx - removeFrom}):`);
removed.forEach((l, i) => console.log(`  ${removeFrom + i + 1}: ${l.substring(0, 80)}`));
const newLines = lines.slice(0, removeFrom).concat(lines.slice(endIdx));
fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log(`Было ${lines.length}, стало ${newLines.length}`);
