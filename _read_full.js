// Извлекает содержимое слайдов в структуру для повторного использования
const fs = require('fs');

const draftPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_draft_sets_nok_nod.txt';
const txt = fs.readFileSync(draftPath, 'utf8');
const lines = txt.split('\n');
const slideRe = /^СЛАЙД (\d+)\.\s+(.+)$/;
const slides = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(slideRe);
  if (m) slides.push({ num: parseInt(m[1]), title: m[2], start: i });
}
for (let i = 0; i < slides.length; i++) {
  const end = (i + 1 < slides.length) ? slides[i+1].start : lines.length;
  slides[i].content = lines.slice(slides[i].start + 1, end).join('\n').trim();
}

const out = slides.map(s => `\n\n===== СЛАЙД ${s.num}: ${s.title} =====\n\n${s.content}\n\n`).join('');
fs.writeFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_full_draft.txt', out, 'utf8');
console.log('Записано: ' + slides.length + ' слайдов, ' + (fs.statSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_full_draft.txt').size/1024).toFixed(1) + ' КБ');