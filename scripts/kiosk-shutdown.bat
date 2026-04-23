@echo off
setlocal

rem Emergency kiosk shutdown for Windows
rem - Closes Chrome kiosk window
rem - Powers off the PC

taskkill /IM chrome.exe /F >nul 2>nul
timeout /t 1 /nobreak >nul
shutdown /s /t 0 /f

endlocal
