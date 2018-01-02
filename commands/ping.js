const {Command} = require('yuuko')

module.exports = new Command('ping', function (msg) {
  msg.channel.createMessage("I'm here.")
}, {
  desc: 'Pings the bot.',
  args: ''
})
