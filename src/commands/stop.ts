import { MusicHandler } from "../music/musicHandler";
import { Message } from "discord.js";
import { Command } from "../models/command";

export class Stop implements Command
{
    name = 'stop';
    desc = 'Stops the audio player'

    public Stop(musicHandler: MusicHandler, message: Message)
    {
        if (musicHandler.voiceHandler!.voiceConnection! && musicHandler.dispatcher)
        {
            musicHandler.dispatcher.end('exit');
            musicHandler.upNext!.playing = false;
        }
    }
}