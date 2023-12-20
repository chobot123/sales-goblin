import { injectable } from "inversify";
import { Interaction } from "../interfaces/interaction.interface";
import { InteractionCallbackData, InteractionCallbackType, InteractionResponse, InteractionResponseData } from "../types/interactions/interactions.types";
import _ from "lodash";
import { Button, MessageComponent, MessageComponentTypes } from "../types/components/components.types";
import { test_data } from "../test-data/test-products";

@injectable()
export class PriceCheckInteraction implements Interaction {
    name: string;
    type: InteractionCallbackType;
    data: InteractionCallbackData;

    /**
     * Product Name to search for via steam
     */
    productName: string;

    constructor(productName: string) {
        this.name = "price-check";
        this.type = InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE;


        this.data = {
            content: "Select a product below...",
            components: []
        };

        this.productName = productName;
    }

    execute(): InteractionResponse {
        /**
         * Steam API to use productName to get product list
         */
        const products = test_data;
        const response: InteractionResponse = {
            type: this.type,
            data: this.data
        };
        
        const productButtons: Button[] = _.map(products, (product, idx) => {
            return {
                type: MessageComponentTypes.Button,
                style: 1,
                label: product.product_title,
                custom_id: product.product_title
            };
        });

        /**
         * Since 5 max buttons/action row..
         * Figure out way to add more action rows later
         */
        const actionRow: MessageComponent = {
            type: MessageComponentTypes.ActionRow,
            components: productButtons
        }

        this.data.components?.push(actionRow);

        return response;
    }
}