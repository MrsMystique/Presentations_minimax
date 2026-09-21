// Финальные правки по аудиту
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');
let count = 0;

// 1. Дублированный ### в заголовке 22.9
const old1 = '### ### Слайд 22.9.';
const new1 = '### Слайд 22.9.';
if (md.includes(old1)) { md = md.replace(old1, new1); count++; console.log('1. Убран дубль ### в 22.9'); }

// 2. Остатки 'однуш' / 'двух домах' / 'квартир'
const replacements = [
  ['в двух домах вместе', 'в двух школах вместе'],
  ['Баланс учеников в двух домах через систему уравнений', 'Баланс учеников в двух школах через систему уравнений'],
  ['2. Однушек в', '2. Отличников в'],
  ['3. Однушек в', '3. Отличников в'],
  ['долю в однушках', 'долю в отличниках'],
  ['его доля в однушках должна', 'его доля отличников должна']
];
for (const [old, neu] of replacements) {
  if (md.includes(old)) {
    const c = (md.match(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    md = md.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), neu);
    console.log(`2.${++count}. Заменено "${old}" → "${neu}" (${c} шт.)`);
  }
}

// 3. Задача 3 ответ «24 га» → «2 400 га»
const old3 = '**Задача 3 — ответ 24 га.**';
const new3 = '**Задача 3 — ответ 2 400 га (= 24 км²).**';
if (md.includes(old3)) { md = md.replace(old3, new3); console.log('3. Исправлен ответ Задачи 3: 24 га → 2 400 га'); count++; }

// 4. Добавить ### к заголовку Слайда 22.10
const old4 = '\nСлайд 22.10. Финальная самопроверка\n';
const new4 = '\n### Слайд 22.10. Финальная самопроверка\n';
if (md.includes(old4) && !md.includes(new4)) {
  md = md.replace(old4, new4);
  console.log('4. Добавлен ### к заголовку Слайда 22.10');
  count++;
}

// 5. Убрать [9.5] артефакт в Задаче 5
const old5 = '[9.5].';
const new5 = '.';
if (md.includes(old5)) {
  const c = (md.match(new RegExp(old5.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  md = md.replace(new RegExp(old5.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), new5);
  console.log(`5. Убран [9.5] артефакт (${c} шт.)`);
  count++;
}

fs.writeFileSync(path, md, 'utf8');
console.log(`\nИтого: ${count} правок применено.`);
