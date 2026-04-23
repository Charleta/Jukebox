@echo off
setlocal

rem Emergency kiosk restart for Windows
rem - Closes Chrome
rem - Reopens Chrome in kiosk mode against the production app

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "URL=%JUKEBOX_KIOSK_URL%"
if "%URL%"=="" set "URL=https://jukebox-charletas-projects.vercel.app/"

if not exist "%CHROME%" (
  exit /b 1
)

taskkill /IM chrome.exe /F >nul 2>nul
timeout /t 2 /nobreak >nul

start "" "%CHROME%" ^
  --kiosk ^
  --autoplay-policy=no-user-gesture-required ^
  --no-first-run ^
  --disable-session-crashed-bubble ^
  --disable-infobars ^
  "%URL%"

endlocal
