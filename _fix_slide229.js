// Замена "квартира/дом" на нейтральное "ученики двух школ"
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v5.0 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(path, 'utf8');

// Найдём границы Слайда 22.9 (от заголовка до Слайда 22.10)
const startIdx = md.indexOf('### Слайд 22.9.');
const endIdx = md.indexOf('### Слайд 22.10.', startIdx);
console.log('22.9 от', startIdx, 'до', endIdx);

if (startIdx < 0 || endIdx < 0) { console.error('Маркеры не найдены'); process.exit(1); }

// Также обновляем строку 792 в шпаргалке 21.5 (отдельно, не внутри 22.9)
// Сохраняем математику, заменяем контекст на учеников двух школ

let block = md.substring(startIdx, endIdx);
const old = block;
console.log('Длина блока 22.9:', block.length);

// Заменяем контекст: квартира/дом → ученик/школа
block = block.replace(/### Слайд 22\.9\. Квартиры в двух домах \(баланс через переменные\)/g,
  '### Слайд 22.9. Ученики двух школ (баланс через переменные)');
block = block.replace(/жилом «Альфе»/g, 'школе «Альфа»');
block = block.replace(/жилом доме «Омега»/g, 'школе «Омега»');
block = block.replace(/жилом доме «Альфа»/g, 'школе «Альфа»');
block = block.replace(/жилом «Альфе«/g, 'школе «Альфа»');
block = block.replace(/жилом доме «Омега«/g, 'школе «Омега»');
block = block.replace(/«Омеге«/g, '«Омега»');
block = block.replace(/в жилом «Альфе« /g, 'в школе «Альфа» ');
block = block.replace(/в жилом доме «Омега» /g, 'в школе «Омега» ');
block = block.replace(/в жилом доме «Альфа»/g, 'в школе «Альфа»');
block = block.replace(/«Альфе»/g, '«Альфе»'); // оставляем
block = block.replace(/«Омега»/g, '«Омега»'); // оставляем
// Квартиры → ученики
block = block.replace(/квартир в «Альфе»/g, 'учеников в «Альфе»');
block = block.replace(/квартир в «Омеге»/g, 'учеников в «Омеге»');
block = block.replace(/квартир/g, 'учеников');
block = block.replace(/однокомнатные/g, 'отличники');
block = block.replace(/однушек/g, 'отличников');
block = block.replace(/однушки/g, 'отличники');

// Баланс квартир → баланс учеников
block = block.replace(/Баланс квартир в двух домах/g, 'Баланс учеников в двух школах');

// Также обновляем строку 792 в шпаргалке 21.5
md = md.replace('| Квартиры в двух домах | средневзвешенное двух процентов | Слайд 9, 9.5 |',
  '| Ученики двух школ | средневзвешенное двух процентов | Слайд 9, 9.5 |');

// Применяем изменения
md = md.substring(0, startIdx) + block + md.substring(endIdx);
fs.writeFileSync(path, md, 'utf8');
console.log('Слайд 22.9 переформулирован');

// Проверяем остатки
const rest = md.match(/(квартир|жилом доме|квартиры|квартира)/gi);
if (rest) {
  console.log('Остатки запретных слов:', rest.length);
} else {
  console.log('Запретных слов не осталось');
}
