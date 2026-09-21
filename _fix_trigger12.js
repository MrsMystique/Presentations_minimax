// Замена дублирующего Закон-триггер в Слайде 12 на специфичный для простого процента
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');

// Найдём точное вхождение через поиск конкретной строки
const marker = '> Закон-триггер: три формулы процентов — это перестановка одной и той же пропорции.';
const occurrences = md.split(marker).length - 1;
console.log('Вхождений:', occurrences);

// Первое вхождение — Слайд 9, второе — Слайд 12
// Меняем ТОЛЬКО второе (Слайд 12)
const newTrigger12 = '> Закон-триггер: простой процент — это та же Формула 1, применённая n раз подряд к одной и той же начальной сумме A. База не меняется — это отличает простой процент от сложного (где база растёт).';

let count = 0;
let idx = 0;
while ((idx = md.indexOf(marker, idx)) !== -1) {
  count++;
  if (count === 2) {
    // Это Слайд 12 — заменяем
    const before = md.substring(0, idx);
    const after = md.substring(idx + marker.length);
    md = before + newTrigger12 + after;
    console.log('✓ Второе вхождение (Слайд 12) заменено');
    break;
  }
  idx += marker.length;
}

fs.writeFileSync(path, md, 'utf8');
console.log(`Итого замен: ${count === 2 ? 1 : 0}`);
