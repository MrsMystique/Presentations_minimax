// Меняет местами Финал и Глоссарий: Финал теперь 22.12 (после Карты), Глоссарий 22.13 (после Финала)
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');

const glossaryStart = '### Слайд 22.13. Глоссарий: термины из задачников РИКЗ';
const finalStart = '### Слайд 22.12. Финал';

const gIdx = md.indexOf(glossaryStart);
const fIdx = md.indexOf(finalStart);
console.log('Глоссарий на:', gIdx, ', Финал на:', fIdx);

// Найдём конец Финала (до конца файла или следующего H2)
let fEnd = md.length;
const fileEnd = md.length;
console.log('Финал до конца файла');

// Найдём конец Глоссария (это непосредственно перед Финалом)
let gEnd = fIdx;

const glossaryBlock = md.substring(gIdx, gEnd);
const finalBlock = md.substring(fIdx, fileEnd);
console.log('Глоссарий длина:', glossaryBlock.length, ', Финал длина:', finalBlock.length);

// Меняем местами: Финал теперь 22.12, Глоссарий 22.13
const newFinal = finalBlock.replace('### Слайд 22.12. Финал', '### Слайд 22.12. Финал').trim();
const newGlossary = glossaryBlock.replace('### Слайд 22.13. Глоссарий: термины из задачников РИКЗ', '### Слайд 22.13. Глоссарий: термины из задачников РИКЗ').trim();

// Собираем: до Глоссария, потом Финал, потом Глоссарий
const before = md.substring(0, gIdx);
const newMd = before + newFinal + '\n\n' + newGlossary + '\n';

fs.writeFileSync(path, newMd, 'utf8');
console.log('Готово. Документ собран в порядке: Финал (22.12) → Глоссарий (22.13)');
