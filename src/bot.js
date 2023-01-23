import { config as dotenv } from 'dotenv'
dotenv({ path: `.env` })

import discord from 'discord.js'
const { Client, GatewayIntentBits } = discord

import fs from 'fs'
import fetch from 'node-fetch'

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
  const attachment = message.attachments.first()
  if (attachment && /\.(png|jpe?g|svg)$/.test(attachment.url)) {
    console.log(attachment.url)
    fetch(attachment.url)
      .then((res) => res.buffer())
      .then((buffer) => {
        fs.writeFileSync(`./output/${attachment.name}`, buffer)
      })
  }
})

client.login(process.env.TOKEN)
