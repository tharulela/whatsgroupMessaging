const path = require('path');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const config = require('./config');
const logger = require('./logger');

let Txtdata = "";

fs.readFile('textfile.txt', 'utf8', (err, data) => {
    if (err) {
        logger.error(`Error reading textfile.txt: ${err.message}`);
        return;
    }
    logger.info('Textfile read successfully');
    Txtdata = data;
});

const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    authStrategy: new LegacySessionAuth({
        session: config.session
    })
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    logger.info('QR code generated');
});

client.on('ready', () => {
    logger.info('Client is ready!');
});

client.on('auth_failure', (msg) => {
    logger.error(`Authentication failure: ${msg}`);
});

client.on('disconnected', (reason) => {
    logger.warn(`Client was logged out: ${reason}`);
});

client.on("ready", () => {
    let time = 0;
    const date1 = new Date();
    logger.info(`Current date and time: ${date1}`);
    logger.info("Client is ready!");

    let date2 = new Date();
    const media = MessageMedia.fromFilePath(path.resolve('image.jpg'));

    date2.setHours(18);
    date2.setMinutes(0);
    date2.setSeconds(0);

    time = Math.abs((date1.getTime() - date2.getTime()));
    logger.info(`Time difference: ${time} milliseconds`);

    setTimeout(() => {
        client.getChats().then((chats) => {
            let myGroup = chats.find((chat) => chat.name === config.mainChurchGroup);
            client.sendMessage(myGroup.id._serialized, Txtdata);
            myGroup = chats.find((chat) => chat.name === config.workForTheLordGroup);
            client.sendMessage(myGroup.id._serialized, Txtdata);
            myGroup = chats.find((chat) => chat.name === config.bacentaLeadersGroup);
            client.sendMessage(myGroup.id._serialized, Txtdata);
            logger.info('Messages sent to groups');
        }).catch((err) => {
            logger.error(`Error getting chats: ${err.message}`);
        });
    }, time);
});

client.initialize().catch((err) => {
    logger.error(`Error initializing client: ${err.message}`);
});

const msg = config.prayerMeetingMessage;
