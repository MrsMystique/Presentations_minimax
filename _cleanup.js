// Чистка: удаляем "---" и плашечные STICKER-маркеры (оставляем только INLINE)
const fs = require('fs');
const mdPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(mdPath, 'utf8');

const removed = { dashes: 0, stickers: 0 };

// 1) Удаляем горизонтальные разделители "---" на отдельных строках
md = md.replace(/^---\s*$/gm, () => { removed.dashes++; return ''; });

// 2) Удаляем STICKER-маркеры (плашечные, которые парсер сейчас рендерит inline-float в начале body)
//    Исключение: оставляем STICKER на мостиках и Слайде 24.10 (там они семантически нужны)
const keepSections = [
  /## Мостик\./,
  /### Слайд 24\.10\./
];

const lines = md.split(/\r?\n/);
const out = [];
let skipStick = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const next = lines[i+1] || '';
  // Определяем, находимся ли мы в защищённой секции
  const inKeep = keepSections.some(re => re.test(line) || re.test(next));
  if (line.trim().match(/^<!--STICKER:/) && !inKeep) {
    removed.stickers++;
    continue;
  }
  out.push(line);
}
md = out.join('\n');

// 3) Подчищаем лишние пустые строки (3+ подряд → 2)
md = md.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(mdPath, md, 'utf8');
console.log('Удалено "---":', removed.dashes);
console.log('Удалено STICKER-маркеров (плашечных):', removed.stickers);
console.log('Уникальных INLINE-маркеров осталось:', (md.match(/<!--INLINE:[^>]+-->/g) || []).length);
console.log('STICKER-маркеров осталось (мостики + 24.10):', (md.match(/<!--STICKER:[^>]+-->/g) || []).length);
