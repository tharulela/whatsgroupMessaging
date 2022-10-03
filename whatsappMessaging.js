const path = require('path');
const qrcode = require('qrcode-terminal');
const fs = require('fs');


const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');


const SUNDAY = 0;
const MONDAY = 1;
const TUESDAY = 2;
const WEDNESDAY = 3;
const THURSDAY = 4;
const FRIDAY = 5;
const SATURDAY = 6;
const MAIN_CHURCH_GROUP = "LCI SA MIDRAND GROUP_21";
const WORK_FOR_THE_LORD_GROUP = "WORK FOR THE LORD @MIDRAN";
const BACENTA_LEADERS_GROUP = "BACENTA LEADERS @LCI MID";
const TESTING = "Testing";



let dailyDevotionMessage = ""
fs.readFile('textfile.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
    dailyDevotionMessage = data;

});


const date1 = new Date();
const date2 = new Date(date1);

//const client = new Client();
const client = new Client();



client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true })
});


client.on("ready", () => {
    date2.setHours(9);
    date2.setMinutes(0);
    date2.setSeconds(0);

    //getting the secongs before we send the message
    time = Math.abs((date1.getTime() - date2.getTime()))
    console.log(time)
    setTimeout(() => {
        client.getChats().then((chats) => {
            //Getting the whatsapp group we want to send the message to and sending the message
            myGroup = chats.find((chat) => chat.name === MAIN_CHURCH_GROUP);
            client.sendMessage(myGroup.id._serialized, dailyDevotionMessage);
        })
    }, time)




    if (date2.getDay() == WEDNESDAY) {
        date2.setHours(12);
        date2.setMinutes(0);
        date2.setSeconds(0);
        time = Math.abs((date1.getTime() - date2.getTime()))
        setTimeout(() => {
            client.getChats().then((chats) => {
                //Getting the whatsapp group we want to send the message to and sending the message
                myGroup = chats.find((chat) => chat.name === MAIN_CHURCH_GROUP);
                client.sendMessage(myGroup.id._serialized, media, { caption: TUESDAY_PRAYER_MESSAGE });
                myGroup = chats.find((chat) => chat.name === TESTING);
                client.sendMessage(myGroup.id._serialized, media, { caption: TUESDAY_PRAYER_MESSAGE });
                myGroup = chats.find((chat) => chat.name === BACENTA_LETESTINGADERS_GROUP);
                client.sendMessage(myGroup.id._serialized, media, { caption: TUESDAY_PRAYER_MESSAGE });
            })
        }, time);
        date2.setHours(18);
        date2.setMinutes(0);
        date2.setSeconds(0);

        time = matt.abs(date1.getTime() - date1.getTime())
        setTimeout(() => {
            myGroup = chats.find((chat) => chat.name === MAIN_CHURCH_GROUP);
            client.sendMessage(myGroup.id._serialized, msgWednesdayService);
            myGroup = chats.find((chat) => chat.name === WORK_FOR_THE_LORD_GROUP);
            client.sendMessage(myGroup.id._serialized, msgWednesdayService);
            myGroup = chats.find((chat) => chat.name === BACENTA_LEADERS_GROUP);
            client.sendMessage(myGroup.id._serialized, msgWednesdayService);
        }, time)
    }
    else if (date2.getDay() == MONDAY || date2.getDay == THURSDAY) {
        date2.setHours(19);
        date2.setMinutes(30);
        date2.setSeconds(0);
        time = Math.abs((date1.getTime() - date2.getTime()))
        setTimeout(() => {
            client.getChats().then((chats) => {
                //Getting the whatsapp group we want to send the message to and sending the message
                myGroup = chats.find((chat) => chat.name === MAIN_CHURCH_GROUP);
                client.sendMessage(myGroup.id._serialized, morningPrayerTuesAndFriday);
                myGroup = chats.find((chat) => chat.name === WORK_FOR_THE_LORD_GROUP);
                client.sendMessage(myGroup.id._serialized, morningPrayerTuesAndFriday);
                myGroup = chats.find((chat) => chat.name === BACENTA_LEADERS_GROUP);
                client.sendMessage(myGroup.id._serialized, morningPrayerTuesAndFriday);
                //client.sendMessage(myGroup.id._serialized, Txtdata);*/
            })
        }, time);
    }
    else if (date2.getDay() == SATURDAY) {
        date2.setHours(20);
        date2.setMinutes(0);
        date2.setSeconds(0);
        time = Math.abs((date1.getTime() - date2.getTime()))
        setTimeout(() => {
            client.getChats().then((chats) => {
                myGroup = chats.find((chat) => chat.name === MAIN_CHURCH_GROUP);
                client.sendMessage(myGroup.id._serialized, sundayMorningPrayer);
                myGroup = chats.find((chat) => chat.name === WORK_FOR_THE_LORD_GROUP);
                client.sendMessage(myGroup.id._serialized, sundayMorningPrayer);
                myGroup = chats.find((chat) => chat.name === BACENTA_LEADERS_GROUP);
                client.sendMessage(myGroup.id._serialized, sundayMorningPrayer);
            })
        }, time)
    }
});

client.initialize();

const MONTH_NAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TUESDAY_PRAYER_MESSAGE = `A kind reminder of our prayer meeting tonight @18:00 Pray without ceasing`
let morningPrayerTuesAndFriday = `
🔔 Midrand Dawn Prayer 

LCI - Midrand is inviting you to a scheduled Zoom prayer meeting.

Topic: Midrand Dawn Prayer
Time: ${date2.getDate() + 1} ${MONTH_NAME[date2.getMonth()]}, ${date2.getFullYear()} 03:00 - 05:00 AM Johannesburg

Join Zoom Meeting
https://us02web.zoom.us/j/86316979039?pwd=dnlReFlrdjhab0JhNzY5eVdUUjQzUT09

Meeting ID: 863 1697 9039
Passcode: 299298`


let sundayMorningPrayer = `
🔔 Midrand Dawn Prayer 

LCI - Midrand is inviting you to a scheduled Zoom meeting.

Topic: Midrand Dawn Prayer
Time:  ${date2.getDate() + 1} ${MONTH_NAME[date2.getMonth()]}, ${date2.getFullYear()} 04:00 - 06:00 AM Johannesburg

Join Zoom Meeting
https://us02web.zoom.us/j/86316979039?pwd=dnlReFlrdjhab0JhNzY5eVdUUjQzUT09

Meeting ID: 863 1697 9039
Passcode: 299298 `


let msgWednesdayService = `
Good Afternoon Brethren,

The service has started
`

let msgMorningPrayer = `
Good Morning Brethren,

Prayer has started 
`

let msgMorningService = `
Good Morning Brethren,

The service has started
`





