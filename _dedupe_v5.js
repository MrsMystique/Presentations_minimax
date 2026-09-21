// Удаляет дублирующуюся секцию (Мостик 4 + Блок 5) между двумя Мостик 5.
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');
const lines = md.split(/\r?\n/);

// Находим индексы строк с "## Мостик 4."
const most4Indices = [];
for (let i = 0; i < lines.length; i++) {
  if (/^## Мостик 4\.\s/.test(lines[i])) most4Indices.push(i);
}
console.log('Мостик 4 найден на строках:', most4Indices);
if (most4Indices.length < 2) {
  console.error('Недостаточно вхождений Мостик 4 для удаления дубля');
  process.exit(1);
}
const startIdx = most4Indices[1]; // начало дубля — второй Мостик 4

// Находим индекс строки "## Мостик 5." (она должна быть после startIdx)
let endIdx = -1;
for (let i = startIdx; i < lines.length; i++) {
  if (/^## Мостик 5\.\s/.test(lines[i])) { endIdx = i; break; }
}
console.log('Мостик 5 найден на строке:', endIdx);
if (endIdx < 0) { console.error('Не найден Мостик 5 после дубля'); process.exit(1); }

// Удаляем пустые строки непосредственно перед Мостик 5
let actualEndIdx = endIdx;
while (actualEndIdx > startIdx && lines[actualEndIdx - 1].trim() === '') actualEndIdx--;
console.log('Удаляем строки с', startIdx + 1, 'по', actualEndIdx, '(всего', actualEndIdx - startIdx, 'строк)');

const removed = lines.slice(startIdx, actualEndIdx);
console.log('Первые 3 строки удаляемого блока:');
removed.slice(0, 3).forEach((l, i) => console.log(`  ${startIdx + i + 1}: ${l.substring(0, 80)}`));
console.log('Последние 3 строки удаляемого блока:');
removed.slice(-3).forEach((l, i) => console.log(`  ${actualEndIdx - 2 + i}: ${l.substring(0, 80)}`));

const newLines = lines.slice(0, startIdx).concat(lines.slice(actualEndIdx));
fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('Готово. Было строк:', lines.length, ', стало:', newLines.length);
