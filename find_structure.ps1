$f = $args[0]
$lines = Get-Content $f -Encoding UTF8
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line -match '^# ') {
        Write-Host ("{0,5}: {1}" -f ($i+1), $line)
    }
}
