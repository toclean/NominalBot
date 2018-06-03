"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const musicHandler_1 = require("../music/musicHandler");
const ytsearch = require("youtube-search");
class Add {
    constructor() {
        this.name = 'add';
        this.desc = 'Adds a song to the queue';
    }
    AddSong(client, musicHandler, message) {
        let request = message.content.substring(message.content.indexOf(' ') + 1);
        if (request.includes('http') && request.includes('|')) {
            request.split('|').forEach(request => {
                AddUpNext(request, client, musicHandler, message);
            });
        }
        else {
            AddUpNext(request, client, musicHandler, message);
        }
    }
}
exports.Add = Add;
function AddUpNext(request, client, musicHandler, message) {
    if (request.includes('http')) {
        let id = request.split('=')[1];
        ytsearch(id, musicHandler.opts, function (error, results) {
            if (!results || results.length < 1) {
                message.reply('No search results found');
                return;
            }
            if (musicHandler.upNext) {
                musicHandler.upNext.songs.push({
                    url: results[0].link,
                    title: results[0].title,
                    requester: message.author,
                    seek: 0
                });
                message.reply(`Added ${results[0].title} to queue`);
            }
        });
    }
    else if (parseInt(request) && parseInt(request) <= musicHandler.opts.maxResults && parseInt(request) > 0) {
        if (!musicHandler_1.MusicHandler.choices || musicHandler_1.MusicHandler.choices.length < 1)
            return;
        let choice = musicHandler_1.MusicHandler.choices[parseInt(request) - 1];
        if (musicHandler.upNext) {
            musicHandler.upNext.songs.push({
                url: choice.link,
                title: choice.title,
                requester: message.author,
                seek: 0
            });
            message.reply(`Added ${choice.title} to queue`);
        }
    }
    else {
        ytsearch(request, musicHandler.opts, function (error, results) {
            let options = [];
            if (!results || results.length < 1) {
                message.reply('No search results found');
                return;
            }
            for (var i = 0; i < musicHandler.opts.maxResults; i++) {
                options.push({
                    name: `${i + 1}. ${results[i].title}`,
                    value: `[LINK](${results[i].link})`
                });
            }
            message.reply({
                embed: {
                    color: 3447004,
                    title: 'Pick one from below',
                    author: {
                        name: message.client.user.username,
                        icon_url: message.client.user.avatarURL
                    },
                    fields: options,
                    timestamp: new Date()
                }
            });
            musicHandler_1.MusicHandler.choices = results;
        });
    }
    if (musicHandler.upNext.songs.length == 1) {
        musicHandler.Play(client, musicHandler, message);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2FkZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHdEQUFxRDtBQUdyRCwyQ0FBMEM7QUFFMUM7SUFBQTtRQUVJLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixTQUFJLEdBQUcsMEJBQTBCLENBQUM7SUFvQnRDLENBQUM7SUFsQlUsT0FBTyxDQUFDLE1BQWMsRUFBRSxZQUEwQixFQUFFLE9BQWdCO1FBSXZFLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTFFLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUNyRDtZQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUVEO1lBQ0ksU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztDQUVKO0FBdkJELGtCQXVCQztBQUVELG1CQUFtQixPQUFlLEVBQUUsTUFBYyxFQUFFLFlBQTBCLEVBQUUsT0FBZ0I7SUFFNUYsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUM1QjtRQUNJLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsUUFBUSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMs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