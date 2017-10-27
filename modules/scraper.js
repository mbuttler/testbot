// Load Tinyreq, which is a dependency for the scraper
const request = require('tinyreq');


// Request (Scrape) the JS file related to Ottawa (Kanata-Orleans)
request("http://weather.gc.ca/wxlink/site_js/s0000430_e.js", function (err, body) {
    console.log(err || "-----------------Start of Scraped Data------------\n" 
    + body);


console.log('-----------------End of Scraped Data--------------');

});
