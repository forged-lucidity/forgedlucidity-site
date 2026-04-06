const fs = require('fs');
const p = 'C:\\Dev\\forgedlucidity-site\\public\\index.html';
const content = fs.readFileSync(p, 'utf8');

// Find the <style> block
const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>');
if (styleStart > -1 && styleEnd > -1) {
  const css = content.slice(styleStart, styleEnd + 8);
  console.log('CSS length:', css.length, 'chars');
  console.log(css.slice(0, 3000));
  console.log('\n... TRUNCATED ...\n');
  const lines = css.split('\n');
  console.log('Total CSS lines:', lines.length);
  
  // Key patterns
  lines.forEach((l, i) => {
    if (l.includes('text-muted') || l.includes('section-rule') || 
        l.includes('hover') || l.includes('--text-muted') ||
        l.includes('padding-bottom') || l.includes('.discovery')) {
      console.log((i+1) + ': ' + l.trim());
    }
  });
} else {
  console.log('No style block. Length:', content.length);
  console.log('Start:', content.slice(0, 500));
}
