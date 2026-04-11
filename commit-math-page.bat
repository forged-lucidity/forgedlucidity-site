@echo off
cd /d C:\Dev\forgedlucidity-site
git add public/research/mathematics.html
git commit -m "Add mathematics page with KaTeX rendering, formal theorem citations from KIP integrations"
git push origin main
echo DONE
pause