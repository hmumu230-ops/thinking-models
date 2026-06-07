# run-weekly.ps1 -- Weekly pruning (regularization) advisor.
# Read-only on the data file; the agent only writes a report to automation/reports/.

$ErrorActionPreference = 'Continue'
$Auto     = $PSScriptRoot
$ProjRoot = Split-Path $Auto -Parent
$Claude   = Join-Path $env:APPDATA 'npm\claude.cmd'
$Node     = 'C:\Program Files\nodejs\node.exe'
$Logs     = Join-Path $Auto 'logs'
$Reports  = Join-Path $Auto 'reports'
$McpEmpty = Join-Path $Auto 'empty-mcp.json'
New-Item -ItemType Directory -Force -Path $Logs,$Reports | Out-Null

# Load long-lived auth token (set once by the token helper) so unattended runs authenticate.
if(-not $env:CLAUDE_CODE_OAUTH_TOKEN){ $env:CLAUDE_CODE_OAUTH_TOKEN = [Environment]::GetEnvironmentVariable('CLAUDE_CODE_OAUTH_TOKEN','User') }

$stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$today = Get-Date -Format 'yyyy-MM-dd'
$log   = Join-Path $Logs ("weekly_" + $stamp + ".log")
function Log($m){ $line = (Get-Date -Format 's') + '  ' + $m; Add-Content -Path $log -Value $line -Encoding UTF8; Write-Output $line }

Log "=== Weekly pruner start ==="
$Claude=$null
foreach($p in @((Join-Path $env:APPDATA 'npm\claude.cmd'),(Join-Path $env:USERPROFILE 'AppData\Roaming\npm\claude.cmd'),'C:\Users\29980\AppData\Roaming\npm\claude.cmd',(Join-Path $env:APPDATA 'npm\claude.ps1'),'C:\Users\29980\AppData\Roaming\npm\claude.ps1')){ if($p -and (Test-Path $p)){ $Claude=$p; break } }
if(-not $Claude){ $gc=Get-Command claude.cmd -ErrorAction SilentlyContinue; if(-not $gc){$gc=Get-Command claude -ErrorAction SilentlyContinue}; if($gc){$Claude=$gc.Source} }
if(-not $Claude){ Log "ERROR: claude launcher not found."; exit 1 }

# snapshot data file (safety only; agent must not modify it)
$DataItem = Get-ChildItem $ProjRoot -Filter '*.js' -File | Select-Object -First 1
$before = if($DataItem){ (Get-FileHash $DataItem.FullName -Algorithm MD5).Hash } else { $null }

Set-Location $ProjRoot
$instr = "Read the instruction file at .\automation\weekly-agent.md and follow it EXACTLY. Act fully autonomously; never ask the user anything. Do NOT modify any .js file; only write a markdown report. Today is " + $today + "."
$code = 1; $attempt = 0
while($attempt -lt 2 -and $code -ne 0){
  $attempt++
  Log ("Invoking claude (headless), attempt " + $attempt + " ...")
  $out = & $Claude -p $instr --permission-mode acceptEdits --allowedTools "Read,Glob,Grep,Write" --mcp-config $McpEmpty --strict-mcp-config --model sonnet --effort medium | Out-String
  $code = $LASTEXITCODE
  Add-Content -Path $log -Value $out -Encoding UTF8
  Log ("attempt " + $attempt + " exit code = " + $code)
  if($code -ne 0 -and $attempt -lt 2){ Log "transient failure; retrying in 15s ..."; Start-Sleep -Seconds 15 }
}

# verify the pruner did not touch the data file
if($DataItem){
  $after = (Get-FileHash $DataItem.FullName -Algorithm MD5).Hash
  if($after -ne $before){ Log "WARN: data file changed during weekly run (pruner should be read-only)." } else { Log "Data file untouched (as expected)." }
}
Log "=== Done ==="
