// Пробуем извлечь текст из PDF
const fs = require('fs');
const { execSync } = require('child_process');

const pdfPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\задачи рикс.pdf';
try {
  const text = execSync('powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $pdf = New-Object System.Drawing.Bitmap(([System.Windows.Forms.OpenFileDialog]::new())); $reader = New-Object iTextSharp.text.pdf.PdfReader(\'' + pdfPath + '\')" 2>&1', { encoding: 'utf8' });
  console.log('PS output:', text);
} catch (e) {
  console.error('PS error:', e.message);
}
// Альтернатива — попробуем через читаемый текст
try {
  // Прочитаем PDF как бинарный и поищем текстовые фрагменты
  const buf = fs.readFileSync(pdfPath);
  const str = buf.toString('latin1');
  // Ищем текстовые блоки
  const textMatches = str.match(/\(([^)]{10,200})\)/g) || [];
  console.log('Найдено текстовых блоков:', textMatches.length);
  textMatches.slice(0, 30).forEach(m => console.log(m.substring(0, 150)));
} catch (e) {
  console.error('bin error:', e.message);
}