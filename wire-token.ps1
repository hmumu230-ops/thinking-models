# wire-token.ps1 -- Run `claude setup-token` and auto-save the long-lived token
# into a persistent user env var (CLAUDE_CODE_OAUTH_TOKEN) for unattended runs.
$ErrorActionPreference = 'Continue'
Write-Host "============================================================"
Write-Host "  Connecting a long-lived token for the daily/weekly agents."
Write-Host "  A browser login will appear -- sign in and authorize."
Write-Host "  (Claude Pro/Max subscription required.)"
Write-Host "============================================================"
Write-Host ""

$tmp = Join-Path $env:TEMP 'tm_setup_token.txt'
claude setup-token 2>&1 | Tee-Object -FilePath $tmp
$out = ''
if(Test-Path $tmp){ $out = Get-Content $tmp -Raw; Remove-Item $tmp -Force -ErrorAction SilentlyContinue }

$m = [regex]::Match($out, 'sk-ant-oat[0-9A-Za-z_\-]+')
Write-Host ""
if($m.Success){
  [Environment]::SetEnvironmentVariable('CLAUDE_CODE_OAUTH_TOKEN', $m.Value, 'User')
  Write-Host "============================================================"
  Write-Host ("  OK  --  token captured (length " + $m.Value.Length + ")")
  Write-Host "  Saved to user env var: CLAUDE_CODE_OAUTH_TOKEN"
  Write-Host "  The background tasks will use it automatically."
  Write-Host ""
  Write-Host "  >>> Go back to Claude and say it is done. <<<"
  Write-Host "============================================================"
} else {
  Write-Host "============================================================"
  Write-Host "  Could not auto-detect a 'sk-ant-oat...' token above."
  Write-Host "  If you can see a token in the text above, copy it and run"
  Write-Host "  this in PowerShell (replace <token>):"
  Write-Host "     setx CLAUDE_CODE_OAUTH_TOKEN <token>"
  Write-Host "============================================================"
}
Write-Host ""
Read-Host "Press Enter to close"
