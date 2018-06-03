"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Replay {
    constructor() {
        this.name = 'replay';
        this.desc = 'Puts the current song on a loop';
    }
    Replay(musicHandler, message) {
        if (!musicHandler)
            return;
        if (!musicHandler.upNext)
            return;
        if (musicHandler.upNext.replay) {
            musicHandler.upNext.replay = false;
            message.reply('Replay: OFF!');
        }
        else {
            musicHandler.upNext.replay = true;
            message.reply('Replay: ON!');
        }
    }
}
exports.Replay = Replay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JlcGxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBQUE7UUFFSSxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLFNBQUksR0FBRyxpQ0FBaUMsQ0FBQztJQW1CN0MsQ0FBQztJQWpCVSxNQUFNLENBQUMsWUFBMEIsRUFBRSxPQUFnQjtRQUV0RCxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFFMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUVqQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUM5QjtZQUNJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ2pDO2FBRUQ7WUFDSSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7Q0FDSjtBQXRCRCx3QkFzQkMifQ==