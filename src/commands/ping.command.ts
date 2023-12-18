import { injectable } from "inversify";
import Command from "../interfaces/command.interface";
import { ApplicationCommandTypes } from "../types/commands/application-commands.types";
import { GlobalCommandPostData } from "../types/http/command-requests.types";
import { createCommand } from "../utils/create-command";
import { Container } from "inversify";

@injectable()
export class PingCommand implements Command {
    name: string;
    description: string;
    type: ApplicationCommandTypes;

    constructor() {
        this.name = "ping";
        this.description = "replies back with pong!";
        this.type = ApplicationCommandTypes.CHAT_INPUT;
    }

    async create(): Promise<void> {
        const command: GlobalCommandPostData = {
            name: this.name,
            description: this.description,
            type: this.type
        };

        return await createCommand(command);
    }
}

export const PingCommandSymbol = Symbol.for("Ping");

export const getPingCommand = (container: Container): Container => {
    container.get<PingCommand>(PingCommandSymbol);
    return container;
}