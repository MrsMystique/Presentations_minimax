// Добавляет **жирное** для ЦЕЛОЕ / ЧАСТЬ / триггер-слов в Слайде 9.5
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');

// Найдём границы Слайда 9.5
const start = md.indexOf('### Слайд 9.5.');
const end = md.indexOf('### Слайд 9.1.', start);
console.log('9.5 от', start, 'до', end);

if (start < 0 || end < 0) { console.error('Не найден'); process.exit(1); }

const block = md.substring(start, end);
let newBlock = block;

// Выделяем ЦЕЛОЕ и ЧАСТЬ жирным, если ещё не выделены
newBlock = newBlock.replace(/\bЦЕЛОЕ\b/g, '**ЦЕЛОЕ**');
newBlock = newBlock.replace(/\bЧАСТЬ\b/g, '**ЧАСТЬ**');
// Не трогать уже жирные
newBlock = newBlock.replace(/\*\*\*\*ЦЕЛОЕ\*\*\*\*\b/g, '**ЦЕЛОЕ**');
newBlock = newBlock.replace(/\*\*\*\*ЧАСТЬ\*\*\*\*\b/g, '**ЧАСТЬ**');

// Выделяем триггер-слова
const triggers = [
  '«от чего»',
  '«от какого числа»',
  '«составляет X%»',
  '«было/стало»',
  '«найти процент от числа»',
  '«15% от 200»',
  '«30 — это 15% от какого-то числа»',
  '«30 от 200 — это сколько процентов»',
  '«цена была 100, стала 120»',
  '«в растворе 40 г соли, всего 500 г»'
];
for (const t of triggers) {
  // Экранируем для regex
  const esc = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(?<!\\*\\*)' + esc + '(?!\\*\\*)', 'g');
  newBlock = newBlock.replace(re, '**' + t + '**');
  // Убираем дубли ** **
  newBlock = newBlock.replace(/\*\*\*\*/g, '**');
}

md = md.substring(0, start) + newBlock + md.substring(end);
fs.writeFileSync(path, md, 'utf8');
console.log('Слайд 9.5 переформатирован');
