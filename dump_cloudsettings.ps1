$ErrorActionPreference = 'Stop';
$root = $PSScriptRoot;
$src = Join-Path $root 'mailru_index.html';
$dst = Join-Path $root 'cloudSettings.json';

$content = [System.IO.File]::ReadAllText($src, [System.Text.Encoding]::UTF8);
$idx = $content.IndexOf('window.cloudSettings');
$end = $content.IndexOf('};', $idx);
$json = $content.Substring($idx, $end - $idx + 2);
[System.IO.File]::WriteAllText($dst, $json, (New-Object System.Text.UTF8Encoding $false));
Write-Host ('Saved ' + $json.Length + ' bytes to ' + $dst);
