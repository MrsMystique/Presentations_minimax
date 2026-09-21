// Автоматически заменяет одинарные бэкслеши на двойные во ВСЕХ строках в _write_v2_part1.js
const fs = require('fs');

const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\_write_v2_part1.js';
let content = fs.readFileSync(path, 'utf8');

// Найти все push(...) вызовы и обработать их содержимое
// Простая замена: внутри одинарных кавычек в push() заменить \( на \\( и \) на \\), \[ на \\[ и \] на \\]
// Но оставить \\, \n, \t как есть

// Подход: для каждой строки, начинающейся с push('...'), найти содержимое и заменить в нём
// \( → \\(
// \) → \\)
// \[ → \\[
// \] → \\]

// Регекс для строковых литералов в одинарных кавычках
// Используем простой парсер: ищем push(' и до '); в конце строки
const lines = content.split('\n');
let totalReplacements = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Только push(...) строки
  if (!line.trimStart().startsWith("push('")) continue;
  // Найти начало и конец строки-литерала
  const start = line.indexOf("push('") + "push('".length;
  // Конец — последний '); в строке
  const end = line.lastIndexOf("');");
  if (end < 0 || end <= start) continue;
  const literal = line.substring(start, end);
  // Заменяем \( → \\(, \) → \\), \[ → \\[, \] → \\]
  // НЕ трогаем \\, \n, \t, \r и т.д.
  let newLiteral = literal;
  // Порядок важен: сначала экранируем уже-экранированные, потом остальные
  // Простой подход: заменяем все одиночные \  на \\, кроме тех, что уже часть \\
  // Лучше: использовать regex с lookahead
  newLiteral = newLiteral.replace(/\\([()\[\]])/g, '\\\\$1');
  // Также \N, \Z, \Q, \R и т.д. (буквы после \) — это LaTeX команды, нужно их экранировать
  // Но они уже НЕ внутри \(...\)? Должны быть. \notin, \in, \subset, \rightarrow, \cdot, \frac, \infty, \subseteq, \triangleq
  // Заменяем \letter → \\letter (когда это НЕ \\ и не часть \\letter)
  // Простой regex: \b(?<!\\)\\[a-zA-Z]  →  \\[a-zA-Z]
  newLiteral = newLiteral.replace(/(?<!\\)\\(?=[a-zA-Z])/g, '\\\\');
  if (newLiteral !== literal) {
    const count = (literal.match(/\\/g) || []).length;
    totalReplacements += count;
    lines[i] = line.substring(0, start) + newLiteral + line.substring(end);
  }
}
console.log('Замен бэкслешей: ' + totalReplacements);
fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Сохранено.');