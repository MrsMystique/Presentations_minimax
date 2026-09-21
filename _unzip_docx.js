// Извлекает document.xml из DOCX через Expand-Archive
const fs = require('fs');
const { execSync } = require('child_process');

const docxPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\СЛАЙДы урок 1 множества, нок нод.docx';
const outXml = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_docx_xml.xml';
const tmpZip = 'C:\\Users\\admin\\AppData\\Local\\Temp\\docx.zip';
const tmpDir = 'C:\\Users\\admin\\AppData\\Local\\Temp\\docx_unzipped_' + Date.now();

try {
  // Copy DOCX as zip
  fs.copyFileSync(docxPath, tmpZip);
  console.log('Скопирован как zip');
  // Use Expand-Archive which is simpler
  execSync('powershell -NoProfile -Command "Expand-Archive -Path \'' + tmpZip + '\' -DestinationPath \'' + tmpDir + '\' -Force"');
  const xml = fs.readFileSync(tmpDir + '\\word\\document.xml', 'utf8');
  fs.writeFileSync(outXml, xml, 'utf8');
  console.log('Извлечено: ' + (fs.statSync(outXml).size/1024).toFixed(1) + ' КБ');
} catch (e) {
  console.error('Ошибка:', e.message);
}