// Правки Olga v3.3 → v3.4: формула в Слайде 18 + палитра скетчбука + стикеры
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

// === 1. Исправить формулу в Слайде 18: \iff → \Leftrightarrow ===
const oldFormula = '\\[ \\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c \\]';
const newFormula = '\\[ \\frac{a}{b} = \\frac{c}{d} \\quad \\Longleftrightarrow \\quad a \\cdot d = b \\cdot c \\]';
if (c.indexOf(oldFormula) >= 0) {
  c = c.replace(oldFormula, newFormula);
  console.log('✓ Слайд 18: \\iff → \\Leftrightarrow (формула не поплывёт)');
}

// === 2. Проверить Слайд 11: формулы процентов ===
// Там могут быть аналогичные проблемы — посмотрим.

// === 3. Вставить мотивационные стикеры на ключевые слайды ===
// Olga: "слайды для мотивации" → Слайд 23 (Мотивация перед экзаменом)
const motivOld = `### Слайд 23. Зачем тебе всё это: мотивация перед экзаменом

![Можно, это шпора! Хитрый граф подглядывает — но легенда разрешает использовать шпаргалки как инструмент](assets/shpory-mozhno.png)

Проценты,`;
const motivNew = `### Слайд 23. Зачем тебе всё это: мотивация перед экзаменом

![Можно, это шпора! Хитрый граф подглядывает — но легенда разрешает использовать шпаргалки как инструмент](assets/shpory-mozhno.png)

![Ты сможешь! — мотивационный стикер](assets/sticker-riskni.png)

Проценты,`;
if (c.indexOf(motivOld) >= 0) {
  c = c.replace(motivOld, motivNew);
  console.log('✓ Слайд 23: добавлен мотивационный стикер «Ты сможешь!»');
}

// === 4. Добавить стикер «Как думать» на скрипты самопроверки ===
// Скрипты: 7.1, 9.1, 15.1, 17.1
// Olga: "используй стикеры для важных мест"
const scriptOld = `### Слайд 17.1. Скрипт самопроверки Блока 6`;
const scriptNew = `### Слайд 17.1. Скрипт самопроверки Блока 6

![Стикер «Как думать»](assets/sticker-kak-dumat.png)`;
if (c.indexOf(scriptOld) >= 0 && c.indexOf(scriptNew) < 0) {
  c = c.replace(scriptOld, scriptNew);
  console.log('✓ Слайд 17.1: добавлен стикер «Как думать»');
}

// Аналогично для других скриптов
const scriptFixes = [
  ['### Слайд 7.1. Скрипт самопроверки Блока 2',
   '### Слайд 7.1. Скрипт самопроверки Блока 2\n\n![Стикер «Как думать»](assets/sticker-kak-dumat.png)'],
  ['### Слайд 9.1. Скрипт самопроверки Блока 3',
   '### Слайд 9.1. Скрипт самопроверки Блока 3\n\n![Стикер «Как думать»](assets/sticker-kak-dumat.png)'],
  ['### Слайд 15.1. Скрипт самопроверки Блока 5',
   '### Слайд 15.1. Скрипт самопроверки Блока 5\n\n![Стикер «Как думать»](assets/sticker-kak-dumat.png)'],
];
for (const [from, to] of scriptFixes) {
  if (c.indexOf(from) >= 0 && c.indexOf(to) < 0) {
    c = c.replace(from, to);
    console.log('✓ ' + from);
  }
}

// === 5. Добавить стикер «Считай» на расчётные слайды (Слайд 14 — простой процент, Слайд 17 — задача) ===
const countFixes = [
  ['### Слайд 14. Простой процент: фиксированная дань',
   '### Слайд 14. Простой процент: фиксированная дань\n\n![Стикер «Считай»](assets/sticker-schitay.png)'],
];
for (const [from, to] of countFixes) {
  if (c.indexOf(from) >= 0 && c.indexOf(to) < 0) {
    c = c.replace(from, to);
    console.log('✓ ' + from);
  }
}

// === 6. Добавить стикер «Баланс» на Слайд 3 (Пропорция — закон баланса) ===
const balansOld = `### Слайд 3. Пропорция: равенство двух отношений

![Закон абсолютного баланса:`;
const balansNew = `### Слайд 3. Пропорция: равенство двух отношений

![Стикер «Баланс»](assets/sticker-schitay.png)

![Закон абсолютного баланса:`;
if (c.indexOf(balansOld) >= 0 && c.indexOf(balansNew) < 0) {
  c = c.replace(balansOld, balansNew);
  console.log('✓ Слайд 3: добавлен стикер «Баланс»');
}

fs.writeFileSync(p, c, 'utf8');
console.log('\n=== DONE ===');
