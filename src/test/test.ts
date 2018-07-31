// import { expect } from 'chai'
// import { Client, Message, Channel, TextChannel, Guild, User, ClientUser, Collection } from 'discord.js'
// import { MusicHandler } from '../music/musicHandler'
// import { VoiceHandler } from '../music/voiceHandler'
// import { UpNext } from '../models/music/upNext';
// import { Song } from '../models/music/song';

// let { botToken }: { botToken: string } = require('../../config.json');

// let client = new Client();

// client.login(botToken);

// let vh = new VoiceHandler();
// let mh = new MusicHandler(vh);

// mh.upNext = new UpNext();

// client.user = new ClientUser(client, {'id': '123'});
// client.users.set(client.user.id, client.user);

// let guild = new Guild(client, {'emojis': []});
// let channel = new TextChannel(guild, {});

// describe('YoutubeAPI', () => 
// {
//     describe('String Searching', () => 
//     {
//         it('Searching with a string', async () => 
//         {   
//             let message = new Message(channel, {'content': ' this is a test', 'author': client.user, 'embeds': [], 'attachments': []}, client);
//             let startSize = MusicHandler.choices!.length | 0;
//             mh.AddSong(client, mh, message).then(() => {
//                 expect(startSize).to.be.lessThan(MusicHandler.choices!.length);
//             });
//         });
//     });
        
//     describe('String Searching', () => 
//     {
//         it('url should return results', async () => 
//         {        
//             let message = new Message(channel, {'content': ' https://www.youtube.com/watch?v=fXz_AqeJOkE', 'author': client.user, 'embeds': [], 'attachments': []}, client);
//             let startSize = mh.upNext!.songs.length;
//             mh.AddSong(client, mh, message).then(() => {
//                 expect(startSize).to.be.lessThan(mh.upNext!.songs.length);
//             });
//         });
//     });

//     describe('Prompt selection', () => 
//     {
//         it('selection should be added to the upNext', async () => 
//         {   
//             let message = new Message(channel, {'content': ' 1', 'author': client.user, 'embeds': [], 'attachments': []}, client);
//             mh.upNext!.playing = true;
//             let startSize = mh.upNext!.songs.length;
//             MusicHandler.choices!.push(
//             {
//                 title: '',
//                 channelId: '',
//                 description: '',
//                 channelTitle: '',
//                 id: '',
//                 kind: '',
//                 link: '',
//                 publishedAt: '',
//                 thumbnails: {
//                     default: {
//                         url: '',
//                         width: 0,
//                         height: 0
//                     }
//                 }
//             });
//             mh.AddSong(client, mh, message).then(() => {
//                 expect(startSize).to.be.lessThan(mh.upNext!.songs.length);
//             });
//         });
//     });
// });