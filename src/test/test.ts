import { expect } from 'chai'
import { Client, Message, Channel, TextChannel, Guild, User, ClientUser, Collection } from 'discord.js'
import { MusicHandler } from '../music/musicHandler'
import { VoiceHandler } from '../music/voiceHandler'
import { Add } from '../commands/add'
import { UpNext } from '../models/music/upNext';

let client = new Client();

let vh = new VoiceHandler();
let mh = new MusicHandler(vh);

mh.upNext = new UpNext();

client.user = new ClientUser(client, {'id': '123'});
client.users.set(client.user.id, client.user);

describe('Adds a song to the queue', () => {
    it('array should be one larger', async () => {
        let startSize = mh.upNext!.songs.length;
        let guild = new Guild(client, {'emojis': []});
        let channel = new TextChannel(guild, {});
        
        await mh.AddSong(client, mh, new Message(channel, {'content': ' https://www.youtube.com/watch?v=nYb2B7N1CKU', 'author': client.user, 'embeds': [], 'attachments': []}, client));

        expect(startSize).to.not.eq(mh.upNext!.songs.length);
    });
});