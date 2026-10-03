const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\ready\\Квадратный_трехчлен_Полный_гайд.md';
const text = fs.readFileSync(path, 'utf8');
const lines = text.split('\n');

// Find every 'лет' substring
let totalLet = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let idx = 0;
  while ((idx = line.indexOf('лет', idx)) !== -1) {
    console.log('Line ' + (i+1) + ' pos ' + idx + ': ...' + line.substring(Math.max(0,idx-5), Math.min(line.length, idx+5)) + '...');
    totalLet++;
    idx++;
  }
}
console.log('Total лёт matches:', totalLet);

// Print full line 917 with character positions
console.log('\nFull line 917:');
console.log(JSON.stringify(lines[916]));
console.log('Length:', lines[916].length);

// Print chars 280-300 of line 917 with codes
for (let i = 280; i < Math.min(300, lines[916].length); i++) {
  console.log(i + ': ' + JSON.stringify(lines[916][i]) + ' = U+' + lines[916].codePointAt(i).toString(16));
}