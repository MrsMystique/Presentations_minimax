const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

// Найти упоминания количества слайдов
const m = c.match(/\d+ слайдов/g);
console.log('Slide counts:');
if (m) m.forEach(x => console.log('  ' + x));

// Контекст
const idx = c.indexOf('39 слайдов');
if (idx >= 0) {
  console.log('Context 39:', JSON.stringify(c.substring(idx - 30, idx + 50)));
}

// Подсчитать реальное количество
const slides = c.match(/^### Слайд /gm);
console.log('Real count:', slides ? slides.length : 0);
