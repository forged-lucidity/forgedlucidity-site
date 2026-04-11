@echo off
cd /d C:\Dev\forgedlucidity-site
git add app/api/intake-submit/route.js
git add public/affiliates/braun-law/client-intake/index.html
git commit -m "Add-Braun-Law-client-intake-portal"
git push origin main
echo Done.
