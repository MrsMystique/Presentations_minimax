const fs = require('fs');
const text = fs.readFileSync('check.js', 'utf8');
console.log(text.substring(0, 300));