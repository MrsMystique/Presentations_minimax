const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.9 — Проценты, пропорции, масштаб.md';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/<!--STICKER:[^>]+-->\r?\n?/g, '');
fs.writeFileSync(path, content, 'utf8');
console.log('Готово. Размер: ' + (fs.statSync(path).size/1024).toFixed(1) + ' КБ');
