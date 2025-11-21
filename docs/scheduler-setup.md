# Daily Devotional Scheduler Setup Guide

This guide explains how to automatically run `todaysDevotional.js` daily to fetch the devotional content.

## 📋 What It Does

The `todaysDevotional.js` script:
- Fetches daily devotional content from Dag Heward-Mills' website
- Saves it to `textfile.txt`
- This content is then sent by the WhatsApp bot at 10:05 AM

## 🎯 Scheduling Options

You have **two options** for scheduling:

### Option 1: Windows Task Scheduler (Recommended for Windows)

#### ✅ Advantages
- Native Windows solution
- Runs even if terminal is closed
- No additional dependencies
- Reliable and efficient

#### 🚀 Setup Instructions

1. **Open PowerShell as Administrator**
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)"

2. **Navigate to project directory**
   ```powershell
   cd C:\workspaceP\GitHub\whatsgroupMessaging
   ```

3. **Run the setup script**
   ```powershell
   .\setup-task-scheduler.ps1
   ```

4. **Follow the prompts**
   - The script will create a scheduled task
   - Choose whether to test it immediately

#### ⚙️ Default Schedule
- **Time**: Daily at 8:00 AM
- **Also runs**: At system startup (if computer was off at 8:00 AM)

#### 🔧 Customize the Schedule

To change the time, edit `setup-task-scheduler.ps1`:
```powershell
# Change this line (line ~19):
$Trigger = New-ScheduledTaskTrigger -Daily -At "08:00AM"

# To your preferred time, e.g.:
$Trigger = New-ScheduledTaskTrigger -Daily -At "07:30AM"
```

Then run the setup script again.

#### 📊 View/Manage the Task

1. Press `Win + R`, type `taskschd.msc`, press Enter
2. Find "WhatsApp Daily Devotional Fetcher"
3. You can:
   - Run it manually
   - Modify schedule
   - View history
   - Disable/Enable

---

### Option 2: Node.js Scheduler (Cross-Platform)

#### ✅ Advantages
- Works on Windows, Mac, Linux
- No admin privileges required
- Easy to customize

#### ⚠️ Disadvantages
- Must keep process running
- Requires process manager (PM2) for production

#### 🚀 Setup Instructions

1. **Install PM2 (Process Manager) - Recommended**
   ```bash
   npm install -g pm2
   ```

2. **Start the scheduler**
   ```bash
   pm2 start devotional-scheduler.js --name devotional-scheduler
   ```

3. **Save PM2 configuration**
   ```bash
   pm2 save
   ```

4. **Enable PM2 startup on boot**
   ```bash
   pm2 startup
   # Follow the command it outputs
   ```

#### ⚙️ Default Schedule
- **Time**: Daily at 8:00 AM

#### 🔧 Customize the Schedule

Edit `devotional-scheduler.js`:
```javascript
// Change these lines (around line 12-13):
const CONFIG = {
    FETCH_HOUR: 8,      // Change to your preferred hour (0-23)
    FETCH_MINUTE: 0,    // Change to your preferred minute (0-59)
    // ...
};
```

Then restart:
```bash
pm2 restart devotional-scheduler
```

#### 📊 Monitor the Scheduler

```bash
# View status
pm2 status

# View logs
pm2 logs devotional-scheduler

# Stop scheduler
pm2 stop devotional-scheduler

# Delete scheduler
pm2 delete devotional-scheduler
```

---

## 📁 Files Created

### Core Files
- `todaysDevotional.js` - Main script that fetches devotional (already exists)

### Windows Task Scheduler Files
- `run-devotional.bat` - Batch script to run the devotional
- `setup-task-scheduler.ps1` - PowerShell script to setup scheduled task

### Node.js Scheduler Files
- `devotional-scheduler.js` - Node.js scheduler script

### Logs
- `logs/devotional.log` - Windows Task Scheduler logs
- `logs/devotional-scheduler.log` - Node.js scheduler logs
- `logs/last-run.txt` - Tracks last execution time

---

## 🔍 Troubleshooting

### Task not running?

**Windows Task Scheduler:**
1. Open Task Scheduler (`taskschd.msc`)
2. Find your task
3. Check "History" tab for errors
4. Verify Node.js is in system PATH

**Node.js Scheduler:**
1. Check if PM2 is running: `pm2 status`
2. View logs: `pm2 logs devotional-scheduler`
3. Check system time is correct

### Devotional not updating?

1. **Check internet connection**
2. **Run manually to test:**
   ```bash
   node todaysDevotional.js
   ```
3. **Check if textfile.txt was updated:**
   ```bash
   ls -l textfile.txt  # Linux/Mac
   dir textfile.txt    # Windows
   ```

### Logs not appearing?

1. **Create logs directory manually:**
   ```bash
   mkdir logs
   ```

2. **Check file permissions**

---

## 🎯 Recommended Setup

**For Windows Users:**
→ Use **Option 1: Windows Task Scheduler** (more reliable)

**For Mac/Linux Users:**
→ Use **Option 2: Node.js Scheduler with PM2**

**For Development/Testing:**
→ Run manually: `node todaysDevotional.js`

---

## ⏰ Timing Recommendations

Current workflow:
1. **8:00 AM** - Fetch devotional (scheduled)
2. **10:05 AM** - WhatsApp bot sends devotional

This gives a 2-hour buffer. You can adjust:
- Fetch earlier (e.g., 6:00 AM) for more buffer
- Fetch later (e.g., 9:30 AM) if you want fresh content

---

## 🧪 Testing

### Test the devotional fetch:
```bash
node todaysDevotional.js
```

### Check if textfile.txt was created/updated:
```bash
# Windows
type textfile.txt

# Linux/Mac
cat textfile.txt
```

### Test the Windows scheduled task:
```powershell
# Run immediately
Start-ScheduledTask -TaskName "WhatsApp Daily Devotional Fetcher"

# Check result
type logs\devotional.log
```

### Test the Node.js scheduler:
```bash
# Start in foreground to see output
node devotional-scheduler.js

# Or check logs
cat logs/devotional-scheduler.log
```

---

## 📞 Support

If you encounter issues:
1. Check the logs directory
2. Verify Node.js is installed: `node --version`
3. Test manual execution first
4. Check system time and timezone

---

**Setup Date**: November 21, 2025  
**Branch**: `refactor-code-improvements`

