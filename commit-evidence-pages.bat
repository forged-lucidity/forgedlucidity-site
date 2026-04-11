@echo off
cd /d C:\Dev\forgedlucidity-site
git add public/research/domains.html
git add public/research/significance.html
git add public/research/index.html
git add public/index.html
git status
git commit -m "Add evidence pages: domains with real ELICIT data, rewrite significance with formal methodology, correct 7->6 domains sitewide"
git push origin main
echo DONE
pause