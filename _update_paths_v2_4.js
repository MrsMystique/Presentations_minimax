// Меняет пути и названия в парсере v2.3 → v2.4
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax',
  '_build_procenti_v2_4.js'
);

let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/v2\.3 — Проценты, пропорции, масштаб\.md/g, 'v2.4 — Проценты, пропорции, масштаб.md');
content = content.replace(/v2\.3 — Проценты, пропорции, масштаб — reader\.html/g, 'v2.4 — Проценты, пропорции, масштаб — reader.html');
content = content.replace(/v2\.3 — Проценты, пропорции, масштаб — preview\.html/g, 'v2.4 — Проценты, пропорции, масштаб — preview.html');

// Также нужно обновить логику isRef и isFinal для 36 слайдов
// Было: isRef = (s >= slides.length - 9); isFinal = (s >= slides.length - 11 && s < slides.length - 9)
// Для 36 слайдов последние 9 — это реф, 11 и 10 — final. Это уже работает, но проверим.
content = content.replace('const isRef = (s >= slides.length - 9);', 'const isRef = (s >= slides.length - 9);');
content = content.replace('const isFinal = (s >= slides.length - 11 && s < slides.length - 9);', 'const isFinal = (s >= slides.length - 11 && s < slides.length - 9);');

// Название парсера в комментарии
content = content.replace('// Парсер v2.3 → reader.html + preview.html (с поддержкой картинок)',
                          '// Парсер v2.4 → reader.html + preview.html (с поддержкой картинок)');

// Обновим заголовок в HTML
content = content.replace(
  "<h1>Чистовые слайды v2.3 — Проценты, пропорции, масштаб</h1>",
  "<h1>Чистовые слайды v2.4 — Проценты, пропорции, масштаб</h1>"
);

content = content.replace(
  "<title>Чистовые слайды v2.3 — Проценты, пропорции, масштаб — читалка</title>",
  "<title>Чистовые слайды v2.4 — Проценты, пропорции, масштаб — читалка</title>"
);

content = content.replace(
  "<h1>Чистовые слайды v2.3 — Проценты, пропорции, масштаб — обзор</h1>",
  "<h1>Чистовые слайды v2.4 — Проценты, пропорции, масштаб — обзор</h1>"
);

content = content.replace(
  "<title>Чистовые слайды v2.3 — Проценты, пропорции, масштаб — обзор</title>",
  "<title>Чистовые слайды v2.4 — Проценты, пропорции, масштаб — обзор</title>"
);

content = content.replace(
  'Чистовые слайды v2.3 — Проценты, пропорции, масштаб — reader.html#slide-',
  'Чистовые слайды v2.4 — Проценты, пропорции, масштаб — reader.html#slide-'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('OK: пути v2.4');