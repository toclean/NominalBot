"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Skip {
    constructor() {
        this.name = 'skip';
        this.desc = 'Skips the current song';
    }
    SkipSong(musicHandler, message) {
        if (musicHandler.upNext.songs.length < 2) {
            musicHandler.Stop(musicHandler, message);
            musicHandler.voiceHandler.LeaveVoiceChannel(message);
            musicHandler.upNext.songs = [];
            return;
        }
        if (musicHandler.voiceHandler.voiceConnection && musicHandler.dispatcher) {
            setTimeout(() => {
                musicHandler.dispatcher.end();
            }, 500);
        }
    }
}
exports.Skip = Skip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9za2lwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0E7SUFBQTtRQUVJLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxTQUFJLEdBQUcsd0JBQXdCLENBQUM7SUFtQnBDLENBQUM7SUFqQlUsUUFBUSxDQUFDLFlBQTBCLEVBQUUsT0FBZ0I7UUFFeEQsSUFBSSxZQUFZLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN6QztZQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLFlBQVksQ0FBQyxZQUFhLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQsWUFBWSxDQUFDLE1BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLE9BQU87U0FDVjtRQUVELElBQUksWUFBWSxDQUFDLFlBQWEsQ0FBQyxlQUFnQixJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQzFFO1lBQ0ksVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixZQUFZLENBQUMsVUFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25DLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYO0lBQ0wsQ0FBQztDQUNKO0FBdEJELG9CQXNCQyJ9