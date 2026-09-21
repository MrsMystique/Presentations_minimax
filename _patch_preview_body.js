const fs = require('fs');
const p = '_build_procenti_v3_3.js';
let c = fs.readFileSync(p, 'utf8');

// preview body — escaped quotes
const from = `body { font-family:-apple-system,BlinkMacSystemFont,\\'Segoe UI\\',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#FAF6EE; color:#1a202c; }`;
const to = `body { font-family:-apple-system,BlinkMacSystemFont,\\'Segoe UI\\',Roboto,sans-serif; max-width:900px; margin:0 auto; padding:32px 24px; background:#F5F2EB; color:#3E2723; background-image:linear-gradient(180deg, rgba(245,242,235,1) 0%, rgba(240,235,225,1) 100%); }`;
if (c.indexOf(from) >= 0) {
  c = c.replace(from, to);
  console.log('✓ preview body patched');
} else {
  console.log('NOT FOUND');
  // Покажем что есть
  const idx = c.indexOf("max-width:900px; margin:0 auto; padding:32px 24px;");
  if (idx >= 0) {
    console.log('Found at idx:', idx);
    console.log('Context:', c.substring(idx, idx + 300));
  }
}

fs.writeFileSync(p, c, 'utf8');
