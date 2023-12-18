import { HttpMethod } from "../types/http/axios.types";
import { GlobalCommandPostData, GuildCommandPostData } from "../types/http/command-requests.types";
import axios, { AxiosRequestConfig } from "axios";
import 'dotenv/config';

export const createCommand = async (command: GlobalCommandPostData): Promise<void> => {
    try {
        const config: AxiosRequestConfig<GuildCommandPostData> = {
            url: `https://discord.com/api/v10/applications/${process.env.APPLICATION_ID}/guilds/${process.env.GUILD_ID}/commands`,
            method: HttpMethod.POST,
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`
            },
            data: command
        }
      
          axios(config)
            .then((res) => {
                console.log(`Created command: ${command.name}`);
            }
        );
    }
    catch (err: any) {
        console.error("failed to create command.");
    }
}