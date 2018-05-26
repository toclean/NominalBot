"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Help {
    constructor() {
        this.name = "help";
        this.desc = "Show this help menu";
    }
    GetHelp(commands) {
        commands.forEach(command => {
            console.log(command.name);
        });
    }
}
exports.Help = Help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7SUFBQTtRQUVJLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxTQUFJLEdBQUcscUJBQXFCLENBQUM7SUFPakMsQ0FBQztJQU5VLE9BQU8sQ0FBQyxRQUE2QjtRQUV4QyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBVkQsb0JBVUMifQ==