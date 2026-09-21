// Аудит v3.3: соответствие чисел в alt-тексте картинок и в тексте слайда
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
const c = fs.readFileSync(p, 'utf8');

// Извлечь слайды
const slideRegex = /### Слайд (\d+(?:\.\d+)?)\. ([^\n]+)\n([\s\S]*?)(?=\n### Слайд |\n## |$)/g;
const slides = [];
let m;
while ((m = slideRegex.exec(c)) !== null) {
  slides.push({ num: m[1], title: m[2], body: m[3] });
}

// Для каждого слайда с картинкой — вытащить alt и числа
const audit = [];
for (const s of slides) {
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let img;
  while ((img = imgRegex.exec(s.body)) !== null) {
    const alt = img[1];
    const src = img[2];
    // Извлечь числа из alt
    const altNums = alt.match(/\d[\d\s,\.]*/g) || [];
    // Извлечь числа из тела (только в первом абзаце после картинки)
    const bodyAfterImg = s.body.substring(img.index + img[0].length);
    const firstPara = bodyAfterImg.split('\n\n')[0].substring(0, 800);
    const bodyNums = firstPara.match(/\d[\d\s,\.]*/g) || [];

    audit.push({
      slide: s.num,
      title: s.title.substring(0, 50),
      src: src.split('/').pop(),
      alt,
      altNums: altNums.map(n => n.trim()).filter(n => n.length > 1),
      bodyFirstPara: firstPara.substring(0, 200),
      bodyNums: bodyNums.map(n => n.trim()).filter(n => n.length > 1).slice(0, 8)
    });
  }
}

console.log('=== АУДИТ КАРТИНОК v3.3 ===\n');
for (const a of audit) {
  console.log('Слайд ' + a.slide + ': ' + a.title);
  console.log('  src: ' + a.src);
  console.log('  alt: ' + a.alt);
  console.log('  alt числа: ' + JSON.stringify(a.altNums));
  console.log('  text числа: ' + JSON.stringify(a.bodyNums));
  console.log('  text: ' + a.bodyFirstPara.substring(0, 150));
  console.log();
}
console.log('Total audited: ' + audit.length);
