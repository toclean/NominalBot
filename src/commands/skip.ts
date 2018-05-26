import { Stop } from './stop'
import { MusicHandler } from '../music/musicHandler';
import { Message } from 'discord.js';
import { Command } from '../models/command';

export class Skip implements Command
{
    name = 'skip';
    desc = 'Skips the current song';

    public SkipSong(musicHandler: MusicHandler, message: Message)
    {
        if (musicHandler.upNext!.songs.length < 2)
        {
            musicHandler.Stop(musicHandler, message);
            musicHandler.voiceHandler!.LeaveVoiceChannel(message);
            musicHandler.upNext!.songs = [];
            return;
        }
        
        if (musicHandler.voiceHandler!.voiceConnection! && musicHandler.dispatcher)
        {
            setTimeout(() => {
                musicHandler.dispatcher!.end();
            }, 500);
        }
    }
}