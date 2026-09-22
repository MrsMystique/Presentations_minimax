$ErrorActionPreference = 'Stop';
$url = 'https://cloud.mail.ru/public/5nhU/ACJCSfeTC';
$headers = @{
  'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  'Accept' = 'application/json, text/plain, */*'
  'Referer' = 'https://cloud.mail.ru/'
  'Origin' = 'https://cloud.mail.ru'
};

# Имя целевого файла (урок 1)
$targetName = '1. Утвердительные предложения с глаголами.mp4';
$encoded = [uri]::EscapeDataString($targetName);

# 1. Запросим download endpoint
$candidates = @(
  "https://cloud.mail.ru/api/v2/public/download?folder_id=5nhU%2FACJCSfeTC&name=$encoded",
  "https://cloud.mail.ru/api/v2/public/folder/download?folder_id=5nhU%2FACJCSfeTC&name=$encoded",
  "https://cloud.mail.ru/api/v2/public/file?folder_id=5nhU%2FACJCSfeTC&name=$encoded",
  "https://cloud.mail.ru/api/v2/public/weblink/download?weblink=5nhU%2FACJCSfeTC%2F$encoded"
);
foreach ($u in $candidates) {
  Write-Host ('=== ' + $u + ' ===') -ForegroundColor Cyan;
  try {
    $r = Invoke-WebRequest -Uri $u -Headers $headers -Method GET -TimeoutSec 20 -UseBasicParsing -ErrorAction Stop;
    Write-Host ('STATUS: ' + $r.StatusCode);
    Write-Host $r.Content;
  } catch {
    Write-Host ('ERR: ' + $_.Exception.Message);
    if ($_.Exception.Response) {
      try {
        $stream = $_.Exception.Response.GetResponseStream();
        $sr = [System.IO.StreamReader]::new($stream);
        Write-Host ('BODY: ' + $sr.ReadToEnd());
      } catch {}
    }
  }
  Write-Host '';
}
