@echo off
REM Abre YouTube en una ventana fullscreen nueva
REM Minimiza Chrome del kiosko

tasklist /FI "WINDOWTITLE eq Jukebox*" | find /I /N "chrome.exe">nul
if "%ERRORLEVEL%"=="0" (
  powershell -Command "Get-Process chrome | Where-Object {$_.MainWindowTitle -like '*Jukebox*'} | ForEach-Object {$_.MainWindowHandle | ForEach-Object {[System.Windows.Forms.SendKeys]::SendWait('%~n')}} ; Start-Sleep -Milliseconds 100"
)

REM Abre YouTube fullscreen en una nueva instancia de Chrome
start "" "chrome.exe" "https://www.youtube.com" --new-window --start-fullscreen

exit /b 0
