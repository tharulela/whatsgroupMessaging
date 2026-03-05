// Helper functions for WhatsApp messaging bot
const fs = require('fs').promises;

/**
 * Load text content from a file asynchronously
 * @param {string} filepath - Path to the file to read
 * @returns {Promise<string>} - File content or empty string on error
 */
async function loadTextFile(filepath) {
    try {
        const content = await fs.readFile(filepath, 'utf8');
        console.log(`✓ Loaded content from ${filepath}`);
        return content;
    } catch (err) {
        console.error(`✗ Failed to load ${filepath}:`, err.message);
        return '';
    }
}

/**
 * Create a scheduled time for today
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minute (0-59)
 * @returns {Date} - Date object with specified time
 */
function createScheduledTime(hour, minute) {
    const scheduledTime = new Date();
    scheduledTime.setHours(hour);
    scheduledTime.setMinutes(minute);
    scheduledTime.setSeconds(0);
    scheduledTime.setMilliseconds(0);
    return scheduledTime;
}

/**
 * Calculate delay in milliseconds until scheduled time
 * @param {Date} scheduledTime - The target time
 * @param {Date} currentTime - Current time (optional)
 * @returns {number} - Milliseconds until scheduled time (0 if time has passed)
 */
function calculateDelay(scheduledTime, currentTime = new Date()) {
    const delay = scheduledTime.getTime() - currentTime.getTime();
    return Math.max(0, delay);
}

/**
 * Format time delay for logging
 * @param {number} delay - Delay in milliseconds
 * @returns {string} - Formatted string
 */
function formatDelay(delay) {
    const minutes = Math.floor(delay / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
        return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
}

/**
 * Schedule a message to be sent to a WhatsApp group
 * @param {Object} client - WhatsApp client instance
 * @param {Date} scheduledTime - When to send the message
 * @param {string} groupName - Name of the WhatsApp group
 * @param {string} message - Message to send
 * @param {string} taskName - Name of the task (for logging)
 * @returns {number|null} - setTimeout ID or null if scheduling failed
 */
function scheduleMessage(client, scheduledTime, groupName, message, taskName = 'Message') {
    const now = new Date();
    const delay = calculateDelay(scheduledTime, now);
    
    if (delay === 0) {
        console.log(`⏭️  Skipping "${taskName}" - scheduled time has passed`);
        return null;
    }
    
    console.log(`📅 Scheduled: "${taskName}"`);
    console.log(`   → Group: ${groupName}`);
    console.log(`   → Time: ${scheduledTime.toLocaleTimeString()}`);
    console.log(`   → Delay: ${formatDelay(delay)}\n`);
    
    const timeoutId = setTimeout(async () => {
        try {
            console.log(`\n📤 Sending: "${taskName}" to ${groupName}...`);
            
            const chats = await client.getChats();
            const targetGroup = chats.find(chat => chat.name === groupName);
            
            if (!targetGroup) {
                console.error(`✗ Group not found: "${groupName}"`);
                return;
            }
            
            console.log(`✓ Found group: "${groupName}" (ID: ${targetGroup.id._serialized})`);
            await client.sendMessage(targetGroup.id._serialized, message);
            console.log(`✓ Successfully sent to ${groupName}\n`);
            
        } catch (err) {
            console.error(`✗ Failed to send to ${groupName}:`, err.message);
        }
    }, delay);
    
    return timeoutId;
}

/**
 * Schedule multiple messages based on configuration
 * @param {Object} client - WhatsApp client instance
 * @param {Array} scheduleConfig - Array of schedule configurations
 * @param {Date} currentDate - Current date
 * @param {Object} messageData - Additional message data (textfile content, etc.)
 * @returns {Array} - Array of setTimeout IDs
 */
async function scheduleAllMessages(client, scheduleConfig, currentDate, messageData = {}) {
    const currentDay = currentDate.getDay();
    const timeoutIds = [];
    
    console.log('\n' + '='.repeat(60));
    console.log('📋 SCHEDULING MESSAGES');
    console.log('='.repeat(60));
    console.log(`Date: ${currentDate.toDateString()}`);
    console.log(`Day: ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDay]}\n`);
    
    for (const task of scheduleConfig) {
        // Check if task should run today
        if (!task.days.includes(currentDay)) {
            continue;
        }
        
        const scheduledTime = createScheduledTime(task.hour, task.minute);
        
        // Determine message content
        let message = task.message;
        
        if (task.messageSource === 'textfile') {
            message = messageData.textFileContent || '';
            if (!message) {
                console.log(`⚠️  Skipping "${task.name}" - text file content not loaded\n`);
                continue;
            }
        } else if (task.messageSource === 'dynamic-leading') {
            message = messageData.leadingPrayerMessage;
            if (!message) {
                console.log(`⏭️  Skipping "${task.name}" - no prayer leader for tomorrow\n`);
                continue;
            }
        } else if (task.messageSource === 'dynamic-cleaning') {
            message = messageData.cleaningReminderMessage;
            if (!message) {
                console.log(`⏭️  Skipping "${task.name}" - no cleaning team info available\n`);
                continue;
            }
        }
        
        // Schedule for each group
        for (const groupName of task.groups) {
            const timeoutId = scheduleMessage(
                client,
                scheduledTime,
                groupName,
                message,
                task.name
            );
            
            if (timeoutId) {
                timeoutIds.push(timeoutId);
            }
        }
    }
    
    console.log('='.repeat(60));
    console.log(`✓ Scheduling complete: ${timeoutIds.length} message(s) scheduled`);
    console.log('='.repeat(60) + '\n');
    
    return timeoutIds;
}

module.exports = {
    loadTextFile,
    createScheduledTime,
    calculateDelay,
    formatDelay,
    scheduleMessage,
    scheduleAllMessages
};


