import { Client, Message } from "discord.js";
import { VoiceHandler } from "../music/voiceHandler";
import { MusicHandler } from "../music/musicHandler";
import { Option } from "../models/music/option";
import { Command } from "../models/command";
import * as ytsearch from "youtube-search"

let { debug }: { debug: boolean } = require('../../config.json');
debug = (debug === true);

let apiResults: Result[] = [];

export class Add implements Command
{
    name = 'add';
    desc = 'Adds a song to the queue';

    public async AddSong(client: Client, musicHandler: MusicHandler, message: Message)
    {
        let startSize = musicHandler.upNext!.songs.length;

        await querySong(message, musicHandler);

        return new Promise((resolve, reject) => 
        {
            resolve();
        });
    }
}

async function querySong(message: Message, musicHandler: MusicHandler)
{
    if (Number.parseInt(message.content) && Number.parseInt(message.content) > 0 && Number.parseInt(message.content) <= musicHandler.opts.maxResults)
    {

    }
    else if (message.content.includes('http'))
    {
        
    }
    else
    {
        contentSearch(message, musicHandler);
    }
}

async function playLink(url: string, musicHandler: MusicHandler)
{

}

function contentSearch(message: Message, musicHandler: MusicHandler)
{
    ytsearch(message.content, musicHandler.opts, (error, results) => 
    {
        if (error) console.log('Error getting results for: ' + message.content);
        results!.forEach(x => 
        {
            apiResults.push(new Result(x.link));
        });
        
    }).then(() => {querySong(message, musicHandler)});
}

class Result
{
    url: string;

    constructor(url: string)
    {
        this.url = url;
    }
}