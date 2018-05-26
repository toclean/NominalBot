import { Command } from "../models/command";
import { RichEmbed } from "discord.js";

export class Help implements Command
{
    name = "help";
    desc = "Show this help menu";
    
    public GetHelp(commands:Map<string, Command>): void
    {
        commands.forEach(command => {
            console.log(command.name);
        });
    }
}