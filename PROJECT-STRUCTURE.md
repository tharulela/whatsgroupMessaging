# Project Structure

## 📁 Complete File Organization

```
whatsgroupMessaging/
│
├── 📋 Core Application Files
│   ├── whatsapp.js                     Main WhatsApp bot (entry point)
│   ├── config.js                       Configuration & schedules
│   ├── helpers.js                      Utility functions
│   └── todaysDevotional.js             Devotional content fetcher
│
├── ⏰ Scheduler Components (Choose one based on OS)
│   ├── devotional-scheduler.js         Cross-platform Node.js scheduler
│   ├── setup-task-scheduler.ps1        Windows Task Scheduler setup
│   └── run-devotional.bat              Windows batch script
│
├── 📖 Documentation
│   ├── README.md                       Main documentation (start here)
│   ├── QUICK-START.md                  Quick setup & common tasks
│   ├── SCHEDULER-README.md             Detailed scheduler docs
│   ├── REFACTOR-NOTES.md               Technical details & architecture
│   ├── README-REFACTORING.md           Code improvements summary
│   └── PROJECT-STRUCTURE.md            This file
│
├── 📦 Configuration Files
│   ├── package.json                    Project metadata & dependencies
│   ├── package-lock.json               Locked dependency versions
│   ├── .gitignore                      Git ignore rules
│   └── .gitattributes                  Git line ending settings
│
├── 📁 Data & Runtime Directories
│   ├── logs/                           Log files (auto-created)
│   │   ├── .gitkeep                    Keeps directory in git
│   │   ├── devotional.log              Windows scheduler logs
│   │   ├── devotional-scheduler.log    Node scheduler logs
│   │   └── last-run.txt                Last execution timestamp
│   │
│   ├── .wwebjs_auth/                   WhatsApp session data (gitignored)
│   │   └── session-*/                  Session files (auto-created)
│   │
│   ├── .wwebjs_cache/                  WhatsApp cache (gitignored)
│   │   └── ...                         Cache files (auto-created)
│   │
│   ├── node_modules/                   Node.js dependencies (gitignored)
│   │   └── ...                         Installed packages
│   │
│   └── textfile.txt                    Downloaded devotional content
│
└── 🗑️ Legacy Files (for reference, can be removed)
    ├── whatsappMessaging.js            Old version before refactor
    └── ...                             Other old files

```

## 📝 File Descriptions

### Core Application Files

#### `whatsapp.js` (Main Entry Point)
- **Purpose**: Main WhatsApp bot application
- **Functions**: 
  - Connects to WhatsApp
  - Schedules all messages
  - Handles QR code authentication
  - Manages session persistence
- **Usage**: `node whatsapp.js` or `npm start`

#### `config.js` (Configuration)
- **Purpose**: Centralized configuration
- **Contains**:
  - Day constants (MONDAY, TUESDAY, etc.)
  - Group names (MAIN_CHURCH, ADMINISTRATORS, etc.)
  - All message templates
  - Complete schedule configuration
  - Prayer leaders by day
- **Edit this to**: Change schedules, messages, group names

#### `helpers.js` (Utility Functions)
- **Purpose**: Reusable helper functions
- **Functions**:
  - `loadTextFile()` - Load files asynchronously
  - `createScheduledTime()` - Create scheduled times
  - `calculateDelay()` - Calculate time delays
  - `formatDelay()` - Format time for logging
  - `scheduleMessage()` - Schedule individual messages
  - `scheduleAllMessages()` - Batch schedule messages
- **Usage**: Required by whatsapp.js

#### `todaysDevotional.js` (Content Fetcher)
- **Purpose**: Fetch daily devotional from website
- **Process**:
  1. Scrapes Dag Heward-Mills website
  2. Extracts devotional content
  3. Formats and saves to textfile.txt
- **Usage**: 
  - Automatically by scheduler
  - Manually: `node todaysDevotional.js`

### Scheduler Components

#### `devotional-scheduler.js` (Node.js Scheduler)
- **Purpose**: Cross-platform scheduler
- **Platform**: Windows, Mac, Linux
- **Features**:
  - Runs daily at configured time
  - Persistent process (use with PM2)
  - Automatic retry if missed
  - Detailed logging
- **Usage**: `pm2 start devotional-scheduler.js`

#### `setup-task-scheduler.ps1` (Windows Setup)
- **Purpose**: Automated Windows Task Scheduler setup
- **Platform**: Windows only
- **Features**:
  - Creates scheduled task automatically
  - Runs daily + on startup
  - No need for running process
- **Usage**: Run as Administrator in PowerShell

#### `run-devotional.bat` (Windows Batch)
- **Purpose**: Windows batch script wrapper
- **Platform**: Windows only
- **Usage**: Called by Task Scheduler (not directly)

### Documentation Files

#### `README.md` (Main Documentation)
- Start here for project overview
- Installation instructions
- Quick start guide
- Configuration basics
- Troubleshooting

#### `QUICK-START.md`
- Quick reference for common tasks
- Setup steps
- Customization guide
- Testing procedures

