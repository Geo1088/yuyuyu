'use strict';

const log = require('another-logger');
const {stripIndents} = require('common-tags');
const {Command} = require('yuuko');
const {lockRoles} = require('../util/roles.json');

function codeList (arr) {
	return arr.map(val => `\`${val}\``).join(' ');
}

const lockRolesNames = Object.keys(lockRoles).map(k => lockRoles[k]);
const roleNames = codeList(Object.keys(lockRoles));

module.exports = new Command('lockrole', async (msg, args) => {
	if (!msg.channel.guild) return;
	if (!args.length) {
		msg.channel.createMessage(stripIndents`
			You need to tell me what you want added! Here's what you can ask for:
			${roleNames}
		`);
		return;
	}
	if (args.length > 1) {
		msg.channel.createMessage('You can only lock one character!');
		return;
	}
	const role = msg.channel.guild.roles.find(r => r.name === lockRoles[args[0].toLowerCase()]);
	if (!role) {
		msg.channel.createMessage(stripIndents`
		I don't know who that is. Valid names are:
		${roleNames}
		`).catch(log.error);
		return;
	}
	try {
		// First, we have to remove old lock roles if there are any
		const removeOldLockPromises = msg.member.roles
			.filter(roleId => {
				const rol = msg.channel.guild.roles.find(r => r.id === roleId);
				return lockRolesNames.includes(rol.name);
			})
			.map(roleId => msg.member.removeRole(roleId));
		await Promise.all(removeOldLockPromises);
		// Then we can actually add the new role
		await msg.member.addRole(role.id);
		msg.channel.createMessage(stripIndents`
			I've locked in that role for you.
		`).catch(log.error);
	} catch (error) {
		msg.channel.createMessage(stripIndents`
			There was an error assigning your roles.
			\`\`\`
			${error}
			\`\`\`
		`).catch(log.error);
	}
});
