// Парсер → reader.html + preview.html для партии Разряды и дроби v17
const fs = require('fs');

const VERSION = '17';
const MD_PATH = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\v' + VERSION + ' — Разряды и дроби.md';
const READER_HTML = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\v' + VERSION + ' — Разряды и дроби — reader.html';
const PREVIEW_HTML = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\v' + VERSION + ' — Разряды и дроби — preview.html';

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
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="slide-image" src="$2" alt="$1" />');
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
    const inlineSticker = line.trim().match(/^<!--INLINE:([^>]+)-->$/);
    if (inlineSticker) {
      // Если следующая непустая строка — blockquote, стикер встраивается внутрь (как float-right перед текстом).
      // Иначе — обычный inline-float параграф.
      out.push('<div class="inline-stamp-float"><img class="inline-stamp" src="assets/stickers/' + inlineSticker[1] + '" alt="" loading="lazy" /></div>');
      i++; continue;
    }
    const h4 = line.match(/^####\s+(.*)$/);
    if (h4) { out.push('<h4>' + inline(escHtml(h4[1])) + '</h4>'); i++; continue; }
    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) { out.push('<h3>' + inline(escHtml(h3[1])) + '</h3>'); i++; continue; }
    if (line.startsWith('>')) {
      const bqLines = [];
      while (i < lines.length && lines[i].startsWith('>')) { bqLines.push(lines[i].replace(/^>\s?/, '')); i++; }
      // Дополнительно убираем все оставшиеся '>' в начале строки (вложенные blockquote)
      for (let k = 0; k < bqLines.length; k++) bqLines[k] = bqLines[k].replace(/^>\s?/, '');
      const parts = []; let buf = [];
      const flushBuf = () => { if (buf.length > 0) { const t = buf.join(' ').trim(); if (t) parts.push({ kind: 'text', content: t }); buf = []; } };
      for (const bl of bqLines) {
        const t = bl.trim();
        if (t === '') { flushBuf(); continue; }
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
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (imgMatch) {
      out.push('<p style="text-align:center;margin:14px 0;"><img class="slide-image" src="' + imgMatch[2] + '" alt="' + escHtml(imgMatch[1]) + '" /></p>');
      i++; continue;
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
// Первый проход: собираем индексы строк STICKER (плашечные маркеры).
// INLINE-маркеры НЕ включаются сюда — они должны попасть в sub.lines и обрабатываться parseLines.
const stickerLineIdx = new Set();
const stickerByLine = new Map();
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].trim().match(/^<!--STICKER:([^>]+)-->$/);
  if (m) { stickerLineIdx.add(i); stickerByLine.set(i, m[1]); }
}
function readStickersBefore(idx) {
  let j = idx - 1;
  const out = [];
  while (j >= 0) {
    if (stickerLineIdx.has(j)) {
      out.unshift(stickerByLine.get(j));
      j--;
    } else if (lines[j].trim() === '') {
      j--;
    } else {
      break;
    }
  }
  return out;
}
const h2Sections = []; let curH2 = null;
for (let i = 0; i < lines.length; i++) {
  if (stickerLineIdx.has(i)) continue;
  const line = lines[i];
  const h2 = line.match(/^##\s+(.+)$/);
  if (h2) {
    if (curH2) h2Sections.push(curH2);
    curH2 = { title: h2[1].trim(), h3Sections: [], trailer: [], stickers: readStickersBefore(i) };
    continue;
  }
  // Обработка `> ##` blockquote-prefixed H2 (на случай если встретится в файле)
  const h2Quote = line.match(/^>\s*##\s+(.+)$/);
  if (h2Quote) {
    if (curH2) h2Sections.push(curH2);
    curH2 = { title: h2Quote[1].trim(), h3Sections: [], trailer: [], stickers: readStickersBefore(i) };
    continue;
  }
  if (!curH2) continue;
  const h3 = line.match(/^###\s+(.+)$/);
  if (h3) { curH2.h3Sections.push({ title: h3[1].trim(), lines: [], stickers: readStickersBefore(i) }); continue; }
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
    if (m) { slides.push({ num: m[1], title: m[2], html: parseLines(sub.lines).join('\n'), stickers: sub.stickers || [] }); slideH2.push(h); }
  }
}
const blockInfo = [];
const bridgeByIdx = new Map();
for (let h = 0; h < h2Sections.length; h++) {
  const sec = h2Sections[h];
  const bm = sec.title.match(/^Блок\s+(\d+)\.\s+(.+)$/);
  if (bm) blockInfo.push({ kind: 'block', num: parseInt(bm[1], 10), name: bm[2], idx: h });
  const mm = sec.title.match(/^Мостик\.?\s*(.*)$/);
  if (mm) {
    const name = mm[1] || 'Мостик';
    blockInfo.push({ kind: 'bridge', name: name, idx: h });
    bridgeByIdx.set(h, { title: 'Мостик. ' + name, html: parseLines(sec.trailer).join('\n'), stickers: sec.stickers || [] });
  }
}
console.log('Слайдов: ' + slides.length + ', разделов: ' + blockInfo.length + ', мостиков с HTML: ' + bridgeByIdx.size);

const cssBase = `
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:16px; line-height:1.6; color:#3E2723; background:#F5F2EB; background-image:linear-gradient(180deg, rgba(245,242,235,1) 0%, rgba(240,235,225,1) 100%); }
.layout { display:flex; min-height:100vh; }
nav.toc { width:320px; flex-shrink:0; background:#FAF6EE; border-right:1px solid #D4C8B5; padding:24px 16px; position:sticky; top:0; height:100vh; overflow-y:auto; }
nav.toc h1 { font-size:17px; margin:0 0 12px 0; color:#3E2723; font-weight:700; }
nav.toc .block-header { display:block; margin-top:14px; margin-bottom:4px; font-weight:700; font-size:13px; color:#4a5568; text-transform:uppercase; letter-spacing:0.04em; text-decoration:none; }
nav.toc .slide-link { display:block; padding:4px 8px; font-size:13px; color:#2b6cb0; text-decoration:none; border-radius:4px; }
nav.toc .slide-link:hover { background:#ebf8ff; }
nav.toc .slide-link.sub-slide { padding-left: 20px; color: #4a5568; font-size: 12px; }
nav.toc .bridge-header { display:block; margin-top:14px; margin-bottom:4px; font-weight:700; font-size:13px; color:#6B5B95; text-transform:uppercase; letter-spacing:0.05em; }
main.content { flex:1; max-width:880px; padding:40px 48px; margin:0 auto; background:transparent; }
section.slide { background:#FFFFFF; border-radius:8px; box-shadow:0 2px 8px rgba(74,44,42,0.08); padding:28px 32px; margin-bottom:28px; scroll-margin-top:20px; border:1px solid #E8DFD0; }
section.slide.final-slide { border-left:4px solid #38a169; }
section.slide.reference-slide { border-left:4px solid #d69e2e; background:#fffff0; }
section.slide.sub-slide { border-left:3px dashed #cbd5e0; }
section.slide.bridge-slide { background:linear-gradient(135deg, #FBF5E6 0%, #F4ECD8 100%); border-left:4px solid #6B5B95; border-top:1px dashed #6B5B95; }
section.slide.bridge-slide h2 { color:#6B5B95; }
header.slide-header { display:flex; align-items:baseline; gap:12px; margin-bottom:16px; border-bottom:1px solid #edf2f7; padding-bottom:12px; }
.slide-num { background:#EFE5D6; color:#4A2C2A; padding:2px 10px; border-radius:999px; font-size:12px; font-weight:700; white-space:nowrap; border:1px solid #D4C8B5; }
.slide-num.ref { background:#fefcbf; color:#975a16; }
.slide-num.sub { background:#edf2f7; color:#4a5568; }
header.slide-header h2 { font-size:22px; margin:0; color:#3E2723; line-height:1.3; font-weight:700; letter-spacing:-0.01em; }
.slide-body p { margin:0 0 12px 0; }
.slide-body h3 { font-size:18px; margin:20px 0 10px 0; color:#4A2C2A; font-weight:600; }
.slide-body h4 { font-size:16px; margin:16px 0 8px 0; color:#5D4037; font-weight:600; }
.slide-body ul, .slide-body ol { margin:0 0 12px 0; padding-left:24px; }
.slide-body li { margin-bottom:4px; }
.slide-body blockquote { margin:12px 0; padding:12px 18px; background:#F8E8E5; border-left:4px solid #C97D6F; color:#5D2E2A; border-radius:6px; font-style:normal; }
.slide-body blockquote p:last-child { margin-bottom:0; }
.slide-body table { border-collapse:collapse; margin:14px 0; font-size:13px; width:100%; }
.slide-body th, .slide-body td { border:1px solid #e2e8f0; padding:8px 12px; text-align:left; vertical-top; }
.slide-body th { background:#F5F0E0; font-weight:600; color:#2d3748; }
.slide-body code { background:#edf2f7; padding:1px 6px; border-radius:3px; font-family:'JetBrains Mono',Consolas,Monaco,monospace; font-size:0.92em; }
.math-block { text-align:center; margin:0.9em 0; padding:0.2em 0; overflow-x:auto; overflow-y:hidden; }
.math-block .katex-display { margin:0; }
.slide-body .katex { font-weight: 700; color: #2C2C2C; }
.slide-body p > .katex, .slide-body li > .katex { font-size: 1.05em; }
.slide-body img.slide-image { display:block; max-width:100%; height:auto; margin:14px auto; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
.slide-stamps { display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin:0 0 14px 0; padding:8px 12px; background:rgba(255,253,247,0.6); border-radius:8px; border:1px dashed #D4C8B5; }
.slide-stamp { height:54px; width:auto; max-width:none; object-fit:contain; filter:drop-shadow(0 1px 2px rgba(74,44,42,0.18)); transition:transform 0.18s ease; }
.slide-stamp:hover { transform:scale(1.06); }
.inline-stamp-float { float:right; margin:0 0 16px 22px; clear:right; }
.inline-stamp { height:120px; width:auto; max-width:none; object-fit:contain; filter:drop-shadow(0 3px 6px rgba(74,44,42,0.25)); transition:transform 0.2s ease; cursor:pointer; }
.inline-stamp:hover { transform:scale(1.05); }
button.back-to-toc { position:fixed; bottom:24px; right:24px; background:#4A2C2A; color:#F5F2EB; border:none; padding:10px 16px; border-radius:999px; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(74,44,42,0.3); z-index:10; font-weight:600; }
button.back-to-toc:hover { background:#3E2723; }
@media (max-width:900px) { .layout { flex-direction:column; } nav.toc { width:100%; height:auto; position:relative; } main.content { padding:20px; } }
`;

function buildReader() {
  let nav = '<h1 style="color:#3E2723;font-weight:700;letter-spacing:-0.01em;">Чистовые слайды v' + VERSION + ' — Разряды и дроби</h1>';
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
  function renderSlide(s) {
    const slide = slides[s];
    const isSub = String(slide.num).indexOf('.') >= 0;
    // Задачи (Слайды 22.x) получают reference-slide стиль (бежевый фон, жёлтая рамка)
    const isTask = /^22(\.\d+)?$/.test(slide.num);
    const isRef = isTask || (s >= slides.length - 9);
    const isFinal = (s >= slides.length - 11 && s < slides.length - 9);
    let cls = 'slide';
    if (isSub) cls += ' sub-slide';
    if (isRef) cls += ' reference-slide';
    else if (isFinal) cls += ' final-slide';
    let numSpanCls = 'slide-num';
    if (isRef) numSpanCls += ' ref';
    else if (isSub) numSpanCls += ' sub';
    // Inline-стикеры из slide.stickers встраиваются как float-right в начало body слайда.
    const inlinePrepend = (slide.stickers && slide.stickers.length)
      ? slide.stickers.map(f => '<div class="inline-stamp-float"><img class="inline-stamp" src="assets/stickers/' + f + '" alt="" loading="lazy" /></div>').join('')
      : '';
    return '<section class="' + cls + '" id="slide-' + slide.num + '">\n<header class="slide-header"><span class="' + numSpanCls + '">Слайд ' + slide.num + '</span><h2>' + escHtml(slide.title) + '</h2></header>\n<div class="slide-body">\n' + inlinePrepend + slide.html + '\n</div>\n</section>\n';
  }
  function renderBridge(sec, anchorId) {
    const inlinePrepend = (sec.stickers && sec.stickers.length)
      ? sec.stickers.map(f => '<div class="inline-stamp-float"><img class="inline-stamp" src="assets/stickers/' + f + '" alt="" loading="lazy" /></div>').join('')
      : '';
    return '<section class="slide bridge-slide" id="' + anchorId + '">\n<header class="slide-header"><span class="slide-num" style="background:#EFE5F6;color:#5D2A87;border-color:#C9B8E0;">Мостик</span><h2>' + escHtml(sec.title) + '</h2></header>\n<div class="slide-body">\n' + inlinePrepend + sec.html + '\n</div>\n</section>\n';
  }
  for (let s = 0; s < slides.length; s++) {
    main += renderSlide(s);
    const curH2 = slideH2[s];
    const nextSlideH2 = (s + 1 < slides.length) ? slideH2[s + 1] : -1;
    if (nextSlideH2 !== curH2 && nextSlideH2 !== -1) {
      // Вставляем ВСЕ мостики подряд между текущим блоком и следующим блоком
      let probe = curH2 + 1;
      let bIdx = 0;
      while (probe < h2Sections.length) {
        const kindHere = blockInfo[probe] ? blockInfo[probe].kind : null;
        if (kindHere === 'block') break; // дошли до следующего блока — стоп
        if (kindHere === 'bridge' && bridgeByIdx.has(probe)) {
          const b = bridgeByIdx.get(probe);
          const lastSlideNum = slides[s].num.replace('.', '-');
          main += renderBridge(b, 'bridge-after-' + lastSlideNum + '-' + (bIdx++));
        }
        probe++;
      }
    }
  }
  return '<!DOCTYPE html>\n<html lang="ru">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Чистовые слайды v' + VERSION + ' — Разряды и дроби — читалка</title>\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">\n<style>\n' + cssBase + '\n</style>\n</head>\n<body>\n<div class="layout">\n<nav class="toc">\n' + nav + '\n</nav>\n<main class="content">\n' + main + '\n</main>\n</div>\n<button class="back-to-toc" onclick="window.scrollTo(0,0)">Наверх</button>\n<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"><\/script>\n<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"><\/script>\n<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/cancel.min.js"><\/script>\n<script>\nfunction renderMath() {\n  if (typeof renderMathInElement === "undefined") return;\n  renderMathInElement(document.body, {\n    delimiters: [{left: "\\\\(", right: "\\\\)", display: false}, {left: "\\\\[", right: "\\\\]", display: true}],\n    throwOnError: false\n  });\n}\nwindow.addEventListener("load", renderMath);\nif (document.readyState === "complete") renderMath();\n<\/script>\n</body>\n</html>\n';
}

function buildPreview() {
  let html = '<h1>Чистовые слайды v' + VERSION + ' — Разряды и дроби — обзор</h1>';
  const bc = blockInfo.filter(b => b.kind === 'block').length;
  const br = blockInfo.filter(b => b.kind === 'bridge').length;
  html += '<p style="color:#4a5568;margin-bottom:24px;">Всего <strong>' + slides.length + '</strong> слайдов в <strong>' + blockInfo.length + '</strong> разделах (' + bc + ' блоков + ' + br + ' мостиков).</p>';
  for (let i = 0; i < blockInfo.length; i++) {
    const b = blockInfo[i];
    const isBridge = b.kind === 'bridge';
    const title = isBridge ? b.name : 'Блок ' + b.num + '. ' + b.name;
    const sIn = slides.filter((_, s) => slideH2[s] === b.idx);
    if (sIn.length === 0) continue;
    const color = isBridge ? '#805ad5' : '#2b6cb0';
    const sw = sIn.length === 1 ? 'слайд' : (sIn.length < 5 ? 'слайда' : 'слайдов');
    html += '<details style="margin-bottom:14px;background:#fff;padding:14px 18px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.05);"><summary style="font-weight:700;color:' + color + ';cursor:pointer;font-size:16px;">' + escHtml(title) + ' <span style="color:#a0aec0;font-weight:400;">(' + sIn.length + ' ' + sw + ')</span></summary><ol style="margin-top:10px;padding-left:24px;color:#2d3748;">';
    for (const slide of sIn) html += '<li style="margin-bottom:4px;"><a href="Чистовые слайды v' + VERSION + ' — Разряды и дроби — reader.html#slide-' + slide.num + '" style="color:' + color + ';text-decoration:none;">' + slide.num + '. ' + escHtml(slide.title) + '</a></li>';
    html += '</ol></details>';
  }
  return '<!DOCTYPE html>\n<html lang="ru">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Чистовые слайды v' + VERSION + ' — Разряды и дроби — обзор</title>\n<style>\nbody { font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#F5F2EB; color:#3E2723; background-image:linear-gradient(180deg, rgba(245,242,235,1) 0%, rgba(240,235,225,1) 100%); }\nh1 { margin:0 0 8px 0; }\n</style>\n</head>\n<body>\n' + html + '\n</body>\n</html>\n';
}

fs.writeFileSync(READER_HTML, buildReader(), 'utf8');
fs.writeFileSync(PREVIEW_HTML, buildPreview(), 'utf8');
console.log('Reader:  ' + (fs.statSync(READER_HTML).size/1024).toFixed(1) + ' КБ');
console.log('Preview: ' + (fs.statSync(PREVIEW_HTML).size/1024).toFixed(1) + ' КБ');
