// Ревью вёрстки: ищем формулы, обёрнутые в <p>
const fs = require('fs');

const filePath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v2.3 — Проценты, пропорции, масштаб — reader.html';

const html = fs.readFileSync(filePath, 'utf8');

const lines = html.split('\n');
let issues = [];

lines.forEach((line, idx) => {
  const m = line.match(/<p>(.*?)<\/p>/);
  if (m) {
    const content = m[1];
    // Содержит display math или inline math
    if (content.indexOf('\\[') >= 0 || content.indexOf('\\(') >= 0) {
      issues.push({ line: idx + 1, content: line.substring(0, 250) });
    }
  }
});

console.log('Найдено <p> с формулами:', issues.length);
issues.slice(0, 30).forEach(it => console.log('line ' + it.line + ':', it.content));