const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\ready\\Квадратный_трехчлен_Полный_гайд.md';
const text = fs.readFileSync(path, 'utf8');
const lines = text.split('\n');

// Search for 'лет' specifically
for (let i = 0; i < lines.length; i++) {
  const idx = lines[i].indexOf('лет');
  if (idx !== -1) {
    console.log('Line ' + (i+1) + ': pos ' + idx + ' context: ...' + lines[i].substring(Math.max(0,idx-15), Math.min(lines[i].length, idx+15)) + '...');
  }
}
console.log('--- Age patterns ---');
const ageRegex = /(1[678]\s*(лет|год))/gi;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(ageRegex);
  if (m) console.log('Age in line ' + (i+1) + ':', m);
}

console.log('--- подросток / школьник / ученик / студент ---');
const ageWords = ['подросток', 'школьник', 'ученик', 'студент', 'взрослый'];
for (const w of ageWords) {
  const idxs = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(w)) idxs.push(i + 1);
  }
  if (idxs.length > 0) console.log(`  "${w}": ${idxs.length} occurrences at lines ${idxs.slice(0, 10).join(', ')}${idxs.length > 10 ? '...' : ''}`);
  else console.log(`  "${w}": NONE`);
}

console.log('--- "школьн" or "школь" ---');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].toLowerCase().includes('школь')) {
    console.log(`Line ${i+1}: ${lines[i].substring(0, 100)}`);
  }
}