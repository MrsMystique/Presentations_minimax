// md_to_reader.js — converts v17 — Объёмы многогранников.md to reader.html
// Adapted from the existing v17 — Разряды и дроби reader template.

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'v17 — Объёмы многогранников.md');
const OUT = path.join(__dirname, '..', 'v17 — Объёмы многогранников — reader.html');

const md = fs.readFileSync(SRC, 'utf8');

// ---------- Helpers ----------

function escapeHTML(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inlineLatex(s) {
  // Convert \( ... \) to inline KaTeX-compatible inline math (use html-escaped)
  // We'll wrap as \( ... \) literally for client-side MathJax/KaTeX auto-render.
  return s;
}

// Process inline markdown: bold, italic, code, math
function processInline(s) {
  // 1. Escape < and > so KaTeX markers survive intact
  s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // 2. Restore already-existing math delimiters
  // (we just kept the same chars since we only escaped &<>)
  // 3. Bold **...**
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // 4. Italic *...* (but not inside words with *_)
  s = s.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
  // 5. Inline code `...`
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  return s;
}

// ---------- Split into slides ----------
//
// Convention for this draft:
//   # H1 = Title (slide 1)
//   ## H2 inside # Партия = Major section
//   ### H3 = Each individual slide
//
// We'll treat each `##` (except Содержание) as a logical block header in TOC,
// and each `###` as a slide.

const lines = md.split(/\r?\n/);

const slides = []; // {title, header, type, html}
const tocBlocks = []; // {name, slides: [{num, anchor}]}

let currentBlock = null;
let currentSlide = null;
let mode = null; // 'p' = paragraph accumulator, 'ul', 'ol', 'table', 'quote', 'math', 'details'
let buffer = '';

function flushBuffer() {
  if (!buffer.trim()) { buffer = ''; return; }
  if (!currentSlide) { buffer = ''; return; }
  if (mode === 'ul') {
    currentSlide.html += `<ul>${buffer}</ul>`;
  } else if (mode === 'ol') {
    currentSlide.html += `<ol>${buffer}</ol>`;
  } else if (mode === 'table') {
    currentSlide.html += buffer; // already a full <table>
  } else if (mode === 'quote') {
    currentSlide.html += `<blockquote>${buffer}</blockquote>`;
  } else if (mode === 'math') {
    currentSlide.html += `<div class="math-block">${buffer}</div>`;
  } else if (mode === 'details') {
    currentSlide.html += buffer; // already <details>...</details>
  } else if (mode === 'p') {
    // paragraph; each line is a separate <p>
    const paras = buffer.split(/\n/);
    for (const para of paras) {
      if (para.trim()) currentSlide.html += `<p>${processInline(para)}</p>`;
    }
  }
  buffer = '';
  mode = null;
}

function skipUntilNextHeading(lines, startIdx) {
  let i = startIdx + 1;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (/^#{1,4}\s+/.test(t)) break;
    i++;
  }
  return i - 1; // back to last non-heading line, so i++ lands on heading
}

let slideCounter = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // Top-level H1 (only one)
  if (/^#\s+/.test(trimmed)) {
    flushBuffer();
    // Title block: not a slide, treat as intro
    const title = trimmed.replace(/^#\s+/, '');
    if (!slides.length) {
      // First slide: title
      slides.push({
        num: ++slideCounter,
        title: title,
        html: `<p style="text-align:center;font-size:20px;color:#4A2C2A;font-weight:700;">${title}</p>`,
        type: 'title'
      });
    }
    continue;
  }

  // H2 = block header (Блок 1, Блок 2, etc.) — except Содержание and meta
  if (/^##\s+/.test(trimmed)) {
    flushBuffer();
    const header = trimmed.replace(/^##\s+/, '');
    if (header === 'Содержание') {
      // TOC block (skip — we generate our own)
      i = skipUntilNextHeading(lines, i);
      continue;
    }
    if (header.startsWith('Партия')) {
      // Skip
      continue;
    }
    // Start a new block
    currentBlock = { name: header, slides: [] };
    tocBlocks.push(currentBlock);
    // Auto-open a slide with the block header as title
    currentSlide = {
      num: ++slideCounter,
      title: header,
      html: '',
      type: 'section',
      block: currentBlock
    };
    slides.push(currentSlide);
    currentBlock.slides.push({ num: slideCounter, anchor: `slide-${slideCounter}`, title: header });
    mode = 'p';
    buffer = '';
    continue;
  }

  // H3 = new slide
  if (/^###\s+/.test(trimmed)) {
    flushBuffer();
    const title = trimmed.replace(/^###\s+/, '');
    // Detect self-check slide
    let type = 'normal';
    if (/Самопроверка|Финальная|Сборник/i.test(title)) type = 'final';
    else if (/^Титул|^Что мы [^»"]|^Вспоминашка|^Карта темы|^Глоссарий|^Содержание/i.test(title)) type = 'bridge';

    currentSlide = {
      num: ++slideCounter,
      title: title,
      html: '',
      type: type,
      block: currentBlock
    };
    slides.push(currentSlide);
    if (currentBlock) currentBlock.slides.push({ num: slideCounter, anchor: `slide-${slideCounter}`, title });
    mode = 'p';
    buffer = '';
    continue;
  }

  // H4 inside slide
  if (/^####\s+/.test(trimmed)) {
    flushBuffer();
    const title = trimmed.replace(/^####\s+/, '');
    buffer = `<h4>${processInline(title)}</h4>`;
    mode = 'p';
    continue;
  }

  // Horizontal rule
  if (/^---+$/.test(trimmed)) {
    flushBuffer();
    if (currentSlide) currentSlide.html += '<hr style="border:1px dashed #D4C8B5;margin:16px 0;"/>';
    continue;
  }

  // Blockquote (>)
  if (/^>\s?/.test(trimmed)) {
    if (mode !== 'quote') flushBuffer();
    mode = 'quote';
    const content = trimmed.replace(/^>\s?/, '');
    buffer += `<p>${processInline(content)}</p>`;
    continue;
  }

  // List item (- or *)
  if (/^[-*]\s+/.test(trimmed)) {
    if (mode !== 'ul') flushBuffer();
    mode = 'ul';
    const content = trimmed.replace(/^[-*]\s+/, '');
    buffer += `<li>${processInline(content)}</li>`;
    continue;
  }

  // Ordered list
  if (/^\d+\.\s+/.test(trimmed)) {
    if (mode !== 'ol') flushBuffer();
    mode = 'ol';
    const content = trimmed.replace(/^\d+\.\s+/, '');
    buffer += `<li>${processInline(content)}</li>`;
    continue;
  }

  // Display math \[...\]
  if (/^\\\[\s*$/.test(trimmed) || trimmed.startsWith('\\[')) {
    flushBuffer();
    mode = 'math';
    let mathContent = trimmed.replace(/^\\\[\s*/, '');
    if (mathContent === '') {
      // collect until \]
      while (++i < lines.length) {
        const next = lines[i].trim();
        if (next === '\\]' || next.startsWith('\\]')) break;
        mathContent += ' ' + next;
      }
    }
    buffer = `\\[${mathContent}\\]`;
    flushBuffer();
    continue;
  }

  // Table
  if (/^\|/.test(trimmed)) {
    if (mode !== 'table') flushBuffer();
    mode = 'table';
    const cells = trimmed.split('|').slice(1, -1).map(c => processInline(c.trim()));
    if (/^\|[\s-:|]+\|$/.test(trimmed)) {
      // separator row, skip
      continue;
    }
    // Decide header vs body row
    if (!currentSlide._tableHeader) {
      buffer = `<table><thead><tr>${cells.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>`;
      currentSlide._tableHeader = true;
    } else {
      buffer += `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    }
    // Detect end of table: next line not starting with |
    if (!/^\|/.test(lines[i+1] || '')) {
      buffer += `</tbody></table>`;
      flushBuffer();
    }
    continue;
  }

  // <details>...</details>  blocks (preserve as-is)
  if (trimmed.startsWith('<details')) {
    flushBuffer();
    mode = 'details';
    buffer = trimmed;
    // Collect until </details>
    let depth = 1;
    while (depth > 0 && ++i < lines.length) {
      const next = lines[i];
      buffer += '\n' + next;
      if (next.trim().startsWith('<details')) depth++;
      if (next.trim().startsWith('</details>')) depth--;
    }
    // For details blocks: escape ONLY non-tag characters (preserve <details>, <summary>, etc.)
    // Split into lines, escape text lines, keep tag lines as-is
    const detailLines = buffer.split('\n');
    const processedLines = detailLines.map(line => {
      const t = line.trim();
      if (t.startsWith('<') && t.endsWith('>') && !t.includes('\\')) return line;
      return processInline(line);
    });
    buffer = processedLines.join('\n');
    flushBuffer();
    continue;
  }

  // Empty line — flush paragraph
  if (trimmed === '') {
    flushBuffer();
    mode = null;
    continue;
  }

  // Default: paragraph text
  if (mode !== 'p') flushBuffer();
  mode = 'p';
  buffer += (buffer ? '\n' : '') + trimmed;
}

// Final flush
flushBuffer();

// ---------- Generate HTML ----------

const css = `
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
main.content { flex:1; max-width:880px; padding:40px 48px; margin:0 auto; background:transparent; }
section.slide { background:#FFFFFF; border-radius:8px; box-shadow:0 2px 8px rgba(74,44,42,0.08); padding:28px 32px; margin-bottom:28px; scroll-margin-top:20px; border:1px solid #E8DFD0; }
section.slide.final-slide { border-left:4px solid #38a169; }
section.slide.reference-slide { border-left:4px solid #d69e2e; background:#fffff0; }
section.slide.section-slide { background:linear-gradient(135deg, #FBF5E6 0%, #F4ECD8 100%); border-left:4px solid #6B5B95; }
section.slide.title-slide { text-align:center; background:linear-gradient(135deg, #4A2C2A 0%, #3E2723 100%); color:#F5F2EB; border:none; }
section.slide.title-slide h2 { color:#F5F2EB; }
section.slide.bridge-slide { background:linear-gradient(135deg, #FBF5E6 0%, #F4ECD8 100%); border-left:4px solid #6B5B95; }
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
.slide-body th, .slide-body td { border:1px solid #e2e8f0; padding:8px 12px; text-align:left; vertical-align:top; }
.slide-body th { background:#F5F0E0; font-weight:600; color:#2d3748; }
.slide-body code { background:#edf2f7; padding:1px 6px; border-radius:3px; font-family:'JetBrains Mono',Consolas,Monaco,monospace; font-size:0.92em; }
.math-block { text-align:center; margin:0.9em 0; padding:0.2em 0; overflow-x:auto; overflow-y:hidden; }
.math-block .katex-display { margin:0; }
.slide-body .katex { font-weight: 700; color: #2C2C2C; }
.slide-body p > .katex, .slide-body li > .katex { font-size: 1.05em; }
.slide-body img.slide-image { display:block; max-width:100%; height:auto; margin:14px auto; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
details { margin:12px 0; padding:12px 18px; background:#FBF7EE; border-left:4px solid #6B8E5B; border-radius:6px; }
details summary { cursor:pointer; font-weight:700; color:#3E2723; }
details[open] summary { margin-bottom:8px; }
button.back-to-toc { position:fixed; bottom:24px; right:24px; background:#4A2C2A; color:#F5F2EB; border:none; padding:10px 16px; border-radius:999px; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(74,44,42,0.3); z-index:10; font-weight:600; }
button.back-to-toc:hover { background:#3E2723; }
@media (max-width:900px) { .layout { flex-direction:column; } nav.toc { width:100%; height:auto; position:relative; } main.content { padding:20px; } }
`;

// Build TOC
let tocHtml = '<h1>v17 — Объёмы многогранников</h1>';
for (const block of tocBlocks) {
  tocHtml += `<a class="block-header">${block.name}</a>`;
  for (const sl of block.slides) {
    tocHtml += `<a class="slide-link" href="#slide-${sl.num}">${sl.num}. ${sl.title}</a>`;
  }
}

// Build slides
let slidesHtml = '';
for (const sl of slides) {
  let cls = 'slide';
  if (sl.type === 'final') cls += ' final-slide';
  else if (sl.type === 'section') cls += ' section-slide';
  else if (sl.type === 'title') cls += ' title-slide';
  else if (sl.type === 'bridge') cls += ' bridge-slide';

  slidesHtml += `<section class="${cls}" id="slide-${sl.num}">`;
  slidesHtml += `<header class="slide-header"><span class="slide-num">Слайд ${sl.num}</span><h2>${processInline(sl.title)}</h2></header>`;
  slidesHtml += `<div class="slide-body">${sl.html}</div>`;
  slidesHtml += `</section>`;
}

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>v17 — Объёмы многогранников — читалка</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.css">
<script>
window.addEventListener('DOMContentLoaded', () => {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '\\\\(', right: '\\\\)', display: false},
        {left: '\\\\[', right: '\\\\]', display: true}
      ],
      throwOnError: false
    });
  }
});
</script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<style>${css}</style>
</head>
<body>
<div class="layout">
<nav class="toc">${tocHtml}</nav>
<main class="content">${slidesHtml}</main>
</div>
<button class="back-to-toc" onclick="window.scrollTo(0,0)">↑ К началу</button>
</body>
</html>`;

fs.writeFileSync(OUT, html, 'utf8');

// ---------- Generate preview.html (overview / TOC card) ----------

const PREVIEW = path.join(__dirname, '..', 'v17 — Объёмы многогранников — preview.html');

// Group slides by block
const blocksGrouped = [];
const seenBlocks = new Set();
for (const block of tocBlocks) {
  blocksGrouped.push({ name: block.name, slides: block.slides });
}

let previewBody = '';
for (const block of blocksGrouped) {
  const slidesList = block.slides.map(sl => `<li style="margin-bottom:4px;"><a href="v17 — Объёмы многогранников — reader.html#slide-${sl.num}" style="color:#2b6cb0;text-decoration:none;">${sl.num}. ${sl.title}</a></li>`).join('');
  previewBody += `<details style="margin-bottom:14px;background:#fff;padding:14px 18px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.05);"><summary style="font-weight:700;color:#2b6cb0;cursor:pointer;font-size:16px;">${block.name} <span style="color:#a0aec0;font-weight:400;">(${block.slides.length} ${block.slides.length === 1 ? 'слайд' : 'слайдов'})</span></summary><ol style="margin-top:10px;padding-left:24px;color:#2d3748;">${slidesList}</ol></details>`;
}

const previewHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>v17 — Объёмы многогранников — обзор</title>
<style>
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#F5F2EB; color:#3E2723; background-image:linear-gradient(180deg, rgba(245,242,235,1) 0%, rgba(240,235,225,1) 100%); }
h1 { margin:0 0 8px 0; color:#3E2723; }
</style>
</head>
<body>
<h1>v17 — Объёмы многогранников — обзор</h1>
<p style="color:#4a5568;margin-bottom:24px;">Всего <strong>${slides.length}</strong> слайдов в <strong>${tocBlocks.length}</strong> разделах.</p>
${previewBody}
</body>
</html>`;

fs.writeFileSync(PREVIEW, previewHtml, 'utf8');

console.log(`Generated: ${OUT}`);
console.log(`Generated: ${PREVIEW}`);
console.log(`Total slides: ${slides.length}`);
console.log(`Total blocks: ${tocBlocks.length}`);