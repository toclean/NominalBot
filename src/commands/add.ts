import { Client, Message } from "discord.js";
import { VoiceHandler } from "../music/voiceHandler";
import { MusicHandler } from "../music/musicHandler";
import { Option } from "../models/music/option";
import { Command } from "../models/command";
import * as ytsearch from "youtube-search"

export class Add implements Command
{
    name = 'add';
    desc = 'Adds a song to the queue';

    public AddSong(client: Client, musicHandler: MusicHandler, message: Message): void
    {
        let request = message.content.substring(message.content.indexOf(' ') + 1);

        if (request.includes('http') && request.includes('|'))
        {
            request.split('|').forEach(request => {
                AddUpNext(request, client, musicHandler, message);
            });
        }
        else
        {
            AddUpNext(request, client, musicHandler, message);
        }
    }
    
}

function AddUpNext(request: string, client: Client, musicHandler: MusicHandler, message: Message)
{
    if (request.includes('http'))
    {
        let id = request.split('=')[1];

        ytsearch(id, musicHandler.opts, function (error, results)
        {
            if (!results || results.length < 1)
            {
                message.reply('No search results found');
                return;
            }

            if (musicHandler.upNext)
            {
                musicHandler.upNext.songs.push({
                    url: results[0].link,
                    title: results[0].title,
                    requester: message.author,
                    seek: 0
                });

                message.reply(`Added ${results[0].title} to queue`);
            }
        });
    }
    else if (parseInt(request) && parseInt(request) <= musicHandler.opts.maxResults && parseInt(request) > 0)
    {
        if (!MusicHandler.choices || MusicHandler.choices.length < 1) return;

        let choice = MusicHandler.choices[parseInt(request) - 1];

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

            message.reply(`Added ${choice.title} to queue`);
        }
    }
    else
    {
        ytsearch(request, musicHandler.opts, function (error, results) {
            let options: Option[] = [];


                if (!results || results.length < 1)
                {
                    message.reply('No search results found');
                    return;
                }
                
                for (var i = 0; i < musicHandler.opts.maxResults; i++) {
                    options.push(
                        {
                            name: `${i + 1}. ${results[i].title}`,
                            value: `[LINK](${results[i].link})`
                        }
                    );
                }

                message.reply({
                    embed: {
                        color: 3447004,
                        title: 'Pick one from below',
                        author: {
                            name: message.client.user.username,
                            icon_url: message.client.user.avatarURL
                        },
                        fields: options,
                        timestamp: new Date()
                    }
                });

            MusicHandler.choices = results;
        });
    }

    if (musicHandler.upNext!.songs.length == 1)
    {
        musicHandler.Play(client, musicHandler, message);
    }
}