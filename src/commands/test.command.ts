import { injectable } from "inversify";
import Command from "../interfaces/command.interface";
import { ApplicationCommandTypes } from "../types/commands/application-commands.types";
import { GlobalCommandPostData } from "../types/http/command-requests.types";
import { createCommand } from "../utils/create-command";
import { Container } from "inversify";

@injectable()
export class TestCommand implements Command {
    name: string;
    description: string;
    type: ApplicationCommandTypes;

    constructor() {
        this.name = "test";
        this.description = "replies back with 'hello'";
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

export const TestCommandSymbol = Symbol.for("Test");

export const getTestCommand = (container: Container): Container => {
    container.get<TestCommand>(TestCommandSymbol);
    return container;
}