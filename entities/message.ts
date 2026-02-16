import { serverFetchData } from '@lib/api/client'
import 'server-only'

export type UserProfile = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    followersCount: number
    followingCount: number
    isFollowing?: boolean
    isFollowedBy?: boolean
}

type ImageAsset = {
    id: string
    createdAt: Date
    updatedAt: Date
    r2Key: string
    bucket: string
    mimeType: string
    sizeBytes: number
    width: number | null
    height: number | null
    checksum: string | null
    uploadedBy: string | null
}

type MessageUser = {
    id: string
    name: string
    email: string
    image: string | null
}

type ImageAssetWithUrl = ImageAsset & {
    url: string
}

type MessageReplyTo = {
    id: string
    userId: string
    body: string
    user: MessageUser
}

type MessageRetweetOf = {
    id: string
    userId: string
    body: string
    user: MessageUser
    images: ImageAssetWithUrl[]
}

type MessageMetadata = {
    replyCount?: number
    retweetCount?: number
    isRetweeted?: boolean
}

type MessageWithImages = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    body: string
    replyToId: string | null
    retweetOfId: string | null
    deletedAt: Date | null
    images: ImageAssetWithUrl[]
    user: MessageUser
    replyTo?: MessageReplyTo
    retweetOf?: MessageRetweetOf
} & MessageMetadata

export type GetMessagesByUserIdParams = {
    page?: number
    size?: number
    userId: string
}

export type GetMessagesByUserIdResponse = {
    prev: number | null
    next: number | null
    totalElements: number
    totalPages: number
    content: MessageWithImages[]
}

export const getUserProfile = async (userId: string) => {
    return await serverFetchData<UserProfile>(`/api/blog/messages/user/${userId}/profile`, {
        revalidate: 60 * 60,
    })
}

export const getMessagesByUserId = async ({ page = 1, size = 10, userId }: GetMessagesByUserIdParams) => {
    return await serverFetchData<GetMessagesByUserIdResponse>(`/api/blog/messages/user/${userId}?page=${page}&size=${size}`, {
        cache: 'no-store',
    })
}
