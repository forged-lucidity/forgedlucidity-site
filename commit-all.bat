@echo off
REM Commit build automation scripts
REM forgedlucidity-site repository

cd /d C:\Dev\forgedlucidity-site

REM Show current status
echo === Git Status ===
git status

REM Stage all untracked files and modified files
echo.
echo === Staging files ===
git add build_new_index.py
git add commit-evidence-pages.bat
git add commit-math-page.bat
git add commit-site-updates.bat
git add commit_fix.bat
git add deploy-intake.bat
git add git-push.bat
git add git-sweep.bat
git add commit-msg.txt

REM Verify staging
echo.
echo === Verifying staged files ===
git status

REM Commit with message
echo.
echo === Creating commit ===
git commit -m "chore: add build automation scripts" -m "Git workflow and deployment automation scripts for site management." -m "Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

REM Push to origin
echo.
echo === Pushing to origin ===
git push origin

echo.
echo === Commit complete ===
