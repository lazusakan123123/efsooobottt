const Command = require('../../structures/Command');
const { randomRange } = require('../../util/Util');
const fishes = require('../../assets/json/fishy');

module.exports = class FishyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'balık-tut',
			aliases: ['balık'],
			group: 'eğlence',
			memberName: 'balık-tut',
			description: 'Balık tutarsınız.'
		});
	}

	run(message) {
		const fishID = Math.floor(Math.random() * 10) + 1;
		let rarity;
		if (fishID < 5) rarity = 'junk';
		else if (fishID < 8) rarity = 'common';
		else if (fishID < 10) rarity = 'uncommon';
		else rarity = 'rare';
		const fish = fishes[rarity];
		const worth = randomRange(fish.min, fish.max);
		return message.reply(`Bir \`${fish.symbol}\` yakaladın! Bahse girerim \`${worth} TL\` civarında satılır.`);
	}
};