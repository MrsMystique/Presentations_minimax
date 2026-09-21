// Патч палитры: скетчбук (mathematician's sketchbook)
// Olga: #F5F2EB warm ivory, горький шоколад, ловушки пастельно красные
const fs = require('fs');
const p = '_build_procenti_v3_3.js';
let c = fs.readFileSync(p, 'utf8');

// === 1. Фон страницы и текст — скетчбук ===
// body: тёплый айвори #F5F2EB + горький шоколад #3E2723
const fixes = [
  // Body: bg #FAF6EE → #F5F2EB, color #1a202c → #3E2723
  ["body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:16px; line-height:1.6; color:#1a202c; background:#FAF6EE; }",
   "body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:16px; line-height:1.6; color:#3E2723; background:#F5F2EB; background-image:linear-gradient(180deg, rgba(245,242,235,1) 0%, rgba(240,235,225,1) 100%); }"],

  // TOC: тёплый белый
  ["nav.toc { width:320px; flex-shrink:0; background:#fff; border-right:1px solid #e2e8f0; padding:24px 16px; position:sticky; top:0; height:100vh; overflow-y:auto; }",
   "nav.toc { width:320px; flex-shrink:0; background:#FAF6EE; border-right:1px solid #D4C8B5; padding:24px 16px; position:sticky; top:0; height:100vh; overflow-y:auto; }"],

  // h1 в TOC — горький шоколад
  ["nav.toc h1 { font-size:17px; margin:0 0 12px 0; color:#2d3748; }",
   "nav.toc h1 { font-size:17px; margin:0 0 12px 0; color:#3E2723; font-weight:700; }"],

  // Section slide: белый карточный
  ["section.slide { background:#fff; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.06); padding:28px 32px; margin-bottom:28px; scroll-margin-top:20px; }",
   "section.slide { background:#FFFFFF; border-radius:8px; box-shadow:0 2px 8px rgba(74,44,42,0.08); padding:28px 32px; margin-bottom:28px; scroll-margin-top:20px; border:1px solid #E8DFD0; }"],

  // h2 в заголовке слайда — горький шоколад
  ["header.slide-header h2 { font-size:22px; margin:0; color:#1a202c; line-height:1.3; }",
   "header.slide-header h2 { font-size:22px; margin:0; color:#3E2723; line-height:1.3; font-weight:700; letter-spacing:-0.01em; }"],

  // h3 / h4 в теле слайда
  [".slide-body h3 { font-size:18px; margin:20px 0 10px 0; color:#2d3748; }",
   ".slide-body h3 { font-size:18px; margin:20px 0 10px 0; color:#4A2C2A; font-weight:600; }"],
  [".slide-body h4 { font-size:16px; margin:16px 0 8px 0; color:#4a5568; }",
   ".slide-body h4 { font-size:16px; margin:16px 0 8px 0; color:#5D4037; font-weight:600; }"],

  // blockquote (плашки цитат) — пастельно красные для ловушек, оранжевые для подсказок
  // Olga: "ловушки в пастельно красных тонах"
  [".slide-body blockquote { margin:12px 0; padding:10px 16px; background:#fffbea; border-left:4px solid #ecc94b; color:#744210; border-radius:4px; }",
   ".slide-body blockquote { margin:12px 0; padding:12px 18px; background:#F8E8E5; border-left:4px solid #C97D6F; color:#5D2E2A; border-radius:6px; font-style:normal; }"],

  // Стиль для мостиков (.bridge-header) — пастельный пурпур
  ["nav.toc .bridge-header { display:block; margin-top:14px; margin-bottom:4px; font-weight:700; font-size:13px; color:#805ad5; text-transform:uppercase; }",
   "nav.toc .bridge-header { display:block; margin-top:14px; margin-bottom:4px; font-weight:700; font-size:13px; color:#6B5B95; text-transform:uppercase; letter-spacing:0.05em; }"],

  // slide-num — пастельный горький шоколад
  [".slide-num { background:#ebf8ff; color:#2b6cb0; padding:2px 10px; border-radius:999px; font-size:12px; font-weight:600; white-space:nowrap; }",
   ".slide-num { background:#EFE5D6; color:#4A2C2A; padding:2px 10px; border-radius:999px; font-size:12px; font-weight:700; white-space:nowrap; border:1px solid #D4C8B5; }"],

  // Кнопка наверх — горький шоколад
  ["button.back-to-toc { position:fixed; bottom:24px; right:24px; background:#2b6cb0; color:white; border:none; padding:10px 16px; border-radius:999px; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(43,108,176,0.4); z-index:10; }",
   "button.back-to-toc { position:fixed; bottom:24px; right:24px; background:#4A2C2A; color:#F5F2EB; border:none; padding:10px 16px; border-radius:999px; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(74,44,42,0.3); z-index:10; font-weight:600; }"],
  ["button.back-to-toc:hover { background:#2c5282; }",
   "button.back-to-toc:hover { background:#3E2723; }"],

  // Preview body — палитра скетчбука
  ["body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#FAF6EE; color:#1a202c; }",
   "body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#F5F2EB; color:#3E2723; background-image:linear-gradient(180deg, rgba(245,242,235,1) 0%, rgba(240,235,225,1) 100%); }"],

  // TODO: TOC preview details — пастельный карточный стиль (требует отдельного патча)

  // h1 в preview
  ["<h1>Чистовые слайды v3.3 — Проценты, пропорции, масштаб</h1>",
   "<h1 style=\"color:#3E2723;font-weight:700;letter-spacing:-0.01em;\">Чистовые слайды v3.3 — Проценты, пропорции, масштаб</h1>"],
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
