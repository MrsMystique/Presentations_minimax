const fs = require('fs');
const c = fs.readFileSync('Чистовые слайды v3.3 — Проценты, пропорции, масштаб — reader.html', 'utf8');

// Найти секцию Слайд 18
const sectionMatch = c.match(/<section[^>]*id="slide-18"[^>]*>[\s\S]*?<\/section>/);
console.log('=== Слайд 18 в HTML ===');
if (sectionMatch) {
  console.log(sectionMatch[0].substring(0, 4000));
} else {
  console.log('Не найдено');
}
