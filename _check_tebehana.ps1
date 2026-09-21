$readerPath = "C:\Users\admin\Desktop\математика мои слайды\Minimax\Чистовые слайды v3.3 — Проценты, пропорции, масштаб — reader.html"
$html = [System.IO.File]::ReadAllText($readerPath, [System.Text.Encoding]::UTF8)

Write-Host "TEBE-HANA по слайдам:"
$idx = 0
$counts = @{}
while (($idx = $html.IndexOf('tebe-hana', $idx)) -ge 0) {
    $prevSlide = $html.LastIndexOf('id="slide-', $idx)
    if ($prevSlide -gt 0) {
        $end = $html.IndexOf('"', $prevSlide + 10)
        $slideId = $html.Substring($prevSlide + 10, $end - $prevSlide - 10)
        if (-not $counts.ContainsKey($slideId)) { $counts[$slideId] = 0 }
        $counts[$slideId]++
    }
    $idx += 5
}

foreach ($k in ($counts.Keys | Sort-Object)) {
    Write-Host "  Слайд $k -> $($counts[$k]) раз"
}
Write-Host "`nИТОГО: $($counts.Values | Measure-Object -Sum).Sum"
