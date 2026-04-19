$root = 'C:\Dev\forgedlucidity-site\public'
$pattern = '/ember.html">Ember'
$replacement = '/ember.html">Practice'
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
Get-ChildItem -Path $root -Recurse -Include *.html | ForEach-Object {
    $p = $_.FullName
    $c = [System.IO.File]::ReadAllText($p)
    if ($c.Contains($pattern)) {
        $n = $c.Replace($pattern, $replacement)
        [System.IO.File]::WriteAllText($p, $n, $utf8NoBom)
        Write-Output ("UPDATED: " + $p)
    }
}
