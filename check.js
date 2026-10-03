const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\ready\\Квадратный_трехчлен_Полный_гайд.md';
const text = fs.readFileSync(path, 'utf8');

const lines = text.split('\n');

const forbidden = '☐☑✓✗✘┌┐└┘├┤┬┴┼─│╔╗╚╝═║╠╣╦╩╬▪▫▬▲▼◀▶◆◇○●';
const found = new Map();
for (let i = 0; i < text.length; i++) {
  if (forbidden.includes(text[i])) {
    const idx = text.substring(0, i).split('\n').length;
    if (!found.has(text[i])) found.set(text[i], []);
    found.get(text[i]).push(idx);
  }
}
console.log('=== Forbidden box chars ===');
if (found.size === 0) console.log('NONE');
else for (const [ch, lines] of found) console.log(`  ${ch}: lines ${lines.join(', ')}`);

const emojis = new Set();
const emojiLines = new Set();
for (let i = 0; i < text.length; i++) {
  const cp = text.codePointAt(i);
  if (cp >= 0x1F000) {
    emojis.add(String.fromCodePoint(cp));
    const ln = text.substring(0, i).split('\n').length;
    emojiLines.add(ln);
  }
}
console.log('\n=== Emoji-like chars (cp >= 0x1F000) ===');
if (emojis.size === 0) console.log('NONE');
else console.log(Array.from(emojis).join(' ') + ' at lines ' + Array.from(emojiLines).sort((a,b)=>a-b).join(', '));

const latin = new Set();
for (let i = 0; i < text.length; i++) {
  const cp = text.codePointAt(i);
  if ((cp >= 0x41 && cp <= 0x5A) || (cp >= 0x61 && cp <= 0x7A)) {
    latin.add(text[i]);
  }
}
console.log('\n=== Latin letters ===');
console.log(Array.from(latin).sort().join(''));

console.log('\n=== Total ===');
console.log('Lines:', lines.length);
console.log('Chars:', text.length);

// Check for keywords
const keywordPatterns = [
  'ЦТ', 'ЕГЭ', 'ОГЭ', 'вступительный', '16 лет', '17 лет', '18 лет',
  'партия', 'Макарычев', 'Мордкович', 'Колмогоров', 'Атанасян',
  'магазин', 'бабушка', 'кухня', 'автобус', 'троллейбус', 'метро', 'кинотеатр',
  'Mark says', 'Brooklyn Studio'
];
console.log('\n=== Forbidden keywords ===');
for (const k of keywordPatterns) {
  const idxs = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(k)) idxs.push(i + 1);
  }
  console.log(`  "${k}": ${idxs.length === 0 ? 'NONE' : 'lines ' + idxs.join(', ')}`);
}