'use strict';

const log = require('another-logger');
const {stripIndents} = require('common-tags');
const {Command} = require('yuuko');
const {roles} = require('../util/roles.json');

function codeList (arr) {
	return arr.map(val => `\`${val}\``).join(' ');
}

const roleNames = codeList(Object.keys(roles));

module.exports = new Command(['removerole', 'removeroles'], async (msg, args) => {
	if (!msg.channel.guild) return;
	if (!args.length) {
		msg.channel.createMessage(stripIndents`
				You need to tell me which roles to remove! Here's what you can ask to have removed:
				${roleNames}
			`).catch(log.error);
	}
	const knownNames = [];
	const unknownNames = [];
	const roleRemovePromises = args.map(name => {
		const role = msg.channel.guild.roles.find(r => r.name === roles[name.toLowerCase()]);
		if (!role) {
			unknownNames.push(name);
			return null;
		}
		knownNames.push(name);
		return msg.member.removeRole(role.id);
	});
	try {
		await Promise.all(roleRemovePromises);
		let message = '';
		if (unknownNames.length) {
			if (knownNames.length) {
				// Some worked, some didn't
				message = stripIndents`
						I don't know who or what the following are, and ignored them:
						${codeList(unknownNames)}
						I've still removed the following from you:
						${codeList(knownNames)}
					`;
			} else {
				// None worked
				message = stripIndents`
						I don't know who or what ${unknownNames.length === 1 ? 'that is' : 'any of those are'}. Valid names are:
						${roleNames}
					`;
			}
		} else {
			// All worked
			message = stripIndents`
					I've removed ${knownNames.length === 1 ? 'that role' : 'those roles'} from you.
				`;
		}
		msg.channel.createMessage(message).catch(log.error);
	} catch (error) {
		msg.channel.createMessage(stripIndents`
				There was an error removing those roles from you:
				\`\`\`
				${error}
				\`\`\`
			`);
	}
});
