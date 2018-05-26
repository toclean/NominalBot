import { Client, VoiceConnection, Message, StreamDispatcher } from "discord.js";
import * as yt from 'ytdl-core';
import * as ytsearch from 'youtube-search';
import { UpNext } from "../../models/music/upNext";
import { VoiceHandler } from "./voiceHandler";

const { youtubeApi }: { youtubeApi: string } = require('../../../config.json')

export class MusicHandler
{
    name = "";
    desc = "";

    private static upNext: UpNext | undefined;
    private static choices: ytsearch.YouTubeSearchResults[] | undefined = [];
    private static dispatcher: StreamDispatcher | undefined;

    constructor()
    {
        MusicHandler.upNext = new UpNext();
    }

    private static opts = {
        maxResults: 3,
        key: youtubeApi,
        type: "video"
    };

    public AddSong(client: Client, voiceHandler: VoiceHandler, message: Message): void
    {
        // !!! Use shift to remove song !!!

        let request = message.content.substring(message.content.indexOf(' ') + 1);

        if (request.includes('http'))
        {
            let id = request.split('=')[1];

            ytsearch(id, MusicHandler.opts, function (error, results)
            {
                if (!results || results.length < 1)
                {
                    message.reply('No search results found');
                    return;
                }

                if (MusicHandler.upNext)
                {
                    MusicHandler.upNext.songs.push({
                        url: results[0].link,
                        title: results[0].title,
                        requester: message.author,
                        seek: 0
                    });

                    message.reply(`Added ${results[0].title} to queue`);
                }
            });
        }
        else if (parseInt(request) && parseInt(request) <= MusicHandler.opts.maxResults && parseInt(request) > 0)
        {
            if (!MusicHandler.choices || MusicHandler.choices.length < 1) return;
    
            let choice = MusicHandler.choices[parseInt(request) - 1];
    
            if (MusicHandler.upNext)
            {
                MusicHandler.upNext.songs.push(
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
            ytsearch(request, MusicHandler.opts, function (error, results) {
                let options: Option[] = [];
    

                    if (!results || results.length < 1)
                    {
                        message.reply('No search results found');
                        return;
                    }
                    
                    for (var i = 0; i < MusicHandler.opts.maxResults; i++) {
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

        if (MusicHandler.upNext!.songs.length == 1)
        {
            this.PlaySong(client, voiceHandler, message);
        }
    }

    public async PlaySong(client: Client, voiceHandler: VoiceHandler, message: Message)
    {
        if (MusicHandler.upNext!.songs.length < 1)
        {
            message.reply('No more songs in the queue!');
            return;
        }

        if (!voiceHandler.voiceConnection)
        {
            await voiceHandler.ConnectToVoiceChannel(message);
        }

        if (MusicHandler.upNext!.playing)
        {
            message.reply('Music is already playing!');
            return;
        }

        if (MusicHandler.dispatcher && MusicHandler.dispatcher.paused)
        {
            this.ResumeSong(client, message);
        }

        let stream = yt(MusicHandler.upNext!.songs[0]!.url, {
            filter: 'audioonly'
        });

        MusicHandler.dispatcher = voiceHandler.voiceConnection!.playStream(stream, {
            seek: MusicHandler.upNext!.songs[0].seek,
            volume: 1
        });

        MusicHandler.upNext!.playing = true;

        MusicHandler.dispatcher.on('start', () => {
            message.channel.send(`Now playing: ${MusicHandler.upNext!.songs[0].title} requested by ${MusicHandler.upNext!.songs[0].requester}`);
            client.user.setActivity(`Playing: ${MusicHandler.upNext!.songs[0].title}`);
        });

        MusicHandler.dispatcher.on('end', (reason: string) =>
        {
            if (voiceHandler.voiceChannel!.members.size == 1)
            {
                reason = 'exit';
            }

            if (reason == 'exit')
            {
                voiceHandler.LeaveVoiceChannel(message);
                voiceHandler.voiceConnection = undefined;
                MusicHandler.dispatcher = undefined;
                MusicHandler.upNext!.playing = false;
                MusicHandler.upNext!.songs.shift();
                client.user.setActivity('Away');
                return;
            }

            MusicHandler.upNext!.playing = false;
            if (MusicHandler.upNext!.replay) {
                this.PlaySong(client, voiceHandler, message);
                return;
            }

            if (MusicHandler.upNext!.songs.length > 0) {
                MusicHandler.upNext!.songs.shift();
                this.PlaySong(client, voiceHandler, message);
            }
            else
            {
                client.user.setActivity('Chillin...');
            }
        });
    }

    public Stop(voiceHandler: VoiceHandler, message: Message)
    {
        if (voiceHandler.voiceConnection! && MusicHandler.dispatcher)
        {
            MusicHandler.dispatcher.end('exit');
            MusicHandler.upNext!.playing = false;
        }
    }

    public SkipSong(voiceHandler: VoiceHandler, message: Message)
    {
        if (MusicHandler.upNext!.songs.length < 2)
        {
            this.Stop(voiceHandler, message);
            voiceHandler.LeaveVoiceChannel(message);
            MusicHandler.upNext!.songs = [];
            return;
        }
        
        if (voiceHandler.voiceConnection! && MusicHandler.dispatcher)
        {
            setTimeout(() => {
                MusicHandler.dispatcher!.end();
            }, 500);
        }
    }

    public PauseSong(client: Client, message: Message)
    {
        if (!MusicHandler.dispatcher)
        {
            message.reply('No music is currently playing!');
            return;
        }

        if (!MusicHandler.dispatcher.paused)
        {
            MusicHandler.dispatcher.pause();
            MusicHandler.upNext!.playing = false;
            message.reply('Paused!');
            client.user.setActivity('Paused!');
        }
    }

    public ResumeSong(client: Client, message: Message)
    {
        if (!MusicHandler.dispatcher)
        {
            message.reply('No song is paused!');
            return;
        }
        
        if (MusicHandler.dispatcher.paused)
        {
            MusicHandler.dispatcher.resume();
            MusicHandler.upNext!.playing = true;
            message.reply(`${MusicHandler.upNext!.songs[0].title} resumed play!`);
            client.user.setActivity(`Playing: ${MusicHandler.upNext!.songs[0].title}`);
        }
    }
}

class Option
{
    name: string = '';
    value: string = '';
}