export type ApplicationCommand = {
    id: snowflake;
    type?: ApplicationCommandTypes;
    application_id: snowflake;
    guild_id?: snowflake;
    name: string;
    name_localizations?: LocaleDictionary;
    description: string;
    description_localizations?: LocaleDictionary;
    options?: ApplicationCommandOption[];
    default_member_permissions?: string;
    dm_permissions?: boolean;
    // default_permission?: ?boolean;
    nsfw?: boolean;
    version: snowflake;
}

export enum ApplicationCommandTypes {
    CHAT_INPUT = 1, // Slash commands; a text-based command that shows up when a user types
    USER = 2, // A UI-based command that shows up when you right click or tap on a user
    MESSAGE = 3 // A UI-based command that shows up when you right click or tap on a message
}

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}

export type ApplicationCommandOption = {
    type: ApplicationCommandOptionType;
    name: string;
    name_localizations?: LocaleDictionary;
    description: string;
    description_localizations?: LocaleDictionary;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
    channel_types?: ChannelTypes[];
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
    autocomplete?: boolean;
}

export enum ChannelTypes {
    GUILD_TEXT = 0, // a text channel within a server
    DM = 1, // a direct message between users
    GUILD_VOICE = 2, // a voice channel within a server
    GROUP_DM = 3, // a direct message between multiple users
    GUILD_CATEGORY = 4, // an organizational category that contains up to 50 channels
    GUILD_ANNOUNCEMENT = 5, // a channel that users can follow and crosspost into their own server (formerly news channels)
    ANNOUNCEMENT_THREAD = 10, // a temporary sub-channel within a GUILD_ANNOUNCEMENT channel
    PUBLIC_THREAD = 11, // 	a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel
    PRIVATE_THREAD = 12, // a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
    GUILD_STAGE_VOICE = 13, // a voice channel for hosting events with an audience
    GUILD_DIRECTORY = 14, // the channel in a hub containing the listed servers
    GUILD_FORUM = 15, // Channel that can only contain threads
    GUILD_MEDIA = 16, // Channel that can only contain threads, similar to GUILD_FORUM channels
}

export type ApplicationCommandOptionChoice = {
    name: string, // 	1-100 character choice name
    name_localizations?: LocaleDictionary; // Localization dictionary for the name field. Values follow the same restrictions as name
    value: string | number // Value for the choice, up to 100 characters if string
}

export enum LanguageCode {
    id = 'id',
    da = 'da',
    de = 'de',
    en_GB = 'en-GB',
    en_US = 'en-US',
    es_ES = 'es-ES',
    fr = 'fr',
    hr = 'hr',
    it = 'it',
    lt = 'lt',
    hu = 'hu',
    nl = 'nl',
    no = 'no',
    pl = 'pl',
    pt_BR = 'pt-BR',
    ro = 'ro',
    fi = 'fi',
    sv_SE = 'sv-SE',
    vi = 'vi',
    tr = 'tr',
    cs = 'cs',
    el = 'el',
    bg = 'bg',
    ru = 'ru',
    uk = 'uk',
    hi = 'hi',
    th = 'th',
    zh_CN = 'zh-CN',
    ja = 'ja',
    zh_TW = 'zh-TW',
    ko = 'ko',
}
  
export type LocaleDictionary = {
    [key in LanguageCode]: string;
};

export type snowflake = string;