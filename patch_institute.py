import re

with open(r'C:\Dev\forgedlucidity-site\public\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Count occurrences first
count = html.count('Research Institute')
print(f'Found {count} instances of "Research Institute"')

# Replace all instances
html = html.replace('Forged Lucidity Research Institute', 'Forged Lucidity')
html = html.replace('Research Institute', 'Research Institute')  # no-op, just checking

# Also fix the title tag and meta tags
html = html.replace('<title>Forged Lucidity Research Institute</title>', '<title>Forged Lucidity</title>')

with open(r'C:\Dev\forgedlucidity-site\public\index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Verify
with open(r'C:\Dev\forgedlucidity-site\public\index.html', 'r', encoding='utf-8') as f:
    html2 = f.read()
remaining = html2.count('Research Institute')
print(f'Remaining instances: {remaining}')
