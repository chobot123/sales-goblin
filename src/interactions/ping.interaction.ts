import { injectable } from "inversify";
import { Interaction } from "../interfaces/interaction.interface";
import { InteractionCallbackData, InteractionCallbackType, InteractionResponse, InteractionResponseData } from "../types/interactions/interactions.types";

@injectable()
export class PingInteraction implements Interaction {
    name: string;
    type: InteractionCallbackType;
    data: InteractionCallbackData;

    constructor() {
        this.name = "ping";
        this.type = InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE;
        this.data = {
            content: "pong"
        };
    }

    execute(): InteractionResponse {
        const response: InteractionResponse = {
            type: this.type,
            data: this.data
        }

        return response;
    }
}