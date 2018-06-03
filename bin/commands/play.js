"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yt = require("ytdl-core");
class Play {
    constructor() {
        this.name = 'play';
        this.desc = 'Starts the player';
    }
    async PlaySong(client, musicHandler, message) {
        if (!musicHandler.upNext || !musicHandler.voiceHandler)
            return;
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
        try {
            musicHandler.dispatcher = musicHandler.voiceHandler.voiceConnection.playStream(stream, {
                seek: musicHandler.upNext.songs[0].seek,
                volume: 1
            });
        }
        catch (e) {
            console.log(e.message);
        }
        musicHandler.upNext.playing = true;
        musicHandler.HandleDispatcher(client, message);
    }
}
exports.Play = Play;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsZ0NBQStCO0FBRy9CO0lBQUE7UUFFSSxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsU0FBSSxHQUFHLG1CQUFtQixDQUFDO0lBZ0QvQixDQUFDO0lBOUNVLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBYyxFQUFFLFlBQTBCLEVBQUUsT0FBZ0I7UUFFOUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTtZQUFFLE9BQU87UUFFL0QsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN4QztZQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUM3QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQzlDO1lBQ0ksTUFBTSxZQUFZLENBQUMsWUFBYSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25FO1FBRUQsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFDL0I7WUFDSSxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDM0MsT0FBTztTQUNWO1FBRUQsSUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUM3RDtZQUNJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7WUFDOUMsTUFBTSxFQUFFLFdBQVc7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFDQTtZQUNJLFlBQVksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLFlBQWEsQ0FBQyxlQUFnQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JGLElBQUksRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUN2QyxNQUFNLEVBQUUsQ0FBQzthQUNaLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTSxDQUFDLEVBQ1A7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN6QjtRQUVELFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUVuQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQW5ERCxvQkFtREMifQ==