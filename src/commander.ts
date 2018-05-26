import { Message, Client } from 'discord.js';

// Command imports
import { Command } from './commands/command'
import { Help } from './commands/help'
import { VoiceHandler } from './commands/music/voiceHandler';
import { MusicHandler } from './commands/music/musicHandler';

// Create a voicehandler
let voiceHandler = new VoiceHandler();

// Create a musichandler
let musicHandler = new MusicHandler();

const { prefix }: { prefix: string } = require('../config.json')

let commands = new Map<string, Command>
([
    ['help', new Help()],
    ['voiceHandler', voiceHandler],
    ['musicHandler', musicHandler]
]);

export class CommandHandler
{
    // Todo: add property that will hold voicehandler and musichandler?
    ProcessCommand(client: Client, message: Message): void
    {
        let rawCommand = message.content.substring(prefix.length).toLowerCase();

        if (rawCommand.startsWith('add'))
        {
            (commands.get('musicHandler')! as MusicHandler).AddSong(client, voiceHandler, message);
        }
        else if (rawCommand.startsWith('play'))
        {
            (commands.get('musicHandler')! as MusicHandler).PlaySong(client, voiceHandler, message);
        }

        switch(rawCommand)
        {
            case 'help':
                (commands.get('help')! as Help).GetHelp(commands);
                break;
            case 'join':
                (commands.get('voiceHandler')! as VoiceHandler).ConnectToVoiceChannel(message);
                break;
            case 'leave':
                (commands.get('voiceHandler')! as VoiceHandler).LeaveVoiceChannel(message);
                break;
            case 'stop':
                (commands.get('musicHandler')! as MusicHandler).Stop(voiceHandler, message);
                break;
            case 'skip':
                (commands.get('musicHandler')! as MusicHandler).SkipSong(voiceHandler, message);
                break;
            case 'pause':
                (commands.get('musicHandler')! as MusicHandler).PauseSong(client, message);
                break;
            case 'resume':
                (commands.get('musicHandler')! as MusicHandler).ResumeSong(client, message);
                break;
        }
    }
}