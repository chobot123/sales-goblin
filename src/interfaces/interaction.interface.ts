import { InteractionCallbackType, InteractionResponse, InteractionResponseData } from "../types/interactions/interactions.types";

export interface Interaction {
    name: string;
    type: InteractionCallbackType;
    data: InteractionResponseData

    execute(): InteractionResponse
}