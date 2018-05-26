export interface Command
{
    // Name of the command
    name: string;

    // Short description of the command
    desc: string;

    // Function the command executes
    exec?: any;
}