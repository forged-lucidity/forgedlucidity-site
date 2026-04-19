@echo off
setlocal enabledelayedexpansion
cd /d C:\Dev\forgedlucidity-site

REM Create output file
(
echo === COMMIT VERIFICATION ===
echo.
echo === Last 3 commits ===
git log --oneline -3
echo.
echo === Current git status ===
git status
echo.
echo === Staged files check ===
git diff --cached --name-only
) > verify-result.txt 2>&1

type verify-result.txt
