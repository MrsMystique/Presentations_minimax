$ErrorActionPreference = 'Stop'
$enc = [System.Text.Encoding]::UTF8
$f = $enc.GetString([System.Text.Encoding]::Default.GetBytes('C:\Users\admin\Desktop\математика мои слайды\Minimax\ready\Квадратный_трехчлен_Полный_гайд.md'))
$lines = [System.IO.File]::ReadAllLines($f, $enc)
Write-Host ('Total lines: ' + $lines.Count)
Write-Host '--- Section markers ---'
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^## СЕКЦИЯ') {
        Write-Host (($i+1).ToString() + ': ' + $lines[$i])
    }
}
Write-Host '--- Subsection markers ---'
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^#### Подсекция') {
        Write-Host (($i+1).ToString() + ': ' + $lines[$i])
    }
}