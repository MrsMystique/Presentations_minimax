// FIX 9: Мостик 5 — заменить «не как магия»
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax',
  'Чистовые слайды v2.3 — Проценты, пропорции, масштаб.md'
);

let content = fs.readFileSync(filePath, 'utf8');

const oldM5 = 'Готовься: будет формула со степенью. Но степень появится не как магия, а как короткая запись цепочки из (n) одинаковых умножений.';
const newM5 = 'Готовься: будет формула со степенью. Но степень появится не как готовый результат, а как короткая запись цепочки из (n) одинаковых умножений.';

if (content.indexOf(oldM5) === -1) {
  console.log('NOT FOUND');
  process.exit(1);
}
content = content.replace(oldM5, newM5);
fs.writeFileSync(filePath, content, 'utf8');
console.log('FIX 9 applied');