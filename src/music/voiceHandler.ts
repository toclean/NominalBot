import { Message, Channel, VoiceChannel, VoiceConnection } from "discord.js";
import { resolve } from "path";

export class VoiceHandler
{
    public voiceChannel: VoiceChannel | undefined;
    public voiceConnection: VoiceConnection | undefined;

    public async ConnectToVoiceChannel(message: Message): Promise<VoiceConnection>
    {
        try
        {
            this.voiceChannel = message.member.voiceChannel;
            this.voiceConnection = await this.voiceChannel.join();
            // if (this.voiceChannel) message.channel.send(`Connected to ${this.voiceChannel.name}`);

            return this.voiceConnection;
        }catch(e)
        {
            console.log(e);
            return new Promise<VoiceConnection>(() => {});
        }
    }

    public LeaveVoiceChannel(message: Message): void
    {
        if (this.voiceConnection) {
            this.voiceConnection.disconnect();
            if (this.voiceChannel)
            {
                this.voiceChannel.leave();
                // message.channel.send(`Disconnected from ${this.voiceChannel.name}`);
            }
            this.voiceConnection = undefined;
            this.voiceChannel = undefined;
        }
    }
}