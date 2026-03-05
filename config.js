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


Time: Wednesday 20:00-21:00 PM Johannesburg

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
"",
"Sister Charmaine",
"",
"Pastor Mpho",
"Brother Zuko",
"Brother Thabo",
"Sister Lehlogonolo",
"",
"Sister Charmaine",
" Pastor Mpho",
"Brother Bernard", 
"Brother Nicholas",
"Sister Pheladi",
"",
"Brother Zuko",
"Pastor Mpho",
"Sister  Lehlogonolo",
"Brother Bernard",
"Brother Nicholas",
"",
"Brother Thabo",
"Pastor Mpho",
"Sister Pheladi",
"Brother Nicholas",
"Sister Lehlogonolo",
"",
"Sister Charmaine",
"Pastor Mpho"
]

// Generate leading prayer message dynamically
function getLeadingPrayerMessage(date) {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.getDate();
    const leader = SHEPHERD_LEADING[tomorrowDate];
    
    if (leader) {
        return `${leader} kindly note that you'll be leading prayer tomorrow morning.`;
    }
    return null;
}


// Schedule configuration
const SCHEDULE = [
    {
        name: 'Daily Devotional',
        hour: 9,
        minute: 45,
        days: [DAYS.SUNDAY, DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY, DAYS.FRIDAY, DAYS.SATURDAY],
        groups: [GROUPS.MAIN_CHURCH],
        messageSource: 'textfile' // Special: load from file
    },
    {
        name: 'CIA Meeting Reminder',
        hour: 12,
        minute: 0,
        days: [DAYS.WEDNESDAY],
        groups: [GROUPS.ADMINISTRATORS],
        message: MESSAGES.ciaMeeting
    },
    {
        name: 'Evening Prayer Invitation',
        hour: 19,
        minute: 0,
        days: [DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY],
        groups: [GROUPS.MAIN_CHURCH, GROUPS.KEY_LEADERS],
        message: MESSAGES.prayer
    },
    {
        name: 'Leading Prayer Reminder',
        hour: 19,
        minute: 5,
        days: [DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY],
        groups: [GROUPS.KEY_LEADERS],
        messageSource: 'dynamic-leading' // Special: generate dynamically
    },
    {
        name: 'Friday Cleaning Reminder',
        hour: 11,
        minute: 0,
        days: [DAYS.FRIDAY, DAYS.WEDNESDAY],
        groups: [GROUPS.KEY_LEADERS],
        messageSource: 'dynamic-cleaning' // Special: generate dynamically
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


// 2026 Church Cleaning Schedule
const CLEANING_SCHEDULE_2026 = [
    { month: 'JANUARY', days: [
        { date: '03-january-2026', team: 'Ushers' },
        { date: '10-january-2026', team: 'Saved & Y-Church' },
        { date: '17-january-2026', team: 'Hospitality' },
        { date: '24-january-2026', team: 'Media' },
        { date: '31-january-2026', team: 'Praise & Worship' },
    ]},
    { month: 'FEBRUARY', days: [
        { date: '07-february-2026', team: 'Ushers' },
        { date: '14-february-2026', team: 'Saved & Y-Church' },
        { date: '21-february-2026', team: 'Hospitality' },
        { date: '28-february-2026', team: 'Media' },
    ]},
    { month: 'MARCH', days: [
        { date: '07-march-2026', team: 'Praise & Worship' },
        { date: '14-march-2026', team: 'Ushers' },
        { date: '21-march-2026', team: 'Saved & Y-Church' },
        { date: '28-march-2026', team: 'Hospitality' },
    ]},
    { month: 'APRIL', days: [
        { date: '04-april-2026', team: 'Media' },
        { date: '11-april-2026', team: 'Praise & Worship' },
        { date: '18-april-2026', team: 'Ushers' },
        { date: '25-april-2026', team: 'Saved & Y-Church' },
    ]},
    { month: 'MAY', days: [
        { date: '02-may-2026', team: 'Hospitality' },
        { date: '09-may-2026', team: 'Media' },
        { date: '16-may-2026', team: 'Praise & Worship' },
        { date: '23-may-2026', team: 'Ushers' },
        { date: '30-may-2026', team: 'Saved & Y-Church' },
    ]},
    { month: 'JUNE', days: [
        { date: '06-june-2026', team: 'Hospitality' },
        { date: '13-june-2026', team: 'Media' },
        { date: '20-june-2026', team: 'Praise & Worship' },
        { date: '27-june-2026', team: 'Ushers' },
    ]},
    { month: 'JULY', days: [
        { date: '04-july-2026', team: 'Saved & Y-Church' },
        { date: '11-july-2026', team: 'Hospitality' },
        { date: '18-july-2026', team: 'Media' },
        { date: '25-july-2026', team: 'Praise & Worship' },
    ]},
    { month: 'AUGUST', days: [
        { date: '01-august-2026', team: 'Ushers' },
        { date: '08-august-2026', team: 'Saved & Y-Church' },
        { date: '15-august-2026', team: 'Hospitality' },
        { date: '22-august-2026', team: 'Media' },
        { date: '29-august-2026', team: 'Praise & Worship' },
    ]},
    { month: 'SEPTEMBER', days: [
        { date: '05-september-2026', team: 'Ushers' },
        { date: '12-september-2026', team: 'Saved & Y-Church' },
        { date: '19-september-2026', team: 'Hospitality' },
        { date: '26-september-2026', team: 'Media' },
    ]},
    { month: 'OCTOBER', days: [
        { date: '03-october-2026', team: 'Praise & Worship' },
        { date: '10-october-2026', team: 'Ushers' },
        { date: '17-october-2026', team: 'Saved & Y-Church' },
        { date: '24-october-2026', team: 'Hospitality' },
        { date: '31-october-2026', team: 'Media' },
    ]},
    { month: 'NOVEMBER', days: [
        { date: '07-november-2026', team: 'Praise & Worship' },
        { date: '14-november-2026', team: 'Ushers' },
        { date: '21-november-2026', team: 'Saved & Y-Church' },
        { date: '28-november-2026', team: 'Hospitality' },
    ]},
    { month: 'DECEMBER', days: [
        { date: '05-december-2026', team: 'Media' },
        { date: '12-december-2026', team: 'Praise & Worship' },
        { date: '19-december-2026', team: 'Ushers' },
        { date: '26-december-2026', team: 'Saved & Y-Church' },
    ]},
];

module.exports.CLEANING_SCHEDULE_2026 = CLEANING_SCHEDULE_2026;


/**
 * Returns the cleaning team for the coming Saturday from the 2026 schedule, or null if not found.
 * @param {Date} [fromDate] - Optional date to start from (defaults to today)
 * @returns {{date: string, team: string}|null}
 */
function getCleaningTeamForComingSaturday(fromDate = new Date()) {
    // Find next Saturday
    const date = new Date(fromDate);
    const day = date.getDay();
    const daysUntilSaturday = (6 - day + 7) % 7 || 7; // always future Saturday
    date.setDate(date.getDate() + daysUntilSaturday);
    // Format as dd-month-2026
    const dayStr = String(date.getDate()).padStart(2, '0');
    const monthStr = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
    const formatted = `${dayStr}-${monthStr}-2026`;
    let cleaningTeam = '';
    // Search in schedule
    for (const month of CLEANING_SCHEDULE_2026) {
        for (const entry of month.days) {
            if (entry.date === formatted) {
                cleaningTeam = entry.team;
                break;
            }
        }

        if (cleaningTeam) {
            break;
        }
    }

    if (!cleaningTeam) {
        return null;
    }

    return `🧼🧽 *Cleaning the Church* 🧽🧼
Greetings, Brethren,
*${cleaningTeam}* just a friendly reminder that it's your team's turn to clean the church this Saturday. Please remember to arrange for the key in advance and ensure a thorough cleaning is done. Once completed, kindly share the cleaning report in the group.`;
}
module.exports.getCleaningTeamForComingSaturday = getCleaningTeamForComingSaturday;


