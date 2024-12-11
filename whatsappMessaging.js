const path = require('path');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const config = require('./config');
const logger = require('./logger');

const SUNDAY = 0;
const MONDAY = 1;
const TUESDAY = 2;
const WEDNESDAY = 3;
const THURSDAY = 4;
const FRIDAY = 5;
const SATURDAY = 6;

let dailyDevotionMessage = "";
fs.readFile('textfile.txt', 'utf8', (err, data) => {
    if (err) {
        logger.error(`Error reading textfile.txt: ${err.message}`);
        return;
    }
    logger.info('Textfile read successfully');
    dailyDevotionMessage = data;
});

const date1 = new Date();
const date2 = new Date(date1);

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
    date2.setHours(9);
    date2.setMinutes(0);
    date2.setSeconds(0);

    let time = Math.abs((date1.getTime() - date2.getTime()));
    logger.info(`Time difference: ${time} milliseconds`);

    setTimeout(() => {
        client.getChats().then((chats) => {
            let myGroup = chats.find((chat) => chat.name === config.mainChurchGroup);
            client.sendMessage(myGroup.id._serialized, dailyDevotionMessage);
            logger.info('Daily devotion message sent to main church group');
        }).catch((err) => {
            logger.error(`Error getting chats: ${err.message}`);
        });
    }, time);

    if (date2.getDay() === WEDNESDAY) {
        date2.setHours(12);
        date2.setMinutes(0);
        date2.setSeconds(0);
        time = Math.abs((date1.getTime() - date2.getTime()));
        logger.info(`Time difference for Wednesday prayer message: ${time} milliseconds`);

        setTimeout(() => {
            client.getChats().then((chats) => {
                let myGroup = chats.find((chat) => chat.name === config.mainChurchGroup);
                const media = MessageMedia.fromFilePath(path.resolve('image.jpg'));
                client.sendMessage(myGroup.id._serialized, media, { caption: config.tuesdayPrayerMessage });
                myGroup = chats.find((chat) => chat.name === config.testingGroup);
                client.sendMessage(myGroup.id._serialized, media, { caption: config.tuesdayPrayerMessage });
                myGroup = chats.find((chat) => chat.name === config.bacentaLeadersGroup);
                client.sendMessage(myGroup.id._serialized, media, { caption: config.tuesdayPrayerMessage });
                logger.info('Tuesday prayer message sent to groups');
            }).catch((err) => {
                logger.error(`Error getting chats: ${err.message}`);
            });
        }, time);

        date2.setHours(18);
        date2.setMinutes(0);
        date2.setSeconds(0);
        time = Math.abs((date1.getTime() - date2.getTime()));
        logger.info(`Time difference for Wednesday service message: ${time} milliseconds`);

        setTimeout(() => {
            client.getChats().then((chats) => {
                let myGroup = chats.find((chat) => chat.name === config.mainChurchGroup);
                client.sendMessage(myGroup.id._serialized, config.msgWednesdayService);
                myGroup = chats.find((chat) => chat.name === config.workForTheLordGroup);
                client.sendMessage(myGroup.id._serialized, config.msgWednesdayService);
                myGroup = chats.find((chat) => chat.name === config.bacentaLeadersGroup);
                client.sendMessage(myGroup.id._serialized, config.msgWednesdayService);
                logger.info('Wednesday service message sent to groups');
            }).catch((err) => {
                logger.error(`Error getting chats: ${err.message}`);
            });
        }, time);
    } else if (date2.getDay() === MONDAY || date2.getDay() === THURSDAY) {
        date2.setHours(19);
        date2.setMinutes(30);
        date2.setSeconds(0);
        time = Math.abs((date1.getTime() - date2.getTime()));
        logger.info(`Time difference for morning prayer message: ${time} milliseconds`);

        setTimeout(() => {
            client.getChats().then((chats) => {
                let myGroup = chats.find((chat) => chat.name === config.mainChurchGroup);
                client.sendMessage(myGroup.id._serialized, config.morningPrayerTuesAndFriday);
                myGroup = chats.find((chat) => chat.name === config.workForTheLordGroup);
                client.sendMessage(myGroup.id._serialized, config.morningPrayerTuesAndFriday);
                myGroup = chats.find((chat) => chat.name === config.bacentaLeadersGroup);
                client.sendMessage(myGroup.id._serialized, config.morningPrayerTuesAndFriday);
                logger.info('Morning prayer message sent to groups');
            }).catch((err) => {
                logger.error(`Error getting chats: ${err.message}`);
            });
        }, time);
    } else if (date2.getDay() === SATURDAY) {
        date2.setHours(20);
        date2.setMinutes(0);
        date2.setSeconds(0);
        time = Math.abs((date1.getTime() - date2.getTime()));
        logger.info(`Time difference for Sunday morning prayer message: ${time} milliseconds`);

        setTimeout(() => {
            client.getChats().then((chats) => {
                let myGroup = chats.find((chat) => chat.name === config.mainChurchGroup);
                client.sendMessage(myGroup.id._serialized, config.sundayMorningPrayer);
                myGroup = chats.find((chat) => chat.name === config.workForTheLordGroup);
                client.sendMessage(myGroup.id._serialized, config.sundayMorningPrayer);
                myGroup = chats.find((chat) => chat.name === config.bacentaLeadersGroup);
                client.sendMessage(myGroup.id._serialized, config.sundayMorningPrayer);
                logger.info('Sunday morning prayer message sent to groups');
            }).catch((err) => {
                logger.error(`Error getting chats: ${err.message}`);
            });
        }, time);
    }
});

client.on('auth_failure', (msg) => {
    logger.error(`Authentication failure: ${msg}`);
});

client.on('disconnected', (reason) => {
    logger.warn(`Client was logged out: ${reason}`);
});

client.initialize().catch((err) => {
    logger.error(`Error initializing client: ${err.message}`);
});

const MONTH_NAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
