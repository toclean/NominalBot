import { Client, Message } from "discord.js";
import { MusicHandler } from "../music/musicHandler";
import { Command } from "../models/command";

export class Pause implements Command
{
    name = 'pause';
    desc = 'Pauses the player';

    public PauseSong(client: Client, musicHandler: MusicHandler, message: Message)
    {
        if (!musicHandler.dispatcher)
        {
            message.reply('No music is currently playing!');
            return;
        }
    
        if (!musicHandler.dispatcher.paused)
        {
            musicHandler.dispatcher.pause();
            musicHandler.upNext!.playing = false;
            message.reply('Paused!');
            client.user.setActivity('Paused!');
        }
    }
}
