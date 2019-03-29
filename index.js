'use strict';

const log = require('another-logger');
const {Client} = require('yuuko');
const path = require('path');
const config = require('./config');

const itsuki = new Client(config);

itsuki.once('ready', () => {
	log.success(`Ready! ${itsuki.user.username}#${itsuki.user.discriminator} in ${itsuki.guilds.size} guilds`);
});

itsuki.on('command', (command, msg) => {
	log.info('Command:', command.name, msg.author.id);
});
itsuki.on('warning', log.warn);
itsuki.on('error', log.error);

itsuki.addCommandDir(path.join(__dirname, 'commands')).connect();
