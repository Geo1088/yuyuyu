---
layout: default
---
# Commands

These are the commands used by Itsuki. There are other bots on the server that use their own sets of commands.

## Roles

### `!addrole <role>`
### `!removerole <role>`
Add or remove a role from yourself. The following roles can be added to yourself:

## Misc. Text

### `!ping`
Pings the bot.

### `!choose <option, option>`
Chooses a random item from a comma-separated list of things.

## Music

### `!play <URL/query>`
Plays audio from a specific URL or searches for a query on YouTube ([you can make it do others](https://github.com/Just-Some-Bots/MusicBot/wiki/FAQ#is-some-other-website-or-service-supported)) and queues the first result.

### `!search [service] [#] <query>`
Searches a specific service (default: YouTube) for a query and returns the first few results (default: 3, limit: 10). The user can then select from the results if they want to add any to the queue.

### `!stream <url>`
Streams a URL. This can be a Twitch, YouTube, etc livestream, or a radio stream. This feature of the bot is experimental and may have some issues.

### `!queue`
Displays all of the media that is queued.

### `!np`
Displays the media that is currently being played.

### `!skip`
Vote to skip the current media. Required skips or skip ratio are set in the configuration file. The bot's owner will instantly skip when using this command.

### `!shuffle`
Shuffles the queue.

### `!clear`
Clears the queue.

### `!pause`
Pauses the current media.

### `!resume`
Resumes the current media

### `!volume [number]`
Sets the volume of the bot for everyone. Should be a number between 1 and 100. Can be relative (e.g `+10` to add 10 to current volume). If no parameter is given, it will display the current volume.
