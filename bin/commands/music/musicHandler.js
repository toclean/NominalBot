"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yt = require("ytdl-core");
const ytsearch = require("youtube-search");
const upNext_1 = require("../../models/music/upNext");
const { youtubeApi } = require('../../../config.json');
class MusicHandler {
    constructor() {
        this.name = "";
        this.desc = "";
        MusicHandler.upNext = new upNext_1.UpNext();
    }
    AddSong(client, voiceHandler, message) {
        let request = message.content.substring(message.content.indexOf(' ') + 1);
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
            this.PlaySong(client, voiceHandler, message);
        }
    }
    async PlaySong(client, voiceHandler, message) {
        if (MusicHandler.upNext.songs.length < 1) {
            message.reply('No more songs in the queue!');
            return;
        }
        if (!voiceHandler.voiceConnection) {
            await voiceHandler.ConnectToVoiceChannel(message);
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
        MusicHandler.dispatcher = voiceHandler.voiceConnection.playStream(stream, {
            seek: MusicHandler.upNext.songs[0].seek,
            volume: 1
        });
        MusicHandler.upNext.playing = true;
        MusicHandler.dispatcher.on('start', () => {
            message.channel.send(`Now playing: ${MusicHandler.upNext.songs[0].title} requested by ${MusicHandler.upNext.songs[0].requester}`);
            client.user.setActivity(`Playing: ${MusicHandler.upNext.songs[0].title}`);
        });
        MusicHandler.dispatcher.on('end', (reason) => {
            if (voiceHandler.voiceChannel.members.size == 1) {
                reason = 'exit';
            }
            if (reason == 'exit') {
                voiceHandler.LeaveVoiceChannel(message);
                voiceHandler.voiceConnection = undefined;
                MusicHandler.dispatcher = undefined;
                MusicHandler.upNext.playing = false;
                MusicHandler.upNext.songs.shift();
                client.user.setActivity('Away');
                return;
            }
            MusicHandler.upNext.playing = false;
            if (MusicHandler.upNext.replay) {
                this.PlaySong(client, voiceHandler, message);
                return;
            }
            if (MusicHandler.upNext.songs.length > 0) {
                MusicHandler.upNext.songs.shift();
                this.PlaySong(client, voiceHandler, message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWNIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL211c2ljL211c2ljSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdDQUFnQztBQUNoQywyQ0FBMkM7QUFDM0Msc0RBQW1EO0FBR25ELE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBMkIsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFFOUU7SUFTSTtRQVBBLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBUU4sWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFRTSxPQUFPLENBQUMsTUFBYyxFQUFFLFlBQTBCLEVBQUUsT0FBZ0I7UUFJdkUsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFMUUsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUM1QjtZQUNJLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0IsUUFBUSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsS0FBSyxFQUFFLE9BQU87Z0JBRXBELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2xDO29CQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztvQkFDekMsT0FBTztpQkFDVjtnQkFFRCxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQ3ZCO29CQUNJLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDM0IsR0FBRyxFQUFF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