// Все правки Olga + Совет v3.3 — одним проходом через replace (НЕ через indexOf+substring)
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

let a = 0;

// === Шаг 1: Заменить Слайд 10 картинку cto-takoe-procent.png → maska-procenta.png ===
const oldImg10 = '![Что такое процент: сотая часть целого, банка и дробь 15/100](assets/cto-takoe-procent.png)';
const newImg10 = '![МАСКА ПРОЦЕНТА — один и тот же кусок пиццы = 1/8 = 12,5%: процент это сотая часть, поэтому 1 из 8 кусков пиццы = 1/8 = 12,5%](assets/maska-procenta.png)';
if (c.indexOf(oldImg10) >= 0) {
  c = c.replace(oldImg10, newImg10);
  a++;
  console.log('✓ Слайд 10: cto-takoe-procent → maska-procenta');
}

// === Шаг 2: Добавить картинку balans-proportsiya.png на Слайд 3 ===
const oldS3 = '### Слайд 3. Пропорция: равенство двух отношений\n\n**Почему это важно?**';
const newS3 = '### Слайд 3. Пропорция: равенство двух отношений\n\n![Закон абсолютного баланса: a/b = c/d — произведения наискосок равны (a·d = b·c). Два прямоугольника: 2/3 = 4/6](assets/balans-proportsiya.png)\n\n**Почему это важно?**';
if (c.indexOf(oldS3) >= 0) {
  c = c.replace(oldS3, newS3);
  a++;
  console.log('✓ Слайд 3: добавлен balans-proportsiya');
}

// === Шаг 3: Заменить stavki-sravnenie.png → vsplysk-protsent.png на Слайде 17 ===
const oldS17 = '![Сравнение ставок: капитализация — простой процент (прямая 50000 → 62000) vs сложный процент (кривая 50000 → 62985) за 5 лет, разница 985 руб](assets/stavki-sravnenie.png)';
const newS17 = '![Закон роста всплеска: 50000 руб под 8% на 3 года — сложный процент (кривая) = 62985,6 vs простой процент (прямая) = 62000, разница +985,6 руб](assets/vsplysk-protsent.png)';
if (c.indexOf(oldS17) >= 0) {
  c = c.replace(oldS17, newS17);
  a++;
  console.log('✓ Слайд 17: stavki-sravnenie → vsplysk-protsent');
}

// === Шаг 4: Добавить shpory-mozhno.png на Слайде 23 ===
const oldS23 = '### Слайд 23. Зачем тебе всё это: мотивация перед экзаменом\n\nПроценты,';
const newS23 = '### Слайд 23. Зачем тебе всё это: мотивация перед экзаменом\n\n![Можно, это шпора! Хитрый граф подглядывает — но легенда разрешает использовать шпаргалки как инструмент](assets/shpory-mozhno.png)\n\nПроценты,';
if (c.indexOf(oldS23) >= 0) {
  c = c.replace(oldS23, newS23);
  a++;
  console.log('✓ Слайд 23: добавлен shpory-mozhno');
}

// === Шаг 5: Добавить финальный слайд 24.10 + TOC ===
const finaleBlock = `\n---\n\n### Слайд 24.10. Финал партии: «Теперь ты слишком много знаешь»\n\n![Финальный слайд партии №3: Subject G-07 в темноте — «Теперь ты слишком много знаешь. Тебя придётся убрать...»](assets/finalnyy-slayd.png)\n\n> **Граф-помощник:** «Опять этот пафос...»\n>\n> **Что это значит для тебя:** ты прошёл всю партию. Пропорция, зависимости, масштаб, проценты всех типов, сложный процент и десять ловушек. Теперь задачи на проценты — твоя территория.\n>\n> **Что дальше:** в следующей партии мы построим на этом фундаменте задачи на движение, работу и смеси — там без пропорции никуда.\n>\n> Если готов — двигаемся. Если хочешь вернуться и прокачать что-то конкретное — Блок 8 (Слайды 24-24.9) всегда открыт.\n`;
const lastSlideMarker = '### Слайд 24.9. Квартиры в двух домах';
const lastSlidePos = c.indexOf(lastSlideMarker);
const finaleEnd = c.length;
if (lastSlidePos >= 0 && c.indexOf('### Слайд 24.10.') < 0) {
  // Найдём конец блока ловушек — после последнего абзаца про 24.9
  // Просто вставим перед концом файла
  c = c.substring(0, finaleEnd) + finaleBlock;
  a++;
  console.log('✓ Слайд 24.10: добавлен финал');
}

// === Шаг 6: Исправить формулу Слайда 18 ===
const oldFormula = '\\[ \\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c \\]';
const newFormula = '\\[ \\frac{a}{b} = \\frac{c}{d} \\quad \\Longleftrightarrow \\quad a \\cdot d = b \\cdot c \\]';
if (c.indexOf(oldFormula) >= 0) {
  c = c.replace(oldFormula, newFormula);
  a++;
  console.log('✓ Слайд 18: \\iff → \\Leftrightarrow');
}

// === Шаг 7: Обновить TOC — добавить 24.10 + «40 слайдов» ===
const tocOld = 'Эта партия состоит из 39 слайдов в 8 блоках + 6 мостиков.';
const tocNew = 'Эта партия состоит из 40 слайдов в 8 блоках + 6 мостиков.';
if (c.indexOf(tocOld) >= 0) {
  c = c.replace(tocOld, tocNew);
  a++;
  console.log('✓ Содержание: 39 → 40');
}

const tocItemOld = '- Слайд 24.9: Квартиры Альфа/Омега';
const tocItemNew = '- Слайд 24.9: Квартиры Альфа/Омега\n- Слайд 24.10: Финал партии';
if (c.indexOf(tocItemOld) >= 0 && c.indexOf(tocItemNew) < 0) {
  c = c.replace(tocItemOld, tocItemNew);
  a++;
  console.log('✓ TOC: добавлен Слайд 24.10');
}

// === Шаг 8: Обновить первую строку v3.2 → v3.3 ===
if (c.indexOf('# Чистовые слайды v3.2 — Проценты, пропорции, масштаб') >= 0) {
  c = c.replace('# Чистовые слайды v3.2 — Проценты, пропорции, масштаб', '# Чистовые слайды v3.3 — Проценты, пропорции, масштаб');
  a++;
  console.log('✓ Заголовок v3.2 → v3.3');
}

console.log('\nApplied: ' + a);
fs.writeFileSync(p, c, 'utf8');
console.log('Now: ' + c.match(/^### Слайд [^\n]*$/gm).length + ' slides');
