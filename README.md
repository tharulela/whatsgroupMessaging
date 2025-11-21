# WhatsApp Group Messaging Bot

Automated WhatsApp bot for sending daily devotionals and scheduled messages to church groups.

## 🎯 Features

- ✅ **Daily Devotional** - Automatically fetches and sends devotional content
- ✅ **Scheduled Messages** - Send messages at specific times to specific groups
- ✅ **Prayer Reminders** - Automated prayer meeting notifications
- ✅ **Church Announcements** - Meeting reminders and cleaning schedules
- ✅ **Session Persistence** - QR code scan only needed once
- ✅ **Error Handling** - Comprehensive error handling and logging
- ✅ **Cross-Platform** - Works on Windows, Mac, and Linux

## 🚀 Quick Start

### Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)
- WhatsApp account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whatsgroupMessaging
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup daily devotional scheduler**
   
   **For Windows:**
   ```powershell
   # Open PowerShell as Administrator
   .\setup-task-scheduler.ps1
   ```
   
   **For Mac/Linux:**
   ```bash
   npm install -g pm2
   pm2 start devotional-scheduler.js --name devotional-scheduler
   pm2 save
   pm2 startup
   ```

4. **Start the WhatsApp bot**
   ```bash
   node whatsapp.js
   ```

5. **Scan QR code with your phone** (first time only)

That's it! The bot is now running and will send messages according to the schedule.

## 📅 Default Schedule

| Task | Time | Days | Groups |
|------|------|------|--------|
| Fetch Devotional | 8:00 AM | Daily | (Background) |
| Daily Devotional | 10:05 AM | Daily | Main Church |
| CIA Meeting Reminder | 3:05 PM | Tuesday | Administrators |
| Evening Prayer | 8:20 PM | Mon-Thu | Main Church, Key Leaders |
| Prayer Leader Reminder | 8:25 PM | Mon-Thu | Key Leaders |
| Cleaning Reminder | 12:00 PM | Friday | Key Leaders |
| Sunday Prayer (1) | 7:00 PM | Saturday | Key Leaders |
| Sunday Prayer (2) | 7:05 PM | Saturday | Key Leaders |

## 📁 Project Structure

```
whatsgroupMessaging/
├── Core Files
│   ├── whatsapp.js                  Main WhatsApp bot application
│   ├── config.js                    Bot configuration & schedules
│   ├── helpers.js                   Utility functions
│   └── todaysDevotional.js          Devotional content fetcher
│
├── Scheduler (Choose one)
│   ├── setup-task-scheduler.ps1     Windows Task Scheduler setup
│   ├── run-devotional.bat           Windows batch script
│   └── devotional-scheduler.js      Cross-platform Node.js scheduler
│
├── Documentation
│   ├── README.md                    This file (overview)
│   ├── QUICK-START.md               Quick reference guide
│   ├── SCHEDULER-README.md          Detailed scheduler documentation
│   ├── REFACTOR_NOTES.md            Technical refactoring details
│   └── README-REFACTORING.md        Refactoring summary
│
├── Data & Logs
│   ├── textfile.txt                 Fetched devotional content
│   ├── logs/                        Log files
│   └── .wwebjs_auth/               WhatsApp session data
│
└── Configuration
    ├── package.json                 Project dependencies
    ├── .gitignore                   Git ignore rules
    └── .gitattributes               Git attributes

```

## 🔧 Configuration

### Change Message Schedule

Edit `config.js` in the `SCHEDULE` array:

```javascript
{
    name: 'Daily Devotional',
    hour: 10,        // Change hour (0-23)
    minute: 5,       // Change minute (0-59)
    days: [DAYS.MONDAY, DAYS.TUESDAY, ...],  // Change days
    groups: [GROUPS.MAIN_CHURCH],  // Change groups
    messageSource: 'textfile'  // or use message: "text here"
}
```

### Change Group Names

Edit `config.js` in the `GROUPS` object:

```javascript
const GROUPS = {
    MAIN_CHURCH: "Your Group Name Here",
    ADMINISTRATORS: "Your Admin Group",
    KEY_LEADERS: "Your Leaders Group"
};
```

### Change Devotional Fetch Time

**Windows Task Scheduler:**
Edit `setup-task-scheduler.ps1` line 19, then run it again:
```powershell
$Trigger = New-ScheduledTaskTrigger -Daily -At "07:00AM"
```

**Node.js Scheduler:**
Edit `devotional-scheduler.js` lines 12-13, then restart PM2:
```javascript
FETCH_HOUR: 7,
FETCH_MINUTE: 30,
```

### Add New Scheduled Message

1. Add message to `config.js`:
   ```javascript
   MESSAGES.myMessage = `Your message content...`;
   ```

2. Add schedule entry:
   ```javascript
   {
       name: 'My New Message',
       hour: 14,
       minute: 0,
       days: [DAYS.WEDNESDAY],
       groups: [GROUPS.KEY_LEADERS],
       message: MESSAGES.myMessage
   }
   ```

