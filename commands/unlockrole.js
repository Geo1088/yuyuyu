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

module.exports = new Command('unlockrole', async msg => {
	if (!msg.channel.guild) return;
	try {
		// First, we have to remove old lock roles if there are any
		const removeOldLockPromises = msg.member.roles
			.filter(roleId => {
				const rol = msg.channel.guild.roles.find(r => r.id === roleId);
				return lockRolesNames.includes(rol.name);
			})
			.map(roleId => msg.member.removeRole(roleId));
		if (!removeOldLockPromises.length) {
			msg.channel.createMessage(stripIndents`
				You didn't have a role locked in. Use \`!lockrole\` to add one.
			`).catch(log.error);
			return;
		}
		await Promise.all(removeOldLockPromises);
		msg.channel.createMessage(stripIndents`
			I've removed your locked-in role.
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
