// Замена картинки на Слайде 10: cto-takoe-procent.png → maska-procenta.png
const fs = require('fs');
const p = 'Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let c = fs.readFileSync(p, 'utf8');

// Заменить картинку
const oldImg = '![Что такое процент: сотая часть целого, банка и дробь 15/100](assets/cto-takoe-procent.png)';
const newImg = '![МАСКА ПРОЦЕНТА — один и тот же кусок пиццы = 1/8 = 12,5%: процент это сотая часть, поэтому 1 из 8 кусков пиццы = 1/8 = 12,5%](assets/maska-procenta.png)';

if (c.indexOf(oldImg) >= 0) {
  c = c.replace(oldImg, newImg);
  console.log('✓ Слайд 10: cto-takoe-procent.png → maska-procenta.png');
} else {
  console.log('  NOT FOUND old image');
}

// Также удалим старую картинку cto-takoe-procent.png (она больше не нужна)
try {
  fs.unlinkSync('assets/cto-takoe-procent.png');
  console.log('✓ Удалён cto-takoe-procent.png (больше не нужен)');
} catch (e) {
  console.log('  (уже удалён)');
}

fs.writeFileSync(p, c, 'utf8');
console.log('=== DONE ===');
