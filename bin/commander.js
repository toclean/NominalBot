"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voiceHandler_1 = require("./music/voiceHandler");
const musicHandler_1 = require("./music/musicHandler");
let voiceHandler = new voiceHandler_1.VoiceHandler();
let musicHandler = new musicHandler_1.MusicHandler(voiceHandler);
const { prefix } = require('../config.json');
class CommandHandler {
    ProcessCommand(client, message) {
        let rawCommand = message.content.substring(prefix.length).toLowerCase();
        if (rawCommand.startsWith('add')) {
            musicHandler.AddSong(client, musicHandler, message);
        }
        else if (rawCommand.startsWith('play')) {
            musicHandler.Play(client, musicHandler, message);
        }
        switch (rawCommand) {
            case 'help':
                break;
            case 'join':
                voiceHandler.ConnectToVoiceChannel(message);
                break;
            case 'leave':
                voiceHandler.LeaveVoiceChannel(message);
                break;
            case 'stop':
                musicHandler.Stop(musicHandler, message);
                break;
            case 'skip':
                musicHandler.Skip(musicHandler, message);
                break;
            case 'pause':
                musicHandler.Pause(client, musicHandler, message);
                break;
            case 'resume':
                musicHandler.Resume(client, musicHandler, message);
                break;
            case 'replay':
                musicHandler.Replay(musicHandler, message);
        }
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1hbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHVEQUFvRDtBQUNwRCx1REFBb0Q7QUFHcEQsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7QUFHdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRWxELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBdUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFFaEU7SUFHSSxjQUFjLENBQUMsTUFBYyxFQUFFLE9BQWdCO1FBRTNDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV4RSxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQ2hDO1lBQ0ksWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZEO2FBQ0ksSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUN0QztZQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNwRDtRQUVELFFBQU8sVUFBVSxFQUNqQjtZQUNJLEtBQUssTUFBTTtnQkFDUCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUMsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hDLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU07WUFDVixLQUFLLE9BQU87Z0JBQ1IsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNULFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbkQsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7Q0FDSjtBQTFDRCx3Q0EwQ0MifQ==