#### `SCHEDULER-README.md`
- Detailed scheduler documentation
- Both Windows and Node.js options
- Troubleshooting scheduler issues
- Advanced configuration

#### `REFACTOR-NOTES.md`
- Technical documentation
- Architecture details
- Code improvements
- Migration guide
- Future enhancements

#### `README-REFACTORING.md`
- Summary of code improvements
- Before/after comparison
- Benefits of refactoring

#### `PROJECT-STRUCTURE.md`
- This file
- Complete file organization
- File descriptions

### Configuration Files

#### `package.json`
- Project metadata
- Dependencies list
- npm scripts
- **Scripts available**:
  - `npm start` - Start WhatsApp bot
  - `npm run fetch-devotional` - Fetch devotional manually
  - `npm run scheduler` - Start Node.js scheduler

#### `package-lock.json`
- Locked dependency versions
- Auto-generated
- Ensures consistent installs

#### `.gitignore`
- Files to exclude from git
- Patterns for logs, cache, session data
- Node modules excluded

#### `.gitattributes`
- Git line ending settings
- Cross-platform compatibility

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Daily Workflow                            │
└─────────────────────────────────────────────────────────────┘

8:00 AM
┌──────────────────────┐
│  Scheduler Triggers  │ (Task Scheduler or PM2)
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ todaysDevotional.js  │ Fetches content from website
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   textfile.txt       │ Saved devotional content
└──────────┬───────────┘
           │
10:05 AM   │
┌──────────┴───────────┐
│    whatsapp.js       │ Running continuously
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  config.js           │ Loads schedule & messages
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  helpers.js          │ Schedules messages
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  WhatsApp Groups     │ Messages sent
└──────────────────────┘
```

## 📦 Dependencies

### Production Dependencies

```json
{
  "axios": "^1.11.0",           // HTTP client for fetching content
  "cheerio": "^1.0.0-rc.12",    // HTML parsing for web scraping
  "qrcode-terminal": "^0.12.0", // QR code display in terminal
  "whatsapp-web.js": "^1.17.1"  // WhatsApp Web API wrapper
}
```

### Development Dependencies

None currently - all dependencies are production dependencies.

### Optional Dependencies

- **PM2** (for Node.js scheduler): `npm install -g pm2`
- **node-windows** (for Windows service): `npm install -g node-windows`

## 🗂️ Directory Purposes

### `logs/`
- **Purpose**: Store all log files
- **Created**: Automatically on first run
- **Contains**: Scheduler logs, execution history
- **Git**: Directory tracked, log files ignored

### `.wwebjs_auth/`
- **Purpose**: WhatsApp session data
- **Created**: Automatically after QR scan
- **Contains**: Authentication tokens, session files
- **Git**: Completely ignored (sensitive data)
- **Important**: Backup this folder to avoid re-scanning QR

### `.wwebjs_cache/`
- **Purpose**: WhatsApp cache data
- **Created**: Automatically during operation
- **Contains**: Media cache, message cache
- **Git**: Completely ignored

### `node_modules/`
- **Purpose**: Installed npm packages
- **Created**: By `npm install`
- **Contains**: All dependency code
- **Git**: Ignored (large, reproducible)

## 🎯 Which Files to Edit

### To Change Schedules
→ Edit `config.js` (SCHEDULE array)

### To Change Messages
→ Edit `config.js` (MESSAGES object)

### To Change Groups
→ Edit `config.js` (GROUPS object)

### To Change Scheduler Time
→ Edit `setup-task-scheduler.ps1` OR `devotional-scheduler.js`

### To Add Features
→ Edit `helpers.js` (new functions) and `whatsapp.js` (new logic)

## 🔒 Sensitive Files (Never Commit)

- `.wwebjs_auth/` - WhatsApp session
- `.wwebjs_cache/` - WhatsApp cache
- `logs/*.log` - Log files with potential sensitive data
- `.env` - Environment variables (if you create one)

## 📊 File Size Reference

| File | Approximate Size | Purpose |
|------|------------------|---------|
| whatsapp.js | ~3 KB | Main application |
| config.js | ~6 KB | Configuration |
| helpers.js | ~6 KB | Utilities |
| todaysDevotional.js | ~2 KB | Fetcher |
| devotional-scheduler.js | ~5 KB | Scheduler |
| README.md | ~7 KB | Documentation |
| textfile.txt | ~1-2 KB | Daily content |
| .wwebjs_auth/ | ~1-5 MB | Session data |
| node_modules/ | ~150 MB | Dependencies |

## 🧹 Cleanup

### Files Safe to Delete
- `whatsappMessaging.js` (old version)
- Any `.backup` or `.bak` files
- Old log files in `logs/`

### Files to Never Delete
- Core application files (whatsapp.js, config.js, helpers.js)
- node_modules/ (unless reinstalling)
- package.json / package-lock.json
- .wwebjs_auth/ (unless re-authenticating)

---

**Last Updated**: November 21, 2025  
**Version**: 2.0  
**Branch**: refactor-code-improvements

