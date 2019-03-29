'use strict';

const log = require('another-logger');
const {Command} = require('yuuko');

module.exports = new Command(['help', 'h'], (msg, args, {client}) => {
	let commandList = client.commands.map(c => c.name);

	// Add other commands not included in this bot but used in others
	commandList.push('addrole', 'removerole');
	commandList.push('play', 'search', 'stream', 'queue', 'np', 'skip', 'shuffle', 'clear', 'pause', 'resume', 'volume');

	commandList = commandList.map(c => `\`${client.prefix}${c}\``).join(', ');

	msg.channel.createMessage(`**=== Help: Command List ===**
You can use the following commands: ${commandList}
For full help information, see here: <https://geo1088.me/yuyuyu/commands>`).catch(log.error);
});
