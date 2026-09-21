// Ревью: ищем display-math внутри blockquote или странные случаи
const fs = require('fs');

const filePath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v2.3 — Проценты, пропорции, масштаб — reader.html';

const html = fs.readFileSync(filePath, 'utf8');

const lines = html.split('\n');
let issues = [];

// Случай 1: <blockquote>...<p>\[...\]...</p>...</blockquote>
lines.forEach((line, idx) => {
  if (line.indexOf('\\[') >= 0 && line.indexOf('math-block') < 0) {
    issues.push({ line: idx + 1, content: line.substring(0, 350) });
  }
});

// Случай 2: <p> в начале строки содержит \[ в начале
console.log('Всего строк с \\[ без math-block:', issues.length);
issues.slice(0, 10).forEach(it => console.log('line ' + it.line + ':', it.content));

// Случай 3: <p> оборачивает math-block
console.log('\n=== <p>...math-block...</p> ===');
let inMathBlock = 0;
lines.forEach((line, idx) => {
  if (line.indexOf('<p>') >= 0 && line.indexOf('math-block') >= 0) {
    console.log('line ' + (idx + 1) + ':', line.substring(0, 200));
  }
});