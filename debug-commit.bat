@echo off
setlocal enabledelayedexpansion

cd /d C:\Dev\forgedlucidity-site

echo Starting commit process...
echo Current directory:
cd

echo.
echo Git version check:
git --version

echo.
echo Current git status before staging:
git status

echo.
echo Staging files...
git add build_new_index.py 2>&1
if errorlevel 1 (
    echo Error adding build_new_index.py
) else (
    echo Successfully added build_new_index.py
)

git add commit-evidence-pages.bat 2>&1
git add commit-math-page.bat 2>&1
git add commit-site-updates.bat 2>&1
git add commit_fix.bat 2>&1
git add deploy-intake.bat 2>&1
git add git-push.bat 2>&1
git add git-sweep.bat 2>&1
git add commit-msg.txt 2>&1

echo.
echo Status after staging:
git status

echo.
echo Creating commit...
git commit -m "chore: add build automation scripts" -m "Git workflow and deployment automation scripts for site management." -m "Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

if errorlevel 1 (
    echo Commit may have failed, checking status
    git status
) else (
    echo Commit succeeded
)

echo.
echo Final log:
git log --oneline -1

echo Process complete
