// Ревью: ищем display-math \\[...\\] ВНУТРИ <p>
const fs = require('fs');

const filePath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v2.3 — Проценты, пропорции, масштаб — reader.html';

const html = fs.readFileSync(filePath, 'utf8');

const lines = html.split('\n');
let issues = [];

lines.forEach((line, idx) => {
  // Ищем <p> внутри которого есть \\[ (display math)
  const m = line.match(/<p>(.*?)<\/p>/);
  if (m) {
    const content = m[1];
    if (content.indexOf('\\[') >= 0) {
      issues.push({ line: idx + 1, content: line.substring(0, 350) });
    }
  }
});

console.log('Найдено <p> С DISPLAY-MATH:', issues.length);
issues.slice(0, 20).forEach(it => console.log('line ' + it.line + ':', it.content));