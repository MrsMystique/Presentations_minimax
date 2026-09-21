// Читает черновик и пишет в JSON для удобства обработки
const fs = require('fs');

const draftPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_draft_sets_nok_nod.txt';
const txt = fs.readFileSync(draftPath, 'utf8');
const lines = txt.split('\n');
console.log('Всего строк: ' + lines.length);

// Ищем все строки, начинающиеся с "СЛАЙД"
const slideRe = /^СЛАЙД (\d+)\.\s+(.+)$/;
const slides = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(slideRe);
  if (m) slides.push({ num: parseInt(m[1]), title: m[2], start: i });
}
console.log('Найдено слайдов: ' + slides.length);
slides.forEach(s => console.log(`  Слайд ${s.num}: ${s.title}`));