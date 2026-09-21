$mdPath = "C:\Users\admin\Desktop\математика мои слайды\Minimax\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md"
$md = Get-Content $mdPath -Raw -Encoding UTF8

Write-Host "layfkhak контекст:"
$matches = [regex]::Matches($md, '(?s).{0,80}<!--INLINE:layfkhak\.png-->.{0,80}')
foreach ($m in $matches) {
    $clean = $m.Value -replace "`r", "" -replace "`n", " | "
    Write-Host "  $clean"
}

Write-Host "`nsyhraem-v-igru контекст:"
$matches = [regex]::Matches($md, '(?s).{0,80}<!--INLINE:syhraem-v-igru\.png-->.{0,80}')
foreach ($m in $matches) {
    $clean = $m.Value -replace "`r", "" -replace "`n", " | "
    Write-Host "  $clean"
}
