'use strict';

const {Command} = require('yuuko');

module.exports = new Command(['say', 'quote'], (msg, args) => {
	msg.channel.createMessage(`"${args.join(' ')}" \u2014${msg.member.nick || msg.author.username}`);
});
