import 'server-only'
import { db } from '@db/db'
import { messageImages, messages, follows, user, imageAssets } from '@db/schema'
import { QUERY_KEY } from '@lib/constants'
import { eq, sql, and, isNull, InferSelectModel } from 'drizzle-orm'
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
    'use cache'
    cacheTag(...QUERY_KEY.LOG.USER_INFO(userId))
    cacheLife('max')

    const [result] = await db
        .select({
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            followersCount: sql<number>`(SELECT COUNT(*) FROM ${follows} WHERE ${follows.followingId} = ${user.id})`,
            followingCount: sql<number>`(SELECT COUNT(*) FROM ${follows} WHERE ${follows.followerId} = ${user.id})`,
        })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1)

    return result as UserProfile
}


export const getMessagesByUserId = async ({ page = 1, size = 10, userId }: GetMessagesByUserIdParams): Promise<GetMessagesByUserIdResponse> => {
    'use cache'
    cacheTag(...QUERY_KEY.LOG.MESSAGES(userId), `page-${page}`, `size-${size}`)
    cacheLife('max')

    const offset = (page - 1) * size

    const messageImagesSubquery = db
        .select({
            messageId: messageImages.messageId,
            imageId: messageImages.imageId,
            order: messageImages.order,
            createdAt: messageImages.createdAt,
            r2Key: imageAssets.r2Key,
            bucket: imageAssets.bucket,
            mimeType: imageAssets.mimeType,
            sizeBytes: imageAssets.sizeBytes,
            width: imageAssets.width,
            height: imageAssets.height,
            checksum: imageAssets.checksum,
            uploadedBy: imageAssets.uploadedBy,
            assetCreatedAt: imageAssets.createdAt,
            assetUpdatedAt: imageAssets.updatedAt,
        })
        .from(messageImages)
        .leftJoin(imageAssets, eq(messageImages.imageId, imageAssets.id))
        .as('message_images_with_assets')

    const data = await db
        .select({
            id: messages.id,
            userId: messages.userId,
            body: messages.body,
            replyToId: messages.replyToId,
            retweetOfId: messages.retweetOfId,
            createdAt: messages.createdAt,
            updatedAt: messages.updatedAt,
            deletedAt: messages.deletedAt,
            userName: user.name,
            userEmail: user.email,
            userImage: user.image,
        })
        .from(messages)
        .leftJoin(user, eq(messages.userId, user.id))
        .where(and(eq(messages.userId, userId), isNull(messages.deletedAt)))
        .orderBy(sql`${messages.createdAt} DESC`)
        .limit(size)
        .offset(offset)

    const [{ total }] = await db
        .select({ total: sql<number>`COUNT(*)` })
        .from(messages)
        .where(and(eq(messages.userId, userId), isNull(messages.deletedAt)))

    const totalPages = Math.ceil(total / size)

    const content = await Promise.all(
        data.map(async (msg) => {
            const [{ replyCount }] = await db
                .select({ replyCount: sql<number>`COUNT(*)` })
                .from(messages)
                .where(eq(messages.replyToId, msg.id))

            const [{ retweetCount }] = await db
                .select({ retweetCount: sql<number>`COUNT(*)` })
                .from(messages)
                .where(eq(messages.retweetOfId, msg.id))

            const msgImages = await db
                .select({
                    id: imageAssets.id,
                    r2Key: imageAssets.r2Key,
                    bucket: imageAssets.bucket,
                    mimeType: imageAssets.mimeType,
                    sizeBytes: imageAssets.sizeBytes,
                    width: imageAssets.width,
                    height: imageAssets.height,
                    checksum: imageAssets.checksum,
                    uploadedBy: imageAssets.uploadedBy,
                    createdAt: imageAssets.createdAt,
                    updatedAt: imageAssets.updatedAt,
                })
                .from(messageImages)
                .leftJoin(imageAssets, eq(messageImages.imageId, imageAssets.id))
                .where(eq(messageImages.messageId, msg.id))

            return {
                id: msg.id,
                userId: msg.userId,
                body: msg.body,
                replyToId: msg.replyToId,
                retweetOfId: msg.retweetOfId,
                createdAt: msg.createdAt,
                updatedAt: msg.updatedAt,
                deletedAt: msg.deletedAt,
                user: {
                    id: msg.userId,
                    name: msg.userName,
                    email: msg.userEmail,
                    image: msg.userImage,
                },
                images: msgImages.map((mi) => ({
                    id: mi.id!,
                    r2Key: mi.r2Key!,
                    bucket: mi.bucket!,
                    mimeType: mi.mimeType!,
                    sizeBytes: mi.sizeBytes!,
                    width: mi.width,
                    height: mi.height,
                    checksum: mi.checksum,
                    uploadedBy: mi.uploadedBy,
                    createdAt: mi.createdAt!,
                    updatedAt: mi.updatedAt!,
                    url: `https://blogimg.gumyo.net/${mi.r2Key}`,
                })),
                replyCount,
                retweetCount,
            } as MessageWithImages
        }),
    )

    return {
        prev: page > 1 ? page - 1 : null,
        next: page < totalPages ? page + 1 : null,
        totalElements: total,
        totalPages,
        content,
    }
}

export const insertMessage = async (data: { userId: string; body: string; imageIds?: string[]; replyToId?: string; retweetOfId?: string }) => {
    const messageId = crypto.randomUUID()

    await db.insert(messages).values({
        id: messageId,
        userId: data.userId,
        body: data.body,
        replyToId: data.replyToId || null,
        retweetOfId: data.retweetOfId || null,
    })

    if (data.imageIds && data.imageIds.length > 0) {
        await db.insert(messageImages).values(
            data.imageIds.map((imageId, index) => ({
                messageId,
                imageId,
                order: index,
            })),
        )
    }

    return { id: messageId }
}

export const deleteMessage = async (messageId: string) => {
    await db.update(messages).set({ deletedAt: new Date() }).where(eq(messages.id, messageId))

    return { id: messageId }
}
