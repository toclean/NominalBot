import { Client, Message } from "discord.js";
import { MusicHandler } from "../music/musicHandler";
import { Command } from "../models/command";
import * as ytsearch from "youtube-search"

let { debug }: { debug: boolean } = require('../../config.json');
debug = (debug === true);

export class Add implements Command
{
    name = 'add';
    desc = 'Adds a song to the queue';

    public async AddSong(client: Client, musicHandler: MusicHandler, message: Message)
    {
        return new Promise(async (resolve, reject) => 
        {
            await querySong(client, message, musicHandler);
            resolve();
        });
    }
}

async function querySong(client: Client, message: Message, musicHandler: MusicHandler)
{
    let content = message.content.substr(message.content.indexOf(' '));

    if (Number.parseInt(content) && Number.parseInt(content) > 0 && Number.parseInt(content) <= musicHandler.opts.maxResults)
    {
        await promptReply(message, musicHandler);
    }
    else if (content.startsWith('http'))
    {
        await playLink(message, musicHandler);
    }
    else
    {
        await contentSearch(message, musicHandler);
    }

    if (!musicHandler.upNext!.playing && musicHandler.upNext!.songs.length == 1)
    {
        await musicHandler.Play(client, musicHandler, message);
    }

    return new Promise((resolve, reject) => {resolve();});
}

async function promptReply(message: Message, musicHandler: MusicHandler)
{
    return new Promise(async (resolve, reject) => 
    {
        let content = message.content.substr(message.content.indexOf(' '));
        
        if (!MusicHandler.choices || MusicHandler.choices.length < 1) return;

        let choice = MusicHandler.choices[parseInt(content) - 1];

        if (musicHandler.upNext)
        {
            musicHandler.upNext.songs.push(
                {
                    url: choice.link,
                    title: choice.title,
                    requester: message.author,
                    seek: 0
                }
            );


            setTimeout(() => {
                message.reply(`Added ${choice.title} to queue`);
            }, 100);
        }

        resolve();
    });
}

async function playLink(message: Message, musicHandler: MusicHandler)
{
    return new Promise((resolve, reject) => 
    {
        let id = message.content.split('=')[1];

        ytsearch(id, musicHandler.opts, function (error, results)
        {
            if (!results || results.length < 1 || error)
            {
                setTimeout(() => {
                    message.reply('No search results found');
                }, 100);
                
                reject();
            }

            if (musicHandler.upNext)
            {
                musicHandler.upNext.songs.push({
                    url: results![0].link,
                    title: results![0].title,
                    requester: message.author,
                    seek: 0
                });

                setTimeout(() => {
                    message.reply(`Added ${results![0].title} to queue`);
                }, 100);
            }

            resolve();
        });
    });
}

async function contentSearch(message: Message, musicHandler: MusicHandler)
{
    let content = message.content.substr(message.content.indexOf(' '));

    return new Promise((resolve, reject) => 
    {
        ytsearch(content, musicHandler.opts, (error, results) => 
        {
            if (error || results!.length < 1)
            {
                console.log('Error getting results for: ' + content);
                reject();
            }

            let i = 0;
            results!.forEach(x => 
            {
                musicHandler.results.push(
                    {
                        name: `${i + 1}. ${x.title}`,
                        value: `[LINK](${x.link})`
                    }
                );
                i++;
            });
        
            setTimeout(() => {
                message.reply({
                    embed: {
                        color: 3447004,
                        title: 'Pick one from below',
                        author: {
                            name: message.client.user.username,
                            icon_url: message.client.user.avatarURL
                        },
                        fields: musicHandler.results,
                        timestamp: new Date()
                    }
                });
            }, 100);
    
            MusicHandler.choices = results;
            musicHandler.results = [];

            resolve();
        });
    });
}