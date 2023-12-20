import { injectable } from "inversify";
import { Interaction } from "../interfaces/interaction.interface";
import { InteractionCallbackData, InteractionCallbackType, InteractionResponse, InteractionResponseData } from "../types/interactions/interactions.types";
import _ from "lodash";
import { Button, MessageComponent, MessageComponentTypes } from "../types/components/components.types";

@injectable()
export class PriceCheckInteraction implements Interaction {
    name: string;
    type: InteractionCallbackType;
    data: InteractionCallbackData;

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

const test_data = [
    {
        "product_url": "https://store.steampowered.com/app/238960/Path_of_Exile/?snr=1_7_7_151_150_1",
        "product_title": "Path of Exile"
    },
    {
        "product_url": "https://store.steampowered.com/app/2694490/Path_of_Exile_2/?snr=1_7_7_151_150_1",
        "product_title": "Path of Exile 2"
    },
    {
        "product_url": "https://store.steampowered.com/app/219990/Grim_Dawn/?snr=1_7_7_151_150_1",
        "product_title": "Grim Dawn"
    },
    {
        "product_url": "https://store.steampowered.com/app/642280/Grim_Dawn__Ashes_of_Malmouth_Expansion/?snr=1_7_7_151_150_1",
        "product_title": "Grim Dawn - Ashes of Malmouth Expansion"
    },
    {
        "product_url": "https://store.steampowered.com/app/897670/Grim_Dawn__Forgotten_Gods_Expansion/?snr=1_7_7_151_150_1",
        "product_title": "Grim Dawn - Forgotten Gods Expansion"
    },
    // {
    //     "product_url": "https://store.steampowered.com/app/1097430/Book_of_Yog_Idle_RPG/?snr=1_7_7_151_150_1",
    //     "product_title": "Book of Yog Idle RPG"
    // },
    // {
    //     "product_url": "https://store.steampowered.com/app/1947500/The_Walking_Dead_Saints__Sinners__Chapter_2_Retribution/?snr=1_7_7_151_150_1",
    //     "product_title": "The Walking Dead: Saints & Sinners - Chapter 2: Retribution"
    // },
    // {
    //     "product_url": "https://store.steampowered.com/app/1880650/Expansion__Hearts_of_Iron_IV_By_Blood_Alone/?snr=1_7_7_151_150_1",
    //     "product_title": "Expansion - Hearts of Iron IV: By Blood Alone"
    // },
    // {
    //     "product_url": "https://store.steampowered.com/app/1974050/Torchlight_Infinite/?snr=1_7_7_151_150_1",
    //     "product_title": "Torchlight: Infinite"
    // },
    // {
    //     "product_url": "https://store.steampowered.com/app/2451320/Bulletstorm_VR/?snr=1_7_7_151_150_1",
    //     "product_title": "Bulletstorm VR"
    // },
    // {
    //     "product_url": "https://store.steampowered.com/app/1289810/Siralim_Ultimate/?snr=1_7_7_151_150_1",
    //     "product_title": "Siralim Ultimate"
    // },
    // {
    //     "product_url": "https://store.steampowered.com/app/1025600/Battle_Realms_Zen_Edition/?snr=1_7_7_151_150_1",
    //     "product_title": "Battle Realms: Zen Edition"
    // },
    // {
    //     "product_url": "https://store.steampowered.com/app/1711610/Dungeon_100/?snr=1_7_7_151_150_1",
    //     "product_title": "Dungeon 100"
    // },
    // {
    //     "product_url": "https://store.steampowered.com/app/1088290/Grim_Dawn__Steam_Loyalist_Items_Pack_2/?snr=1_7_7_151_150_1",
    //     "product_title": "Grim Dawn - Steam Loyalist Items Pack 2"
    // }
];