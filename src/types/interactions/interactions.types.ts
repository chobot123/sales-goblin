import { LocaleDictionary, snowflake } from "../commands/application-commands.types"
import { MessageComponent, SelectOption } from "../components/components.types";

export type Interaction = {
    id: snowflake;
    application_id: snowflake;
    type: InteractionType;
    data?: InteractionData;
    guild_id?: snowflake;
    channel?: Partial<Channel>;
    channel_id?: snowflake;
    member?: GuildMember;
    user?: User;
    token: string;
    version: number;
    message?: Message;
    app_permissions?: string;
    locale?: string;
    guild_locale?: string;
    entitlements: Entitlement;
}

export function isInteraction(interaction: Interaction): interaction is Interaction {
    return (interaction as Interaction).token !== undefined;
}

export type Entitlement = {
    id: snowflake;
    sku_id: snowflake;
    application_id: snowflake;
    user_id?: snowflake;
    type: number;
    deleted: boolean;
    starts_at: string; // ISO8601 timestamp	
    ends_at: string; // ISO8601 timestamp	
    guild_id?: snowflake;
}

export type ApplicationCommandInteractionDataOption = {
    name: string;
    type: number;
    value?: string | number | boolean;
    options?: ApplicationCommandInteractionDataOption;
    focused?: boolean;
}

export enum InteractionType {
    PING = 1,
    APPLICATION_COMMAND = 2,
    MESSAGE_COMPONENT = 3,
    APPLICATION_COMMAND_AUTOCOMPLETE = 4,
    MODAL_SUBMIT = 5
}

export type InteractionData = ApplicationCommandData | MessageComponentData | ModalSubmitData | ResolvedData;

export function isApplicationCommandData(interactionData: InteractionData): interactionData is ApplicationCommandData {
    return (interactionData as ApplicationCommandData).name !== undefined;
}

export function isMessageComponentData(interactionData: InteractionData): interactionData is MessageComponentData {
    return (interactionData as MessageComponentData).component_type !== undefined;
}

export function isModalSubmitData(interactionData: InteractionData): interactionData is ModalSubmitData {
    return (interactionData as ModalSubmitData).components !== undefined;
}

export function isResolvedData(interactionData: InteractionData): interactionData is ResolvedData {
    return (interactionData as ResolvedData).users !== undefined;
}

export type ApplicationCommandData = {
    id: snowflake;
    name: string;
    type: number;
    resolved?: ResolvedData;
    options?: Partial<ApplicationCommandInteractionDataOption[]>;
    guild_id?: snowflake;
    target_?: snowflake;
}

export type MessageComponentData = {
    custom_id: string;
    component_type: number;
    values?: SelectOption[];
    resolved?: ResolvedData;
}

export type ModalSubmitData = {
    custom_id: string;
    components: MessageComponent[]
}

export type ResolvedData = {
    users?: Record<snowflake, User>;
    members?: Record<snowflake, Omit<GuildMember, "user" | "deaf" | "mute">>;
    roles?: Record<snowflake, Role>;
    channels?: Record<snowflake, Pick<Channel, "id" | "name" | "type" | "permissions">>;
    messages?: Record<snowflake, Partial<Message>>;
    attachments?: Record<snowflake, Attachment>;
}

export type GuildMember = {
    user?: User;
    nick?: string;
    avatar?: string;
    roles: snowflake[];
    joined_at: string; // ISO8601 timestamp	
    premium_since?: string; // ISO8601 timestamp	
    deaf: boolean;
    mute: boolean;
    flags: number;
    pending?: number;
    permissions?: string;
    communcation_disabled_until?: string; // ISO8601 timestamp
}

export type User = {
    id: snowflake;
    username: string;
    discriminator: string;
    global_name?: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
    avatar_decoration?: string;
}

export type Role = {
    id: snowflake;
    name: string;
    color: number;
    hoise: boolean;
    icon?: string;
    unicode_emoji?: string;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: RoleTags;
    flags: number
}

export type RoleTags = {
    bot_id?: snowflake;
    integraion_id?: snowflake;
    premium_subscriber?: null;
    subscription_listing_id?: snowflake;
    available_for_purchase?: null;
    guild_connections?: null;
}

