const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const ascii = require('figlet');

module.exports = class AsciiTextCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ascii',
      aliases: ['ascii-yazı'],
      group: 'eğlence',
      memberName: 'ascii',
      description: 'Yazınız ascii şeklinde olur.',
      examples: ['ascii hello'],
      args: [{
        key: 'toAscii',
        label: 'text',
        prompt: 'Ascii şeklinde yazmak istediğiniz yazı?',
        type: 'string',
        validate: text => {
          if (text.length <= 10) return true
          //eslint-disable-next-line newline-before-return
          return 'Mesajınız çok uzun! 10 karakter veya daha az olmalı.'
        },
        infinite: false
      }]
    })
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
    ascii(args.toAscii, {
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
      },
      function(err, data) {
        if (err) {
          message.reply('Bir şeyler yanlış gitti! Bir geliştiriciyle iletişime geçin. https://discord.gg/yR6VCbm')
          console.error(err)
        }
        message.delete(1)
        message.channel.send(data, {
          code: 'text'
        })
      })
  }
};