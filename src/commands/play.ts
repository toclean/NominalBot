import { Message, Client } from "discord.js";
import { MusicHandler } from "../music/musicHandler";

import * as yt from 'ytdl-core'
import { Command } from "../models/command";

export class Play implements Command
{
    name = 'play';
    desc = 'Starts the player';

    public async PlaySong(client: Client, musicHandler: MusicHandler, message: Message)
    {
        if (!musicHandler.upNext || !musicHandler.voiceHandler) return;

        if (musicHandler.upNext.songs.length < 1)
        {
            message.reply('No more songs in the queue!');
            return;
        }
    
        if (!musicHandler.voiceHandler.voiceConnection)
        {
            await musicHandler.voiceHandler!.ConnectToVoiceChannel(message);
        }
    
        if (musicHandler.upNext.playing)
        {
            message.reply('Music is already playing!');
            return;
        }
    
        if (musicHandler.dispatcher && musicHandler.dispatcher.paused)
        {
            musicHandler.Resume(client, musicHandler, message);
        }
    
        let stream = yt(musicHandler.upNext.songs[0].url, {
            filter: 'audioonly'
        });
    
        try
        {
            musicHandler.dispatcher = musicHandler.voiceHandler!.voiceConnection!.playStream(stream, {
                seek: musicHandler.upNext.songs[0].seek,
                volume: 1
            });
        }
        catch(e)
        {
            console.log(e.message)
        }
    
        musicHandler.upNext.playing = true;

        musicHandler.HandleDispatcher(client, message);
    }
}

