'use strict';
const BootBot = require('bootbot');
require('dotenv').load();
const echoModule = require('./modules/echo');
const helpModule = require('./modules/help');
const gifModule = require('./modules/gif');
// const getStartedModule = require('./modules/get_started');
const init = require('./modules/init');
const scraper = require('./modules/scraper')

const bot = new BootBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET
});


// Load Modules
bot.module(echoModule);
bot.module(helpModule);
bot.module(gifModule);
bot.module(init);
bot.module(scraper);


bot.hear('Hello', (payload, chat) => {
  chat.conversation((convo) => {
    convo.sendTypingIndicator(1000).then(() => askLocation(convo));
  });
});

//const askName = (convo) => {
//  convo.ask(`Hello! What's your name?`, (payload, convo, data) => {
//    const text = payload.message.text;
//    convo.set('name', text);
//    convo.say(`Oh, your name is ${text}`).then(() => askLocation(convo));
//  });
//};

// Extremely beta conversation
const askLocation = (convo) => {
  convo.ask(`Where would you like the weather for?`, (payload, convo, data) => {
    const text = payload.message.text;
    convo.set('city', text);
    convo.say(`Got it, ${text}`).then(() => askProvince(convo));
  });
};
const askProvince = (convo) => {
  convo.ask(`Which Province?`, (payload, convo, data) => {
    const text = payload.message.text;
    convo.set('province', text);
    convo.say(`Got it, ${text}`).then(() => askActivity(convo));
  });
};

// This is a pre-built quick reply thing that came with BootBot. It only sort of works.
const askActivity = (convo) => {
  convo.ask((convo) => {
    const buttons = [
      { type: 'postback', title: 'Walk', payload: 'ACTIVITY_WALK' },
      { type: 'postback', title: 'Run', payload: 'ACTIVITY_RUN' },
      { type: 'postback', title: 'Commute', payload: 'ACTIVITY_COMMUTE' }
    ];
    convo.sendButtonTemplate(`What are you doing today?`, buttons);
  }, (payload, convo, data) => {
    const text = payload.message.text;
    convo.set('activity', text);
    convo.say(`Great, you want to ${text}`).then(() => askWhen(convo));
  }, [
    //{
    //  event: 'postback',
    //  callback: (payload, convo) => {
    //    convo.say('You clicked on a button').then(() => askWhen(convo));
    //  }
    //},
    {
      event: 'postback:ACTIVITY_WALK',
      callback: (payload, convo) => {
        convo.set('activity', "walk")
        convo.say('Great').then(() => askWhen(convo));
      }
    }
/*  You may only walk for now, my friend.

,
    {
      event: 'quick_reply',
      callback: () => {}
    },
    {
      event: 'quick_reply:COLOR_BLUE',
      callback: () => {}
    },
    {
      pattern: ['yes', /yea(h)?/i, 'yup'],
      callback: () => {
        convo.say('You said YES!').then(() => askWhen(convo));
      }
    }
I hope that I didn't mess up this comment range too badly.

    */
  ]);
};

// Ask when, then report everything back.

const askWhen = (convo) => {
  convo.ask(`When do you want to go?`, (payload, convo, data) => {
    const text = payload.message.text;
    convo.set('time', text);
    convo.say(`That's great!`).then(() => {
      convo.say(`Ok, here's what you told me about you:` +
      `You want the weather for ${convo.get('city')}, ${convo.get('province')}. \n\n` +
      `Today you're going for a ${convo.get('activity')} at about ${convo.get('time')}`
      );
      convo.end();
    });
  });
};


// pre-built test response for 'hey' instead of 'hello'

bot.hear('hey', (payload, chat) => {
  chat.say('Hello friend', { typing: true }).then(() => (
    chat.say('So, I’m good at talking about the weather. Other stuff, not so good. If you need help just enter “help.”', { typing: true })
  ));
});

// another pre-built quick reply thing. I didn't pick the image. say 'color'

bot.hear('color', (payload, chat) => {
  chat.say({
    text: 'Favorite color?',
    quickReplies: [ 'Red', 'Blue', 'Green' ]
  });
});

bot.hear('image', (payload, chat) => {
  chat.say({
    attachment: 'image',
    url: 'http://static3.gamespot.com/uploads/screen_medium/1365/13658182/3067965-overwatch-review-promo-20160523_v2.jpg',
    quickReplies: [ 'Red', 'Blue', 'Green' ]
  });
});

// pre-built test for a button menu. Say 'button' to bring it up

bot.hear('button', (payload, chat) => {
  chat.say({
    text: 'Select a button',
    buttons: [ 'Male', 'Female', `Don't wanna say` ]
  });
});

// pre-built for saying 'convo'

bot.hear('convo', (payload, chat) => {
  chat.conversation(convo => {
    convo.ask({
      text: 'Favorite color?',
      quickReplies: [ 'Red', 'Blue', 'Green' ]
    }, (payload, convo) => {
      const text = payload.message.text;
      convo.say(`Oh your favorite color is ${text}, cool!`);
      convo.end();
    }, [
      {
        event: 'quick_reply',
        callback: (payload, convo) => {
          const text = payload.message.text;
          convo.say(`Thanks for choosing one of the options. Your favorite color is ${text}`);
          convo.end();
        }
      }
    ]);
  });
});

// Start the bot.

bot.start();
