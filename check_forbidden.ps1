$content = Get-Content 'C:\Users\admin\Desktop\математика мои слайды\Minimax\Рациональные_дроби_Полный_гайд.md' -Encoding UTF8
$forbidden = '[☐☑✓✗✘┌┐└┘├┤┬┴┼─│╔╗╚╝═║▪▫▬▲▼◀▶◆◇○●]'
for ($i = 0; $i -lt $content.Count; $i++) {
    if ($content[$i] -match $forbidden) {
        Write-Host ("Line " + ($i+1) + ": " + $content[$i])
    }
}
Write-Host "DONE"