import { QUERY_KEY } from '@lib/constants'
import { cacheLife, cacheTag } from 'next/cache'

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

type Message = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    body: string
    replyToId: string | null
    retweetOfId: string | null
    deletedAt: Date | null
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

type MessageWithImages = Message & {
    images: ImageAssetWithUrl[]
    user: MessageUser
    replyTo?: MessageReplyTo
    retweetOf?: MessageRetweetOf
} & MessageMetadata

export type GetLogMessagesByUserIdParams = {
    page?: number
    size?: number
    userId: string
}

export type GetLogMessagesByUserIdResponse = {
    prev: number | null
    next: number | null
    totalElements: number
    totalPages: number
    content: MessageWithImages[]
}

export const getLogUserInfoByUserId = async (userId: string) => {
    'use cache'
    cacheTag(...QUERY_KEY.LOG.USER_INFO(userId))
    cacheLife('max')

    const response = await fetch(`https://log.gumyo.net/api/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data as UserProfile
}
