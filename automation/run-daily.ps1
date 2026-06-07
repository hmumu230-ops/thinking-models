# run-daily.ps1 -- Daily thinking-model collector
# Safety: backup -> run headless claude -> validate JS -> auto-restore if broken.
# All non-ASCII paths are derived at runtime (no Chinese literals in this script).

$ErrorActionPreference = 'Continue'
$Auto     = $PSScriptRoot
$ProjRoot = Split-Path $Auto -Parent
$Claude   = Join-Path $env:APPDATA 'npm\claude.cmd'
$Node     = 'C:\Program Files\nodejs\node.exe'
$Backups  = Join-Path $Auto 'backups'
$Logs     = Join-Path $Auto 'logs'
$Reports  = Join-Path $Auto 'reports'
$McpEmpty = Join-Path $Auto 'empty-mcp.json'
New-Item -ItemType Directory -Force -Path $Backups,$Logs,$Reports | Out-Null

# Load long-lived auth token (set once by the token helper) so unattended runs authenticate.
if(-not $env:CLAUDE_CODE_OAUTH_TOKEN){ $env:CLAUDE_CODE_OAUTH_TOKEN = [Environment]::GetEnvironmentVariable('CLAUDE_CODE_OAUTH_TOKEN','User') }

$stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$today = Get-Date -Format 'yyyy-MM-dd'
$log   = Join-Path $Logs ("daily_" + $stamp + ".log")
function Log($m){ $line = (Get-Date -Format 's') + '  ' + $m; Add-Content -Path $log -Value $line -Encoding UTF8; Write-Output $line }

Log "=== Daily collector start ==="

# per-day idempotency: skip if a successful collection already happened today
$State = Join-Path $Auto 'state'
New-Item -ItemType Directory -Force -Path $State | Out-Null
$marker = Join-Path $State 'last-success.txt'
if((Test-Path $marker) -and ((Get-Content $marker -Raw).Trim() -eq $today)){ Log ("already collected today (" + $today + "); skip."); Log "=== Done ==="; exit 0 }

# The single top-level .js in project root is the model library (Chinese filename, matched by wildcard).
$DataItem = Get-ChildItem $ProjRoot -Filter '*.js' -File | Select-Object -First 1
if(-not $DataItem){ Log "ERROR: model library (*.js) not found in project root."; exit 1 }
$Data = $DataItem.FullName
Log ("diag: APPDATA=[" + $env:APPDATA + "] USER=" + $env:USERNAME + " PROFILE=[" + $env:USERPROFILE + "]")
$Claude=$null
foreach($p in @((Join-Path $env:APPDATA 'npm\claude.cmd'),(Join-Path $env:USERPROFILE 'AppData\Roaming\npm\claude.cmd'),'C:\Users\29980\AppData\Roaming\npm\claude.cmd',(Join-Path $env:APPDATA 'npm\claude.ps1'),'C:\Users\29980\AppData\Roaming\npm\claude.ps1')){ if($p -and (Test-Path $p)){ $Claude=$p; break } }
if(-not $Claude){ $gc=Get-Command claude.cmd -ErrorAction SilentlyContinue; if(-not $gc){$gc=Get-Command claude -ErrorAction SilentlyContinue}; if($gc){$Claude=$gc.Source} }
Log ("diag: claude resolved=[" + $Claude + "]")
if(-not $Claude){ Log "ERROR: claude launcher not found by any method."; exit 1 }
if(-not (Test-Path $Node)){ Log ("WARN: node.exe not at default path; validation will be skipped.") }

# 1) backup
$bk = Join-Path $Backups ("lib_" + $stamp + ".js")
Copy-Item $Data $bk -Force
Log ("Backup -> " + $bk)

# 2) run headless claude agent (OAuth via local creds; MCP suppressed; tool whitelist; auto-accept edits)
Set-Location $ProjRoot
$instr = "Read the instruction file at .\automation\daily-agent.md and follow it EXACTLY. Act fully autonomously; never ask the user anything. Be efficient: at most 3 web searches total, finish within about 5 minutes. Today is " + $today + "."
$code = 1; $attempt = 0
while($attempt -lt 2 -and $code -ne 0){
  $attempt++
  Log ("Invoking claude (headless), attempt " + $attempt + " ...")
  $out = & $Claude -p $instr --permission-mode acceptEdits --allowedTools "Read,Edit,Write,Glob,Grep,WebSearch,WebFetch" --mcp-config $McpEmpty --strict-mcp-config --model sonnet --effort medium | Out-String
  $code = $LASTEXITCODE
  Add-Content -Path $log -Value $out -Encoding UTF8
  Log ("attempt " + $attempt + " exit code = " + $code)
  if($code -ne 0 -and $attempt -lt 2){ Log "transient failure; retrying in 15s ..."; Start-Sleep -Seconds 15 }
}

# mark today as collected on success (success = claude ran, even if it abstained); failures stay unmarked so a later 09:00/logon trigger retries
if($code -eq 0){ Set-Content -Path $marker -Value $today -Encoding ASCII; Log ("marked " + $today + " as collected.") }
else { Log "today not yet successful; will retry on next 09:00 / logon trigger." }

# 3) validate JS; restore backup if broken
if(Test-Path $Node){
  & $Node --check $Data 2>$null
  if($LASTEXITCODE -ne 0){
    Copy-Item $bk $Data -Force
    Log "VALIDATION FAILED -> backup restored. No change applied today."
  } else {
    Log "Validation OK."
  }
}

# 4) keep only newest 30 backups
Get-ChildItem $Backups -Filter 'lib_*.js' | Sort-Object LastWriteTime -Descending | Select-Object -Skip 30 | Remove-Item -Force -ErrorAction SilentlyContinue
Log "=== Done ==="
