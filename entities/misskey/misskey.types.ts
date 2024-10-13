export type Achievement = {
    name: string
    unlockedAt: number
}

export type PinnedNote = {
    id: string
    createdAt: string
    userId: string
    user: {
        id: string
        name: string
        username: string
        host: string | null
        avatarUrl: string
        avatarBlurhash: string
        avatarDecorations: any[]
        isBot: boolean
        isCat: boolean
        emojis: Record<string, any>
        onlineStatus: string
        badgeRoles: any[]
    }
    text: string
    cw: string | null
    visibility: string
    localOnly: boolean
    reactionAcceptance: any | null
    renoteCount: number
    repliesCount: number
    reactionCount: number
    reactions: Record<string, any>
    reactionEmojis: Record<string, any>
    fileIds: string[]
    files: any[]
    replyId: string | null
    renoteId: string | null
    clippedCount: number
}

export type Policies = {
    gtlAvailable: boolean
    ltlAvailable: boolean
    canPublicNote: boolean
    mentionLimit: number
    canInvite: boolean
    inviteLimit: number
    inviteLimitCycle: number
    inviteExpirationTime: number
    canManageCustomEmojis: boolean
    canManageAvatarDecorations: boolean
    canSearchNotes: boolean
    canUseTranslator: boolean
    canHideAds: boolean
    driveCapacityMb: number
    alwaysMarkNsfw: boolean
    canUpdateBioMedia: boolean
    pinLimit: number
    antennaLimit: number
    wordMuteLimit: number
    webhookLimit: number
    clipLimit: number
    noteEachClipsLimit: number
    userListLimit: number
    userEachUserListsLimit: number
    rateLimitFactor: number
    avatarDecorationLimit: number
    canImportAntennas: boolean
    canImportBlocking: boolean
    canImportFollowing: boolean
    canImportMuting: boolean
    canImportUserLists: boolean
}

export interface MisskeyUserInfo {
    id: string
    name: string
    username: string
    host: string | null
    avatarUrl: string
    avatarBlurhash: string
    avatarDecorations: any[]
    isBot: boolean
    isCat: boolean
    emojis: Record<string, any>
    onlineStatus: string
    badgeRoles: any[]
    url: string | null
    uri: string | null
    movedTo: string | null
    alsoKnownAs: string | null
    createdAt: string
    updatedAt: string
    lastFetchedAt: string | null
    bannerUrl: string
    bannerBlurhash: string
    isLocked: boolean
    isSilenced: boolean
    isSuspended: boolean
    description: string
    location: string | null
    birthday: string | null
    lang: string | null
    fields: any[]
    verifiedLinks: any[]
    followersCount: number
    followingCount: number
    notesCount: number
    pinnedNoteIds: string[]
    pinnedNotes: PinnedNote[]
    pinnedPageId: string | null
    pinnedPage: any | null
    publicReactions: boolean
    followersVisibility: string
    followingVisibility: string
    roles: any[]
    memo: string | null
    moderationNote: string
    twoFactorEnabled: boolean
    usePasswordLessLogin: boolean
    securityKeys: boolean
    avatarId: string
    bannerId: string
    followedMessage: string | null
    isModerator: boolean
    isAdmin: boolean
    injectFeaturedNote: boolean
    receiveAnnouncementEmail: boolean
    alwaysMarkNsfw: boolean
    autoSensitive: boolean
    carefulBot: boolean
    autoAcceptFollowed: boolean
    noCrawle: boolean
    preventAiLearning: boolean
    isExplorable: boolean
    isDeleted: boolean
    twoFactorBackupCodesStock: string
    hideOnlineStatus: boolean
    hasUnreadSpecifiedNotes: boolean
    hasUnreadMentions: boolean
    hasUnreadAnnouncement: boolean
    unreadAnnouncements: any[]
    hasUnreadAntenna: boolean
    hasUnreadChannel: boolean
    hasUnreadNotification: boolean
    hasPendingReceivedFollowRequest: boolean
    unreadNotificationsCount: number
    mutedWords: any[]
    hardMutedWords: any[]
    mutedInstances: any[]
    mutingNotificationTypes: any[]
    notificationRecieveConfig: Record<string, any>
    emailNotificationTypes: string[]
    achievements: Achievement[]
    loggedInDays: number
    policies: Policies
}

export type MisskeyInfo = {
    name: string
    anchor: string
    description: string
    avatarUrl: string
    bannerUrl: string
    location: string | null
    createdAt: string
    updatedAt: string
}

export interface MisskeyPostUser {
    id: string
    name: string
    username: string
    host: string | null
    avatarUrl: string
    avatarBlurhash: string
    avatarDecorations: any[]
    isBot: boolean
    isCat: boolean
    emojis: Record<string, unknown>
    onlineStatus: string
    badgeRoles: any[]
}

type File = {
    id: string
    createdAt: string
    name: string
    type: string
    md5: string
    size: number
    isSensitive: boolean
    blurhash: string
    properties: {
        width: number
        height: number
    }
    url: string
    thumbnailUrl: string
    comment: string | null
    folderId: string | null
    folder: string | null
    userId: string
    user: string | null
}

export interface MisskeyPost {
    id: string
    createdAt: string
    userId: string
    user: MisskeyPostUser
    text: string
    cw: string | null
    visibility: string
    localOnly: boolean
    reactionAcceptance: string | null
    renoteCount: number
    repliesCount: number
    reactionCount: number
    reactions: Record<string, number>
    reactionEmojis: Record<string, unknown>
    fileIds: string[]
    files: File[]
    replyId: string | null
    renoteId: string | null
    clippedCount: number
}
