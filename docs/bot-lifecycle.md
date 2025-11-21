# WhatsApp Bot Lifecycle & Daily Refresh

## 🔄 How the Bot Works

### TL;DR
**Start the bot ONCE → It runs 24/7 and auto-refreshes daily!** ✅

---

## 📋 Bot Lifecycle Diagram

```
┌─────────────────────────────────────────────────────┐
│  1. You start the bot: npm start                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  2. Bot connects to WhatsApp (scan QR if needed)    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  3. Bot schedules ALL messages for TODAY            │
│     - 10:05 AM: Daily Devotional                    │
│     - 3:05 PM: CIA Meeting (Tuesday only)           │
│     - 8:20 PM: Evening Prayer (Mon-Thu)             │
│     - etc.                                           │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  4. Bot waits and sends messages at scheduled times │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  5. At midnight (12:00:01 AM)...                    │
│     🔄 AUTO-REFRESH triggered!                      │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  6. Bot reschedules ALL messages for NEW DAY        │
│     - Reloads textfile.txt (new devotional)         │
│     - Checks today's day of week                    │
│     - Schedules appropriate messages                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  7. Repeat steps 4-6 FOREVER                        │
│     (until you stop the bot or server restarts)     │
└─────────────────────────────────────────────────────┘
```

---

## ✅ What Happens Automatically

### Daily at Midnight (12:00:01 AM):
1. ✅ **Reloads** `textfile.txt` (new devotional content)
2. ✅ **Checks** current day of week
3. ✅ **Reschedules** all appropriate messages
4. ✅ **Logs** next refresh time
5. ✅ **Repeats** the cycle

### You Don't Need To:
- ❌ Restart the bot daily
- ❌ Manually refresh schedules
- ❌ Run cron jobs for the bot itself
- ❌ Worry about missed messages

---

## 🚀 How to Use

### Start the Bot (Once)
```bash
npm start
# or
node whatsapp.js
```

### What You'll See:
```
============================================================
✓ CLIENT READY!
============================================================

📅 Current Date: Thu Nov 21 2025
📅 Current Time: 2:30:00 PM
📅 Day: Thursday (Day 4)
🙏 Tomorrow's Prayer Leader: Brother Thabo

============================================================
📋 SCHEDULING MESSAGES
============================================================
Date: Thu Nov 21 2025
Day: Thursday

📅 Scheduled: "Evening Prayer Invitation"
   → Group: LCI SA MIDRAND GROUP_21 Zone 4 - STRONG CHRISTIAN CHURCH
   → Time: 8:20:00 PM
   → Delay: 5h 50m

✓ Scheduling complete: 3 message(s) scheduled
============================================================

🤖 Bot is now running and waiting to send scheduled messages...

🔄 Auto-refresh scheduled for: 11/22/2025, 12:00:01 AM
⏱️  Time until refresh: 9h 29m
```

### At Midnight, You'll See:
```
============================================================
🔄 DAILY REFRESH - Rescheduling messages for new day
============================================================

📅 Current Date: Fri Nov 22 2025
📅 Current Time: 12:00:01 AM
📅 Day: Friday (Day 5)
...
```

---

## 🔄 The Auto-Refresh System

### How It Works:
```javascript
// Simplified version
async function scheduleDailyMessages() {
    // 1. Schedule today's messages
    await scheduleAllMessages(...);
    
    // 2. Calculate time until midnight
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 1, 0); // 12:00:01 AM tomorrow
    const msUntilMidnight = nextMidnight.getTime() - new Date().getTime();
    
    // 3. Schedule refresh at midnight
    setTimeout(() => {
        scheduleDailyMessages(); // Recursive! Runs again tomorrow
    }, msUntilMidnight);
}
```

### Why 12:00:01 AM (not 12:00:00)?
- Avoids edge cases with day transitions
- Ensures we're definitely in the new day
- Small 1-second buffer for safety

---

## 📊 Comparison: Before vs After

### Before (Manual Restart Required):
```
Day 1:
  09:00 AM - You start bot
  10:05 AM - ✅ Devotional sent
  08:20 PM - ✅ Prayer sent
  
Day 2:
  10:05 AM - ❌ Nothing (bot needs restart!)
  10:30 AM - You notice and restart bot
  08:20 PM - ✅ Prayer sent (but devotional was missed!)
```

