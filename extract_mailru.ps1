$ErrorActionPreference = 'Stop';
$root = $PSScriptRoot;
$outFile = Join-Path $root 'mailru_index.html';
$jsonFile = Join-Path $root 'mailru_index.json';
$listingFile = Join-Path $root 'mailru_filelist.txt';

$url = 'https://cloud.mail.ru/public/5nhU/ACJCSfeTC';
$headers = @{
  'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  'Accept' = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
};

Write-Host 'Downloading page...';
$r = Invoke-WebRequest -Uri $url -Headers $headers -Method GET -TimeoutSec 60 -UseBasicParsing -ErrorAction Stop;
$html = [System.Text.Encoding]::UTF8.GetString([System.Text.Encoding]::UTF8.GetBytes($r.Content));
[System.IO.File]::WriteAllText($outFile, $html, (New-Object System.Text.UTF8Encoding $false));
Write-Host ('Saved ' + $html.Length + ' bytes to ' + $outFile);

# Извлечём все объекты с "name":"..." и "weblink":"..."
$fileObjects = [regex]::Matches($html, '\{\s*"name"\s*:\s*"[^"]*"\s*,\s*"weblink"\s*:\s*"[^"]*"\s*,\s*"size"\s*:\s*\d+[^}]*\}');
Write-Host ('Found ' + $fileObjects.Count + ' file entries');

$records = New-Object System.Collections.Generic.List[object];
foreach ($m in $fileObjects) {
  $obj = $m.Value;
  $name = ([regex]::Match($obj, '"name"\s*:\s*"([^"]*)"')).Groups[1].Value;
  $weblink = ([regex]::Match($obj, '"weblink"\s*:\s*"([^"]*)"')).Groups[1].Value;
  $size = ([regex]::Match($obj, '"size"\s*:\s*(\d+)')).Groups[1].Value;
  $hash = ([regex]::Match($obj, '"hash"\s*:\s*"([^"]*)"')).Groups[1].Value;
  $kind = ([regex]::Match($obj, '"kind"\s*:\s*"([^"]*)"')).Groups[1].Value;
  $mtime = ([regex]::Match($obj, '"mtime"\s*:\s*(\d+)')).Groups[1].Value;
  $records.Add([PSCustomObject]@{
    Name = $name
    Weblink = $weblink
    Size = [int64]$size
    Hash = $hash
    Kind = $kind
    MTime = $mtime
  });
}

# Сортируем по имени (натурально)
$records = $records | Sort-Object { [regex]::Replace($_.Name, '\d+', { $args[0].Value.PadLeft(5) }) };

# Сводка
$totalBytes = ($records | Measure-Object -Property Size -Sum).Sum;
Write-Host '';
Write-Host ('=== TOTAL FILES: ' + $records.Count + ' ===');
Write-Host ('=== TOTAL SIZE: ' + ('{0:N2} GB' -f ($totalBytes/1GB)) + ' ===');
Write-Host '';

# Сохраним в JSON
$records | ConvertTo-Json -Depth 4 | Out-File -FilePath $jsonFile -Encoding UTF8;
Write-Host ('Saved JSON list to ' + $jsonFile);

# Сохраним текстовый листинг
$sb = New-Object System.Text.StringBuilder;
$null = $sb.AppendLine(('=' * 90));
$null = $sb.AppendLine(('Files in ' + $url));
$null = $sb.AppendLine(('=' * 90));
$null = $sb.AppendLine(('Total: ' + $records.Count + ' files   ' + ('{0:N2} GB' -f ($totalBytes/1GB))));
$null = $sb.AppendLine(('=' * 90));
foreach ($r2 in $records) {
  $bytes = $r2.Size;
  if ($bytes -gt 1GB) { $sz = ('{0,8:N2} GB' -f ($bytes/1GB)) }
  elseif ($bytes -gt 1MB) { $sz = ('{0,8:N2} MB' -f ($bytes/1MB)) }
  elseif ($bytes -gt 1KB) { $sz = ('{0,8:N2} KB' -f ($bytes/1KB)) }
  else { $sz = ('{0,8} B' -f $bytes) }
  $null = $sb.AppendLine(($sz + '   ' + $r2.Name));
}
[System.IO.File]::WriteAllText($listingFile, $sb.ToString(), (New-Object System.Text.UTF8Encoding $false));
Write-Host ('Saved listing to ' + $listingFile);

# Также выведем всё в консоль
Write-Host '';
foreach ($r2 in $records) {
  $bytes = $r2.Size;
  if ($bytes -gt 1GB) { $sz = ('{0,8:N2} GB' -f ($bytes/1GB)) }
  elseif ($bytes -gt 1MB) { $sz = ('{0,8:N2} MB' -f ($bytes/1MB)) }
  elseif ($bytes -gt 1KB) { $sz = ('{0,8:N2} KB' -f ($bytes/1KB)) }
  else { $sz = ('{0,8} B' -f $bytes) }
  Write-Host ($sz + '   ' + $r2.Name)
}
