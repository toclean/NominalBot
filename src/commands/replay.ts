import { Command } from "../models/command";
import { MusicHandler } from "../music/musicHandler";
import { Message } from "discord.js";

export class Replay implements Command
{
    name = 'replay';
    desc = 'Puts the current song on a loop';

    public Replay(musicHandler: MusicHandler, message: Message)
    {
        if (!musicHandler || !musicHandler.upNext) return;

        if (musicHandler.upNext.replay)
        {
            musicHandler.upNext.replay = false;
            message.reply('Replay: OFF!');
        }
        else
        {
            musicHandler.upNext.replay = true;
            message.reply('Replay: ON!');
        }
    }
}