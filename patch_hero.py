import re

with open(r'C:\Dev\forgedlucidity-site\public\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add MAJI2 hero image to the hero section, right before the hero-label div
old = '<div class="hero-label">Forged Lucidity Research Institute</div>'
new = '<img src="/images/maji2-hero.png" alt="MAJI\u00b2 \u2014 Forged Lucidity" style="width: clamp(120px, 18vw, 200px); height: auto; margin-bottom: 2rem; opacity: 0.92; animation: fadeUp 0.8s 0.1s forwards; opacity: 0;">\n  ' + old

html = html.replace(old, new)

with open(r'C:\Dev\forgedlucidity-site\public\index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Done - MAJI2 hero image added to public/index.html')
