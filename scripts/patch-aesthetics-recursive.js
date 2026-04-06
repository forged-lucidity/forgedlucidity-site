const fs = require('fs');
const path = require('path');

function findHtml(dir, results) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) findHtml(full, results);
    else if (item.name.endsWith('.html')) results.push(full);
  }
}

const pubDir = 'C:\\Dev\\forgedlucidity-site\\public';
const htmlFiles = [];
findHtml(pubDir, htmlFiles);
console.log('Found', htmlFiles.length, 'HTML files total');

let totalPatched = 0;
htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let c = 0;

  // All the same replacements
  const replacements = [
    ['--text-muted: rgba(11,19,32,0.5)', '--text-muted: rgba(11,19,32,0.65)'],
    ['--text-dim: rgba(11,19,32,0.35)', '--text-dim: rgba(11,19,32,0.45)'],
    ['background: rgba(11, 19, 32, 0.95)', 'background: rgba(244, 241, 232, 0.97)'],
    ['--rule-brass: rgba(11,19,32,0.12)', '--rule-brass: rgba(11,19,32,0.2)'],
    ['border: 1px solid rgba(123,45,59,0.06)', 'border: 1px solid rgba(11,19,32,0.1); background: rgba(11,19,32,0.02)'],
    ['border-color: rgba(123,45,59,0.15)', 'border-color: rgba(154,123,79,0.4); box-shadow: 0 2px 12px rgba(11,19,32,0.06)'],
    ['font-size: 0.95rem; line-height: 1.75;', 'font-size: 1rem; line-height: 1.8;'],
    ['background: rgba(11,19,32,0.04)', 'background: rgba(255,255,255,0.7)'],
    ['background: var(--garnet-glow)', 'background: rgba(139,35,53,0.08); box-shadow: 0 2px 8px rgba(139,35,53,0.12)'],
    ['padding: 2.5rem 2rem;', 'padding: 3.5rem 2rem 2.5rem;'],
    ['border-top: 1px solid rgba(11,19,32,0.04)', 'border-top: 1px solid rgba(11,19,32,0.12)'],
    ['background: var(--navy-light)', 'background: rgba(11,19,32,0.03)'],
  ];

  replacements.forEach(([old, rep]) => {
    if (content.includes(old)) {
      content = content.replace(old, rep);
      c++;
    }
  });

  // Regex replacements
  if (content.match(/color: rgba\(123,45,59,0\.25\)/)) {
    content = content.replace(/color: rgba\(123,45,59,0\.25\)/g, 'color: rgba(11,19,32,0.4)');
    c++;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalPatched++;
    const rel = path.relative(pubDir, filePath);
    console.log('  ' + rel + ': ' + c + ' changes');
  }
});
console.log('\nPatched:', totalPatched, '/', htmlFiles.length);
