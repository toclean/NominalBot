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

let guild = new Guild(client, {'emojis': []});
let channel = new TextChannel(guild, {});

describe('Searching', () => 
{
    // describe('String Searching', () => 
    // {
    //     it('Searching with a string', async () => 
    //     {      
    //         let message = new Message(channel, {'content': ' this is a test', 'author': client.user, 'embeds': [], 'attachments': []}, client);
    //         let startSize = mh.results!.length | 0;
    //         await mh.AddSong(client, mh, message);
    //         expect(startSize).to.be.lessThan(mh.results!.length);
    //     });
    // });
    
    describe('String Searching', () => 
    {
        it('url should return results', async () => 
        {        
            let message = new Message(channel, {'content': ' https://www.youtube.com/watch?v=fXz_AqeJOkE', 'author': client.user, 'embeds': [], 'attachments': []}, client);
            let startSize = mh.upNext!.songs.length;
            await mh.AddSong(client, mh, message);
            expect(startSize).to.be.lessThan(mh.upNext!.songs.length);
        });
    });
});