const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { Client } = require('whatsapp-web.js');
let obj;

(async () => {
    const args = process.argv.slice(2);
    const postCode = args[0] || 2000;
    let post = "";
    const url = `https://www.daghewardmills.org/portfolio-items/daily-devotional/`;
    try {
        const response = await axios.get(url);
        console.log(`Fetching daily devotional from ${url}`);
        const $ = cheerio.load(response.data);
        console.log(`Successfully fetched data from ${url}`);
        const linkTitle = $('h2').find("a").first().text();
        const linkUrl = $('h2').find("a").first().attr('href');
        obj = { title: linkTitle, url: linkUrl }
        const start = obj.title.indexOf('“');
        const end = obj.title.indexOf('”');
        let extracted = "";
        if (start !== -1 && end !== -1) {
           extracted = obj.title.slice(start + 1, end); // +1 to skip the opening quote
          console.log(extracted); // Output: ACTIVE & AGGRESSIVE
        } else {
          console.log('Quotes not found');
          extracted = obj.title ? obj.title : "No title found";
        }
        post += `*${extracted}*\n\n`;
         post += `*Dag Heward-Mills*\n\n`;
        const message = await axios.get(obj.url);
        const msg = cheerio.load(message.data);
        let arr = [];
        msg('.post-content').find("p").each(function (i, prgh) {
            arr.push(msg(prgh).text())
           // post += `${msg(prgh).text()}\n\n`

        })    
        
        for (const element of arr) {
           if (element.trim().startsWith("READ:")) {
            post+=`*${element.trim()}*\n\n`;
           }  
           else
           {
            post += `${element.trim()}\n\n`;
           }
        }
       
        fs.writeFileSync("textfile.txt", post)
        const date1 = new Date();
        console.log(date1)
        let date = + date1.getFullYear() + "/" + (date1.getMonth() + 1) + "/" + date1.getDate() + " 09:00:00";
        const date2 = new Date(date);  // " 02:56:32");

        console.log(date2)
        console.log(Math.abs((date1.getTime() - date2.getTime())))

    } catch (e) {
        console.error(`Error while fetching daily devotional  for ${postCode} - ${e.message}`);
    }
})();

console.log(obj)