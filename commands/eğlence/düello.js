const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../../util/Util');

module.exports = class BattleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'düello',
			aliases: ['1v1'],
			group: 'eğlence',
			memberName: 'düello',
			description: 'Birisi ile düello atarsınız.',
			args: [
				{
					key: 'opponent',
					prompt: 'Kim ile düello atmak istersin?',
					type: 'user',
				}
			]
		});

		this.fighting = new Set();
	}

	async run(message, { opponent }) { // eslint-disable-line complexity
		if (opponent.id === message.author.id) return message.reply('Kendin ile düello atamazsın.');
		if (this.fighting.has(message.channel.id)) return message.reply('Kanal başına sadece bir düello meydana gelebilir.');
		this.fighting.add(message.channel.id);
		try {
			if (!opponent.bot) {
                await message.say(`${opponent}, düello isteği geldi. Düello'yu kabul ediyor musun? (\`evet\` veya \`hayır\` olarak cevap veriniz.)`);
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					return message.say(`${this.client.emojis.get('459626880300220426')} Düello kabul edilmedi...`);
				}
			}
			let userHP = 500;
			let oppoHP = 500;
			let userTurn = false;
			let guard = false;
			const reset = (changeGuard = true) => {
				userTurn = !userTurn;
				if (changeGuard && guard) guard = false;
			};
			const dealDamage = damage => {
				if (userTurn) oppoHP -= damage;
				else userHP -= damage;
			};
			const forfeit = () => {
				if (userTurn) userHP = 0;
				else oppoHP = 0;
			};
			while (userHP > 0 && oppoHP > 0) { // eslint-disable-line no-unmodified-loop-condition
				const user = userTurn ? message.author : opponent;
				let choice;
				if (!opponent.bot || (opponent.bot && userTurn)) {
					await message.say(stripIndents`
						${user}, ne yapmak istersin? **saldır**, **korun**, **efsane**, veya **pes et**?
						**${message.author.username}**: ${userHP}HP
						**${opponent.username}**: ${oppoHP}HP
					`);
					const filter = res =>
						res.author.id === user.id && ['saldır', 'korun', 'efsane', 'pes et'].includes(res.content.toLowerCase());
					const turn = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30000
					});
					if (!turn.size) {
						await message.say(`${this.client.emojis.get('459626880300220426')} Üzgünüm ama, süre doldu!`);
						reset();
						continue;
					}
					choice = turn.first().content.toLowerCase();
				} else {
					const choices = ['saldır', 'korun', 'efsane'];
					choice = choices[Math.floor(Math.random() * choices.length)];
				}
				if (choice === 'saldır') {
					const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
					await message.say(`${user}, **${damage}** hasar vurdu!`);
					dealDamage(damage);
					reset();
				} else if (choice === 'korun') {
					await message.say(`${user}, korundu!`);
					guard = true;
					reset(false);
				} else if (choice === 'efsane') {
					const miss = Math.floor(Math.random() * 4);
					if (!miss) {
						const damage = randomRange(100, guard ? 150 : 300);
						await message.say(`${user}, Woww! **${damage}** hasar vurdu!`);
						dealDamage(damage);
					} else {
						await message.say(`${user}, Off! Şanssızlık! Atak yapamadın!`);
					}
					reset();
				} else if (choice === 'pes et') {
					await message.say(`${user}, pes etti! Seni korkak!`);
					forfeit();
					break;
				} else {
					await message.say('Ne yapmak istediğini anlamadım.');
				}
			}
			this.fighting.delete(message.channel.id);
            const winner = userHP > oppoHP ? message.author : opponent;
			return message.say(`Oyun bitti! Tebrikler, **${winner}** kazandı! \n**${message.author.username}**: ${userHP}HP \n**${opponent.username}**: ${oppoHP}HP`);
		} catch (err) {
			this.fighting.delete(message.channel.id);
			throw err;
		}
	}
};