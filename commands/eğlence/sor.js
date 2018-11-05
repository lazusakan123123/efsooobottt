const commando  = require('discord.js-commando');
const Discord   = require("discord.js");
const Cleverbot = require('cleverbot-node');
const clbot     = new Cleverbot;

module.exports = class AskCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sor',
            aliases: ['ask', 'botla konuş', 'konuş'],
            group: 'eğlence',
            memberName: 'sor',
            description: 'Bota soru sormanızı sağlar.',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 3
             },

            args: [
                {
                    key: 'message',
                    prompt: 'Bana ne sormak istersin?',
                    type: 'string',
                    min: 1,
                    max: 1000,
                    default: ''
                }
            ]
        });
    }

    async run(message, args) {
        return message.reply('Sor komutu bir süre devre dışıdır.');

        const soru = args.soru;
        if (soru === "yapimcin kim" || soru === "yapimcin kim?" || soru === "yapımcın kim" || soru === "yapımcın kim?") {
            message.channel.startTyping();
              setTimeout(() => {
                    message.reply('**Yapımcım:** 💎🐣Cεγhυη🐣💎#4812 ve [R4] AloneForest#0179');
                    message.channel.stopTyping();
              }, Math.random() * (1 - 3) + 1 * 1000);
              return;
        }

  		Cleverbot.prepare(() => {
  		  clbot.write(soru, (response) => {
            message.channel.startTyping();
  			setTimeout(() => {
  			  message.channel.send('🗨 **Yapay zeka:** ' + response.message).catch(console.error);
  			  message.channel.stopTyping();
  			}, Math.random() * (1 - 3) + 1 * 1000);
  		  });
  		});
	};
};