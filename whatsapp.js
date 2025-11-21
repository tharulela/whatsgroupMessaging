const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const config = require('./config');
const helpers = require('./helpers');

// Initialize WhatsApp client with session persistence
const client = new Client({
    authStrategy: new LocalAuth()
});

// QR Code event handler
client.on('qr', (qr) => {
    console.log('\n' + '='.repeat(60));
    console.log('📱 QR CODE GENERATED');
    console.log('='.repeat(60));
    console.log('Please scan this QR code with your WhatsApp mobile app:\n');
    qrcode.generate(qr, { small: true });
    console.log('\n' + '='.repeat(60) + '\n');
});

// Authentication success handler
client.on('authenticated', () => {
    console.log('✓ Authentication successful!');
});

// Authentication failure handler
client.on('auth_failure', (message) => {
    console.error('✗ Authentication failed:', message);
});

// Disconnection handler
client.on('disconnected', (reason) => {
    console.log('⚠️  Client disconnected:', reason);
});

// Ready event handler - Main logic starts here
client.on('ready', async () => {
    console.log('\n' + '='.repeat(60));
    console.log('✓ CLIENT READY!');
    console.log('='.repeat(60) + '\n');
    
    try {
        const currentDate = new Date();
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Load text file content for daily devotional
        const textFileContent = await helpers.loadTextFile('textfile.txt');
        
        // Get leading prayer message for tomorrow
        const leadingPrayerMessage = config.getLeadingPrayerMessage(currentDate);
        
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
            leadingPrayerMessage
        };
        
        await helpers.scheduleAllMessages(
            client,
            config.SCHEDULE,
            currentDate,
            messageData
        );
        
        console.log('🤖 Bot is now running and waiting to send scheduled messages...\n');
        
    } catch (err) {
        console.error('✗ Error during initialization:', err);
    }
});

// Error handler
client.on('error', (error) => {
    console.error('✗ Client error:', error);
});

// Initialize the client
console.log('🚀 Starting WhatsApp Bot...\n');
client.initialize();

// Graceful shutdown handlers
process.on('SIGINT', async () => {
    console.log('\n\n⏹️  Shutting down gracefully...');
    await client.destroy();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n\n⏹️  Shutting down gracefully...');
    await client.destroy();
    process.exit(0);
});
