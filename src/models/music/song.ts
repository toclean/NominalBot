import { User } from "discord.js";

export class Song
{
    public url: string;
    public title: string;
    public requester: User | undefined;
    public seek: number;

    constructor()
    {
        this.url = "";
        this.title = "";
        this.requester = undefined;
        this.seek = 0;
    }
}