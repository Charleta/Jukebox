@echo off
REM Cierra la ventana de YouTube y trae el kiosko al frente

REM Cierra todas las instancias de Chrome que tengan YouTube en el título
taskkill /FI "WINDOWTITLE eq *YouTube*" /IM chrome.exe /T /F 2>nul

REM Espera un poco a que se cierre
timeout /t 1 /nobreak

REM Trae el kiosko al frente nuevamente
powershell -Command "Get-Process chrome | Where-Object {$_.MainWindowTitle -like '*Jukebox*'} | Select-Object -First 1 | ForEach-Object {[System.Windows.Forms.NativeMethods]::SetForegroundWindow($_.MainWindowHandle)}"

exit /b 0
