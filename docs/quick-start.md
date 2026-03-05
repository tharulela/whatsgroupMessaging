# 🚀 Quick Start Guide - WhatsApp Bot with Daily Devotional

## 📋 Overview

This project consists of two main components:
1. **Daily Devotional Fetcher** - Fetches devotional content daily
2. **WhatsApp Bot** - Sends scheduled messages to WhatsApp groups

## ⚡ Quick Setup (3 Steps)

### Step 1: Setup Daily Devotional Scheduler

**For Windows (Recommended):**

```powershell
# Open PowerShell as Administrator
# Navigate to project folder
cd C:\workspaceP\GitHub\whatsgroupMessaging

# Run the setup script
.\setup-task-scheduler.ps1
```

This will automatically fetch devotional content daily at 8:00 AM.

**Alternative: Cross-Platform (PM2):**

```bash
npm install -g pm2
pm2 start devotional-scheduler.js --name devotional-scheduler
pm2 save
pm2 startup
```

### Step 2: Start the WhatsApp Bot

```bash
node whatsapp.js
```

- Scan QR code with your phone (first time only)
- Bot will schedule all messages automatically

### Step 3: Done! ✅

The system is now running:
- Devotional fetches daily at 8:00 AM
- WhatsApp bot sends messages at scheduled times

---

## 📅 Default Schedule

| Task | Time | Days | Groups |
|------|------|------|--------|
| **Fetch Devotional** | 8:00 AM | Daily | (Background) |
| Daily Devotional | 10:05 AM | Daily | Main Church |
| CIA Meeting | 3:05 PM | Tuesday | Administrators |
| Evening Prayer | 8:20 PM | Mon-Thu | Main Church, Key Leaders |
| Prayer Leader Reminder | 8:25 PM | Mon-Thu | Key Leaders |
| Cleaning Reminder | 12:00 PM |Wednesday & Friday | Key Leaders |
| Sunday Prayer (1) | 7:00 PM | Saturday | Key Leaders |
| Sunday Prayer (2) | 7:05 PM | Saturday | Key Leaders |

---

## 🔧 Customization

### Change Devotional Fetch Time

**Windows Task Scheduler:**
Edit `setup-task-scheduler.ps1` line 19:
```powershell
$Trigger = New-ScheduledTaskTrigger -Daily -At "07:00AM"  # Change time here
```
Then run setup script again.

**Node.js Scheduler:**
Edit `devotional-scheduler.js` lines 12-13:
```javascript
FETCH_HOUR: 7,      // Change hour here
FETCH_MINUTE: 30,   // Change minute here
```
Then restart: `pm2 restart devotional-scheduler`

### Change WhatsApp Message Schedule

Edit `config.js` in the `SCHEDULE` array:
```javascript
{
    name: 'Daily Devotional',
    hour: 10,        // Change hour
    minute: 5,       // Change minute
    days: [...],     // Change days
    groups: [...],   // Change groups
    message: ...     // Change message
}
```

Then restart the bot: `node whatsapp.js`

### Add New Scheduled Message

1. Add message to `config.js` in `MESSAGES` object:
```javascript
MESSAGES.newMessage = `Your message content...`;
```

2. Add schedule entry:
```javascript
{
    name: 'My New Message',
    hour: 14,
    minute: 0,
    days: [DAYS.MONDAY, DAYS.FRIDAY],
    groups: [GROUPS.KEY_LEADERS],
    message: MESSAGES.newMessage
}
```

3. Restart bot: `node whatsapp.js`

---

## 🔍 Monitoring

### Check if Devotional is Being Fetched

**Windows:**
```powershell
# View Task Scheduler logs
type logs\devotional.log

# Check last fetch time
dir textfile.txt
```

**PM2:**
```bash
pm2 logs devotional-scheduler
pm2 status
```

### Check WhatsApp Bot Status

Look for console output when bot is running:
- "Client is ready!" = Connected
- "Scheduling complete" = Messages scheduled
- "Message sent to..." = Successful send

### Manual Testing

**Test devotional fetch:**
```bash
node todaysDevotional.js
type textfile.txt  # View content
```

**Test WhatsApp bot (without waiting):**
```bash
node whatsapp.js
# Watch console for scheduled messages
```

---

## 📁 Project Structure

```
whatsgroupMessaging/
├── config.js                    ← Bot configuration
├── helpers.js                   ← Utility functions
├── whatsapp.js                  ← Main WhatsApp bot
├── todaysDevotional.js          ← Devotional fetcher
├── devotional-scheduler.js      ← Cross-platform scheduler
├── setup-task-scheduler.ps1     ← Windows scheduler setup
├── run-devotional.bat           ← Windows batch script
├── logs/                        ← Log files (gitignored)
├── textfile.txt                 ← Fetched devotional content
└── .wwebjs_auth/               ← WhatsApp session (gitignored)
```

---

## 🛠️ Troubleshooting

### Devotional not updating?

1. **Run manually:** `node todaysDevotional.js`
2. **Check internet connection**
3. **Check logs:** `type logs\devotional.log`

### WhatsApp bot not sending?

1. **Check QR code was scanned**
2. **Verify group names match** (check `config.js`)
3. **Check time settings** (must be future time)
4. **Check textfile.txt exists** and has content

### Task Scheduler not running?

1. **Open Task Scheduler:** `taskschd.msc`
2. **Find task:** "WhatsApp Daily Devotional Fetcher"
3. **Check History tab** for errors
4. **Run manually** to test

### PM2 issues?

```bash
pm2 kill          # Stop all
pm2 start ...     # Restart
pm2 logs          # View logs
```

---

## 📚 Documentation

- `SCHEDULER-README.md` - Detailed scheduler documentation
- `REFACTOR_NOTES.md` - Code refactoring details
- `README-REFACTORING.md` - Refactoring summary

---

## 💡 Tips

1. **First Time Setup**: Devotional fetcher should run before WhatsApp bot
2. **Testing**: Run devotional fetch manually first to verify it works
3. **Timing**: 8:00 AM fetch + 10:05 AM send = 2-hour buffer
4. **Session**: WhatsApp QR code only needed once (session saved)
5. **Logs**: Check logs folder regularly for issues

---

## 🎯 Production Deployment

### Windows Server
1. Setup Task Scheduler (runs as system service)
2. Run WhatsApp bot as Windows Service (using `node-windows` or similar)

### Linux Server
1. Use PM2 for both components
2. Setup PM2 to start on boot
3. Use systemd for additional reliability

### Cloud (VPS/EC2)
1. Install Node.js
2. Setup PM2 with ecosystem.config.js
3. Configure monitoring/alerting
4. Setup log rotation

---

## 📞 Need Help?

- Check logs folder: `logs/`
- Review documentation: `SCHEDULER-README.md`
- Test components individually
- Verify configurations in `config.js`

---

**Last Updated**: November 21, 2025  
**Branch**: `refactor-code-improvements`  
**Version**: 2.0

