"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stop {
    constructor() {
        this.name = 'stop';
        this.desc = 'Stops the audio player';
    }
    Stop(musicHandler, message) {
        if (musicHandler.voiceHandler.voiceConnection && musicHandler.dispatcher) {
            musicHandler.dispatcher.end('exit');
            musicHandler.upNext.playing = false;
        }
    }
}
exports.Stop = Stop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zdG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7SUFBQTtRQUVJLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxTQUFJLEdBQUcsd0JBQXdCLENBQUE7SUFVbkMsQ0FBQztJQVJVLElBQUksQ0FBQyxZQUEwQixFQUFFLE9BQWdCO1FBRXBELElBQUksWUFBWSxDQUFDLFlBQWEsQ0FBQyxlQUFnQixJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQzFFO1lBQ0ksWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsWUFBWSxDQUFDLE1BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztDQUNKO0FBYkQsb0JBYUMifQ==