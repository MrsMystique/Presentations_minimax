// Quick sanity check on the rendered HTML
const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\v17 — Объёмы многогранников — reader.html', 'utf8');
const slideCount = (html.match(/<section class="slide/g) || []).length;
const mathCount = (html.match(/\\\(/g) || []).length;
const tableCount = (html.match(/<table>/g) || []).length;
const detailsCount = (html.match(/<details>/g) || []).length;
const blockquoteCount = (html.match(/<blockquote>/g) || []).length;
const unclosedDetails = (html.match(/<details>/g) || []).length - (html.match(/<\/details>/g) || []).length;
console.log('Slides:', slideCount);
console.log('Math inline (\\\\( opens):', mathCount);
console.log('Tables:', tableCount);
console.log('Details blocks:', detailsCount);
console.log('Details unclosed:', unclosedDetails);
console.log('Blockquotes:', blockquoteCount);
console.log('File length:', html.length, 'bytes');