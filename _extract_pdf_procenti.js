// Извлекает PDF через PowerShell с iTextSharp или через строковый поиск
const fs = require('fs');
const { execSync } = require('child_process');

const pdfPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\ch2.pdf';

try {
  // Способ 1: попробуем через Adobe Reader COM
  let text = '';
  try {
    text = execSync('powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileStream; $reader = [System.IO.StreamReader]::new([System.IO.Compression.GZipStream]::new([System.IO.File]::OpenRead(\'' + pdfPath + '\'), [System.IO.Compression.CompressionMode]::Decompress)); $reader.ReadToEnd()" 2>&1', { encoding: 'utf8', timeout: 30000 });
    console.log('GZip text len:', text.length);
  } catch (e) {
    console.log('GZip failed:', e.message.substring(0, 100));
  }

  // Способ 2: текстовые блоки в PDF
  const buf = fs.readFileSync(pdfPath);
  const str = buf.toString('latin1');
  // Ищем текстовые блоки (Tj операторы)
  const textMatches = str.match(/\(([^)\\]+|\\\))*?\)\s*Tj/g) || [];
  console.log('Tj blocks found:', textMatches.length);
  // Извлекаем текст из блоков
  const extracted = [];
  for (const m of textMatches.slice(0, 500)) {
    let txt = m.match(/^\((.*?)\)/);
    if (txt) {
      txt = txt[1].replace(/\\(\d{3})/g, (_, c) => String.fromCharCode(parseInt(c, 8)))
                  .replace(/\\n/g, '\n')
                  .replace(/\\r/g, '\r')
                  .replace(/\\t/g, '\t')
                  .replace(/\\\(/g, '(')
                  .replace(/\\\)/g, ')')
                  .replace(/\\\\/g, '\\');
      if (txt.trim()) extracted.push(txt);
    }
  }
  console.log('Извлечено текстовых фрагментов:', extracted.length);
  fs.writeFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_pdf_procenti.txt', extracted.join('\n'), 'utf8');

  // Покажем первые 50 фрагментов
  console.log('\nПервые 50 фрагментов:');
  extracted.slice(0, 50).forEach((t, i) => console.log((i+1) + ': ' + t.substring(0, 100)));
} catch (e) {
  console.error('Ошибка:', e.message);
}