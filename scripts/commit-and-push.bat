@echo off
cd /d C:\Dev\forgedlucidity-site
git add public\*.html public\research\*.html
git status
git commit -F commit-msg.txt
git push origin main
