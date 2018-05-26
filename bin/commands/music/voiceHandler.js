"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoiceHandler {
    constructor() {
        this.name = "";
        this.desc = "";
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9pY2VIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL211c2ljL3ZvaWNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBQUE7UUFFSSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsU0FBSSxHQUFHLEVBQUUsQ0FBQztJQTJCZCxDQUFDO0lBdEJVLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxPQUFnQjtRQUUvQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBR3RELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRU0saUJBQWlCLENBQUMsT0FBZ0I7UUFFckMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUNyQjtnQkFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBRTdCO1lBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7U0FDakM7SUFDTCxDQUFDO0NBQ0o7QUE5QkQsb0NBOEJDIn0=