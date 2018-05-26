"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pause {
    constructor() {
        this.name = 'pause';
        this.desc = 'Pauses the player';
    }
    PauseSong(client, musicHandler, message) {
        if (!musicHandler.dispatcher) {
            message.reply('No music is currently playing!');
            return;
        }
        if (!musicHandler.dispatcher.paused) {
            musicHandler.dispatcher.pause();
            musicHandler.upNext.playing = false;
            message.reply('Paused!');
            client.user.setActivity('Paused!');
        }
    }
}
exports.Pause = Pause;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF1c2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcGF1c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQTtJQUFBO1FBRUksU0FBSSxHQUFHLE9BQU8sQ0FBQztRQUNmLFNBQUksR0FBRyxtQkFBbUIsQ0FBQztJQWtCL0IsQ0FBQztJQWhCVSxTQUFTLENBQUMsTUFBYyxFQUFFLFlBQTBCLEVBQUUsT0FBZ0I7UUFFekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQzVCO1lBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ2hELE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFDbkM7WUFDSSxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hDLFlBQVksQ0FBQyxNQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztDQUNKO0FBckJELHNCQXFCQyJ9