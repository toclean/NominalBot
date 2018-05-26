"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Join {
    constructor() {
        this.name = "join";
        this.desc = "Joins a current voice channel";
    }
    Join(message) {
        let voiceChannel = message.member.voiceChannel;
        let voiceConnection = voiceChannel.join();
        if (voiceChannel)
            message.channel.send(`Connected to ${voiceChannel.name}`);
    }
}
exports.Join = Join;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tdXNpYy9qb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7SUFBQTtRQUVJLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxTQUFJLEdBQUcsK0JBQStCLENBQUM7SUFPM0MsQ0FBQztJQU5VLElBQUksQ0FBQyxPQUFnQjtRQUV4QixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUMvQyxJQUFJLGVBQWUsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUMsSUFBSSxZQUFZO1lBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7Q0FDSjtBQVZELG9CQVVDIn0=