const path = require('path');
const qrcode = require('qrcode-terminal');
const fs = require('fs');


const { Client } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');

let Txtdata = "";

fs.readFile('textfile.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
    Txtdata = data;

});

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
    console.log('Client is ready!');

});

client.on("ready", () => {
    let time = 0;
    const date1 = new Date();
    console.log(date1)
    console.log("Client is ready!");

    let date2 = new Date();
    const media = MessageMedia.fromFilePath(path.resolve('image.jpg'));

    date2.setHours(18);
    date2.setMinutes(0);
    date2.setSeconds(0);

    //getting the secongs before we send the message
    time = Math.abs((date1.getTime() - date2.getTime()))
    console.log(time)
    setTimeout(() => {
        client.getChats().then((chats) => {
            //Getting the whatsapp group we want to send the message to and sending the message
            myGroup = chats.find((chat) => chat.name === "LCI SA MIDRAND GROUP_21"); //"LCI SA MIDRAND GROUP_21");
            client.sendMessage(myGroup.id._serialized, Txtdata);
            //client.sendMessage(myGroup.id._serialized, media, { caption: msg });
            myGroup = chats.find((chat) => chat.name === "WORK FOR THE LORD @MIDRAN");
            // client.sendMessage(myGroup.id._serialized, media, { caption: msg });
            client.sendMessage(myGroup.id._serialized, Txtdata);
            myGroup = chats.find((chat) => chat.name === "BACENTA LEADERS @LCI MID");
            // client.sendMessage(myGroup.id._serialized, media, { caption: msg })
            client.sendMessage(myGroup.id._serialized, Txtdata);
        })
    }, time)
});
client.initialize();

const msg = `🔔 A kind reminder of our prayer meeting tonight @20:00 ONLINE Pray without ceasing

LCI - Midrand is inviting you to a scheduled Zoom prayer meeting.

Topic: Midrand Tuesday Prayer
Time: 06 September, 2022 20:00 - 21:00 PM Johannesburg

Join Zoom Meeting
https://us02web.zoom.us/j/86316979039?pwd=dnlReFlrdjhab0JhNzY5eVdUUjQzUT09

Meeting ID: 863 1697 9039
Passcode: 299298`


//const msg = `A kind reminder of our prayer meeting tonight @18:00 Pray without ceasing`
/*Txtdata = 
LCI - Midrand is inviting you to a scheduled Zoom meeting.

Topic: Midrand Dawn Prayer
Time: 31 July, 2022 04:00 - 06:00 AM Johannesburg

Join Zoom Meeting
https://us02web.zoom.us/j/86316979039?pwd=dnlReFlrdjhab0JhNzY5eVdUUjQzUT09

Meeting ID: 863 1697 9039
Passcode: 299298
`*/