// Заменяет буквальные "\n" в строках на реальные переносы строк
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');
const lines = md.split(/\r?\n/);
let fixedCount = 0;
const newLines = [];
for (const line of lines) {
  // Если строка содержит буквальные \n (escape-последовательность), то конвертируем
  if (/\\n/.test(line)) {
    // Заменяем \n\n на реальный перенос, \n на реальный перенос
    const split = line.split(/\\n\\n|\\n/g);
    newLines.push(...split);
    fixedCount++;
  } else {
    newLines.push(line);
  }
}
console.log('Исправлено строк:', fixedCount);
console.log('Было:', lines.length, ', стало:', newLines.length);
fs.writeFileSync(path, newLines.join('\n'), 'utf8');
