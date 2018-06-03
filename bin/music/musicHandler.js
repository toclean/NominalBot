"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upNext_1 = require("../models/music/upNext");
const add_1 = require("../commands/add");
const play_1 = require("../commands/play");
const stop_1 = require("../commands/stop");
const skip_1 = require("../commands/skip");
const resume_1 = require("../commands/resume");
const pause_1 = require("../commands/pause");
const replay_1 = require("../commands/replay");
const { youtubeApi } = require('../../config.json');
class MusicHandler {
    constructor(voiceHandler) {
        this.opts = {
            maxResults: 3,
            key: youtubeApi,
            type: "video"
        };
        this.AddSong = new add_1.Add().AddSong;
        this.Play = new play_1.Play().PlaySong;
        this.Stop = new stop_1.Stop().Stop;
        this.Skip = new skip_1.Skip().SkipSong;
        this.Pause = new pause_1.Pause().PauseSong;
        this.Resume = new resume_1.Resume().ResumeSong;
        this.Replay = new replay_1.Replay().Replay;
        this.upNext = new upNext_1.UpNext();
        this.voiceHandler = voiceHandler;
    }
    HandleDispatcher(client, message) {
        if (!this.dispatcher)
            return;
        this.dispatcher.on('start', () => {
            message.channel.send(`Now playing: ${this.upNext.songs[0].title} requested by ${this.upNext.songs[0].requester}`);
            client.user.setActivity(`Playing: ${this.upNext.songs[0].title}`);
        });
        this.dispatcher.on('end', (reason) => {
            this.upNext.playing = false;
            if (this.voiceHandler.voiceChannel.members.size == 1 || reason == 'exit') {
                this.voiceHandler.LeaveVoiceChannel(message);
                this.dispatcher = undefined;
                this.upNext.playing = false;
                this.upNext.songs.shift();
                client.user.setActivity('Away');
                return;
            }
            if (this.upNext.replay) {
                this.Play(client, this, message);
                return;
            }
            if (this.upNext.songs.length > 0) {
                this.upNext.songs.shift();
                this.Play(client, this, message);
            }
            else {
                client.user.setActivity('Chillin...');
            }
        });
    }
}
MusicHandler.choices = [];
exports.MusicHandler = MusicHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWNIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL211c2ljL211c2ljSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG1EQUFnRDtBQUdoRCx5Q0FBc0M7QUFDdEMsMkNBQXdDO0FBQ3hDLDJDQUF3QztBQUN4QywyQ0FBd0M7QUFDeEMsK0NBQTRDO0FBQzVDLDZDQUEwQztBQUMxQywrQ0FBNEM7QUFFNUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUEyQixPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUUzRTtJQW9CSSxZQUFZLFlBQTBCO1FBZC9CLFNBQUksR0FBRztZQUNWLFVBQVUsRUFBRSxDQUFDO1lBQ2IsR0FBRyxFQUFFLFVBQVU7WUFDZixJQUFJLEVBQUUsT0FBTztTQUNoQixDQUFDO1FBRUssWUFBTyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQzVCLFNBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMzQixTQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDdkIsU0FBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzNCLFVBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUM5QixXQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDakMsV0FBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBSWhDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsTUFBYyxFQUFFLE9BQWdCO1FBRXBELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU87UUFFN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUM3QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxpQkFBaUIsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNwSCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtZQUV6QyxJQUFJLENBQUMsTUFBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFN0IsSUFBSSxJQUFJLENBQUMsWUFBYSxDQUFDLFlBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUksTUFBTSxFQUMxRTtnQkFDSSxJQUFJLENBQUMsWUFBYSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE1BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLE9BQU87YUFDVjtZQUVELElBQUksSUFBSSxDQUFDLE1BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDakMsT0FBTzthQUNWO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO2lCQUVEO2dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3pDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztBQTdEYSxvQkFBTyxHQUFnRCxFQUFFLENBQUM7QUFGNUUsb0NBZ0VDIn0=