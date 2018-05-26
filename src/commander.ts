import { Message, Client } from 'discord.js';

// Command imports
import { Command } from './models/command'
import { Help } from './commands/help'
import { VoiceHandler } from './music/voiceHandler';
import { MusicHandler } from './music/musicHandler';

// Create a voicehandler
let voiceHandler = new VoiceHandler();

// Create a musichandler
let musicHandler = new MusicHandler(voiceHandler);

const { prefix }: { prefix: string } = require('../config.json')

export class CommandHandler
{
    // Todo: add property that will hold voicehandler and musichandler?
    ProcessCommand(client: Client, message: Message): void
    {
        let rawCommand = message.content.substring(prefix.length).toLowerCase();

        if (rawCommand.startsWith('add'))
        {
            musicHandler.AddSong(client, musicHandler, message);
        }
        else if (rawCommand.startsWith('play'))
        {
            musicHandler.Play(client, musicHandler, message);
        }

        switch(rawCommand)
        {
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