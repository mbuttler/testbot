'use strict';
const fetch = require('node-fetch');
const GIPHY_URL = `http://api.giphy.com/v1/gifs/random?api_key=0H10euaIoUlvQPBpI5j5v1NJll08UYBu&tag=`;

module.exports = (bot) => {
bot.hear(/gif (.*)/i, (payload, chat, data) => {
    const query = data.match[1];
    chat.say('Searching for the perfect gif...');
    fetch(GIPHY_URL + query)
      .then(res => res.json())
      .then(json => {
        chat.say({
          attachment: 'image',
          url: json.data.image_url
        }, {
          typing: true
        });
      });
  })};