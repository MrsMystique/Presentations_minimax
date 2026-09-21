// Откатить вставки sticker-kak-dumat и sticker-schitay (это были стикерпаки, не отдельные стикеры)
// Оставить только sticker-riskni (там 5 мотивационных стикеров и весь лист уместен на Слайде 23)
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

// Удалить вставки sticker-kak-dumat (это был целый лист из 4 стикеров)
const howThinkPatterns = [
  /\n+!\[Стикер «Как думать»\]\(assets\/sticker-kak-dumat\.png\)/g,
];
for (const reg of howThinkPatterns) {
  const before = c;
  c = c.replace(reg, '');
  const count = (before.match(reg) || []).length;
  if (count > 0) console.log('✓ Removed ' + count + ' «Как думать» sticker images');
}

// Удалить вставки sticker-schitay на Слайдах 3 и 14
const schitayPatterns = [
  /\n+!\[Стикер «Баланс»\]\(assets\/sticker-schitay\.png\)/g,
  /\n+!\[Стикер «Считай»\]\(assets\/sticker-schitay\.png\)/g,
];
for (const reg of schitayPatterns) {
  const before = c;
  c = c.replace(reg, '');
  const count = (before.match(reg) || []).length;
  if (count > 0) console.log('✓ Removed ' + count + ' schitay sticker images');
}

// Также удалим sticker-riskni на Слайде 23 (тоже стикерпак из 5 штук, нужно отдельно)
const riskniPattern = /\n+!\[Ты сможешь! — мотивационный стикер\]\(assets\/sticker-riskni\.png\)/g;
c = c.replace(riskniPattern, '');
console.log('✓ Removed riskni sticker image (will be added when cut versions arrive)');

// Удалим теперь ненужные файлы стикерпаков
try { fs.unlinkSync('assets/sticker-kak-dumat.png'); console.log('✓ Deleted sticker-kak-dumat.png'); } catch (e) {}
try { fs.unlinkSync('assets/sticker-schitay.png'); console.log('✓ Deleted sticker-schitay.png'); } catch (e) {}
try { fs.unlinkSync('assets/sticker-riskni.png'); console.log('✓ Deleted sticker-riskni.png'); } catch (e) {}

fs.writeFileSync(p, c, 'utf8');

// Проверка
console.log('\n=== Final state ===');
console.log('sticker references in md:', (c.match(/sticker-/g) || []).length);
