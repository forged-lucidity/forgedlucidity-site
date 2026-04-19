@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-Content 'C:\Dev\forgedlucidity-site\public\index.html' -Encoding UTF8 | Select-Object -Skip 449 -First 20 | Out-File 'C:\Dev\forgedlucidity-site\__dump_out.txt' -Encoding ASCII"
