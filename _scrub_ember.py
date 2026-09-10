import os, re, glob
root = r"C:\Dev\_fl_work_Sep3\public"
emb = os.path.join(root, "ember.html")
deleted = os.path.exists(emb)
if deleted:
    os.remove(emb)
changed = []
for path in glob.glob(os.path.join(root, "**", "*.html"), recursive=True):
    with open(path, encoding="utf-8") as f:
        s = f.read()
    # remove any nav anchor pointing at /ember.html (text may be "Ember" or "Practice")
    ns = re.sub(r'\s*<a\b[^>]*href="/ember\.html"[^>]*>.*?</a>', '', s, flags=re.I | re.S)
    if ns != s:
        with open(path, "w", encoding="utf-8") as f:
            f.write(ns)
        changed.append(os.path.relpath(path, root))
print("deleted ember.html:", deleted)
print("nav-stripped files:", changed)
