@echo off
cd /d C:\Dev\forgedlucidity-site
echo === Recent commits ===
git log --oneline -5
echo.
echo === Current status ===
git status
