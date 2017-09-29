// load up tinyreq
const request = require('tinyreq');


// request the js file for Ottawa (Kanata-Orleans)
request("http://weather.gc.ca/wxlink/site_js/s0000430_e.js", function (err, body) {
    console.log(err || "-----------------Start of Scraped Data------------\n" 
    + body);


console.log('-----------------End of Scraped Data--------------');

});
// http://weather.gc.ca/wxlink/wxlink.html?cityCode=on-118&amp;lang=e
// http://weather.gc.ca/wxlink/site_js/s0000866_e.js

/* TODO: Create some kinda method that will automagically select stuff between quotes
// 1. Use regex kinda like \[(?<=\[)(.*?)(?=\])\] but something that
//    will select the double quotes that EC uses.
//
// 2. Export highs and lows to index.js
//
// 3. GOAL: Get chatbot to tell you the temperature for Ottawa
//
*/

/* More TODO:

Next Step (Give me the highs and lows for major city):
- Refactor request to have dynamic city ID
- Select like 5 cities to get weather for to try it out
- Put cities as quick-responses for Chatbot against a persistant menu
- ???
- Profit


THEN (give me the highs and lows for any city):
- Create index of cities on DB or whatever
- Create a bot.hear for the city name, and match it to a city on the DB
- Translate that to cityID
- Pump cityID into request
- Get weather for cityID
- Report it back to user

THEN (Talk to me and tell me if it's going to rain later):

- Focus on developing bot personality, and making it usable by Jane Q Public
- then start working with forecastPeriods/forecastConditions

Then (Big functions):
- Start thinking about 'go for a bike ride' 'go for a run' or something
  that's a one-time thing, going one direction
- Commute! Repeated action that can advise the user when to leave work.
- Longer term forecasts (is it going to rain Friday?)
- etc. etc. etc.


*/