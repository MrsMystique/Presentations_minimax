// Патч парсера v3.3: кремовый фон + v3.3 в заголовках/ссылках
const fs = require('fs');
const p = '_build_procenti_v3_3.js';
let c = fs.readFileSync(p, 'utf8');

// === Кремовый фон (Olga: чуть светлее для читаемости) ===
// body страницы — кремовый #FAF6EE
const fixes = [
  // body reader.html
  ["body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:16px; line-height:1.6; color:#1a202c; background:#f7fafc; }",
   "body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:16px; line-height:1.6; color:#1a202c; background:#FAF6EE; }"],
  // body preview.html
  ["body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#f7fafc; color:#1a202c; }",
   "body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#FAF6EE; color:#1a202c; }"],
  // th — слегка кремовый (под body)
  ['.slide-body th { background:#f7fafc; font-weight:600; color:#2d3748; }',
   '.slide-body th { background:#F5F0E0; font-weight:600; color:#2d3748; }'],
  // v3.1 → v3.3 в заголовке h1
  ['<h1>Чистовые слайды v3.1 — Проценты, пропорции, масштаб</h1>',
   '<h1>Чистовые слайды v3.3 — Проценты, пропорции, масштаб</h1>'],
  // v3.1 → v3.3 в title reader.html
  ['<title>Чистовые слайды v3.1 — Проценты, пропорции, масштаб — читалка</title>',
   '<title>Чистовые слайды v3.3 — Проценты, пропорции, масштаб — читалка</title>'],
  // v3.1 → v3.3 в title preview.html
  ['<title>Чистовые слайды v3.1 — Проценты, пропорции, масштаб — обзор</title>',
   '<title>Чистовые слайды v3.3 — Проценты, пропорции, масштаб — обзор</title>'],
  // v3.1 → v3.3 в ссылке
  ['href="Чистовые слайды v3.1 — Проценты, пропорции, масштаб — reader.html#slide-',
   'href="Чистовые слайды v3.3 — Проценты, пропорции, масштаб — reader.html#slide-'],
];

let applied = 0;
for (const [from, to] of fixes) {
  if (c.indexOf(from) >= 0) {
    c = c.replace(from, to);
    applied++;
    console.log('✓ ' + from.substring(0, 60));
  } else {
    console.log('✗ NOT FOUND: ' + from.substring(0, 60));
  }
}
console.log('Applied: ' + applied + '/' + fixes.length);
fs.writeFileSync(p, c, 'utf8');