export type Channel = {
    id: string; // snowflake
    type: number; // integer (ChannelType)
    guild_id?: string; // snowflake
    position?: number; // integer
    permission_overwrites?: Overwrite[]; // array of overwrite objects
    name?: string | null; // string (1-100 characters)
    topic?: string | null; // string (0-4096 characters for GUILD_FORUM and GUILD_MEDIA channels, 0-1024 characters for all others)
    nsfw: boolean; // boolean
    last_message_id?: string | null; // snowflake
    bitrate?: number | null; // integer
    user_limit?: number | null; // integer
    rate_limit_per_user?: number; // integer
    recipients?: User[]; // array of user objects
    icon?: string | null; // string
    owner_id?: string; // snowflake
    application_id?: string; // snowflake
    managed?: boolean; // boolean
    parent_id?: string | null; // snowflake
    last_pin_timestamp?: string | null; // ISO8601 timestamp
    rtc_region?: string | null; // string
    video_quality_mode?: number; // integer
    message_count?: number | null; // integer
    member_count?: number; // integer
    thread_metadata?: ThreadMetaData; // a thread metadata object
    member?: ThreadMember | null; // a thread member object
    default_auto_archive_duration?: number; // integer
    permissions?: string | null; // string
    flags?: number; // integer
    total_message_sent?: number | null; // integer
    available_tags?: ForumTag[]; // array of tag objects
    applied_tags?: string[]; // array of snowflakes
    default_reaction_emoji?: DefaultReaction | null; // default reaction object
    default_thread_rate_limit_per_user?: number; // integer
    default_sort_order?: number | null; // integer
    default_forum_layout?: number; // integer
}

export type Overwrite = {
    id: snowflake;
    type: number;
    allow: string;
    deny: string;
}

export type ThreadMetaData = {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: string; // ISO8601 timestamp	
    locked: boolean;
    invitable?: boolean;
    create_timestamp?: string | null;
}

export type ThreadMember = {
    id?: snowflake;
    user_id?: snowflake;
    join_timestamp: string; // ISO8601 timestamp
    flags: number;
    member?: GuildMember
}

export type DefaultReaction = {
    emoji_id: snowflake | null;
    emoji_name: string | null;
}

export type ForumTag = {
    id: snowflake;
    name: string; 
    moderated: boolean;
    emoji_id: snowflake | null;
    emoji_name: string | null;
}

export type Message = {
    id: string; // snowflake
    channel_id: string; // snowflake
    author: User; // user object
    content: string; // string
    timestamp: string; // ISO8601 timestamp
    edited_timestamp?: string | null; // ?ISO8601 timestamp
    tts: boolean; // boolean
    mention_everyone: boolean; // boolean
    mentions: User[]; // array of user objects
    mention_roles: string[]; // array of role object ids
    mention_channels?: ChannelMention[]; // ?array of channel mention objects
    attachments: Attachment[]; // array of attachment objects
    embeds: Embed[]; // array of embed objects
    reactions?: Reaction[]; // ?array of reaction objects
    nonce?: number | string; // ?integer or string
    pinned: boolean; // boolean
    webhook_id?: string; // ?snowflake
    type: number; // integer
    activity?: MessageActivity; // ?message activity object
    application?: Partial<Application>; // ?partial application object
    application_id?: string; // ?snowflake
    message_reference?: MessageReference; // ?message reference object
    flags?: number; // ?integer
    referenced_message?: Message | null; // ??message object
    interaction?: MessageInteraction; // ?message interaction object
    thread?: Channel; // ?channel object (thread)
    components?: any[]; // ?array of message components
    sticker_items?: any[]; // ?array of message sticker item objects
    stickers?: any[]; // ?array of sticker objects
    position?: number; // integer
    role_subscription_data?: any; // ?role subscription data object
    resolved?: any; // ?resolved data
}

export type MessageInteraction = {
    id: snowflake;
    type: InteractionType;
    name: string;
    user: User;
    member?: Partial<GuildMember>;
}

export type MessageReference = {
    message_id?: snowflake;
    channel_id?: snowflake;
    guild_id?: snowflake;
    fail_if_not_exists?: boolean;
}

export type MessageActivity = {
    type: number;
    party_id?: string;
}

export type ChannelMention = {
    id: snowflake;
    guild_id: snowflake;
    type: number;
    name: string
}

export type Attachment = {
    id: snowflake;
    filename: string;
    description?: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number | null;
    width?: number | null;
    ephemeral?: boolean;
    duration_secs?: number;
    waveform?: string;
    flags?: number;
}

export type Embed = {
    title?: string; // string
    type?: string; // string
    description?: string; // string
    url?: string; // string
    timestamp?: string; // ISO8601 timestamp
    color?: number; // integer
    footer?: EmbedFooter; // embed footer object
    image?: EmbedImage; // embed image object
    thumbnail?: EmbedThumbnail; // embed thumbnail object
    video?: EmbedVideo; // embed video object
    provider?: EmbedProvider; // embed provider object
    author?: EmbedAuthor; // embed author object
    fields?: EmbedField[]; // array of embed field objects
}

