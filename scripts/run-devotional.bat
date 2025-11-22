@echo off
REM Batch script to run daily devotional fetcher
REM This script changes to the project root directory and runs the Node.js script

REM Get the project root directory (parent of scripts folder)
set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%.."

REM Change to project root
cd /d "%PROJECT_ROOT%"

echo Running Daily Devotional Fetcher...
echo Script Directory: %SCRIPT_DIR%
echo Project Root: %CD%
echo Time: %DATE% %TIME%
echo.

REM Check if Node.js is available
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found in PATH
    echo Please install Node.js or add it to your PATH
    exit /b 1
)

REM Check if todaysDevotional.js exists
if not exist "todaysDevotional.js" (
    echo ERROR: todaysDevotional.js not found in %CD%
    echo Expected location: %CD%\todaysDevotional.js
    exit /b 1
)

REM Create logs directory if it doesn't exist
if not exist "logs" (
    echo Creating logs directory...
    mkdir logs
)

REM Run the script and redirect output to log file
echo Running: node todaysDevotional.js
echo Logging to: %CD%\logs\devotional.log
echo.

node todaysDevotional.js >> logs\devotional.log 2>&1
set "EXIT_CODE=%ERRORLEVEL%"

if %EXIT_CODE% EQU 0 (
    echo.
    echo SUCCESS: Devotional fetch completed at %TIME%
    echo Log saved to: %CD%\logs\devotional.log
) else (
    echo.
    echo ERROR: Devotional fetch failed with exit code %EXIT_CODE%
    echo Check the log file: %CD%\logs\devotional.log
    exit /b %EXIT_CODE%
)
