// Simple test
const fs = require('fs');
const MD_PATH = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\v17 — Объёмы многогранников.md';
console.log('Start');
let md = fs.readFileSync(MD_PATH, 'utf8');
console.log('Loaded:', md.length, 'bytes');
const lines = md.split(/\r?\n/);
console.log('Lines:', lines.length);
console.log('First line:', lines[0]);
console.log('Last line:', lines[lines.length - 1]);
console.log('Done');