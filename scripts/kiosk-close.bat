@echo off
setlocal

rem Emergency kiosk close for Windows
rem - Closes Chrome kiosk window
rem - Powers off the PC

taskkill /IM chrome.exe /F >nul 2>nul
shutdown /s /t 0 /f

endlocal
