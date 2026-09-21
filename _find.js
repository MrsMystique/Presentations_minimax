const fs = require('fs');
const c = fs.readFileSync('ЧИСТОВЫЕ СЛАЙДЫ V3.3 — ПРОЦЕНТЫ, ПРОПОРЦИИ, МАСШТАБ.MD'.replace('ЧИСТОВЫЕ', 'Чистовые').replace('ПРОЦЕНТЫ', 'Проценты').replace('МАСШТАБ', 'масштаб'), 'utf8');
console.log('Searching specific strings:');
const queries = [
  'Что такое процент: сотая часть',
  'Слайд 15.2. Задачи на смеси',
  'Смеси и сплавы: закон',
  'Сравнение ставок: капитализация',
  'iff a \\cdot d = b \\cdot c',
  'Простой процент (Слайд 12)',
  'сложный процент (Слайд 13)',
  'Формула сложных процентов (Слайд 14)',
];
queries.forEach(q => {
  const idx = c.indexOf(q);
  console.log(`  ${idx >= 0 ? 'FOUND' : 'NOT FOUND'}: "${q.substring(0, 50)}"`);
});
