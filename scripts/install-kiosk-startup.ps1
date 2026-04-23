$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$launchBat = Join-Path $root 'scripts\kiosk-start.bat'
$agentScript = Join-Path $root 'scripts\kiosk-agent.cjs'
$launchTaskName = 'Jukebox Kiosk Launcher'
$agentTaskName = 'Jukebox Kiosk Agent'
$nodeExe = (Get-Command node -ErrorAction Stop).Source

if (-not (Test-Path $launchBat)) {
  throw "No se encontró kiosk-start.bat en: $launchBat"
}

$launchAction = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument "/c `"$launchBat`""
$agentAction = New-ScheduledTaskAction -Execute $nodeExe -Argument "`"$agentScript`""
$trigger = New-ScheduledTaskTrigger -AtLogOn
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
$launchTask = New-ScheduledTask -Action $launchAction -Trigger $trigger -Principal $principal -Settings $settings
$agentTask = New-ScheduledTask -Action $agentAction -Trigger $trigger -Principal $principal -Settings $settings

foreach ($taskName in @('Jukebox Kiosk', $launchTaskName, $agentTaskName)) {
  if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
  }
}

Register-ScheduledTask -TaskName $launchTaskName -InputObject $launchTask -Force | Out-Null
Register-ScheduledTask -TaskName $agentTaskName -InputObject $agentTask -Force | Out-Null

Write-Host "Tareas creadas:"
Write-Host " - $launchTaskName"
Write-Host " - $agentTaskName"
Write-Host "Se iniciarán al abrir sesión de Windows."
