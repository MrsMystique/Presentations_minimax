// Исправляет \u в push() на \\u чтобы JS не съел Unicode escape
const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_write_procenti_v1_part1.js';
let content = fs.readFileSync(path, 'utf8');

// Найти все строки в push() и экранировать \u → \\u, \d → \\d, \i → \\i и т.д.
// Но НЕ трогать \n (newline escape) и \t и \r
// Нам нужно экранировать бэкслеши, за которыми идут БУКВЫ (LaTeX команды)

// Заменим в строках \uparrow, \downarrow, \implies, \quad, \notin, \lvert, \rvert, \cancel, \mathbb, \text, \frac, \sqrt, \not, \in, \subset, \varnothing, \cdot, \times, \div, \pm, \geq, \leq, \neq, \infty, \ldots, \bar, \underbrace
// Это все LaTeX команды

const latexCommands = [
  '\\uparrow', '\\downarrow', '\\implies', '\\quad', '\\notin',
  '\\lvert', '\\rvert', '\\cancel', '\\mathbb', '\\text',
  '\\frac', '\\sqrt', '\\not', '\\in', '\\subset', '\\varnothing',
  '\\cdot', '\\times', '\\div', '\\pm', '\\geq', '\\leq', '\\neq',
  '\\infty', '\\ldots', '\\bar', '\\underbrace', '\\Leftrightarrow',
  '\\Rightarrow', '\\Leftrightarrow', '\\geq', '\\subset', '\\setminus',
  '\\Rightarrow', '\\neq', '\\Leftrightarrow', '\\leftarrow', '\\rightarrow',
  '\\uparrow', '\\downarrow', '\\Leftarrow', '\\mapsto'
];

for (const cmd of latexCommands) {
  // Заменяем каждое вхождение cmd (без \\) на cmd с \\
  const singleEsc = cmd; // \uparrow
  const doubleEsc = cmd.replace('\\', '\\\\'); // \\uparrow
  // В JS-строке одиночный \u — это escape sequence
  // Чтобы в выходе было \u, в JS-строке нужно \\u
  // Но в файле строка уже имеет \u (без экранирования) — JS читает её как \u1234
  // Нужно заменить в файле: \u → \\u
  // Применяем глобально
  const re = new RegExp(singleEsc.replace(/\\/g, '\\\\'), 'g');
  content = content.replace(re, doubleEsc);
}

// Также для команд типа \cdot, \mathbb — они все начинаются с \\
// Сделаем универсальную замену: любой \X где X — буква → \\X
// Это безопасно, потому что реальные escape sequences JS: \n, \t, \r, \\, \', \", \`, \$, \0-9, \xNN, \uNNNN, \u{NNNN}
// Все остальные — это LaTeX
content = content.replace(/\\([a-zA-Z])/g, '\\\\$1');

// Теперь нужно проверить: \uparrow — это \uparrow, в файле уже должно быть \\uparrow
// Перечитаем и убедимся

fs.writeFileSync(path, content, 'utf8');
console.log('Исправлено. Размер:', content.length);