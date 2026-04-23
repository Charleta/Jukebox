@echo off
setlocal

rem Emergency kiosk close for Windows
rem - Closes Chrome kiosk window only

taskkill /IM chrome.exe /F >nul 2>nul

endlocal
