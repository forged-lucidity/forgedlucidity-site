@echo off
cd /d C:\Dev\forgedlucidity-site
git log --oneline -3 > commit-log.txt 2>&1
git status >> commit-log.txt 2>&1
