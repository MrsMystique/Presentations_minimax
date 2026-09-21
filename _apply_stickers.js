// Применяет маркеры стикеров к партии v3.3.
// Запускать ОДИН РАЗ — переписывает .md.
const fs = require('fs');

const MD_PATH = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';

let md = fs.readFileSync(MD_PATH, 'utf8');

// Утилита: вставляет блок маркеров ПЕРЕД первой строкой, начинающейся с needle.
// Блок: <!--STICKER:filename.png--> повторённый сколько нужно раз.
function beforeFirst(haystack, needle, stickers) {
  const idx = haystack.indexOf(needle);
  if (idx === -1) { console.log('!! НЕ НАЙДЕНО:', needle); return haystack; }
  const block = stickers.map(f => '<!--STICKER:' + f + '-->').join('\n') + '\n';
  return haystack.slice(0, idx) + block + haystack.slice(idx);
}

// === Мостики: СТОП + МОСТИК перед каждым мостиком ===
const bridges = [
  '## Мостик. От пропорции к зависимостям',
  '## Мостик. От зависимостей к масштабу',
  '## Мостик. От масштаба к процентам',
  '## Мостик. От базовых формул к жизненным задачам',
  '## Мостик. От простых процентов к сложным',
  '## Мостик. От сложных процентов к архиву формул'
];
for (const b of bridges) md = beforeFirst(md, b, ['stop.png', 'mostik.png']);

// === Скрипты самопроверки: СЫГРАЕМ В ИГРУ + КАК ДУМАТЬ ===
const scripts = [
  '### Слайд 7.1. Скрипт самопроверки Блока 2',
  '### Слайд 9.1. Скрипт самопроверки Блока 3',
  '### Слайд 15.1. Скрипт самопроверки Блока 5',
  '### Слайд 17.1. Скрипт самопроверки Блока 6'
];
for (const s of scripts) md = beforeFirst(md, s, ['syhraem-v-igru.png', 'kak-dumat.png']);

// === Точечные стикеры по слайдам ===
const singles = [
  ['### Слайд 3. Пропорция: равенство двух отношений', ['balans.png']],
  ['### Слайд 11.1. Закон перевёртыша', ['perevyortysh.png', 'zapomni.png']],
  ['### Слайд 14. Простой процент: фиксированная дань', ['schitay.png', 'zapomni.png']],
  ['### Слайд 17. Задача на сложный процент', ['primer.png', 'klan-v-dele.png']],
  ['### Слайд 23. Зачем тебе всё это', ['ty-smozhesh.png', 'riskni-1.png']],
  ['### Слайд 24. Задача на сложную скидку в два этапа', ['riskni-2.png', 'tebe-hana.png']]
];
for (const [anchor, stickers] of singles) md = beforeFirst(md, anchor, stickers);

// === Ловушки (24.1-24.9): ИЛИ ТЕБЕ ХАНА! + ВРЕМЯ ВЫШЛО для самых сложных ===
const traps = [
  ['### Слайд 24.1. Задача на процент от процента', ['tebe-hana.png']],
  ['### Слайд 24.2. Задача на смешивание растворов', ['tebe-hana.png']],
  ['### Слайд 24.3. Задача на масштаб карты', ['tebe-hana.png']],
  ['### Слайд 24.4. Задача на прямую и обратную зависимость', ['tebe-hana.png']],
  ['### Слайд 24.5. Задача на процент изменения', ['tebe-hana.png']],
  ['### Слайд 24.6. Задача на сложный процент', ['tebe-hana.png', 'zapomni.png']],
  ['### Слайд 24.7. Пропорциональность через прямоугольники', ['tebe-hana.png', 'vremya-vyshlo.png']],
  ['### Слайд 24.8. Переливание жидкости', ['tebe-hana.png', 'vremya-vyshlo.png']],
  ['### Слайд 24.9. Квартиры в двух домах', ['tebe-hana.png', 'vremya-vyshlo.png']]
];
for (const [anchor, stickers] of traps) md = beforeFirst(md, anchor, stickers);

// === Финал: ИГРА ОКОНЧЕНА + НЕ РАЗОЧАРОВЫВАЙ ===
md = beforeFirst(md, '### Слайд 24.10. Финал партии', ['igra-okonchena.png', 'ne-razocharovyvay.png']);

// === Шпаргалки 18-22: ЗАПОМНИ на каждую ===
const shpargalki = [
  '### Слайд 18. Шпаргалка пропорции',
  '### Слайд 19. Шпаргалка зависимостей',
  '### Слайд 20. Шпаргалка процентов',
  '### Слайд 21. Шпаргалка масштаба',
  '### Слайд 22. Шпаргалка сложных процентов'
];
for (const s of shpargalki) md = beforeFirst(md, s, ['zapomni.png']);

fs.writeFileSync(MD_PATH, md, 'utf8');

// Считаем, сколько маркеров вставлено
const matches = md.match(/<!--STICKER:[^>]+-->/g) || [];
console.log('Маркеров стикеров вставлено: ' + matches.length);
console.log('Уникальных файлов: ' + new Set(matches.map(m => m.match(/<!--STICKER:([^>]+)-->/)[1])).size);
