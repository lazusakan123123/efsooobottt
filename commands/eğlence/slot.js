const {Command} = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const slots = ['🔧', '💎', '💰', '💵', '💳'];
const Discord = require('discord.js') 

module.exports = class SlotsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'slot',
			group: 'eğlence',
			memberName: 'slot',
			description: 'Slot makinesiyle oynarsınız.'
		});
	}

	run(message) {
		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];
		if (slotOne === slotTwo && slotOne === slotThree && slotOne === slotFort) {

		var kazandin = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setDescription(stripIndents`
		        ${slotOne}|${slotTwo}|${slotThree}
				${slotOne}|${slotTwo}|${slotThree}
				${slotOne}|${slotTwo}|${slotThree}
				Woww! Kazandın!
		`)
		return message.channel.send(kazandin);			
			
		}

		var kaybettin = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setDescription(stripIndents`
		${slotOne}|${slotTwo}|${slotThree}
		${slotOne}|${slotTwo}|${slotThree}
		${slotOne}|${slotTwo}|${slotThree}
			Olamazz! Kaybettin!
		`)
		return message.channel.send(kaybettin);	
	}
};