@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"Get-ChildItem -Path 'C:\Dev\forgedlucidity-site\public' -Recurse -Include *.html | ForEach-Object { $p = $_.FullName; $c = Get-Content -Path $p -Raw -Encoding UTF8; if ($c -match [regex]::Escape('/ember.html\">Ember')) { $n = $c -replace [regex]::Escape('/ember.html\">Ember'), '/ember.html\">Practice'; [System.IO.File]::WriteAllText($p, $n, (New-Object System.Text.UTF8Encoding $false)); Write-Output ('UPDATED: ' + $p) } }" > C:\Dev\forgedlucidity-site\__rename_out.txt 2>&1
