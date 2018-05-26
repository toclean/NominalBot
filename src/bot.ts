// Necessary imports from discord
import { Client, Message } from 'discord.js'

// Import command handler
import { CommandHandler } from './commander'

// Create a command handler
const cmdHdlr = new CommandHandler();

// Import secrets from config file
const { botToken }: { botToken: string } = require('../config.json')

// Create a discord client
const client:Client = new Client();

// Connect to the discord server/guild
client.login(botToken);

client.on('ready', () => {
    console.log(`Connected as ${client.user.username}!`);
});

client.on('message', (message: Message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('.')) return;

    cmdHdlr.ProcessCommand(client, message);
});