export type EmbedFooter = {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export type EmbedThumbnail = {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export type EmbedVideo = {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export type EmbedField = {
    name: string;
    value: string;
    inline?: boolean;
}

export type EmbedAuthor = {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export type EmbedProvider = {
    name?: string;
    url?: string;
}

export type EmbedImage = {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export type Reaction = {
    count: number;
    count_details: object;
    me: boolean;
    me_burst: boolean;
    emoji: Partial<Emoji>;
    burst_colors: Array<any>;
}

export type Emoji = {
    id: snowflake | null;
    name: string | null;
    roles?: Role[];
    user?: User;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}

export type Application = {
    id: string;
    name: string;
    icon?: string | null;
    description: string;
    rpc_origins?: string[];
    bot_public: boolean;
    bot_require_code_grant: boolean;
    bot?: Partial<User>;
    terms_of_service_url?: string;
    privacy_policy_url?: string;
    owner?: Partial<User>;
    summary: string; // Deprecated and will be removed in v11
    verify_key: string;
    team?: Team | null;
    guild_id?: string;
    guild?: Partial<Guild>;
    primary_sku_id?: string;
    slug?: string;
    cover_image?: string | null;
    flags?: number;
    approximate_guild_count?: number;
    redirect_uris?: string[];
    interactions_endpoint_url?: string;
    role_connections_verification_url?: string;
    tags?: string[];
    install_params?: InstallParams;
    custom_install_url?: string;
}

export type InstallParams = {
    scopes: string[];
    permissions: string
}

export type Team = {
    icon: string | null;
    id: snowflake;
    members: TeamMember[];
    name: string;
    owner_user_id: snowflake;
}

export type TeamMember = {
    membership_state: number;
    team_id: snowflake;
    user: Partial<User>;
    role: string
}

export type Guild = {
    id: string;
    name: string;
    icon?: string | null;
    icon_hash?: string | null; // Returned when in the template object
    splash?: string | null;
    discovery_splash?: string | null;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    region?: string | null; // Deprecated
    afk_channel_id?: string | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null;
    verification_level: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: Role[];
    emojis: Emoji[];
    features: string[];
    mfa_level: number;
    application_id?: string | null;
    system_channel_id?: string | null;
    system_channel_flags: number;
    rules_channel_id?: string | null;
    max_presences?: number | null;
    max_members: number;
    vanity_url_code?: string | null;
    description?: string | null;
    banner?: string | null;
    premium_tier: number;
    premium_subscription_count?: number | null;
    preferred_locale: string;
    public_updates_channel_id?: string | null;
    max_video_channel_users?: number | null;
    max_stage_video_channel_users?: number | null;
    approximate_member_count?: number | null;
    approximate_presence_count?: number | null;
    welcome_screen?: WelcomeScreen;
    nsfw_level: number;
    stickers?: Sticker[];
    premium_progress_bar_enabled: boolean;
    safety_alerts_channel_id?: string | null;
}

export type WelcomeScreen = {
    description: string | null;
    welcome_channels: WelcomeScreenChannel[]
}

export type WelcomeScreenChannel = {
    channel_id: snowflake;
    description: string;
    emoji_id: snowflake | null;
    emoji_name: string | null;
}

export type Sticker = {
    id: snowflake;
    pack_id?: snowflake;
    name: string;
    description: string | null;
    tags: string;
    asset?: string;
    type: number;
    format_type: number;
    available?: boolean;
    guild_id?: snowflake;
    user?: User;
    sort_value?: number;
}

export type InteractionResponse = {
    type: InteractionCallbackType;
    data?: InteractionResponseData;
}

export type InteractionResponseData = InteractionCallbackData | Autocomplete | Modal;

export type Autocomplete = {
    choices: ApplicationCommandOptionChoice[]
}

export type Modal = {
    custom_id: string;
    title: string;
    components: MessageComponent[];
}

export type ApplicationCommandOptionChoice = {
    name: string;
    name_localizations?: LocaleDictionary | null;
    value: string | number;
}

export enum InteractionCallbackType {
    PONG = 1,
    CHANNEL_MESSAGE_WITH_SOURCE = 4,
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
    DEFERRED_UPDATE_MESSAGE	= 6,
    UPDATE_MESSAGE = 7,
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
    MODAL = 9,
    PREMIUM_REQUIRED = 10
}

export type InteractionCallbackData = {
    tts?: boolean;
    content?: string;
    embeds?: Embed[];
    allowed_mentions?: AllowedMention;
    flags?:	number;	
    components?: MessageComponent[];
    attachments?: Attachment[]
}

export enum AllowedMentionType {
    RoleMentions = "roles",
    UserMentions = "users",
    EveryoneMentions = "everyone"
}

export type AllowedMention = {
    parse: AllowedMentionType[];
    roles: snowflake[];
    users: snowflake[];
    replied_user: boolean
}