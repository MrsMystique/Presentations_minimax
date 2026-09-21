// Перемещает Слайд 15.6 (Шпаргалка простого процента) перед Слайдом 20 (Шпаргалка сложных процентов)
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');

const slideStart = '### Слайд 15.6.';
const slideEnd = '### Слайд 16.';
const sIdx = md.indexOf(slideStart);
const eIdx = md.indexOf(slideEnd, sIdx);
console.log('Слайд 15.6 от', sIdx, 'до', eIdx);
if (sIdx < 0 || eIdx < 0) { console.error('Не найден'); process.exit(1); }

const block156 = md.substring(sIdx, eIdx);

// Найдём место для вставки — перед "### Слайд 20."
const targetStart = '### Слайд 20.';
const tIdx = md.indexOf(targetStart);
console.log('Слайд 20 на позиции', tIdx);
if (tIdx < 0) { console.error('Слайд 20 не найден'); process.exit(1); }

// Удаляем блок 15.6 из старого места
let newMd = md.substring(0, sIdx) + md.substring(eIdx);

// После удаления позиции сдвигаются
const newTargetIdx = newMd.indexOf(targetStart);
console.log('Новая позиция Слайд 20:', newTargetIdx);

// Вставляем 15.6 перед Слайдом 20
const before = newMd.substring(0, newTargetIdx);
const after = newMd.substring(newTargetIdx);
newMd = before + block156 + after;

fs.writeFileSync(path, newMd, 'utf8');
console.log('Готово. Перенесён блок:', block156.length, 'байт');
