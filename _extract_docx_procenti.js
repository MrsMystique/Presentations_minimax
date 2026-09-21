// Извлекает DOCX процентов
const fs = require('fs');
const { execSync } = require('child_process');

const docxPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\слайды проценты масштабы пропорции.docx';
const tmpZip = 'C:\\Users\\admin\\AppData\\Local\\Temp\\procenti.zip';
const tmpDir = 'C:\\Users\\admin\\AppData\\Local\\Temp\\procenti_' + Date.now();

try {
  fs.copyFileSync(docxPath, tmpZip);
  execSync('powershell -NoProfile -Command "Expand-Archive -Path \'' + tmpZip + '\' -DestinationPath \'' + tmpDir + '\' -Force"');
  const xml = fs.readFileSync(tmpDir + '\\word\\document.xml', 'utf8');
  fs.writeFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_docx_procenti.xml', xml, 'utf8');
  const paragraphs = [...xml.matchAll(/<w:p[^>]*>([\s\S]*?)<\/w:p>/g)];
  const out = [];
  for (const p of paragraphs) {
    const texts = [...p[1].matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)];
    const text = texts.map(m => m[1]).join('');
    if (text.trim()) out.push(text);
  }
  fs.writeFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_draft_procenti.txt', out.join('\n'), 'utf8');
  console.log('Извлечено параграфов:', out.length);
} catch (e) {
  console.error('Ошибка:', e.message);
}