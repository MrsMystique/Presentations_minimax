// Точечная правка Слайда 12 — добавляет пустые строки между шагами
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');

const marker = '**Шаг 1. Подставь данные в скобку:**';
const endMarker = 'Совпало.';
const idx = md.indexOf(marker);
const endIdx = md.indexOf(endMarker, idx) + endMarker.length;
const old = md.substring(idx, endIdx);

// Строим новый блок с пустыми строками между шагами
const neu =
  '**Шаг 1. Подставь данные в скобку:**\n\n' +
  '\\[ S = 5000 \\cdot \\left(1 + \\frac{15 \\cdot 12}{100}\\right) \\]\n\n' +
  '**Шаг 2. Посчитай числитель дроби в скобках:** \\(15 \\cdot 12 = 180\\).\n\n' +
  '\\[ S = 5000 \\cdot \\left(1 + \\frac{180}{100}\\right) \\]\n\n' +
  '**Шаг 3. Раздели:** \\(180 \\div 100 = 1{,}8\\).\n\n' +
  '\\[ S = 5000 \\cdot (1 + 1{,}8) \\]\n\n' +
  '**Шаг 4. Сложи в скобках:** \\(1 + 1{,}8 = 2{,}8\\).\n\n' +
  '\\[ S = 5000 \\cdot 2{,}8 \\]\n\n' +
  '**Шаг 5. Умножь:** \\(5000 \\cdot 2{,}8 = 14\\,000\\).\n\n' +
  '\\[ S = 14\\,000 \\text{ руб.} \\]\n\n' +
  '**Проверка:** каждый год банк начисляет 750 руб (это 15% от 5000). За 12 лет это \\(750 \\cdot 12 = 9000\\) руб процентов. Итого: \\(5000 + 9000 = 14\\,000\\) руб. Совпало.';

md = md.substring(0, idx) + neu + md.substring(endIdx);
fs.writeFileSync(path, md, 'utf8');
console.log('Слайд 12 переформатирован. Старый размер блока:', old.length, ', новый:', neu.length);
