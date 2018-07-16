import { Client, VoiceConnection, Message, StreamDispatcher } from "discord.js";
import * as yt from 'ytdl-core';
import * as ytsearch from 'youtube-search';
import { UpNext } from "../models/music/upNext";
import { VoiceHandler } from "./voiceHandler";

import { Add } from "../commands/add";
import { Play } from "../commands/play";
import { Stop } from "../commands/stop";
import { Skip } from "../commands/skip";
import { Resume } from "../commands/resume";
import { Pause } from "../commands/pause";
import { Replay } from  "../commands/replay";

const { youtubeApi }: { youtubeApi: string } = require('../../config.json');

export class MusicHandler
{
    public static choices: ytsearch.YouTubeSearchResults[] | undefined = [];
    public upNext: UpNext | undefined;
    public dispatcher: StreamDispatcher | undefined;
    public voiceHandler: VoiceHandler | undefined;
    public opts = {
        maxResults: 3,
        key: youtubeApi,
        type: "video"
    };

    public AddSong = new Add().AddSong;
    public Play = new Play().PlaySong;
    public Stop = new Stop().Stop;
    public Skip = new Skip().SkipSong;
    public Pause = new Pause().PauseSong;
    public Resume = new Resume().ResumeSong;
    public Replay = new Replay().Replay;

    constructor(voiceHandler: VoiceHandler)
    {
        this.upNext = new UpNext();
        this.voiceHandler = voiceHandler;
    }

    public HandleDispatcher(client: Client, message: Message)
    {
        if (!this.dispatcher) return;

        this.dispatcher.on('start', () => {
            message.channel.send(`Now playing: ${this.upNext!.songs[0].title} requested by ${this.upNext!.songs[0].requester}`);
            client.user.setActivity(`Playing: ${this.upNext!.songs[0].title}`);
        });
    
        this.dispatcher.on('end', (reason: string) =>
        {
            this.upNext!.playing = false;

            if (this.voiceHandler!.voiceChannel!.members.size == 1 || reason == 'exit')
            {
                this.voiceHandler!.LeaveVoiceChannel(message);
                this.dispatcher = undefined;
                this.upNext!.playing = false;
                this.upNext!.songs.shift();
                client.user.setActivity('Away');
                return;
            }
    
            if (this.upNext!.replay) {
                this.Play(client, this, message);
                return;
            }
    
            if (this.upNext!.songs.length > 0) {
                this.upNext!.songs.shift();
                this.Play(client, this, message);
            }
            else
            {
                client.user.setActivity('Chillin...');
            }
        });
    }
}