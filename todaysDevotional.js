const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { Client } = require('whatsapp-web.js');
let obj;

(async () => {
    const args = process.argv.slice(2);
    const postCode = args[0] || 2000;
    let post = "";
    const url = `https://www.daghewardmills.org/new/portfolio-items/daily-devotional/`;
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const linkTitle = $('h2').find("a").first().text();
        const linkUrl = $('h2').find("a").first().attr('href');
        obj = { title: linkTitle, url: linkUrl }
        post += `*Dag Heward-Mills ${obj.title}*\n\n`;
        const message = await axios.get(obj.url);
        const msg = cheerio.load(message.data);
        let arr = [];
        msg('.post-content').find("p").each(function (i, prgh) {
            arr.push(msg(prgh).text())
            post += `${msg(prgh).text()}\n\n`

        })    //text();
        fs.writeFileSync("textfile.txt", post)
        const date1 = new Date();
        console.log(date1)
        let date = + date1.getFullYear() + "/" + (date1.getMonth() + 1) + "/" + date1.getDate() + " 09:00:00";
        const date2 = new Date(date);  // " 02:56:32");

        console.log(date2)
        console.log(Math.abs((date1.getTime() - date2.getTime())))

    } catch (e) {
        console.error(`Error while fetching rental properties for ${postCode} - ${e.message}`);
    }
})();

console.log(obj)