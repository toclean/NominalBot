import { Client, Message } from "discord.js";
import { MusicHandler } from "../music/musicHandler";
import { Command } from "../models/command";

export class Resume implements Command
{
    name = 'resume';
    desc = 'Resumes the player from a paused state';

    public ResumeSong(client: Client, musicHandler: MusicHandler, message: Message)
    {
        if (!musicHandler.dispatcher)
        {
            message.reply('No song is paused!');
            return;
        }
        
        if (musicHandler.dispatcher.paused)
        {
            musicHandler.dispatcher.resume();
            musicHandler.upNext!.playing = true;
            message.reply(`${musicHandler.upNext!.songs[0].title} resumed play!`);
            client.user.setActivity(`Playing: ${musicHandler.upNext!.songs[0].title}`);
        }
    }  
}

