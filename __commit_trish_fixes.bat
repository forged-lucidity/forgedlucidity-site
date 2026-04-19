@echo off
cd /d C:\Dev\forgedlucidity-site
set GIT="C:\Program Files\Git\cmd\git.exe"
if not exist %GIT% set GIT="C:\Program Files\Git\bin\git.exe"
if not exist %GIT% set GIT="C:\Program Files (x86)\Git\cmd\git.exe"
echo USING GIT: %GIT% > C:\Dev\forgedlucidity-site\__git_status.txt
%GIT% status >> C:\Dev\forgedlucidity-site\__git_status.txt 2>&1
echo --- ADD --- >> C:\Dev\forgedlucidity-site\__git_status.txt
%GIT% add -A >> C:\Dev\forgedlucidity-site\__git_status.txt 2>&1
echo --- COMMIT --- >> C:\Dev\forgedlucidity-site\__git_status.txt
%GIT% commit -m "Trish fixes: truthful DARPA/NASA claim + Ember nav -> Practice" >> C:\Dev\forgedlucidity-site\__git_status.txt 2>&1
echo --- PUSH --- >> C:\Dev\forgedlucidity-site\__git_status.txt
%GIT% push origin main >> C:\Dev\forgedlucidity-site\__git_status.txt 2>&1
echo === DONE === >> C:\Dev\forgedlucidity-site\__git_status.txt
