import { NextFunction, Request, Response } from "express";
import { Interaction, InteractionCallbackType, InteractionType } from "../../types/interactions/interactions.types";

export const acknowledgeInteraction = (req: Request, res: Response, next: NextFunction) => {

    const interaction: Interaction = req.body;

    if (interaction.type == InteractionType.PING) {
        return res.send({
            type: InteractionCallbackType.PONG
        });
    }
    return next();
}