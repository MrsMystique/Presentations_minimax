// Финальная очистка: убрать оставшиеся эмодзи + проверить
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

// Заменяем 📐 и 🎨 (это дешёвые эмодзи по Olga)
const replacements = [
  ['**📐 Три формулы процентов', '**Три формулы процентов'],
  ['> 🎨 **Совет ученикам:', '> **Совет ученикам:'],
];

let a = 0;
for (const [from, to] of replacements) {
  if (c.indexOf(from) >= 0) {
    c = c.replace(from, to);
    a++;
    console.log('✓ ' + from);
  } else {
    console.log('  not found: ' + from);
  }
}

// Проверим оставшиеся эмодзи
const remaining = c.match(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]/gu);
console.log('Remaining emoji-like chars: ' + (remaining ? remaining.length : 0));
if (remaining) {
  const counts = {};
  remaining.forEach(e => counts[e] = (counts[e] || 0) + 1);
  Object.keys(counts).forEach(k => console.log('  ' + k + ' x' + counts[k]));
}

console.log('Applied: ' + a);
fs.writeFileSync(p, c, 'utf8');
