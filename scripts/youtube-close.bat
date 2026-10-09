@echo off
REM Cierra solo las ventanas de YouTube usando el perfil específico
set "YOUTUBE_PROFILE=%~dp0youtube-profile"

REM Intenta cierre normal primero para que Chrome no ofrezca restaurar pestañas.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$items = Get-CimInstance Win32_Process -Filter 'name = ''chrome.exe''' | Where-Object { $_.CommandLine -like '*youtube-profile*' }; foreach ($item in $items) { $proc = Get-Process -Id $item.ProcessId -ErrorAction SilentlyContinue; if ($proc -and $proc.MainWindowHandle -ne 0) { [void]$proc.CloseMainWindow() } }; Start-Sleep -Seconds 3; $remaining = Get-CimInstance Win32_Process -Filter 'name = ''chrome.exe''' | Where-Object { $_.CommandLine -like '*youtube-profile*' }; foreach ($item in $remaining) { Stop-Process -Id $item.ProcessId -Force -ErrorAction SilentlyContinue }; $pref = Join-Path $env:YOUTUBE_PROFILE 'Default\Preferences'; if (Test-Path $pref) { $json = Get-Content -Raw -LiteralPath $pref; $json = $json -replace '""exit_type"":""Crashed""', '""exit_type"":""Normal""'; $json = $json -replace '""exited_cleanly"":false', '""exited_cleanly"":true'; Set-Content -LiteralPath $pref -Value $json -Encoding UTF8 }"

REM Espera 1 segundo
timeout /t 1 /nobreak >nul

REM Verifica si el kiosko sigue corriendo (busca procesos Chrome sin el perfil de YouTube)
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process -Filter 'name = ''chrome.exe''' | Where-Object { $_.CommandLine -notlike '*youtube-profile*' } | Select-Object -First 1" >nul 2>&1

if %ERRORLEVEL% neq 0 (
  REM El kiosko no está corriendo, volver a abrirlo
  call "%~dp0kiosk-start.bat"
)

exit /b 0
