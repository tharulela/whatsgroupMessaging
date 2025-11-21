@echo off
REM Batch script to run daily devotional fetcher
REM This script changes to the project directory and runs the Node.js script

cd /d "%~dp0"
echo Running Daily Devotional Fetcher...
echo Current Directory: %CD%
echo Time: %DATE% %TIME%
echo.

node todaysDevotional.js >> logs\devotional.log 2>&1

echo.
echo Devotional fetch completed at %TIME%

