// Аудит: какие картинки использованы в v2.5.md, какие нет
const fs = require('fs');

const mdPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v2.5 — Проценты, пропорции, масштаб.md';
const assetsDir = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\assets';

const c = fs.readFileSync(mdPath, 'utf8');

// Найдём все вхождения ![alt](path)
const re = /!\[([^\]]*)\]\(([^)]+)\)/g;
let m;
const used = new Set();
const usedIn = {}; // file -> [slideNums]
while ((m = re.exec(c)) !== null) {
  const fullPath = m[2];
  if (fullPath.startsWith('assets/')) {
    const filename = fullPath.replace('assets/', '');
    used.add(filename);
  }
}

// Найдём, в каких слайдах использованы
const lines = c.split('\n');
let currentSlide = null;
lines.forEach((line, i) => {
  const slideMatch = line.match(/^###\s+Слайд\s+([\d.]+)/);
  if (slideMatch) currentSlide = slideMatch[1];
  const imgMatch = line.match(/!\[[^\]]*\]\(assets\/([^)]+)\)/);
  if (imgMatch && currentSlide) {
    if (!usedIn[imgMatch[1]]) usedIn[imgMatch[1]] = [];
    usedIn[imgMatch[1]].push(currentSlide);
  }
});

console.log('=== ИСПОЛЬЗОВАННЫЕ В СЛАЙДАХ (' + used.size + ') ===');
Object.keys(usedIn).sort().forEach(f => {
  console.log('  ' + f + ' → слайды: ' + usedIn[f].join(', '));
});
console.log('');

// Все файлы в assets
const allFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.png'));
const slideFiles = allFiles.filter(f =>
  !f.startsWith('subject') && !f.startsWith('povelitel') && !f.startsWith('storyboard') && !f.includes('character-sheet')
);
const charFiles = allFiles.filter(f =>
  f.startsWith('subject') || f.startsWith('povelitel') || f.startsWith('storyboard') || f.includes('character-sheet')
);

console.log('=== НЕ ИСПОЛЬЗОВАНЫ В СЛАЙДАХ (есть на диске, не вставлены) ===');
slideFiles.filter(f => !used.has(f)).forEach(f => console.log('  ❌ ' + f));
if (slideFiles.filter(f => !used.has(f)).length === 0) {
  console.log('  (нет)');
}
console.log('');

console.log('=== CHARACTER SHEETS (только референсы, не для слайдов) ===');
charFiles.forEach(f => console.log('  📚 ' + f));
console.log('');

console.log('=== ВСЕ ФАЙЛЫ В ASSETS/ ===');
console.log('  Всего: ' + allFiles.length + ' (включая character sheets)');
console.log('  Картинки для слайдов: ' + slideFiles.length);
console.log('  Character sheets: ' + charFiles.length);