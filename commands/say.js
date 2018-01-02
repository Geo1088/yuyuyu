const {Command} = require('yuuko')

module.exports = new Command(['say', 'quote'], function (msg, args) {
  msg.channel.createMessage(`"${args.join(' ')}" \u2014${msg.member && msg.member.nick || msg.author.username}`)
})
