import { config as dotenv } from 'dotenv'
dotenv({ path: `.env` })

import discord from 'discord.js'
const { Client, GatewayIntentBits } = discord

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})

client.once('ready', () => {
  console.log(`bot is online`)
})

client.on('message', async (message) => {
  console.log(message)
  if (message.content === 'ping') {
    message.reply('pong')
  }
})

client.login(process.env.TOKEN)
