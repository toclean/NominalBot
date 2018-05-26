"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help_1 = require("./commands/help");
const voiceHandler_1 = require("./commands/music/voiceHandler");
const musicHandler_1 = require("./commands/music/musicHandler");
let voiceHandler = new voiceHandler_1.VoiceHandler();
let musicHandler = new musicHandler_1.MusicHandler();
const { prefix } = require('../config.json');
let commands = new Map([
    ['help', new help_1.Help()],
    ['voiceHandler', voiceHandler],
    ['musicHandler', musicHandler]
]);
class CommandHandler {
    ProcessCommand(client, message) {
        let rawCommand = message.content.substring(prefix.length).toLowerCase();
        if (rawCommand.startsWith('add')) {
            commands.get('musicHandler').AddSong(client, voiceHandler, message);
        }
        else if (rawCommand.startsWith('play')) {
            commands.get('musicHandler').PlaySong(client, voiceHandler, message);
        }
        switch (rawCommand) {
            case 'help':
                commands.get('help').GetHelp(commands);
                break;
            case 'join':
                commands.get('voiceHandler').ConnectToVoiceChannel(message);
                break;
            case 'leave':
                commands.get('voiceHandler').LeaveVoiceChannel(message);
                break;
            case 'stop':
                commands.get('musicHandler').Stop(voiceHandler, message);
                break;
            case 'skip':
                commands.get('musicHandler').SkipSong(voiceHandler, message);
                break;
            case 'pause':
                commands.get('musicHandler').PauseSong(client, message);
                break;
            case 'resume':
                commands.get('musicHandler').ResumeSong(client, message);
                break;
        }
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1hbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLDBDQUFzQztBQUN0QyxnRUFBNkQ7QUFDN0QsZ0VBQTZEO0FBRzdELElBQUksWUFBWSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO0FBR3RDLElBQUksWUFBWSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO0FBRXRDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBdUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFFaEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQ3JCO0lBQ0csQ0FBQyxNQUFNLEVBQUUsSUFBSSxXQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUM7SUFDOUIsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDO0NBQ2pDLENBQUMsQ0FBQztBQUVIO0lBR0ksY0FBYyxDQUFDLE1BQWMsRUFBRSxPQUFnQjtRQUUzQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFeEUsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUNoQztZQUNLLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFtQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzFGO2FBQ0ksSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUN0QztZQUNLLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFtQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNGO1FBRUQsUUFBTyxVQUFVLEVBQ2pCO1lBQ0ksS0FBSyxNQUFNO2dCQUNOLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNOLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFtQixDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvRSxNQUFNO1lBQ1YsS0FBSyxPQUFPO2dCQUNQLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFtQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRSxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNOLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzVFLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ04sUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQW1CLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEYsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUCxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBbUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRSxNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNSLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFtQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzVFLE1BQU07U0FDYjtJQUNMLENBQUM7Q0FDSjtBQXpDRCx3Q0F5Q0MifQ==