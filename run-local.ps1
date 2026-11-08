$ErrorActionPreference = "Stop"
$port = 5500
$python = Get-Command py -ErrorAction SilentlyContinue
if ($python) {
  Start-Process "http://localhost:$port"
  py -m http.server $port
} else {
  $python = Get-Command python -ErrorAction SilentlyContinue
  if (-not $python) {
    Write-Host "Python not found. In VS Code, use Live Server on index.html instead."
    exit 1
  }
  Start-Process "http://localhost:$port"
  python -m http.server $port
}
