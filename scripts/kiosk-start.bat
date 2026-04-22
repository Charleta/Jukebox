@echo off
setlocal

rem Jukebox kiosk launcher for Windows
rem - Starts the Next.js server
rem - Opens Chrome in kiosk mode with autoplay allowed

for %%I in ("%~dp0..") do set "ROOT=%%~fI"
set "URL=http://localhost:3000"

rem Ajusta esta ruta si Chrome está instalado en otro lugar.
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"

if not exist "%CHROME%" (
  echo No se encontro Chrome. Ajusta la variable CHROME dentro de scripts\kiosk-start.bat
  exit /b 1
)

start "Jukebox Server" cmd /k "cd /d \"%ROOT%\" && npm run start"

set "READY=0"
for /L %%I in (1,1,60) do (
  powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 http://localhost:3000; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 500) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>nul
  if not errorlevel 1 (
    set "READY=1"
    goto :open_browser
  )
  timeout /t 1 /nobreak > nul
)

:open_browser
if "%READY%"=="0" (
  echo El servidor no respondio a tiempo, abriendo Chrome igual.
)

start "" "%CHROME%" --kiosk --autoplay-policy=no-user-gesture-required "%URL%"

endlocal
