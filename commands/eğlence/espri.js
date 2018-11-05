const commando = require('discord.js-commando');
const Discord = require('discord.js')
var espriler = [
'ÇaImak fiiIinin geIecek zamanı nedir? Hapse girmek.', 
'Geçen gün taksi çevirdim hala dönüyor.', 
'Adamın biri güneşte yanmış, ay da düz.', 
'Adamın biri kızmış istemeye gelmişler.', 
'Ayda 5 milyon kazanma ister misin? Evet.  O zaman Ay’a git.',
]

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'espri',
            group: 'eğlence',
            memberName: 'espri',
            description: 'Espri yapar.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },

        });
    }

async run(message) {

    var espri = espriler[Math.floor(Math.random() * espriler.length)];

  	const embed = new Discord.RichEmbed()
  	.setColor("RANDOM")
    .setDescription(`${espri}`) 
    message.channel.send({embed})
    }
}