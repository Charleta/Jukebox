@echo off
REM Cierra solo las ventanas de YouTube usando el perfil específico
set "YOUTUBE_PROFILE=%~dp0youtube-profile"

REM Mata procesos de Chrome que usan el perfil de YouTube
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process -Filter 'name = ''chrome.exe''' | Where-Object { $_.CommandLine -like '*youtube-profile*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }"

REM Espera 1 segundo
timeout /t 1 /nobreak >nul

REM Verifica si el kiosko sigue corriendo (busca procesos Chrome sin el perfil de YouTube)
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process -Filter 'name = ''chrome.exe''' | Where-Object { $_.CommandLine -notlike '*youtube-profile*' } | Select-Object -First 1" >nul 2>&1

if %ERRORLEVEL% neq 0 (
  REM El kiosko no está corriendo, volver a abrirlo
  call "%~dp0kiosk-start.bat"
)

exit /b 0
