'use strict';
module.exports = (bot) => {
  bot.hear('Get Started', (payload, chat) => {
    const text = payload.message.text;
    const buttons = [
      { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
      { type: 'postback', title: 'Notifications', payload: 'HELP_NOTIFICATIONS' }
    ];
    chat.sendButtonTemplate(`Need help? Try one of these options`, buttons);
  });
};
