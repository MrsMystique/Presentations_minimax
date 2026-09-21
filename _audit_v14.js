// Аудит v14 по 8 принципам Olga
const fs = require('fs');
const md = fs.readFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v14 — Разряды и дроби.md', 'utf8');

function count(re) { return (md.match(re) || []).length; }
function findAll(re, max = 30) {
  const out = []; let m;
  while ((m = re.exec(md)) !== null && out.length < max) {
    out.push(m);
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  return out;
}

console.log('=========================================');
console.log('ПРИНЦИП 1: Константная структура');
console.log('=========================================');
console.log('Поиск глаголов действия: "представь", "разрежь", "перенеси", "возьми"');
const actions = ['представь', 'разрежь', 'перенеси', 'возьми', 'переверни', 'поставь'];
actions.forEach(a => {
  const ms = findAll(new RegExp('\\b' + a + '\\b', 'gi'), 5);
  if (ms.length > 0) {
    console.log('  "' + a + '": ' + ms.length);
    ms.slice(0, 3).forEach(m => {
      const ls = md.lastIndexOf('\n', m.index) + 1;
      const le = md.indexOf('\n', m.index);
      console.log('    ' + md.substring(ls, le > 0 ? le : md.length).substring(0, 150));
    });
  }
});

console.log('\n=========================================');
console.log('ПРИНЦИП 2: Относительный масштаб');
console.log('=========================================');
console.log('Поиск смены масштаба: час/мин, метр/дм, рубль/копейка');
const scales = ['минут', 'секунд', 'дециметр', 'сантиметр', 'миллиметр', 'руб', 'копе', 'килограмм', 'грамм', 'тонн'];
scales.forEach(s => {
  console.log('  "' + s + '": ' + count(new RegExp(s, 'g')));
});

console.log('\n=========================================');
console.log('ПРИНЦИП 5: Пространственное заземление');
console.log('=========================================');
console.log('Запрещённые метафоры: этаж, лифт, мост, пирог, пицца, паспорт, торт, сказка, путешеств, арбуз');
const forb = ['этаж', 'лифт', 'мост', 'пирог', 'пицца', 'паспорт', 'торт', 'сказк', 'путешеств', 'арбуз', 'пицц', 'мостик'];
forb.forEach(w => {
  const c = count(new RegExp('\\b' + w, 'gi'));
  console.log('  "' + w + '": ' + c);
});

console.log('\n=========================================');
console.log('ПРИНЦИП 7: Микро-примеры в формулах');
console.log('=========================================');
console.log('Сводка: пункты без "например"');
const svStart = md.indexOf('## Сводка законов');
const svEnd = md.indexOf('---', svStart + 100);
const sv = md.substring(svStart, svEnd);
const svLines = sv.split('\n');
let noExample = 0;
let total = 0;
for (const line of svLines) {
  if (/^\|\s*\d+\s*\|/.test(line)) {
    total++;
    if (!line.includes('например') && !line.includes('напр.')) {
      noExample++;
      if (noExample <= 10) console.log('  Без примера: ' + line.substring(0, 140));
    }
  }
}
console.log('  Всего пунктов: ' + total + ', без примера: ' + noExample);

console.log('\n=========================================');
console.log('ПРИНЦИП 8: Динамическая точка отсчёта (мульти-масштаб)');
console.log('=========================================');
console.log('Слайды с явной сменой масштаба:');
const scaleSlides = findAll(/1 час = 60|1 метр = 10|0[,.]375|0[,.]50\b/g, 10);
console.log('  Найдено: ' + scaleSlides.length);
