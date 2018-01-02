const {Command} = require('yuuko')

module.exports = new Command(['help', 'h'], function (msg, args) {
  const prefix = this.prefixForMessage(msg)

  let commandList = this.commands.map(c => c.name)

  // Add other commands not included in this bot but used in others
  commandList.push('addrole', 'removerole')
  commandList.push('play', 'search', 'stream', 'queue', 'np', 'skip', 'shuffle', 'clear', 'pause', 'resume', 'volume')

  commandList = commandList.map(c => '`' + prefix + c + '`').join(', ')

  msg.channel.createMessage(`**=== Help: Command List ===**
You can use the following commands: ${commandList}
For full help information, see here: <https://geo1088.me/yuyuyu/commands>`)
})
