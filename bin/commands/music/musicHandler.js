"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yt = require("ytdl-core");
const ytsearch = require("youtube-search");
const upNext_1 = require("../../models/music/upNext");
const { youtubeApi } = require('../../../config.json');
class MusicHandler {
    constructor(voiceHandler) {
        this.name = "";
        this.desc = "";
        MusicHandler.upNext = new upNext_1.UpNext();
        MusicHandler.voiceHandler = voiceHandler;
    }
    AddSong(client, voiceHandler, message) {
        let request = message.content.substring(message.content.indexOf(' ') + 1);
        if (request.includes('http') && request.includes('|')) {
            request.split('|').forEach(request => {
                this.AddUpNext(request, client, voiceHandler, message);
            });
        }
        else {
            this.AddUpNext(request, client, voiceHandler, message);
        }
    }
    AddUpNext(request, client, voiceHandler, message) {
        if (request.includes('http')) {
            let id = request.split('=')[1];
            ytsearch(id, MusicHandler.opts, function (error, results) {
                if (!results || results.length < 1) {
                    message.reply('No search results found');
                    return;
                }
                if (MusicHandler.upNext) {
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
        else if (parseInt(request) && parseInt(request) <= MusicHandler.opts.maxResults && parseInt(request) > 0) {
            if (!MusicHandler.choices || MusicHandler.choices.length < 1)
                return;
            let choice = MusicHandler.choices[parseInt(request) - 1];
            if (MusicHandler.upNext) {
                MusicHandler.upNext.songs.push({
                    url: choice.link,
                    title: choice.title,
                    requester: message.author,
                    seek: 0
                });
                message.reply(`Added ${choice.title} to queue`);
            }
        }
        else {
            ytsearch(request, MusicHandler.opts, function (error, results) {
                let options = [];
                if (!results || results.length < 1) {
                    message.reply('No search results found');
                    return;
                }
                for (var i = 0; i < MusicHandler.opts.maxResults; i++) {
                    options.push({
                        name: `${i + 1}. ${results[i].title}`,
                        value: `[LINK](${results[i].link})`
                    });
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
        if (MusicHandler.upNext.songs.length == 1) {
            this.PlaySong(client, message);
        }
    }
    async PlaySong(client, message) {
        if (MusicHandler.upNext.songs.length < 1) {
            message.reply('No more songs in the queue!');
            return;
        }
        if (!MusicHandler.voiceHandler.voiceConnection) {
            await MusicHandler.voiceHandler.ConnectToVoiceChannel(message);
        }
        if (MusicHandler.upNext.playing) {
            message.reply('Music is already playing!');
            return;
        }
        if (MusicHandler.dispatcher && MusicHandler.dispatcher.paused) {
            this.ResumeSong(client, message);
        }
        let stream = yt(MusicHandler.upNext.songs[0].url, {
            filter: 'audioonly'
        });
        MusicHandler.dispatcher = MusicHandler.voiceHandler.voiceConnection.playStream(stream, {
            seek: MusicHandler.upNext.songs[0].seek,
            volume: 1
        });
        MusicHandler.upNext.playing = true;
        MusicHandler.dispatcher.on('start', () => {
            message.channel.send(`Now playing: ${MusicHandler.upNext.songs[0].title} requested by ${MusicHandler.upNext.songs[0].requester}`);
            client.user.setActivity(`Playing: ${MusicHandler.upNext.songs[0].title}`);
        });
        MusicHandler.dispatcher.on('end', (reason) => {
            if (MusicHandler.voiceHandler.voiceChannel.members.size == 1) {
                reason = 'exit';
            }
            if (reason == 'exit') {
                MusicHandler.voiceHandler.LeaveVoiceChannel(message);
                MusicHandler.voiceHandler.voiceConnection = undefined;
                MusicHandler.dispatcher = undefined;
                MusicHandler.upNext.playing = false;
                MusicHandler.upNext.songs.shift();
                client.user.setActivity('Away');
                return;
            }
            MusicHandler.upNext.playing = false;
            if (MusicHandler.upNext.replay) {
                this.PlaySong(client, message);
                return;
            }
            if (MusicHandler.upNext.songs.length > 0) {
                MusicHandler.upNext.songs.shift();
                this.PlaySong(client, message);
            }
            else {
                client.user.setActivity('Chillin...');
            }
        });
    }
    Stop(voiceHandler, message) {
        if (voiceHandler.voiceConnection && MusicHandler.dispatcher) {
            MusicHandler.dispatcher.end('exit');
            MusicHandler.upNext.playing = false;
        }
    }
    SkipSong(voiceHandler, message) {
        if (MusicHandler.upNext.songs.length < 2) {
            this.Stop(voiceHandler, message);
            voiceHandler.LeaveVoiceChannel(message);
            MusicHandler.upNext.songs = [];
            return;
        }
        if (voiceHandler.voiceConnection && MusicHandler.dispatcher) {
            setTimeout(() => {
                MusicHandler.dispatcher.end();
            }, 500);
        }
    }
    PauseSong(client, message) {
        if (!MusicHandler.dispatcher) {
            message.reply('No music is currently playing!');
            return;
        }
        if (!MusicHandler.dispatcher.paused) {
            MusicHandler.dispatcher.pause();
            MusicHandler.upNext.playing = false;
            message.reply('Paused!');
            client.user.setActivity('Paused!');
        }
    }
    ResumeSong(client, message) {
        if (!MusicHandler.dispatcher) {
            message.reply('No song is paused!');
            return;
        }
        if (MusicHandler.dispatcher.paused) {
            MusicHandler.dispatcher.resume();
            MusicHandler.upNext.playing = true;
            message.reply(`${MusicHandler.upNext.songs[0].title} resumed play!`);
            client.user.setActivity(`Playing: ${MusicHandler.upNext.songs[0].title}`);
        }
    }
}
MusicHandler.choices = [];
MusicHandler.opts = {
    maxResults: 3,
    key: youtubeApi,
    type: "video"
};
exports.MusicHandler = MusicHandler;
class Option {
    constructor() {
        this.name = '';
        this.value = '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWNIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL211c2ljL211c2ljSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdDQUFnQztBQUNoQywyQ0FBMkM7QUFDM0Msc0RBQW1EO0FBR25ELE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBMkIsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFFOUU7SUFVSSxZQUFZLFlBQTBCO1FBUnRDLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBU04sWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQ25DLFlBQVksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQzdDLENBQUM7SUFRTSxPQUFPLENBQUMsTUFBYyxFQUFFLFlBQTBCLEVBQUUsT0FBZ0I7UUFJdkUsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFMUUsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQ3JEO1lBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUVEO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFFTyxTQUFTLENB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