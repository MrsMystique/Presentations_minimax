const fs = require('fs');
const c = fs.readFileSync('Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md', 'utf8');

// Аудит: какие картинки используются
const images = ['vsplysk-protsent', 'finalnyy-slayd', 'balans-proportsiya', 'shpory-mozhno', 'titulnik-procenty', 'stavki-sravnenie'];
console.log('=== Использование картинок ===');
images.forEach(img => {
  const count = (c.match(new RegExp(img, 'g')) || []).length;
  console.log('  ' + img + ': ' + count);
});

// Список слайдов
const m = c.match(/^### Слайд [^\n]*$/gm);
console.log('\n=== Слайдов: ' + (m ? m.length : 0) + ' ===');
if (m) {
  const conflicts = {};
  m.forEach(x => {
    const num = x.match(/### Слайд ([0-9.]+)/)[1];
    conflicts[num] = (conflicts[num] || 0) + 1;
  });
  Object.keys(conflicts).forEach(k => {
    if (conflicts[k] > 1) console.log('  CONFLICT: Слайд ' + k + ' x' + conflicts[k]);
  });
}

// Проверим остаток emoji
const emojiRe = /[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]/gu;
const remaining = c.match(emojiRe);
console.log('\n=== Дешёвые эмодзи: ' + (remaining ? remaining.length : 0) + ' ===');
if (remaining) {
  const counts = {};
  remaining.forEach(e => counts[e] = (counts[e] || 0) + 1);
  Object.keys(counts).forEach(k => console.log('  ' + k + ' x' + counts[k]));
}

// Проверим ловушку соль/вода
const saltIdx = c.indexOf('процент соли');
console.log('\n=== Ловушка соль/вода ===');
if (saltIdx >= 0) {
  console.log('  ✓ Найдена на позиции ' + saltIdx);
  console.log('  Контекст: ' + c.substring(saltIdx, saltIdx + 200));
} else {
  console.log('  ✗ Не найдена');
}

// Проверим Слайд 24.10
const finaleIdx = c.indexOf('### Слайд 24.10');
console.log('\n=== Финальный слайд ===');
if (finaleIdx >= 0) {
  console.log('  ✓ Слайд 24.10 найден на позиции ' + finaleIdx);
  console.log('  Начало: ' + c.substring(finaleIdx, finaleIdx + 200));
} else {
  console.log('  ✗ Не найден');
}
