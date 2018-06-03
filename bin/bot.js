"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const commander_1 = require("./commander");
const cmdHdlr = new commander_1.CommandHandler();
const { botToken } = require('../config.json');
const client = new discord_js_1.Client();
client.login(botToken);
client.on('ready', () => {
    console.log(`Connected as ${client.user.username}!`);
});
client.on('message', (message) => {
    if (message.author.bot)
        return;
    if (!message.content.startsWith('.'))
        return;
    cmdHdlr.ProcessCommand(client, message);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUE0QztBQUc1QywyQ0FBNEM7QUFHNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSwwQkFBYyxFQUFFLENBQUM7QUFHckMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUF5QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUdwRSxNQUFNLE1BQU0sR0FBVSxJQUFJLG1CQUFNLEVBQUUsQ0FBQztBQUduQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXZCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDekQsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRTtJQUN0QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRztRQUFFLE9BQU87SUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU87SUFFN0MsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUMifQ==