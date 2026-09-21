// Адаптирует парсер v2.2 для v2.3: заменяет пути и добавляет поддержку картинок
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax',
  '_build_procenti_v2_3.js'
);

let content = fs.readFileSync(filePath, 'utf8');

// 1. Заменяем пути и названия v2.2 → v2.3
content = content.replace(/v2\.2 — Проценты, пропорции, масштаб\.md/g, 'v2.3 — Проценты, пропорции, масштаб.md');
content = content.replace(/v2\.2 — Проценты, пропорции, масштаб — reader\.html/g, 'v2.3 — Проценты, пропорции, масштаб — reader.html');
content = content.replace(/v2\.2 — Проценты, пропорции, масштаб — preview\.html/g, 'v2.3 — Проценты, пропорции, масштаб — preview.html');
content = content.replace(/v2\.2\.1/g, 'v2.3');
content = content.replace(/Парсер v2\.2/g, 'Парсер v2.3');

// 2. Добавляем обработку картинок ![alt](path) в функции inline
const oldInline = `  s = s.replace(/\\\(/g, 'MOPEN').replace(/\\\)/g, 'MCLOSE');
  s = s.replace(/\\\[/g, 'MOBRACK').replace(/\\\]/g, 'MCBRACK');
  s = s.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>');
  s = s.replace(/\\*([^*]+)\\*/g, '<em>$1</em>');
  s = s.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
  s = s.replace(/MOPEN/g, '\\\\(').replace(/MCLOSE/g, '\\\\)');
  s = s.replace(/MOBRACK/g, '\\\\[').replace(/MCBRACK/g, '\\\\]');
  return s;
}`;

const newInline = `  s = s.replace(/\\\(/g, 'MOPEN').replace(/\\\)/g, 'MCLOSE');
  s = s.replace(/\\\[/g, 'MOBRACK').replace(/\\\]/g, 'MCBRACK');
  s = s.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>');
  s = s.replace(/\\*([^*]+)\\*/g, '<em>$1</em>');
  s = s.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
  // Обработка картинок ![alt](url)
  s = s.replace(/!\\[([^\\]]*)\\]\\(([^)]+)\\)/g, '<img class="slide-image" src="$2" alt="$1" />');
  s = s.replace(/MOPEN/g, '\\\\(').replace(/MCLOSE/g, '\\\\)');
  s = s.replace(/MOBRACK/g, '\\\\[').replace(/MCBRACK/g, '\\\\]');
  return s;
}`;

if (content.indexOf(oldInline) === -1) {
  console.log('OLD INLINE NOT FOUND');
  process.exit(1);
}
content = content.replace(oldInline, newInline);

// 3. Добавляем CSS-стиль для картинок в cssBase
const oldCss = '.math-block .katex-display { margin:0; }';
const newCss = '.math-block .katex-display { margin:0; }\n.slide-body img.slide-image { display:block; max-width:100%; height:auto; margin:14px auto; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }';

if (content.indexOf(oldCss) === -1) {
  console.log('OLD CSS NOT FOUND');
  process.exit(1);
}
content = content.replace(oldCss, newCss);

fs.writeFileSync(filePath, content, 'utf8');
console.log('OK: пути обновлены + поддержка картинок добавлена');