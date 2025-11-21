# PowerShell script to setup Windows Task Scheduler for daily devotional
# Run this script with Administrator privileges

$TaskName = "WhatsApp Daily Devotional Fetcher"
$ScriptPath = Join-Path $PSScriptRoot "run-devotional.bat"
$WorkingDir = $PSScriptRoot

# Check if task already exists
$ExistingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue

if ($ExistingTask) {
    Write-Host "Task '$TaskName' already exists. Removing it first..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

# Create the scheduled task action
$Action = New-ScheduledTaskAction -Execute "cmd.exe" `
    -Argument "/c `"$ScriptPath`"" `
    -WorkingDirectory $WorkingDir

# Create the trigger - Run daily at 8:00 AM
$Trigger = New-ScheduledTaskTrigger -Daily -At "08:00AM"

# Create additional trigger - Run at system startup (in case computer was off)
$TriggerStartup = New-ScheduledTaskTrigger -AtStartup

# Configure settings
$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 10)

# Get current user for the task
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -RunLevel Highest

# Register the scheduled task
try {
    Register-ScheduledTask `
        -TaskName $TaskName `
        -Action $Action `
        -Trigger $Trigger, $TriggerStartup `
        -Settings $Settings `
        -Principal $Principal `
        -Description "Fetches daily devotional from Dag Heward-Mills website and saves to textfile.txt for WhatsApp bot"
    
    Write-Host "`n✅ SUCCESS!" -ForegroundColor Green
    Write-Host "Scheduled task '$TaskName' has been created successfully!" -ForegroundColor Green
    Write-Host "`nTask Details:" -ForegroundColor Cyan
    Write-Host "  Schedule: Daily at 8:00 AM (+ at startup)" -ForegroundColor White
    Write-Host "  Script: $ScriptPath" -ForegroundColor White
    Write-Host "  Working Directory: $WorkingDir" -ForegroundColor White
    Write-Host "`nYou can view/manage this task in Task Scheduler (taskschd.msc)" -ForegroundColor Yellow
    
    # Test run option
    Write-Host "`n"
    $TestRun = Read-Host "Would you like to run the task now to test it? (Y/N)"
    if ($TestRun -eq "Y" -or $TestRun -eq "y") {
        Write-Host "Running task..." -ForegroundColor Cyan
        Start-ScheduledTask -TaskName $TaskName
        Start-Sleep -Seconds 3
        Write-Host "Task triggered. Check the logs folder for results." -ForegroundColor Green
    }
    
} catch {
    Write-Host "`n❌ ERROR!" -ForegroundColor Red
    Write-Host "Failed to create scheduled task: $_" -ForegroundColor Red
    Write-Host "`nMake sure you're running PowerShell as Administrator!" -ForegroundColor Yellow
}