3. Restart the bot: `node whatsapp.js`

## 📖 Documentation

- **[QUICK-START.md](QUICK-START.md)** - Quick setup guide and common tasks
- **[SCHEDULER-README.md](SCHEDULER-README.md)** - Detailed scheduler documentation
- **[REFACTOR-NOTES.md](REFACTOR_NOTES.md)** - Technical details and architecture
- **[README-REFACTORING.md](README-REFACTORING.md)** - Code improvements summary

## 🧪 Testing

### Test Devotional Fetch
```bash
node todaysDevotional.js
type textfile.txt  # Windows
cat textfile.txt   # Mac/Linux
```

### Test WhatsApp Bot (Dry Run)
```bash
node whatsapp.js
# Watch console for scheduled messages
```

### Test Manual Send
Temporarily change a schedule time to 1 minute in the future, restart bot, and watch it send.

## 🔍 Monitoring

### View Logs

**Windows Task Scheduler:**
```powershell
type logs\devotional.log
```

**PM2:**
```bash
pm2 logs devotional-scheduler
pm2 status
```

**WhatsApp Bot:**
Check console output while bot is running

### Check Last Fetch
```bash
# Windows
dir textfile.txt

# Mac/Linux
ls -l textfile.txt
```

## 🛠️ Troubleshooting

### Bot not sending messages?

1. ✅ Verify QR code was scanned
2. ✅ Check group names match exactly (case-sensitive)
3. ✅ Ensure scheduled times are in the future
4. ✅ Check `textfile.txt` exists and has content
5. ✅ Review console logs for errors

### Devotional not updating?

1. ✅ Run manually: `node todaysDevotional.js`
2. ✅ Check internet connection
3. ✅ Verify website is accessible
4. ✅ Check logs: `type logs\devotional.log`

### QR code not appearing?

1. ✅ Delete `.wwebjs_auth` folder
2. ✅ Restart bot: `node whatsapp.js`
3. ✅ Scan new QR code

### Task Scheduler not running?

1. ✅ Open Task Scheduler: `taskschd.msc`
2. ✅ Find "WhatsApp Daily Devotional Fetcher"
3. ✅ Check History tab for errors
4. ✅ Run manually to test
5. ✅ Verify Node.js is in system PATH

## 💻 Development

### Project Technologies

- **Node.js** - Runtime environment
- **whatsapp-web.js** - WhatsApp Web API wrapper
- **axios** - HTTP client for fetching devotional
- **cheerio** - HTML parsing for web scraping
- **qrcode-terminal** - QR code display in terminal

### Architecture

The project follows a modular architecture:

- **config.js** - Configuration layer (all settings in one place)
- **helpers.js** - Utility layer (reusable functions)
- **whatsapp.js** - Application layer (main bot logic)
- **todaysDevotional.js** - Data layer (content fetching)

### Code Quality

- ✅ ES6+ syntax (const/let, async/await, template literals)
- ✅ Modular design with separation of concerns
- ✅ Comprehensive error handling
- ✅ Detailed logging for debugging
- ✅ JSDoc comments for functions
- ✅ Configuration-driven approach

## 🚀 Production Deployment

### Windows Server

1. Setup Windows Task Scheduler (runs as system service)
2. Use `node-windows` or NSSM to run bot as Windows Service
3. Configure Windows Firewall if needed

### Linux/Mac Server

1. Use PM2 for process management
2. Setup systemd for reliability
3. Configure reverse proxy if exposing web interface

### Cloud (VPS/AWS/Azure)

1. Install Node.js on server
2. Setup PM2 with ecosystem.config.js
3. Configure monitoring and alerting
4. Setup log rotation
5. Enable auto-restart on failure

## 📊 Logging

Logs are stored in the `logs/` directory:

- `devotional.log` - Devotional fetch logs
- `devotional-scheduler.log` - Scheduler logs
- `last-run.txt` - Last execution timestamp

## 🔒 Security

- ✅ WhatsApp session stored locally in `.wwebjs_auth/`
- ✅ No sensitive credentials in code
- ✅ `.gitignore` excludes sensitive files
- ✅ Session data never committed to git

**Best Practices:**
- Don't share your `.wwebjs_auth/` folder
- Keep your server secure and updated
- Use environment variables for sensitive config
- Regularly update dependencies

## 🤝 Contributing

This is a church project. To contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Update documentation
5. Submit for review

## 📞 Support

For issues or questions:

1. Check the documentation files
2. Review logs in `logs/` directory
3. Test components individually
4. Check configuration in `config.js`

## 📝 License

ISC License - See package.json

## 🙏 Acknowledgments

- Daily devotional content from [Dag Heward-Mills](https://www.daghewardmills.org/)
- WhatsApp Web integration via [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- Built for LCI SA Midrand Zone 4 - Strong Christian Church

---

**Version**: 2.0  
**Last Updated**: November 21, 2025  
**Branch**: refactor-code-improvements  
**Maintained by**: Church Tech Team
