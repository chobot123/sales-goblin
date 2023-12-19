import { ApplicationCommandOption, ApplicationCommandTypes } from "../types/commands/application-commands.types";
import { InteractionResponse } from "../types/interactions/interactions.types";

export default interface Command {
    name: string;
    description: string;
    type: ApplicationCommandTypes;
    options?: ApplicationCommandOption[]

    create(): Promise<void>
}

export const CommandSymbol = Symbol.for("Command");