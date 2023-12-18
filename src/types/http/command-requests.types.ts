import { ApplicationCommandOption, ApplicationCommandTypes, LocaleDictionary } from "../commands/application-commands.types";
import { HttpMethod } from "./axios.types";

// string => application_id
export type GlobalCommandUrl = `https://discord.com/api/v10/applications/${string}/commands`;

export interface AxiosGlobalCommandConfig {
    url: GlobalCommandUrl,
    method: HttpMethod,
    headers: ApplicationCommandAuthorization,
}

export type GlobalCommandGetConfig = AxiosGlobalCommandConfig & {
    params: GlobalCommandGetParams
}

export type GlobalCommandPostConfig = AxiosGlobalCommandConfig & {
    data: GlobalCommandPostData
}

export type GlobalCommandPostData = {
    name: string;
    name_localizations?: LocaleDictionary;
    description?: string;
    description_localizations?: LocaleDictionary;
    options?: ApplicationCommandOption[];
    default_member_permissions?: string;
    dm_permission?: boolean;
    default_permission?: boolean;
    type?: ApplicationCommandTypes;
    nsfw?: boolean;
}

export type GuildCommandPostData = {
    name: string;
    name_localizations?: LocaleDictionary;
    description?: string;
    description_localizations?: LocaleDictionary;
    options?: ApplicationCommandOption[];
    default_member_permissions?: string;
    default_permission?: boolean;
    type?: ApplicationCommandTypes;
    nsfw?: boolean;
}

export type GlobalCommandGetParams = {
    with_localizations?: boolean
}


export type ApplicationCommandAuthorization = BotTokenAuthorization | ClientCredentialTokenAuthorization;

// string => bot token
export type BotTokenAuthorization = `Bot ${string}`;

// string => client credentials token
export type ClientCredentialTokenAuthorization = `Bearer ${string}`;