// Necessary imports from discord
import { Client, Message } from 'discord.js';

// Import command handler
import { CommandHandler } from './commander';

// Check if debug mode is enabled
let { debug }: { debug: boolean } = require('../config.json');
debug = (debug === true);

// Create a command handler
const cmdHdlr = new CommandHandler();

// Import secrets from config file
const config = require('../config.json');

// Create a discord client
const client:Client = new Client();

// Connect to the discord server/guild
client.login(config.botToken);

// Prompt when connected to server
client.on('ready', () => {
    if (debug) console.log('Attempting to connect...');
    console.log(`Connected as ${client.user.username}!`);
});

// Check each incoming message to see if it is valid
client.on('message', (message: Message) => {
    // Check if the author of said message is a bot and if so ignore it
    if (message.author.bot) return;

    // Set the prefix as the config prefix or default prefix
    let useablePrefix = config.prefix || '.';

    // Check if the message starts with the prefix
    if (!message.content.startsWith(useablePrefix)) return;

    if (debug) console.log(`Message recieved: ${message.content}`);

    // Process said command
    cmdHdlr.ProcessCommand(client, message);
});