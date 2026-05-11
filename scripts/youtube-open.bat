@echo off
set "YOUTUBE_URL=https://www.youtube.com"
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "YOUTUBE_PROFILE=%~dp0youtube-profile"

if not exist "%CHROME%" (
  set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
)

if exist "%CHROME%" (
  start "" "%CHROME%" --user-data-dir="%YOUTUBE_PROFILE%" --new-window --start-fullscreen "%YOUTUBE_URL%"
) else (
  start "" "%YOUTUBE_URL%"
)

exit /b 0
