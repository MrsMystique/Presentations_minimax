const fs = require('fs');
const path = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\ready\\Квадратный_трехчлен_Полный_гайд.md';
const text = fs.readFileSync(path, 'utf8');
const lines = text.split('\n');

// Проверка структуры: ищем все заголовки секций и их подзаголовки
console.log('=== Section structures ===');
let currentSection = null;
let currentSubsection = null;
const structures = {};
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const secMatch = line.match(/^##\s+СЕКЦИЯ\s+(\d+)/);
  if (secMatch) {
    currentSection = secMatch[1];
    structures[currentSection] = { blocks: [], subsections: [] };
    continue;
  }
  const subsecMatch = line.match(/^####\s+(Подсекция\s+([АВБ])|(.+))/);
  if (subsecMatch && currentSection) {
    const name = subsecMatch[1];
    structures[currentSection].subsections.push({ name, line: i + 1 });
    continue;
  }
  // Подзаголовки третьего уровня внутри секции
  const h3Match = line.match(/^###\s+(.+)/);
  if (h3Match && currentSection) {
    const name = h3Match[1];
    structures[currentSection].blocks.push({ name, line: i + 1 });
  }
}

for (const sec in structures) {
  console.log(`\n--- СЕКЦИЯ ${sec} ---`);
  for (const b of structures[sec].blocks) {
    console.log(`  строка ${b.line}: ${b.name}`);
  }
  for (const s of structures[sec].subsections) {
    console.log(`  строка ${s.line}: ${s.name} (подсекция)`);
  }
}

// Проверка "Запомнить"
console.log('\n=== "Запомнить" blocks ===');
const rememberCount = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Запомнить')) {
    rememberCount.push(i + 1);
  }
}
console.log(`Total: ${rememberCount.length}`);
console.log(`Lines: ${rememberCount.join(', ')}`);

// Подсчёт блоков Зачем/Что/Откуда/Как/Где применить/Где ошибиться/Задача
console.log('\n=== Блок-структура секций ===');
const blockNames = ['Зачем', 'Что это', 'Откуда', 'Как считать', 'Где применить', 'Где ошибиться', 'Задача'];
for (const sec in structures) {
  const present = {};
  for (const b of blockNames) {
    present[b] = structures[sec].blocks.filter(x => x.name.startsWith(b)).length;
  }
  console.log(`Секция ${sec}: ${blockNames.map(b => `${b}=${present[b]}`).join(', ')}`);
}

// Проверка "ты", "смотри", "лови", "давай"
console.log('\n=== Обращение к читателю ===');
const appealWords = ['ты ', 'смотри', 'лови', 'давай', 'видишь', 'представь'];
for (const w of appealWords) {
  const idxs = [];
  for (let i = 0; i < lines.length; i++) {
    const re = new RegExp(w, 'gi');
    if (re.test(lines[i])) idxs.push(i + 1);
  }
  console.log(`  "${w}": ${idxs.length} occurrences`);
}

// Метафоры
console.log('\n=== Метафоры (живые) ===');
const metaphors = ['рентген', 'мост', 'арка', 'фонтан', 'мяч', 'торможени', 'бросок', 'автомобил', 'экономик', 'прибыл', 'физик', 'архитектур', 'геометри', 'траектори', 'мост', 'симметр'];
for (const m of metaphors) {
  const idxs = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(m)) idxs.push(i + 1);
  }
  if (idxs.length > 0) console.log(`  "${m}": ${idxs.length} occurrences at ${idxs.slice(0, 5).join(', ')}${idxs.length > 5 ? '...' : ''}`);
}

// Проверка "возраст"
console.log('\n=== Возраст ===');
const ageWords = ['лет', 'возраст', 'подросток', 'школьник', 'ученик', 'студент', 'взросл'];
for (const w of ageWords) {
  const idxs = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(w)) idxs.push(i + 1);
  }
  if (idxs.length > 0) console.log(`  "${w}": ${idxs.length} occurrences, lines ${idxs.slice(0, 10).join(', ')}${idxs.length > 10 ? '...' : ''}`);
}