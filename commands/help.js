const {Command} = require('yuuko')

module.exports = new Command(['help', 'h'], function (msg, args) {
  const prefix = this.prefixForMessage(msg)

  // If we got nothing, command list
  if (!args[0]) {
    let commandList = this.commands.map(c => c.name)

    // Add other commands not included in this bot but used in others
    commandList.push('addrole', 'removerole')
    commandList.push('play', 'otherMusicBotCommands')

    commandList = commandList.map(c => '`' + prefix + c + '`').join(', ')

    return msg.channel.createMessage(`**=== Help: Command List ===**
You can use the following commands: ${commandList}
For full help information, see here: <https://geo1088.me/yuyuyu>`)
  }

  // We got a command, let's try using it
  let command = this.commandForName(args[0])
  if (command) return msg.channel.createMessage(`**=== Help: \`${prefix + command.name}\` ===**\n${command.helpText(prefix)}`)

  // Rip, error
  msg.channel.createMessage(`**=== Help: Unknown Command ===**
Make sure you spelled the command name right, and that this bot has it. Do \`${prefix}help\` with no arguments to see a list of commands.`)
})
