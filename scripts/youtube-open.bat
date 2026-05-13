@echo off
setlocal
set "YOUTUBE_URL=%JUKEBOX_YOUTUBE_URL%"
if "%YOUTUBE_URL%"=="" (
  set "YOUTUBE_BASE=%JUKEBOX_KIOSK_URL%"
  if not "%YOUTUBE_BASE%"=="" set "YOUTUBE_URL=%YOUTUBE_BASE%youtube-screen"
)
if "%YOUTUBE_URL%"=="" set "YOUTUBE_URL=https://jukebox-charletas-projects.vercel.app/youtube-screen"
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "YOUTUBE_PROFILE=%~dp0youtube-profile"

if not exist "%CHROME%" (
  set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
)

if exist "%CHROME%" (
  start "" "%CHROME%" --user-data-dir="%YOUTUBE_PROFILE%" --new-window --start-fullscreen --autoplay-policy=no-user-gesture-required "%YOUTUBE_URL%"
) else (
  start "" "%YOUTUBE_URL%"
)

endlocal
exit /b 0
