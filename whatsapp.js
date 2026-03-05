const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config');
const helpers = require('./helpers');

const LOCK_FILE = path.join(__dirname, '.whatsapp-bot.lock');
const LOG_DIR = path.join(__dirname, 'logs');
const AUTH_LOG_FILE = path.join(LOG_DIR, 'auth-events.log');
const PUPPETEER_PROTOCOL_TIMEOUT_MS = 180000;
let hasLock = false;
let hasStartedScheduling = false;
let dailyRefreshTimeoutId = null;
let qrEventCount = 0;
let lastDisconnectReason = null;
let lastAuthFailureMessage = null;
let hasBrowserDisconnectHook = false;

function logAuthEvent(event, details = '') {
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] [PID:${process.pid}] [${event}] ${details}`.trim();

    console.log(`🔎 ${message}`);

    try {
        if (!fs.existsSync(LOG_DIR)) {
            fs.mkdirSync(LOG_DIR, { recursive: true });
        }
        fs.appendFileSync(AUTH_LOG_FILE, message + '\n', 'utf8');
    } catch (logError) {
        console.warn('⚠️  Failed to write auth diagnostics log:', logError.message);
    }
}

function acquireSingleInstanceLock() {
    try {
        fs.writeFileSync(LOCK_FILE, String(process.pid), { flag: 'wx' });
        hasLock = true;
    } catch (error) {
        if (error.code === 'EEXIST') {
            let existingPid = 'unknown';
            try {
                existingPid = fs.readFileSync(LOCK_FILE, 'utf8').trim() || 'unknown';
            } catch (readError) {
                console.warn('⚠️  Could not read lock file PID:', readError.message);
            }

            console.error('✗ Another WhatsApp bot instance is already running.');
            console.error(`   Existing PID: ${existingPid}`);
            console.error('   Stop the running instance first, then start again.');
            process.exit(1);
        }

        throw error;
    }
}

function releaseSingleInstanceLock() {
    if (!hasLock) {
        return;
    }

    try {
        fs.unlinkSync(LOCK_FILE);
    } catch (unlinkError) {
        console.warn('⚠️  Could not remove lock file:', unlinkError.message);
    }
}

// Initialize WhatsApp client with session persistence
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'midrand-bot',
        dataPath: path.join(__dirname, '.wwebjs_auth')
    }),
    puppeteer: {
        headless: true,
        protocolTimeout: PUPPETEER_PROTOCOL_TIMEOUT_MS,
        timeout: 120000,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
});

// QR Code event handler
client.on('qr', (qr) => {
    qrEventCount += 1;
    const contextDetails = [
        `qrCount=${qrEventCount}`,
        `lastDisconnect=${lastDisconnectReason || 'none'}`,
        `lastAuthFailure=${lastAuthFailureMessage || 'none'}`
    ].join(' | ');
    logAuthEvent('QR_GENERATED', contextDetails);

    console.log('\n' + '='.repeat(60));
    console.log('📱 QR CODE GENERATED');
    console.log('='.repeat(60));
    console.log('Please scan this QR code with your WhatsApp mobile app:\n');
    qrcode.generate(qr, { small: true });
    console.log('\n' + '='.repeat(60) + '\n');
});

// Authentication success handler
client.on('authenticated', () => {
    lastAuthFailureMessage = null;
    logAuthEvent('AUTHENTICATED', `qrCount=${qrEventCount}`);
    console.log('✓ Authentication successful!');
});

// Authentication failure handler
client.on('auth_failure', (message) => {
    lastAuthFailureMessage = message;
    logAuthEvent('AUTH_FAILURE', message || 'No failure message provided');
    console.error('✗ Authentication failed:', message);
});

// Disconnection handler
client.on('disconnected', (reason) => {
    lastDisconnectReason = reason;
    logAuthEvent('DISCONNECTED', reason || 'No disconnect reason provided');
    console.log('⚠️  Client disconnected:', reason);
});

client.on('change_state', (state) => {
    logAuthEvent('STATE_CHANGE', `state=${state}`);
});

/**
 * Schedule messages for a given day
 */
async function scheduleDailyMessages() {
    try {
        if (dailyRefreshTimeoutId) {
            clearTimeout(dailyRefreshTimeoutId);
            dailyRefreshTimeoutId = null;
        }

        const currentDate = new Date();
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Load text file content for daily devotional
        const textFileContent = await helpers.loadTextFile('textfile.txt');
        
        // Get leading prayer message for tomorrow
        const leadingPrayerMessage = config.getLeadingPrayerMessage(currentDate);
        const cleaningReminderMessage = config.getCleaningTeamForComingSaturday(currentDate);
        
        // Log current date information
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        console.log(`📅 Current Date: ${currentDate.toDateString()}`);
        console.log(`📅 Current Time: ${currentDate.toLocaleTimeString()}`);
        console.log(`📅 Day: ${dayNames[currentDate.getDay()]} (Day ${currentDate.getDay()})`);
        
        if (leadingPrayerMessage) {
            console.log(`🙏 Tomorrow's Prayer Leader: ${config.SHEPHERD_LEADING[tomorrow.getDate()] || 'TBD'}`);
        }
        console.log('');
        
        // Schedule all messages based on configuration
        const messageData = {
            textFileContent,
            leadingPrayerMessage,
            cleaningReminderMessage
        };
        
        await Promise.resolve(helpers.scheduleAllMessages(
            client,
            config.SCHEDULE,
            currentDate,
            messageData
        ));
        
        console.log('🤖 Bot is now running and waiting to send scheduled messages...\n');
        
        // Schedule next refresh at midnight (12:00:01 AM tomorrow)
        const nextMidnight = new Date(currentDate);
        nextMidnight.setHours(24, 0, 1, 0); // Next day at 12:00:01 AM
        const msUntilMidnight = nextMidnight.getTime() - currentDate.getTime();
        
        console.log(`🔄 Auto-refresh scheduled for: ${nextMidnight.toLocaleString()}`);
        console.log(`⏱️  Time until refresh: ${Math.floor(msUntilMidnight / (1000 * 60 * 60))}h ${Math.floor((msUntilMidnight % (1000 * 60 * 60)) / (1000 * 60))}m\n`);
        
        dailyRefreshTimeoutId = setTimeout(() => {
            console.log('\n' + '='.repeat(60));
            console.log('🔄 DAILY REFRESH - Rescheduling messages for new day');
            console.log('='.repeat(60) + '\n');
            scheduleDailyMessages(); // Recursive call for next day
        }, msUntilMidnight);
        
    } catch (err) {
        console.error('✗ Error during scheduling:', err);
    }
}

