import { Client, Guild, TextChannel, Message, ClientUser } from "discord.js";

const { botToken }: { botToken: string } = require('../../config.json');

export class TestBase
{
    client: Client | undefined;
    guild: Guild | null = this.getGuild();
    channel: TextChannel | null = this.getChannel();
    message: Message | null = this.getMessage();

    constructor()
    {
        
    }

    // Create a user for testing
    public getClient(): Promise<Client>
    {
        return new Promise<Client>((resolve, reject) => 
        {
            let client = new Client();
    
            client.login(botToken);
            
            client.on('ready', () => 
            {
                client.user = new ClientUser(client, {'id': '123'});
                client.users.set(client.user.id, client.user);
                this.client = client
                resolve(client);
            });
        });
    }

    public getGuild(): Guild | null
    {
        if (!this.client) return null;

        let guild = new Guild(this.client, {'emojis': []});

        return guild;
    }

    public getChannel(): TextChannel | null
    {
        if (!this.guild) return null;

        let channel = new TextChannel(this.guild, {});

        return channel;
    }

    public getMessage(): Message | null
    {
        if (!this.channel || !this.client) return null;

        let message = new Message(this.channel, {'content': ' this is a test', 'author': this.client.user, 'embeds': [], 'attachments': []}, this.client);

        return message;
    }
}
