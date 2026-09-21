// Сдвиг Слайд 2 (Пропорция) → 3 и все следующие на +1 через каскад
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

const shiftMap = [
  ['23.9', '24.9'],
  ['23.8', '24.8'],
  ['23.7', '24.7'],
  ['23.6', '24.6'],
  ['23.5', '24.5'],
  ['23.4', '24.4'],
  ['23.3', '24.3'],
  ['23.2', '24.2'],
  ['23.1', '24.1'],
  ['23', '24'],
  ['22', '23'],
  ['21', '22'],
  ['20', '21'],
  ['19', '20'],
  ['18', '19'],
  ['17', '18'],
  ['16.1', '17.1'],
  ['16', '17'],
  ['15.2', '16.2'],
  ['15.1', '16.1'],
  ['15', '16'],
  ['14.2', '15.2'],
  ['14.1', '15.1'],
  ['14', '15'],
  ['13', '14'],
  ['12', '13'],
  ['11.1', '12.1'],
  ['11', '12'],
  ['10.1', '11.1'],
  ['10', '11'],
  ['9.1', '10.1'],
  ['9', '10'],
  ['8.1', '9.1'],
  ['8', '9'],
  ['7.1', '8.1'],
  ['7', '8'],
  ['6.1', '7.1'],
  ['6', '7'],
  ['5', '6'],
  ['4', '5'],
  ['3', '4'],
  ['2', '3'],
];

let total = 0;
for (const [from, to] of shiftMap) {
  const fromEsc = from.replace('.', '\\.');
  // Без lookahead — простая замена
  const reg = new RegExp('^(### Слайд )' + fromEsc + '(\\. )', 'gm');
  const before = c;
  c = c.replace(reg, '$1' + to + '$2');
  if (before !== c) {
    total++;
  }
}
console.log('Shifted: ' + total);
fs.writeFileSync(p, c, 'utf8');

const m = c.match(/^### Слайд [^\n]*$/gm);
const conflicts = {};
m.forEach(x => {
  const num = x.match(/### Слайд ([0-9.]+)/)[1];
  conflicts[num] = (conflicts[num] || 0) + 1;
});
Object.keys(conflicts).forEach(k => {
  if (conflicts[k] > 1) console.log('CONFLICT: ' + k + ' x' + conflicts[k]);
});
if (!Object.values(conflicts).some(v => v > 1)) console.log('NO CONFLICTS');
console.log('Total: ' + m.length);
