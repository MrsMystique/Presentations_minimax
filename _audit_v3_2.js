// Аудит: какие картинки использованы в v3.2.md
const fs = require('fs');

const mdPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.2 — Проценты, пропорции, масштаб.md';
const assetsDir = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\assets';

const c = fs.readFileSync(mdPath, 'utf8');
const lines = c.split('\n');
let currentSlide = null;
const usedIn = {};

lines.forEach((line, i) => {
  const slideMatch = line.match(/^###\s+Слайд\s+([\d.]+)/);
  if (slideMatch) currentSlide = slideMatch[1];
  const imgMatch = line.match(/assets\/([^)]+)\)/);
  if (imgMatch && currentSlide) {
    if (!usedIn[imgMatch[1]]) usedIn[imgMatch[1]] = [];
    usedIn[imgMatch[1]].push(currentSlide);
  }
});

console.log('=== ИСПОЛЬЗОВАННЫЕ В СЛАЙДАХ (' + Object.keys(usedIn).length + ') ===');
Object.keys(usedIn).sort().forEach(f => {
  console.log('  ' + f + ' → ' + usedIn[f].join(', '));
});
console.log('');

const allFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.png'));
const slideFiles = allFiles.filter(f =>
  !f.startsWith('subject') && !f.startsWith('povelitel') && !f.startsWith('storyboard') && !f.includes('character-sheet')
);
const notUsed = slideFiles.filter(f => !usedIn[f]);
console.log('=== НЕ ИСПОЛЬЗОВАНЫ (есть в assets/, не в слайдах) ===');
if (notUsed.length === 0) {
  console.log('  (нет)');
} else {
  notUsed.forEach(f => console.log('  ❌ ' + f));
}