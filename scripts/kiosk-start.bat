@echo off
setlocal

rem Jukebox kiosk launcher for Windows
rem - Opens Chrome in kiosk mode against the production URL
rem - Used on the dedicated PC del bar

rem Ajusta esta ruta si Chrome está instalado en otro lugar.
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "URL=%JUKEBOX_KIOSK_URL%"
if "%URL%"=="" set "URL=https://jukebox-charletas-projects.vercel.app/"

if not exist "%CHROME%" (
  echo No se encontro Chrome. Ajusta la variable CHROME dentro de scripts\kiosk-start.bat
  exit /b 1
)

start "" "%CHROME%" ^
  --kiosk ^
  --autoplay-policy=no-user-gesture-required ^
  --no-first-run ^
  --disable-session-crashed-bubble ^
  --disable-infobars ^
  "%URL%"

endlocal
