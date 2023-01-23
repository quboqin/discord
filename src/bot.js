import { config as dotenv } from 'dotenv'
dotenv({ path: `.env` })

import discord from 'discord.js'
const { Client, GatewayIntentBits } = discord

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
})

client.once('ready', () => {
  console.log(`bot is online`)
})

// https://stackoverflow.com/questions/73036854/message-content-doesnt-have-any-value-in-discord-js
client.on('messageCreate', async (message) => {
  console.log(message.content)
  if (message.content === 'ping') {
    message.reply('pong')
  }
})

client.login(process.env.TOKEN)
