@echo off
cd /d C:\Dev\forgedlucidity-site
git add build_new_index.py commit-evidence-pages.bat commit-math-page.bat commit-site-updates.bat commit_fix.bat deploy-intake.bat git-push.bat git-sweep.bat commit-msg.txt
git commit -m "chore: add build automation scripts" -m "Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push origin main
