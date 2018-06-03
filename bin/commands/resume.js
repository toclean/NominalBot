"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resume {
    constructor() {
        this.name = 'resume';
        this.desc = 'Resumes the player from a paused state';
    }
    ResumeSong(client, musicHandler, message) {
        if (!musicHandler.dispatcher) {
            message.reply('No song is paused!');
            return;
        }
        if (musicHandler.dispatcher.paused) {
            musicHandler.dispatcher.resume();
            musicHandler.upNext.playing = true;
            message.reply(`${musicHandler.upNext.songs[0].title} resumed play!`);
            client.user.setActivity(`Playing: ${musicHandler.upNext.songs[0].title}`);
        }
    }
}
exports.Resume = Resume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3Jlc3VtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBQUE7UUFFSSxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLFNBQUksR0FBRyx3Q0FBd0MsQ0FBQztJQWtCcEQsQ0FBQztJQWhCVSxVQUFVLENBQUMsTUFBYyxFQUFFLFlBQTBCLEVBQUUsT0FBZ0I7UUFFMUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQzVCO1lBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3BDLE9BQU87U0FDVjtRQUVELElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQ2xDO1lBQ0ksWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQyxZQUFZLENBQUMsTUFBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLENBQUMsQ0FBQztZQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLFlBQVksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDOUU7SUFDTCxDQUFDO0NBQ0o7QUFyQkQsd0JBcUJDIn0=