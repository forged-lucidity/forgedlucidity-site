const fs = require('fs');
const path = require('path');

// Read all HTML files in public/
const pubDir = 'C:\\Dev\\forgedlucidity-site\\public';
const htmlFiles = fs.readdirSync(pubDir)
  .filter(f => f.endsWith('.html'));

console.log('Found', htmlFiles.length, 'HTML files');

let totalPatched = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(pubDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  const original = content;

  // 1. BOOST TEXT CONTRAST
  // --text-muted: 0.5 opacity -> 0.65
  if (content.includes('--text-muted: rgba(11,19,32,0.5)')) {
    content = content.replace(
      '--text-muted: rgba(11,19,32,0.5)',
      '--text-muted: rgba(11,19,32,0.65)'
    );
    changes++;
  }

  // --text-dim: 0.35 -> 0.45
  if (content.includes('--text-dim: rgba(11,19,32,0.35)')) {
    content = content.replace(
      '--text-dim: rgba(11,19,32,0.35)',
      '--text-dim: rgba(11,19,32,0.45)'
    );
    changes++;
  }

  // 2. HEADER: dark overlay -> parchment-based
  if (content.includes('background: rgba(11, 19, 32, 0.95)')) {
    content = content.replace(
      'background: rgba(11, 19, 32, 0.95)',
      'background: rgba(244, 241, 232, 0.97)'
    );
    changes++;
  }

  // 3. SECTION DIVIDERS: stronger visibility
  // rule-brass opacity 0.12 -> 0.2
  if (content.includes('--rule-brass: rgba(11,19,32,0.12)')) {
    content = content.replace(
      '--rule-brass: rgba(11,19,32,0.12)',
      '--rule-brass: rgba(11,19,32,0.2)'
    );
    changes++;
  }

  // 4. DISCOVERY CARDS: more padding, stronger borders, subtle bg
  if (content.includes('border: 1px solid rgba(123,45,59,0.06)')) {
    content = content.replace(
      'border: 1px solid rgba(123,45,59,0.06)',
      'border: 1px solid rgba(11,19,32,0.1); background: rgba(11,19,32,0.02)'
    );
    changes++;
  }
  // Discovery hover: stronger
  if (content.includes('border-color: rgba(123,45,59,0.15)')) {
    content = content.replace(
      'border-color: rgba(123,45,59,0.15)',
      'border-color: rgba(154,123,79,0.4); box-shadow: 0 2px 12px rgba(11,19,32,0.06)'
    );
    changes++;
  }
  // Discovery padding: 1.5rem -> 2rem
  if (content.includes('.discovery-item {\n    padding: 1.5rem;') ||
      content.includes('.discovery-item {\r\n    padding: 1.5rem;')) {
    content = content.replace(
      /\.discovery-item \{[\r\n]+\s+padding: 1\.5rem;/,
      '.discovery-item {\n    padding: 2rem;'
    );
    changes++;
  }

  // 5. BODY TEXT: 0.95rem -> 1rem
  if (content.includes('font-size: 0.95rem; line-height: 1.75;')) {
    content = content.replace(
      'font-size: 0.95rem; line-height: 1.75;',
      'font-size: 1rem; line-height: 1.8;'
    );
    changes++;
  }

  // 6. EMAIL INPUT: better contrast on light bg
  if (content.includes('background: rgba(11,19,32,0.04)')) {
    content = content.replace(
      'background: rgba(11,19,32,0.04)',
      'background: rgba(255,255,255,0.7)'
    );
    changes++;
  }

  // 7. BUTTON HOVER: more visible feedback
  // CTA hover
  if (content.includes('background: var(--garnet-glow)')) {
    content = content.replace(
      'background: var(--garnet-glow)',
      'background: rgba(139,35,53,0.08); box-shadow: 0 2px 8px rgba(139,35,53,0.12)'
    );
    changes++;
  }
  // Email button hover
  if (content.includes("background: rgba(123,45,59,0.06);")) {
    content = content.replace(
      "background: rgba(123,45,59,0.06);",
      "background: rgba(154,123,79,0.12); border-color: var(--forged-brass);"
    );
    changes++;
  }

  // 8. FOOTER: more breathing room
  if (content.includes('padding: 2.5rem 2rem;')) {
    content = content.replace(
      'padding: 2.5rem 2rem;',
      'padding: 3.5rem 2rem 2.5rem;'
    );
    changes++;
  }
  // Footer border: stronger
  if (content.includes('border-top: 1px solid rgba(11,19,32,0.04)')) {
    content = content.replace(
      'border-top: 1px solid rgba(11,19,32,0.04)',
      'border-top: 1px solid rgba(11,19,32,0.12)'
    );
    changes++;
  }

  // 9. EMAIL BLOCK: better bg for light theme
  if (content.includes('background: var(--navy-light)')) {
    content = content.replace(
      'background: var(--navy-light)',
      'background: rgba(11,19,32,0.03)'
    );
    changes++;
  }

  // 10. NAV LINK COLORS: slightly more visible
  if (content.includes('color: rgba(123,45,59,0.25)')) {
    content = content.replace(
      /color: rgba\(123,45,59,0\.25\)/g,
      'color: rgba(11,19,32,0.4)'
    );
    changes++;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalPatched++;
    console.log('  ' + file + ': ' + changes + ' changes');
  }
});

console.log('\nTotal files patched:', totalPatched, '/', htmlFiles.length);
