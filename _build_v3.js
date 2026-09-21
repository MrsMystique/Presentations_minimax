// Парсер v3 → reader.html + preview.html
const fs = require('fs');

const MD_PATH = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3 — Множества, НОК, НОД.md';
const READER_HTML = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3 — Множества, НОК, НОД — reader.html';
const PREVIEW_HTML = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3 — Множества, НОК, НОД — preview.html';

let md = fs.readFileSync(MD_PATH, 'utf8');
md = md.replace(/([^\n])\s*\\\[/g, '$1\n\n\\[');
md = md.replace(/\\\]\s*([^\n])/g, '\\]\n\n$1');
md = md.replace(/\n{4,}/g, '\n\n\n');

function escHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function inline(s) {
  s = s.replace(/\\\(/g, 'MOPEN').replace(/\\\)/g, 'MCLOSE');
  s = s.replace(/\\\[/g, 'MOBRACK').replace(/\\\]/g, 'MCBRACK');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/MOPEN/g, '\\(').replace(/MCLOSE/g, '\\)');
  s = s.replace(/MOBRACK/g, '\\[').replace(/MCBRACK/g, '\\]');
  return s;
}
function isDisplayMathOnly(s) { return /^\s*\\\[[\s\S]*\\\]\s*$/.test(s); }
function extractDisplayMath(s) { const m = s.match(/^\s*\\\[([\s\S]*?)\\\]\s*$/); return m ? m[1] : null; }

function parseLines(lines) {
  const out = []; let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') { i++; continue; }
    const h4 = line.match(/^####\s+(.*)$/);
    if (h4) { out.push('<h4>' + inline(escHtml(h4[1])) + '</h4>'); i++; continue; }
    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) { out.push('<h3>' + inline(escHtml(h3[1])) + '</h3>'); i++; continue; }
    if (line.startsWith('>')) {
      const bqLines = [];
      while (i < lines.length && lines[i].startsWith('>')) { bqLines.push(lines[i].replace(/^>\s?/, '')); i++; }
      const parts = []; let buf = [];
      const flushBuf = () => { if (buf.length > 0) { const t = buf.join(' ').trim(); if (t) parts.push({ kind: 'text', content: t }); buf = []; } };
      for (const bl of bqLines) {
        const t = bl.trim();
        if (isDisplayMathOnly(t)) { flushBuf(); parts.push({ kind: 'math', content: extractDisplayMath(t) }); }
        else { buf.push(t); }
      }
      flushBuf();
      let innerHtml = ''; let outerHtml = '';
      for (const p of parts) {
        if (p.kind === 'text') innerHtml += '<p>' + inline(escHtml(p.content)) + '</p>';
        else { if (innerHtml) { outerHtml += '<blockquote>' + innerHtml + '</blockquote>'; innerHtml = ''; } outerHtml += '<div class="math-block">\\[' + p.content + '\\]</div>'; }
      }
      if (innerHtml) outerHtml += '<blockquote>' + innerHtml + '</blockquote>';
      out.push(outerHtml); continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push('<li>' + inline(escHtml(lines[i].replace(/^[-*]\s+/, ''))) + '</li>'); i++; }
      out.push('<ul>' + items.join('') + '</ul>'); continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push('<li>' + inline(escHtml(lines[i].replace(/^\d+\.\s+/, ''))) + '</li>'); i++; }
      out.push('<ol>' + items.join('') + '</ol>'); continue;
    }
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) { tableLines.push(lines[i]); i++; }
      if (tableLines.length >= 2) {
        const splitRow = (r) => r.trim().slice(1, -1).split('|').map(c => c.trim());
        const header = splitRow(tableLines[0]);
        const body = tableLines.slice(2);
        let html = '<table><thead><tr>';
        for (const h of header) html += '<th>' + inline(escHtml(h)) + '</th>';
        html += '</tr></thead><tbody>';
        for (const row of body) { const cells = splitRow(row); html += '<tr>'; for (const c of cells) html += '<td>' + inline(escHtml(c)) + '</td>'; html += '</tr>'; }
        html += '</tbody></table>';
        out.push(html);
      }
      continue;
    }
    const pLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^####|^###|^>|^\s*[-*]\s|^\d+\.\s/.test(lines[i]) && !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|'))) { pLines.push(lines[i]); i++; }
    if (pLines.length > 0) {
      const joined = pLines.join(' ');
      const m = joined.match(/^\s*\\\[([\s\S]*?)\\\]\s*$/);
      if (m) out.push('<div class="math-block">\\[' + m[1] + '\\]</div>');
      else out.push('<p>' + inline(escHtml(joined)) + '</p>');
    }
  }
  return out;
}