### After (Auto-Refresh):
```
Day 1:
  09:00 AM - You start bot ONCE
  10:05 AM - ✅ Devotional sent
  08:20 PM - ✅ Prayer sent
  12:00 AM - 🔄 Auto-refresh

Day 2:
  10:05 AM - ✅ Devotional sent (NEW content)
  08:20 PM - ✅ Prayer sent
  12:00 AM - 🔄 Auto-refresh

Day 3... Day 4... Forever... ✅
```

---

## 🛡️ Reliability Features

### Session Persistence
- QR code scan only needed ONCE
- Session saved in `.wwebjs_auth/`
- Survives bot restarts

### Error Handling
- Try-catch blocks around scheduling
- Logs errors but continues running
- Won't crash on scheduling errors

### Graceful Shutdown
```bash
# Press Ctrl+C to stop
⏹️  Shutting down gracefully...
```

---

## 🔧 Integration with Devotional Scheduler

### Complete Daily Workflow:

```
8:00 AM → Devotional Scheduler runs
          ├─ Fetches new content from website
          └─ Saves to textfile.txt

12:00:01 AM → WhatsApp Bot auto-refreshes
              ├─ Reloads textfile.txt (new content!)
              └─ Reschedules messages for today

10:05 AM → Bot sends devotional (from textfile.txt)
```

**Both systems work together:**
1. Devotional Scheduler: Fetches content daily at 8 AM
2. WhatsApp Bot: Runs 24/7, picks up new content automatically

---

## 💻 Running in Production

### Option 1: Keep Terminal Open
```bash
npm start
# Keep this terminal running
```

**Pros**: Simple, immediate  
**Cons**: Stops if terminal closes

### Option 2: PM2 (Recommended)
```bash
npm install -g pm2
pm2 start whatsapp.js --name whatsapp-bot
pm2 save
pm2 startup
```

**Pros**: Runs in background, auto-restarts, survives reboots  
**Cons**: Requires PM2 installation

### Option 3: Windows Service (Advanced)
```bash
npm install -g node-windows
# Then create a Windows service
```

**Pros**: Runs as system service, most reliable  
**Cons**: More complex setup

---

## 🐛 Troubleshooting

### Bot Not Auto-Refreshing?

**Check Console Logs:**
```
🔄 Auto-refresh scheduled for: [DATE]
⏱️  Time until refresh: Xh Ym
```

If you don't see this, the bot didn't schedule the refresh.

**Solutions:**
1. Restart the bot (should work with latest version)
2. Check for errors in console
3. Verify bot is still running (not crashed)

### Messages Not Sending After Midnight?

**Possible Causes:**
1. Devotional scheduler didn't run (textfile.txt not updated)
2. WhatsApp session expired (rescan QR code)
3. Bot crashed (check PM2 logs: `pm2 logs`)

**Solutions:**
1. Check `textfile.txt` has today's content
2. Restart bot if needed
3. Use PM2 for auto-restart on crashes

---

## 📝 Best Practices

### ✅ Do:
- Use PM2 or equivalent process manager
- Monitor logs regularly
- Set up server monitoring/alerts
- Keep bot updated
- Backup `.wwebjs_auth/` folder

### ❌ Don't:
- Manually restart daily (not needed!)
- Run multiple instances (conflicts)
- Delete `.wwebjs_auth/` (lose session)
- Ignore error logs

---

## 🎯 Summary

**The bot now runs continuously and handles everything automatically:**

1. ✅ **Start once** - `npm start`
2. ✅ **Runs 24/7** - No manual intervention
3. ✅ **Auto-refreshes** - Every midnight at 12:00:01 AM
4. ✅ **Loads new content** - Picks up updated textfile.txt
5. ✅ **Never stops** - Until you stop it or server restarts

**You only need to:**
- Start it once when deploying
- Restart only if server reboots
- Monitor occasionally for errors

**That's it! The bot handles the rest!** 🎉

---

**Last Updated**: November 21, 2025  
**Version**: 2.1.0 (with auto-refresh)

