// Configuration file for WhatsApp messaging bot

// Day constants
const DAYS = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
};

// Group names
const GROUPS = {
    MAIN_CHURCH: "LCI SA MIDRAND GROUP_21 Zone 4 - STRONG CHRISTIAN CHURCH",
    ADMINISTRATORS: "Midrand Church Administration",
    KEY_LEADERS: "2025 - LCI Midrand Key Leaders"
};

// Message templates
const MESSAGES = {
    prayer: `🛐🏃🏾‍♂️🏃🏽‍♀️ *In Everything by Prayer and Thanksgiving* 🙌🏽🙏🏽🗣️

📅 *Dawn Prayer Meeting Time:* 04:00 - 06:00 AM, TUES - FRI

🔗 *Join Zoom Meeting:* 👉🏽 Click Here: https://us02web.zoom.us/j/6385621994?pwd=1VHJaJ8RIZxOzGciQY8qIxLfZ0tTDE.1

📌 *Meeting ID:* 638 562 1994
🔑 *Passcode:* 411743/KREATE

Join the Midrand Zoom *Breakout Room*

1️⃣ Download Zoom APP
2️⃣ Click the link above to join.
3️⃣ Click *MIDRAND* Breakout Room🪟
4️⃣ *PRAY FERVENTLY* with us

📌 Device Name Format: *Name Surname - Midrand, Z4* ⬅️

✝️🔥🙌🏽🛐🙏🏽🗣️🙌🏽💃🏼`,

    cleaning: `🧼🧽 *Cleaning the Church* 🧽🧼
Greetings, Brethren,
*@Media* just a friendly reminder that it's your team's turn to clean the church this Saturday. Please remember to arrange for the key in advance and ensure a thorough cleaning is done. Once completed, kindly share the cleaning report in the group.`,

    ciaMeeting: `Greetings, Brethren,


This is just a reminder that our Church Intelligence Meeting is happening today at 8PM ⏰

Let's all make an effort to be there and on time as we discuss important matters for the growth and effectiveness of our ministry.

See you there!

Church Intelligence Meeting

STRONG CHRISTIAN CHURCH - MIDRAND, Z4 is inviting you to a scheduled Zoom meeting.


Time: Tuesday 20:00-21:00 PM Johannesburg

Join Zoom Meeting
https://us02web.zoom.us/j/81914595927?pwd=kk1rN4Ctd4c011V94Pc8Vsw14X5AXD.1

Meeting ID: 819 1459 5927
Passcode: 710592`,

    sundayPrayer: `*DAWN INTERSESSION PRAYER*

STRONG CHRISTIAN CHURCH - MIDRAND, Z4 is inviting you to a scheduled Zoom meeting.

Topic: Prayer Meeting 
Time: Sunday *04:00-05:00* AM Johannesburg

Join Zoom Meeting
https://us02web.zoom.us/j/81914595927?pwd=kk1rN4Ctd4c011V94Pc8Vsw14X5AXD.1

Meeting ID: 819 1459 5927
Passcode: 710592`
};

// Prayer leaders by day
const PRAYER_LEADERS = {
    [DAYS.SUNDAY]: "Sister Charmaine & Brother Bernard",
    [DAYS.MONDAY]: "Pastor Mpho & Pastor Samuel",
    [DAYS.TUESDAY]: "Sister Pheladi & Sister Ditshebo",
    [DAYS.WEDNESDAY]: "Sister Tshego & Sister Mandy",
    [DAYS.THURSDAY]: "Brother Thabo & Sister Marion",
    [DAYS.FRIDAY]: "Brother Thabo & Sister Marion",
    [DAYS.SATURDAY]: "Sister Charmaine & Brother Bernard"
};

// Shepherd leading prayer by date
const SHEPHERD_LEADING = [
    "", // Day 0
    "Sister Pheladi",
    "Sister Ditshebo",
    "Pastor Samuel",
    "",
    "Sister Charmaine",
    "",
    "Pastor Mpho",
    "Sister Tshego",
    "Pastor Samuel",
    "Sister Marion",
    "",
    "Brother Thabo",
    "",
    "Pastor Mpho",
    "Sister Pheladi",
    "Sister Ditshebo",
    "Brother Bernard",
    "",
    "Sister Marion",
    "",
    "Pastor Mpho",
    "Sister Tshego",
    "Sister Charmaine",
    "Brother Thabo",
    "",
    "Sister Pheladi",
    "",
    "Pastor Mpho",
    "Sister Ditshebo",
    "Pastor Samuel",
    "Sister Charmaine"
];

// Generate leading prayer message dynamically
function getLeadingPrayerMessage(date) {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.getDate();
    const leader = SHEPHERD_LEADING[tomorrowDate] || PRAYER_LEADERS[tomorrow.getDay()];
    
    if (leader) {
        return `${leader} kindly note that you'll be leading prayer tomorrow morning.`;
    }
    return null;
}

// Schedule configuration
const SCHEDULE = [
    {
        name: 'Daily Devotional',
        hour: 10,
        minute: 5,
        days: [DAYS.SUNDAY, DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY, DAYS.FRIDAY, DAYS.SATURDAY],
        groups: [GROUPS.MAIN_CHURCH],
        messageSource: 'textfile' // Special: load from file
    },
    {
        name: 'CIA Meeting Reminder',
        hour: 15,
        minute: 5,
        days: [DAYS.TUESDAY],
        groups: [GROUPS.ADMINISTRATORS],
        message: MESSAGES.ciaMeeting
    },
    {
        name: 'Evening Prayer Invitation',
        hour: 20,
        minute: 20,
        days: [DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY],
        groups: [GROUPS.MAIN_CHURCH, GROUPS.KEY_LEADERS],
        message: MESSAGES.prayer
    },
    {
        name: 'Leading Prayer Reminder',
        hour: 20,
        minute: 25,
        days: [DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY],
        groups: [GROUPS.KEY_LEADERS],
        messageSource: 'dynamic-leading' // Special: generate dynamically
    },
    {
        name: 'Friday Cleaning Reminder',
        hour: 12,
        minute: 0,
        days: [DAYS.FRIDAY],
        groups: [GROUPS.KEY_LEADERS],
        message: MESSAGES.cleaning
    },
    {
        name: 'Saturday Evening Prayer (1)',
        hour: 19,
        minute: 0,
        days: [DAYS.SATURDAY],
        groups: [GROUPS.KEY_LEADERS],
        message: MESSAGES.sundayPrayer
    },
    {
        name: 'Saturday Evening Prayer (2)',
        hour: 19,
        minute: 5,
        days: [DAYS.SATURDAY],
        groups: [GROUPS.KEY_LEADERS],
        message: MESSAGES.sundayPrayer
    }
];

module.exports = {
    DAYS,
    GROUPS,
    MESSAGES,
    PRAYER_LEADERS,
    SHEPHERD_LEADING,
    SCHEDULE,
    getLeadingPrayerMessage
};