const lines = md.split(/\r?\n/);
const h2Sections = []; let curH2 = null;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const h2 = line.match(/^##\s+(.+)$/);
  if (h2) { if (curH2) h2Sections.push(curH2); curH2 = { title: h2[1].trim(), h3Sections: [], trailer: [] }; continue; }
  if (!curH2) continue;
  const h3 = line.match(/^###\s+(.+)$/);
  if (h3) { curH2.h3Sections.push({ title: h3[1].trim(), lines: [] }); continue; }
  if (curH2.h3Sections.length > 0) curH2.h3Sections[curH2.h3Sections.length - 1].lines.push(line);
  else curH2.trailer.push(line);
}
if (curH2) h2Sections.push(curH2);

const slides = []; const slideH2 = [];
const slideRe = /^Слайд (\d+(?:\.\d+)?)\.\s+(.+)$/;
for (let h = 0; h < h2Sections.length; h++) {
  const sec = h2Sections[h];
  for (const sub of sec.h3Sections) {
    const m = sub.title.match(slideRe);
    if (m) { slides.push({ num: m[1], title: m[2], html: parseLines(sub.lines).join('\n') }); slideH2.push(h); }
  }
}
const blockInfo = [];
for (let h = 0; h < h2Sections.length; h++) {
  const sec = h2Sections[h];
  const bm = sec.title.match(/^Блок\s+(\d+)\.\s+(.+)$/);
  if (bm) blockInfo.push({ kind: 'block', num: parseInt(bm[1], 10), name: bm[2], idx: h });
  const mm = sec.title.match(/^Мостик\.?\s*(.*)$/);
  if (mm) blockInfo.push({ kind: 'bridge', name: mm[1] || 'Мостик', idx: h });
}
console.log('Слайдов: ' + slides.length + ', разделов: ' + blockInfo.length);

const cssBase = `
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:16px; line-height:1.6; color:#1a202c; background:#f7fafc; }
.layout { display:flex; min-height:100vh; }
nav.toc { width:320px; flex-shrink:0; background:#fff; border-right:1px solid #e2e8f0; padding:24px 16px; position:sticky; top:0; height:100vh; overflow-y:auto; }
nav.toc h1 { font-size:17px; margin:0 0 12px 0; color:#2d3748; }
nav.toc .block-header { display:block; margin-top:14px; margin-bottom:4px; font-weight:700; font-size:13px; color:#4a5568; text-transform:uppercase; letter-spacing:0.04em; text-decoration:none; }
nav.toc .slide-link { display:block; padding:4px 8px; font-size:13px; color:#2b6cb0; text-decoration:none; border-radius:4px; }
nav.toc .slide-link:hover { background:#ebf8ff; }
nav.toc .slide-link.sub-slide { padding-left: 20px; color: #4a5568; font-size: 12px; }
nav.toc .bridge-header { display:block; margin-top:14px; margin-bottom:4px; font-weight:700; font-size:13px; color:#805ad5; text-transform:uppercase; }
main.content { flex:1; max-width:880px; padding:40px 48px; margin:0 auto; }
section.slide { background:#fff; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,0.06); padding:28px 32px; margin-bottom:28px; scroll-margin-top:20px; }
section.slide.final-slide { border-left:4px solid #38a169; }
section.slide.reference-slide { border-left:4px solid #d69e2e; background:#fffff0; }
section.slide.sub-slide { border-left:3px dashed #cbd5e0; }
header.slide-header { display:flex; align-items:baseline; gap:12px; margin-bottom:16px; border-bottom:1px solid #edf2f7; padding-bottom:12px; }
.slide-num { background:#ebf8ff; color:#2b6cb0; padding:2px 10px; border-radius:999px; font-size:12px; font-weight:600; white-space:nowrap; }
.slide-num.ref { background:#fefcbf; color:#975a16; }
.slide-num.sub { background:#edf2f7; color:#4a5568; }
header.slide-header h2 { font-size:22px; margin:0; color:#1a202c; line-height:1.3; }
.slide-body p { margin:0 0 12px 0; }
.slide-body h3 { font-size:18px; margin:20px 0 10px 0; color:#2d3748; }
.slide-body h4 { font-size:16px; margin:16px 0 8px 0; color:#4a5568; }
.slide-body ul, .slide-body ol { margin:0 0 12px 0; padding-left:24px; }
.slide-body li { margin-bottom:4px; }
.slide-body blockquote { margin:12px 0; padding:10px 16px; background:#fffbea; border-left:4px solid #ecc94b; color:#744210; border-radius:4px; }
.slide-body blockquote p:last-child { margin-bottom:0; }
.slide-body table { border-collapse:collapse; margin:14px 0; font-size:13px; width:100%; }
.slide-body th, .slide-body td { border:1px solid #e2e8f0; padding:8px 12px; text-align:left; vertical-top; }
.slide-body th { background:#f7fafc; font-weight:600; color:#2d3748; }
.slide-body code { background:#edf2f7; padding:1px 6px; border-radius:3px; font-family:'JetBrains Mono',Consolas,Monaco,monospace; font-size:0.92em; }
.math-block { text-align:center; margin:0.9em 0; padding:0.2em 0; overflow-x:auto; overflow-y:hidden; }
.math-block .katex-display { margin:0; }
button.back-to-toc { position:fixed; bottom:24px; right:24px; background:#2b6cb0; color:white; border:none; padding:10px 16px; border-radius:999px; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(43,108,176,0.4); z-index:10; }
button.back-to-toc:hover { background:#2c5282; }
@media (max-width:900px) { .layout { flex-direction:column; } nav.toc { width:100%; height:auto; position:relative; } main.content { padding:20px; } }
`;

function buildReader() {
  let nav = '<h1>Чистовые слайды v3 — Множества, НОК, НОД</h1>';
  for (let i = 0; i < blockInfo.length; i++) {
    const b = blockInfo[i];
    if (b.kind === 'block') nav += '<a class="block-header">Блок ' + b.num + '. ' + escHtml(b.name) + '</a>';
    else nav += '<a class="bridge-header">' + escHtml(b.name) + '</a>';
    for (let s = 0; s < slides.length; s++) {
      if (slideH2[s] === b.idx) {
        const isSub = String(slides[s].num).indexOf('.') >= 0;
        const cls = isSub ? 'slide-link sub-slide' : 'slide-link';
        nav += '<a class="' + cls + '" href="#slide-' + slides[s].num + '">' + slides[s].num + '. ' + escHtml(slides[s].title) + '</a>';
      }
    }
  }
  let main = '';
  for (let s = 0; s < slides.length; s++) {
    const slide = slides[s];
    const isSub = String(slide.num).indexOf('.') >= 0;
    const isRef = (s >= slides.length - 6);
    const isFinal = (s >= slides.length - 8 && s < slides.length - 6);
    let cls = 'slide';
    if (isSub) cls += ' sub-slide';
    if (isRef) cls += ' reference-slide';
    else if (isFinal) cls += ' final-slide';
    let numSpanCls = 'slide-num';
    if (isRef) numSpanCls += ' ref';
    else if (isSub) numSpanCls += ' sub';
    main += '<section class="' + cls + '" id="slide-' + slide.num + '">\n<header class="slide-header"><span class="' + numSpanCls + '">Слайд ' + slide.num + '</span><h2>' + escHtml(slide.title) + '</h2></header>\n<div class="slide-body">\n' + slide.html + '\n</div>\n</section>\n';
  }
  return '<!DOCTYPE html>\n<html lang="ru">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Чистовые слайды v3 — Множества, НОК, НОД — читалка</title>\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">\n<style>\n' + cssBase + '\n</style>\n</head>\n<body>\n<div class="layout">\n<nav class="toc">\n' + nav + '\n</nav>\n<main class="content">\n' + main + '\n</main>\n</div>\n<button class="back-to-toc" onclick="window.scrollTo(0,0)">↑ Наверх</button>\n<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/cancel.min.js"></script>\n<script>\nfunction renderMath() {\n  if (typeof renderMathInElement === "undefined") return;\n  renderMathInElement(document.body, {\n    delimiters: [{left: "\\\\(", right: "\\\\)", display: false}, {left: "\\\\[", right: "\\\\]", display: true}],\n    throwOnError: false\n  });\n}\nwindow.addEventListener("load", renderMath);\nif (document.readyState === "complete") renderMath();\n</script>\n</body>\n</html>\n';
}

function buildPreview() {
  let html = '<h1>Чистовые слайды v3 — Множества, НОК, НОД — обзор</h1>';
  const bc = blockInfo.filter(b => b.kind === 'block').length;
  const br = blockInfo.filter(b => b.kind === 'bridge').length;
  html += '<p style="color:#4a5568;margin-bottom:24px;">Всего <strong>' + slides.length + '</strong> слайдов в <strong>' + blockInfo.length + '</strong> разделах (' + bc + ' блоков + ' + br + ' мостика).</p>';
  for (let i = 0; i < blockInfo.length; i++) {
    const b = blockInfo[i];
    const isBridge = b.kind === 'bridge';
    const title = isBridge ? b.name : 'Блок ' + b.num + '. ' + b.name;
    const sIn = slides.filter((_, s) => slideH2[s] === b.idx);
    if (sIn.length === 0) continue;
    const color = isBridge ? '#805ad5' : '#2b6cb0';
    const sw = sIn.length === 1 ? 'слайд' : (sIn.length < 5 ? 'слайда' : 'слайдов');
    html += '<details style="margin-bottom:14px;background:#fff;padding:14px 18px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.05);"><summary style="font-weight:700;color:' + color + ';cursor:pointer;font-size:16px;">' + escHtml(title) + ' <span style="color:#a0aec0;font-weight:400;">(' + sIn.length + ' ' + sw + ')</span></summary><ol style="margin-top:10px;padding-left:24px;color:#2d3748;">';
    for (const slide of sIn) html += '<li style="margin-bottom:4px;"><a href="Чистовые слайды v3 — Множества, НОК, НОД — reader.html#slide-' + slide.num + '" style="color:' + color + ';text-decoration:none;">' + slide.num + '. ' + escHtml(slide.title) + '</a></li>';
    html += '</ol></details>';
  }
  return '<!DOCTYPE html>\n<html lang="ru">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Чистовые слайды v3 — Множества, НОК, НОД — обзор</title>\n<style>\nbody { font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#f7fafc; color:#1a202c; }\nh1 { margin:0 0 8px 0; }\n</style>\n</head>\n<body>\n' + html + '\n</body>\n</html>\n';
}

fs.writeFileSync(READER_HTML, buildReader(), 'utf8');
fs.writeFileSync(PREVIEW_HTML, buildPreview(), 'utf8');
console.log('Reader:  ' + (fs.statSync(READER_HTML).size/1024).toFixed(1) + ' КБ');
console.log('Preview: ' + (fs.statSync(PREVIEW_HTML).size/1024).toFixed(1) + ' КБ');