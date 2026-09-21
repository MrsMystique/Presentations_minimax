// Debug — найти почему fix2 не сработал
const fs = require('fs');

const filePath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3 — Проценты, пропорции, масштаб.md';
const c = fs.readFileSync(filePath, 'utf8');

// Проверю точное содержимое строки 582
const lines = c.split('\n');
console.log('Line 582 length:', lines[581].length);
console.log('Line 582 content:');
console.log(JSON.stringify(lines[581]));

// Что я ищу
const oldF2 = '| Целое по части | \\(A = \\frac{B \\cdot 100}{p}\\)<br><br>Подставляем \\(B = 30, p = 15\\):<br>\\(A = \\frac{30 \\cdot 100}{15} = 200\\) | 30 это \\(15\\%\\) \\(\\to A = 200\\) |';
console.log('\nSearching for:');
console.log(JSON.stringify(oldF2));
console.log('Found at:', c.indexOf(oldF2));