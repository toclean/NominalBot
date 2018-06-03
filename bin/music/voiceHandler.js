"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoiceHandler {
    async ConnectToVoiceChannel(message) {
        this.voiceChannel = message.member.voiceChannel;
        this.voiceConnection = await this.voiceChannel.join();
        return this.voiceConnection;
    }
    LeaveVoiceChannel(message) {
        if (this.voiceConnection) {
            this.voiceConnection.disconnect();
            if (this.voiceChannel) {
                this.voiceChannel.leave();
            }
            this.voiceConnection = undefined;
            this.voiceChannel = undefined;
        }
    }
}
exports.VoiceHandler = VoiceHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9pY2VIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL211c2ljL3ZvaWNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBS1csS0FBSyxDQUFDLHFCQUFxQixDQUFDLE9BQWdCO1FBRS9DLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFHdEQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxPQUFnQjtRQUVyQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQ3JCO2dCQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7YUFFN0I7WUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztTQUNqQztJQUNMLENBQUM7Q0FDSjtBQTNCRCxvQ0EyQkMifQ==