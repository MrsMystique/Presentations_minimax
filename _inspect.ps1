$mdPath = "C:\Users\admin\Desktop\математика мои слайды\Minimax\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md"
$md = Get-Content $mdPath -Raw -Encoding UTF8

# Найдём все места с маркерами стикеров и их контекст
$matches = [regex]::Matches($md, '(?ms)(?:^|\n)(<!--(?:STICKER|INLINE):[^>]+-->\s*)+')
Write-Host "Всего групп маркеров: $($matches.Count)"
$matches | Select-Object -First 30 | ForEach-Object {
    $ctx = $_.Value.Substring(0, [Math]::Min(150, $_.Value.Length))
    $clean = $ctx -replace "`r", "" -replace "`n", " | "
    Write-Host "  $clean"
}

Write-Host "`nИТОГО маркеров:"
$total = ([regex]::Matches($md, '<!--(?:STICKER|INLINE):')).Count
Write-Host "  $total"
