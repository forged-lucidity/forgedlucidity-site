@echo off
cd /d C:\Dev\forgedlucidity-site
git add public/about.html about.html index.html
git commit -m "fix: correct entity to for-profit cooperative LLC"
git push origin main