// Ready event handler - Main logic starts here
client.on('ready', async () => {
    if (hasStartedScheduling) {
        logAuthEvent('READY_DUPLICATE', 'Ready event fired after scheduling already started');
        console.log('ℹ️  Client ready event received again; skipping duplicate scheduling.');
        return;
    }

    hasStartedScheduling = true;
    logAuthEvent('READY', `qrCount=${qrEventCount}`);

    if (!hasBrowserDisconnectHook && client.pupBrowser && typeof client.pupBrowser.on === 'function') {
        client.pupBrowser.on('disconnected', () => {
            logAuthEvent('PUPPETEER_DISCONNECTED', 'Chromium browser connection closed');
        });
        hasBrowserDisconnectHook = true;
        logAuthEvent('PUPPETEER_HOOK', 'Attached browser disconnect listener');
    }

    console.log('\n' + '='.repeat(60));
    console.log('✓ CLIENT READY!');
    console.log('='.repeat(60) + '\n');
    
    // Start daily scheduling cycle
    await scheduleDailyMessages();
});

// Error handler
client.on('error', (error) => {
    console.error('✗ Client error:', error);
});

// Initialize the client
console.log('🚀 Starting WhatsApp Bot...\n');
acquireSingleInstanceLock();
logAuthEvent('STARTUP', `authPath=${path.join(__dirname, '.wwebjs_auth')} | lockFile=${LOCK_FILE}`);
client.initialize();

// Graceful shutdown handlers
process.on('SIGINT', async () => {
    console.log('\n\n⏹️  Shutting down gracefully...');
    if (dailyRefreshTimeoutId) {
        clearTimeout(dailyRefreshTimeoutId);
    }
    releaseSingleInstanceLock();
    await client.destroy();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n\n⏹️  Shutting down gracefully...');
    if (dailyRefreshTimeoutId) {
        clearTimeout(dailyRefreshTimeoutId);
    }
    releaseSingleInstanceLock();
    await client.destroy();
    process.exit(0);
});

process.on('exit', () => {
    releaseSingleInstanceLock();
});

process.on('unhandledRejection', (reason) => {
    let message = reason?.message;
    if (!message) {
        try {
            message = JSON.stringify(reason);
        } catch (serializationError) {
            console.warn('⚠️  Could not serialize unhandled rejection reason:', serializationError.message);
            message = 'Unhandled rejection (non-serializable reason)';
        }
    }
    console.error('✗ Unhandled promise rejection:', message);
    logAuthEvent('UNHANDLED_REJECTION', message);
    releaseSingleInstanceLock();
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('✗ Uncaught exception:', error.message);
    logAuthEvent('UNCAUGHT_EXCEPTION', error.message || 'Unknown uncaught exception');
    releaseSingleInstanceLock();
    process.exit(1);
});
