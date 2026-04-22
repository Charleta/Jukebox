$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$bat = Join-Path $root 'scripts\kiosk-start.bat'
$taskName = 'Jukebox Kiosk'

if (-not (Test-Path $bat)) {
  throw "No se encontró kiosk-start.bat en: $bat"
}

$action = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument "/c `"$bat`""
$trigger = New-ScheduledTaskTrigger -AtLogOn
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
$task = New-ScheduledTask -Action $action -Trigger $trigger -Principal $principal -Settings $settings

Register-ScheduledTask -TaskName $taskName -InputObject $task -Force | Out-Null

Write-Host "Tarea creada: $taskName"
Write-Host "Se iniciará al abrir sesión de Windows."
