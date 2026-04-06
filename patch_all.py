import os, glob

pub = r'C:\Dev\forgedlucidity-site\public'
for f in glob.glob(os.path.join(pub, '**/*.html'), recursive=True):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    count = content.count('Research Institute')
    if count > 0:
        print(f'{f}: {count} instances')
        content = content.replace('Forged Lucidity Research Institute', 'Forged Lucidity')
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        print(f'  -> Fixed')
    else:
        print(f'{f}: clean')
