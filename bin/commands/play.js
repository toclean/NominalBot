"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yt = require("ytdl-core");
class Play {
    constructor() {
        this.name = 'play';
        this.desc = 'Starts the player';
    }
    async PlaySong(client, musicHandler, message) {
        let self = this.PlaySong;
        if (musicHandler.upNext.songs.length < 1) {
            message.reply('No more songs in the queue!');
            return;
        }
        if (!musicHandler.voiceHandler.voiceConnection) {
            await musicHandler.voiceHandler.ConnectToVoiceChannel(message);
        }
        if (musicHandler.upNext.playing) {
            message.reply('Music is already playing!');
            return;
        }
        if (musicHandler.dispatcher && musicHandler.dispatcher.paused) {
            musicHandler.Resume(client, musicHandler, message);
        }
        let stream = yt(musicHandler.upNext.songs[0].url, {
            filter: 'audioonly'
        });
        musicHandler.dispatcher = musicHandler.voiceHandler.voiceConnection.playStream(stream, {
            seek: musicHandler.upNext.songs[0].seek,
            volume: 1
        });
        musicHandler.upNext.playing = true;
        musicHandler.HandleDispatcher(client, message);
    }
}
exports.Play = Play;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsZ0NBQStCO0FBRy9CO0lBQUE7UUFFSSxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsU0FBSSxHQUFHLG1CQUFtQixDQUFDO0lBeUMvQixDQUFDO0lBdkNVLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBYyxFQUFFLFlBQTBCLEVBQUUsT0FBZ0I7UUFFOUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUV6QixJQUFJLFlBQVksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ3pDO1lBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzdDLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBYSxDQUFDLGVBQWUsRUFDL0M7WUFDSSxNQUFNLFlBQVksQ0FBQyxZQUFhLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLFlBQVksQ0FBQyxNQUFPLENBQUMsT0FBTyxFQUNoQztZQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMzQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFlBQVksQ0FBQyxVQUFVLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQzdEO1lBQ0ksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3REO1FBRUQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxDQUFDLEdBQUcsRUFBRTtZQUNoRCxNQUFNLEVBQUUsV0FBVztTQUN0QixDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxZQUFhLENBQUMsZUFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3JGLElBQUksRUFBRSxZQUFZLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3hDLE1BQU0sRUFBRSxDQUFDO1NBQ1osQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLE1BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNKO0FBNUNELG9CQTRDQyJ9