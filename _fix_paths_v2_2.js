// Заменяет имена файлов в парсере v2.1 на v2.2
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax',
  '_build_procenti_v2_2.js'
);

let content = fs.readFileSync(filePath, 'utf8');

// Заменяем пути и названия
content = content.replace(/v2\.1 — Проценты, пропорции, масштаб\.md/g, 'v2.2 — Проценты, пропорции, масштаб.md');
content = content.replace(/v2\.1 — Проценты, пропорции, масштаб — reader\.html/g, 'v2.2 — Проценты, пропорции, масштаб — reader.html');
content = content.replace(/v2\.1 — Проценты, пропорции, масштаб — preview\.html/g, 'v2.2 — Проценты, пропорции, масштаб — preview.html');
content = content.replace(/v2\.1\.1/g, 'v2.2');
content = content.replace(/Парсер v2\.1/g, 'Парсер v2.2');

fs.writeFileSync(filePath, content, 'utf8');
console.log('OK: пути обновлены');