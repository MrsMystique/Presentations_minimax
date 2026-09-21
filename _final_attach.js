// Финальное подключение картинок на Слайды 3 и 23
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

// Слайд 3: заменить titulnik-procenty на balans-proportsiya
const s3Old = '### Слайд 3. Пропорция: равенство двух отношений\n\n![Титульник партии №3 — Проценты, пропорции, масштаб](assets/titulnik-procenty.png)\n\n**Почему это важно?**';
const s3New = '### Слайд 3. Пропорция: равенство двух отношений\n\n![Закон абсолютного баланса: a/b = c/d — произведения наискосок равны (a·d = b·c). Два прямоугольника: 2/3 = 4/6](assets/balans-proportsiya.png)\n\n**Почему это важно?**';
if (c.indexOf(s3Old) >= 0) {
  c = c.replace(s3Old, s3New);
  console.log('✓ Слайд 3: balans-proportsiya добавлена');
} else {
  console.log('NOT FOUND Слайд 3 pattern');
}

// Слайд 23: добавить shpory-mozhno.png
const s23Old = '### Слайд 23. Зачем тебе всё это: мотивация перед экзаменом\n\nПроценты,';
const s23New = '### Слайд 23. Зачем тебе всё это: мотивация перед экзаменом\n\n![Можно, это шпора! Хитрый граф подглядывает — но легенда разрешает использовать шпаргалки как инструмент](assets/shpory-mozhno.png)\n\nПроценты,';
if (c.indexOf(s23Old) >= 0 && c.indexOf('shpory-mozhno') < 0) {
  c = c.replace(s23Old, s23New);
  console.log('✓ Слайд 23: shpory-mozhno добавлена');
} else {
  console.log('NOT FOUND Слайд 23 pattern or already added');
}

fs.writeFileSync(p, c, 'utf8');

// Проверим
console.log('\nФинальное состояние:');
console.log('balans-proportsiya:', (c.match(/balans-proportsiya/g) || []).length);
console.log('shpory-mozhno:', (c.match(/shpory-mozhno/g) || []).length);
console.log('titulnik-procenty:', (c.match(/titulnik-procenty/g) || []).length);
