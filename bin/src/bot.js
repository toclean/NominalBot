"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const { botToken, prefix } = require('../config.json');
const help_1 = require("../commands/help");
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
    ProcessCommand(message.content.substr(prefix.length));
});
function ProcessCommand(command) {
    switch (command.toLowerCase()) {
        case 'help':
            help_1.GetHelp();
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUE0QztBQUc1QyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUF3QyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUczRiwyQ0FBMEM7QUFFMUMsTUFBTSxNQUFNLEdBQVUsSUFBSSxtQkFBTSxFQUFFLENBQUM7QUFFbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV2QixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ3pELENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUNyQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRztRQUFFLE9BQU87SUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU87SUFFN0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQyxDQUFDO0FBRUgsd0JBQXdCLE9BQWM7SUFFbEMsUUFBUSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQzdCO1FBQ0ksS0FBSyxNQUFNO1lBQ1AsY0FBTyxFQUFFLENBQUM7WUFDVixNQUFNO0tBQ2I7QUFDTCxDQUFDIn0=