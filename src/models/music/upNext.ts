import { Song } from "./song";

export class UpNext
{
    public playing: boolean;
    public replay: boolean;
    public songs: Song[];

    constructor()
    {
        this.playing = false;
        this.replay = false;
        this.songs = [];
    }
}