const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб — reader.html', 'utf8');

const targets = ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6', 'slide-7', 'slide-7.1',
                 'slide-8', 'slide-9', 'slide-9.1', 'slide-10', 'slide-11', 'slide-11.1',
                 'slide-12', 'slide-13', 'slide-14', 'slide-15', 'slide-15.1', 'slide-15.2',
                 'slide-16', 'slide-17', 'slide-17.1', 'slide-18', 'slide-19', 'slide-20',
                 'slide-21', 'slide-22', 'slide-23', 'slide-24'];
const targets2 = ['slide-24.1', 'slide-24.2', 'slide-24.3', 'slide-24.4', 'slide-24.5',
                  'slide-24.6', 'slide-24.7', 'slide-24.8', 'slide-24.9', 'slide-24.10'];

const all = targets.concat(targets2);
for (const t of all) {
  const idx = html.indexOf('id="' + t + '"');
  if (idx < 0) continue;
  const end = html.indexOf('</section>', idx);
  const section = html.slice(idx, end);
  const stampList = [...section.matchAll(/src="assets\/stickers\/([^"]+)"/g)].map(x => x[1]);
  if (stampList.length > 0) {
    console.log(`${t.padEnd(15)}: ${stampList.length} шт: ${stampList.join(', ')}`);
  } else {
    console.log(`${t.padEnd(15)}: 0 шт`);
  }
}
