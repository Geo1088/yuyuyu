const {Client, Command} = require('yuuko')
const path = require('path')
const config = require('./config')

const itsuki = new Client(config)

itsuki.addCommandDir(path.join(__dirname, 'commands'))

itsuki.connect()
