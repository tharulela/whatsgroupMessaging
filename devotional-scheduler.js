/**
 * Cross-platform Node.js scheduler for daily devotional fetcher
 * This runs as a persistent process and executes the devotional script daily
 * 
 * Usage: node devotional-scheduler.js
 * For production: Use PM2 or similar process manager to keep this running
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    // Time to run the devotional fetch (24-hour format)
    FETCH_HOUR: 8,
    FETCH_MINUTE: 0,
    
    // Script to execute
    SCRIPT_PATH: path.join(__dirname, 'todaysDevotional.js'),
    
    // Log directory
    LOG_DIR: path.join(__dirname, 'logs'),
    LOG_FILE: path.join(__dirname, 'logs', 'devotional-scheduler.log')
};

// Ensure logs directory exists
if (!fs.existsSync(CONFIG.LOG_DIR)) {
    fs.mkdirSync(CONFIG.LOG_DIR, { recursive: true });
}

/**
 * Log message with timestamp
 */
function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    
    console.log(logMessage.trim());
    
    // Append to log file
    fs.appendFileSync(CONFIG.LOG_FILE, logMessage, 'utf8');
}

/**
 * Execute the devotional script
 */
function runDevotionalScript() {
    log('🔄 Starting daily devotional fetch...');
    
    const command = `node "${CONFIG.SCRIPT_PATH}"`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            log(`❌ Error executing devotional script: ${error.message}`, 'ERROR');
            log(`stderr: ${stderr}`, 'ERROR');
            return;
        }
        
        if (stderr) {
            log(`⚠️  stderr: ${stderr}`, 'WARN');
        }
        
        log(`✅ Devotional fetch completed successfully`);
        log(`Output: ${stdout.substring(0, 200)}...`); // Log first 200 chars
        
        // Schedule next run
        scheduleNextRun();
    });
}

/**
 * Calculate milliseconds until next scheduled run
 */
function getMillisecondsUntilNextRun() {
    const now = new Date();
    const nextRun = new Date();
    
    nextRun.setHours(CONFIG.FETCH_HOUR);
    nextRun.setMinutes(CONFIG.FETCH_MINUTE);
    nextRun.setSeconds(0);
    nextRun.setMilliseconds(0);
    
    // If scheduled time has passed today, schedule for tomorrow
    if (nextRun.getTime() <= now.getTime()) {
        nextRun.setDate(nextRun.getDate() + 1);
    }
    
    const msUntilRun = nextRun.getTime() - now.getTime();
    
    return { msUntilRun, nextRun };
}

/**
 * Format duration for logging
 */
function formatDuration(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
}

/**
 * Schedule the next run
 */
function scheduleNextRun() {
    const { msUntilRun, nextRun } = getMillisecondsUntilNextRun();
    
    log(`📅 Next run scheduled for: ${nextRun.toLocaleString()}`);
    log(`⏱️  Time until next run: ${formatDuration(msUntilRun)}`);
    
    setTimeout(() => {
        runDevotionalScript();
    }, msUntilRun);
}

/**
 * Initial check - run immediately if we missed today's scheduled time
 */
function initialCheck() {
    const now = new Date();
    const lastRunFile = path.join(CONFIG.LOG_DIR, 'last-run.txt');
    
    let shouldRunNow = false;
    
    // Check if we have a last run record
    if (fs.existsSync(lastRunFile)) {
        const lastRunDate = fs.readFileSync(lastRunFile, 'utf8').trim();
        const lastRun = new Date(lastRunDate);
        
        // If last run was not today, and current time is past scheduled time, run now
        if (lastRun.toDateString() !== now.toDateString()) {
            const scheduledTimeToday = new Date();
            scheduledTimeToday.setHours(CONFIG.FETCH_HOUR, CONFIG.FETCH_MINUTE, 0, 0);
            
            if (now >= scheduledTimeToday) {
                shouldRunNow = true;
                log('⚡ Missed scheduled time today. Running now...');
            }
        }
    } else {
        // No last run record - run now on first startup
        shouldRunNow = true;
        log('🎯 First run - executing immediately...');
    }
    
    if (shouldRunNow) {
        // Record this run
        fs.writeFileSync(lastRunFile, now.toISOString(), 'utf8');
        runDevotionalScript();
    } else {
        log('✅ Already ran today. Scheduling next run...');
        scheduleNextRun();
    }
}

/**
 * Graceful shutdown handler
 */
function setupShutdownHandlers() {
    const shutdown = () => {
        log('🛑 Scheduler shutting down gracefully...');
        process.exit(0);
    };
    
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

// Main execution
console.log('='.repeat(60));
console.log('📖 Daily Devotional Scheduler Started');
console.log('='.repeat(60));
log(`📋 Configuration:`);
log(`   Fetch Time: ${CONFIG.FETCH_HOUR}:${String(CONFIG.FETCH_MINUTE).padStart(2, '0')}`);
log(`   Script: ${CONFIG.SCRIPT_PATH}`);
log(`   Log File: ${CONFIG.LOG_FILE}`);
console.log('='.repeat(60));

setupShutdownHandlers();
initialCheck();

// Keep the process running
process.stdin.resume();

