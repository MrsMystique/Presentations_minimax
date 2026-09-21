// Исправляет \\n → \n в JS-исходнике, чтобы реальные переводы строк работали
const fs = require('fs');
const path = '_write_procenti_v1_part1.js';
let c = fs.readFileSync(path, 'utf8');
// В JS-исходнике сейчас: \\n (что в строке = \n)
// Нам нужно: \n в JS-исходнике (что в строке = перевод строки)
// Заменяем \\n на \n
const before = (c.match(/\\n/g) || []).length;
c = c.replace(/\\\\n/g, '\\n');
const after = (c.match(/\\n/g) || []).length;
console.log('Было \\n вхождений:', before);
console.log('Стало \\n вхождений:', after);
fs.writeFileSync(path, c, 'utf8');