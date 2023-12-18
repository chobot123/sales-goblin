import { Emoji } from "../interactions/interactions.types";
import { snowflake } from "../commands/application-commands.types";

export enum MessageComponentTypes {
    ActionRow = 1,
    Button = 2,
    StringSelect = 3,
    TextInput = 4,
    UserSelect = 5,
    RoleSelect = 6,
    MentionableSelect = 7,
    ChannelSelect = 8
}

export type MessageComponent = ActionRow | Button | SelectMenu<SelectMenuComponentsTypes> | TextInput;

export type SelectMenuComponentsTypes = MessageComponentTypes.StringSelect | MessageComponentTypes.UserSelect | MessageComponentTypes.RoleSelect | MessageComponentTypes.MentionableSelect | MessageComponentTypes.ChannelSelect;

export type SelectMenu<T extends SelectMenuComponentsTypes> = {
    type: T;
    custom_id: string;
    options: SelectOption[]; // required for string select menus (component type 3), and unavailable for all other select menu components.
    channel_types?: ChannelType[]; // only be used for channel select menu components.
    placeholder?: string; // placerholder txt if nothing is selected
    default_values?: DefaultValue[] //only available for auto-populated select menu components, which include user (5), role (6), mentionable (7), and channel (8) components.
    min_values?: number;
    max_values?: number;
    disabled?: boolean
}

export type StringSelect = Omit<SelectMenu<MessageComponentTypes.StringSelect>, "channel_types" | "default_values">;
export type UserSelect = Omit<SelectMenu<MessageComponentTypes.UserSelect>, "channel_types" | "options">
export type RoleSelect = Omit<SelectMenu<MessageComponentTypes.UserSelect>, "channel_types" | "options">
export type MentionableSelect = Omit<SelectMenu<MessageComponentTypes.UserSelect>, "channel_types" | "options">
export type ChannelSelect = Omit<SelectMenu<MessageComponentTypes.UserSelect>, "options">

export type SelectOption = {
    label: string;
    value: string;
    description?: string;
    emoji: Pick<Emoji, "name" | "id" | "animated">;
    default?: boolean
}

export type ActionRow = {
    type: MessageComponentTypes.ActionRow;
    components: Exclude<MessageComponent, ActionRow>[];
}

export type Button = {
    type: MessageComponentTypes.Button,
    style: ButtonStyles;
    label?: string;
    emoji?: Pick<Emoji, "name" | "id" | "animated">;
    custom_id?: string;
    url?: string;
    disabled?: boolean
}

export enum ButtonStyles {
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Danger = 4,
    Link = 5
}

export type DefaultValue = {
    id: snowflake;
    type: string // Type of value that id represents. Either "user", "role", or "channel"
}

export type TextInput = {
    type: MessageComponentTypes.TextInput;
    custom_id: string;
    style: TextInputStyles; 
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
}

export enum TextInputStyles {
    Short = 1,
    Paragraph = 2
}

export enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUNCEMENT = 5,
    ANNOUNCEMENT_THREAD = 10,
    PUBLIC_THREAD = 11,
    PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15,
    GUILD_MEDIA = 16,
}