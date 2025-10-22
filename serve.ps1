param([int]$Port=5173)
Add-Type -AssemblyName System.Net.HttpListener
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix); $listener.Start()
Write-Host "Server on $prefix"
function CT($p){ switch ([IO.Path]::GetExtension($p).ToLower()) {
  ".html"{"text/html"} ".js"{"application/javascript"} ".css"{"text/css"} ".json"{"application/json"}
  ".png"{"image/png"} ".jpg"{"image/jpeg"} ".jpeg"{"image/jpeg"} ".svg"{"image/svg+xml"} default{"application/octet-stream"} } }
try { while($listener.IsListening){ $c=$listener.GetContext(); $p=$c.Request.Url.LocalPath.TrimStart('/'); if([string]::IsNullOrWhiteSpace($p)){$p='index.html'}
  $fs=Join-Path (Get-Location) $p; if(!(Test-Path $fs)){ $c.Response.StatusCode=404; $b=[Text.Encoding]::UTF8.GetBytes('Not Found'); $c.Response.OutputStream.Write($b,0,$b.Length); $c.Response.OutputStream.Close(); continue }
  try{ $b=[IO.File]::ReadAllBytes($fs); $c.Response.ContentType=CT $fs; $c.Response.OutputStream.Write($b,0,$b.Length) }finally{ $c.Response.OutputStream.Close() } } } finally { $listener.Stop() }