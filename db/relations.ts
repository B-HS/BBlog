import { relations } from 'drizzle-orm'
import {
    categories,
    comments,
    images,
    posts,
    postTags,
    tags,
    user,
    messages,
    messageImages,
    imageAssets,
    messageLikes,
    messageBookmarks,
    follows,
} from './schema'

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.postId],
    }),
    user: one(user, {
        fields: [comments.userId],
        references: [user.id],
    }),
}))

export const categoriesRelations = relations(categories, ({ one }) => ({
    post: one(posts, {
        fields: [categories.categoryId],
        references: [posts.categoryId],
    }),
}))

export const postsRelations = relations(posts, ({ many }) => ({
    comments: many(comments),
    tags: many(postTags),
}))

export const postTagsRelations = relations(postTags, ({ one }) => ({
    post: one(posts, {
        fields: [postTags.postId],
        references: [posts.postId],
    }),
    tag: one(tags, {
        fields: [postTags.tagId],
        references: [tags.tagId],
    }),
}))

export const imagesRelations = relations(images, ({ one }) => ({
    user: one(user, {
        fields: [images.userId],
        references: [user.id],
    }),
}))

export const userRelations = relations(user, ({ many }) => ({
    comments: many(comments),
    images: many(images),
    messages: many(messages),
    followers: many(follows, { relationName: 'followers' }),
    following: many(follows, { relationName: 'following' }),
}))

export const messagesRelations = relations(messages, ({ one, many }) => ({
    user: one(user, {
        fields: [messages.userId],
        references: [user.id],
    }),
    replyTo: one(messages, {
        fields: [messages.replyToId],
        references: [messages.id],
        relationName: 'replies',
    }),
    retweetOf: one(messages, {
        fields: [messages.retweetOfId],
        references: [messages.id],
        relationName: 'retweets',
    }),
    replies: many(messages, { relationName: 'replies' }),
    retweets: many(messages, { relationName: 'retweets' }),
    messageImages: many(messageImages),
    likes: many(messageLikes),
    bookmarks: many(messageBookmarks),
}))

export const messageImagesRelations = relations(messageImages, ({ one }) => ({
    message: one(messages, {
        fields: [messageImages.messageId],
        references: [messages.id],
    }),
    imageAsset: one(imageAssets, {
        fields: [messageImages.imageId],
        references: [imageAssets.id],
    }),
}))

export const imageAssetsRelations = relations(imageAssets, ({ one, many }) => ({
    uploader: one(user, {
        fields: [imageAssets.uploadedBy],
        references: [user.id],
    }),
    messageImages: many(messageImages),
}))

export const messageLikesRelations = relations(messageLikes, ({ one }) => ({
    message: one(messages, {
        fields: [messageLikes.messageId],
        references: [messages.id],
    }),
    user: one(user, {
        fields: [messageLikes.userId],
        references: [user.id],
    }),
}))

export const messageBookmarksRelations = relations(messageBookmarks, ({ one }) => ({
    message: one(messages, {
        fields: [messageBookmarks.messageId],
        references: [messages.id],
    }),
    user: one(user, {
        fields: [messageBookmarks.userId],
        references: [user.id],
    }),
}))

export const followsRelations = relations(follows, ({ one }) => ({
    follower: one(user, {
        fields: [follows.followerId],
        references: [user.id],
        relationName: 'following',
    }),
    following: one(user, {
        fields: [follows.followingId],
        references: [user.id],
        relationName: 'followers',
    }),
}))
