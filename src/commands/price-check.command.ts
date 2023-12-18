import { injectable } from "inversify";
import Command from "../interfaces/command.interface";
import { ApplicationCommandOption, ApplicationCommandOptionType, ApplicationCommandTypes } from "../types/commands/application-commands.types";
import { GlobalCommandPostData } from "../types/http/command-requests.types";
import { createCommand } from "../utils/create-command";
import { Container } from "inversify";

@injectable()
export class PriceCheckCommand implements Command {
    name: string;
    description: string;
    type: ApplicationCommandTypes;
    options: ApplicationCommandOption[];

    constructor() {
        this.name = "pc";
        this.description = "Price checks a product via Steam";
        this.type = ApplicationCommandTypes.CHAT_INPUT;
        this.options = [
            {
                type: ApplicationCommandOptionType.STRING,
                name: "product",
                description: "product to price check",
                required: true
            }
        ];
    }

    async create(): Promise<void> {
        const command: GlobalCommandPostData = {
            name: this.name,
            description: this.description,
            type: this.type,
            options: this.options
        };

        return await createCommand(command);
    }
}

export const PriceCheckCommandSymbol = Symbol.for("PriceCheck");

export const getPriceCheckCommand = (container: Container): Container => {
    container.get<PriceCheckCommand>(PriceCheckCommandSymbol);
    return container;
}
