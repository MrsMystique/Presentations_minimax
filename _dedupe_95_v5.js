// Удаляет второй экземпляр Слайд 9.5
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');
const lines = md.split(/\r?\n/);
const slide95Idx = [];
for (let i = 0; i < lines.length; i++) {
  if (/^### Слайд 9\.5\.\s/.test(lines[i])) slide95Idx.push(i);
}
console.log('Слайд 9.5 найден на строках:', slide95Idx);
if (slide95Idx.length < 2) { console.error('Дубль не найден'); process.exit(1); }
const startIdx = slide95Idx[1];
// Найти конец: начать ПОСЛЕ header, искать следующий ## или ### header
let endIdx = startIdx + 1;
while (endIdx < lines.length && !/^(##\s|###\s)/.test(lines[endIdx])) endIdx++;
// Удалить с startIdx до endIdx (исключительно), плюс одну пустую строку перед startIdx если есть
const removeFrom = (lines[startIdx - 1] && lines[startIdx - 1].trim() === '') ? startIdx - 1 : startIdx;
const removed = lines.slice(removeFrom, endIdx);
console.log(`Удаляем строки ${removeFrom + 1}–${endIdx} (всего ${endIdx - removeFrom}):`);
removed.slice(0, 3).forEach((l, i) => console.log(`  ${removeFrom + i + 1}: ${l.substring(0, 80)}`));
console.log('...');
removed.slice(-3).forEach((l, i) => console.log(`  ${endIdx - 3 + i}: ${l.substring(0, 80)}`));
const newLines = lines.slice(0, removeFrom).concat(lines.slice(endIdx));
fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log(`Было ${lines.length}, стало ${newLines.length}`);
