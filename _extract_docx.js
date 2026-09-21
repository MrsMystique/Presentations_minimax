// Извлекает текст из DOCX в читаемом виде
const fs = require('fs');
const { execSync } = require('child_process');

const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_docx_xml.xml';
const xml = fs.readFileSync(path, 'utf8');

// Парсим параграфы <w:p>
const paragraphs = [...xml.matchAll(/<w:p[^>]*>([\s\S]*?)<\/w:p>/g)];
const out = [];
for (const p of paragraphs) {
  // Извлекаем текст из <w:t>
  const texts = [...p[1].matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
  const text = texts.map(m => m[1]).join('');
  if (text.trim()) out.push(text);
}
fs.writeFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_draft_sets_nok_nod.txt', out.join('\n'), 'utf8');
console.log('Извлечено параграфов: ' + out.length);
console.log('Первые 30 параграфов:');
out.slice(0, 30).forEach((p, i) => console.log((i+1) + ': ' + p));
