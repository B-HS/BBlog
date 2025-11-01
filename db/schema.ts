import { boolean, datetime, int, mysqlTable, text, unique, varchar } from 'drizzle-orm/mysql-core'
import * as authSchema from './auth-schema'

export const { user, session, account, verification } = authSchema

export const posts = mysqlTable('posts', {
    postId: int('postId').autoincrement().primaryKey().notNull(),
    categoryId: int('categoryId')
        .notNull()
        .references(() => categories.categoryId),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    updatedAt: datetime('updated_at').default(new Date()).notNull(),
    createdAt: datetime('created_at').default(new Date()).notNull(),
    views: int('views').default(0).notNull(),
    isPublished: boolean('isPublished').default(false).notNull(),
    isHide: boolean('isHide').default(false).notNull(),
    isNotice: boolean('isNotice').default(false).notNull(),
    isComment: boolean('isComment').default(true).notNull(),
})

export const comments = mysqlTable('comments', {
    commentId: int('commentId').autoincrement().primaryKey().notNull(),
    postId: int('postId')
        .notNull()
        .references(() => posts.postId),
    userId: varchar('userId', { length: 36 })
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    comment: text('comment').notNull(),
    updatedAt: datetime('updated_at').default(new Date()).notNull(),
    createdAt: datetime('created_at').default(new Date()).notNull(),
    isHide: boolean('isHide').default(false).notNull(),
})

export const tags = mysqlTable('tags', {
    tagId: int('tagId').autoincrement().primaryKey().notNull(),
    tag: varchar('tag', { length: 255 }).notNull(),
})

export const categories = mysqlTable('categories', {
    categoryId: int('categoryId').autoincrement().primaryKey().notNull(),
    category: varchar('category', { length: 255 }).notNull(),
    isHide: boolean('isHide').default(false).notNull(),
})

export const postTags = mysqlTable(
    'post_tags',
    {
        postId: int('postId')
            .notNull()
            .references(() => posts.postId, { onDelete: 'cascade' }),
        tagId: int('tagId')
            .notNull()
            .references(() => tags.tagId, { onDelete: 'cascade' }),
    },
    (table) => [unique().on(table.postId, table.tagId)],
)

export const images = mysqlTable('images', {
    imageId: int('imageId').autoincrement().primaryKey().notNull(),
    userId: varchar('userId', { length: 36 })
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    fileName: varchar('fileName', { length: 255 }).notNull(),
    originalName: varchar('originalName', { length: 255 }).notNull(),
    url: text('url').notNull(),
    mimeType: varchar('mimeType', { length: 100 }).notNull(),
    fileSize: int('fileSize').notNull(),
    width: int('width').notNull(),
    height: int('height').notNull(),
    createdAt: datetime('created_at').default(new Date()).notNull(),
    updatedAt: datetime('updated_at').default(new Date()).notNull(),
})

export const imageAssets = mysqlTable('image_assets', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    r2Key: varchar('r2_key', { length: 255 }).notNull().unique(),
    bucket: varchar('bucket', { length: 100 }).notNull(),
    mimeType: varchar('mime_type', { length: 100 }).notNull(),
    sizeBytes: int('size_bytes').notNull(),
    width: int('width'),
    height: int('height'),
    checksum: varchar('checksum', { length: 64 }),
    uploadedBy: varchar('uploaded_by', { length: 36 }).references(() => user.id, { onDelete: 'set null' }),
    createdAt: datetime('created_at').default(new Date()).notNull(),
    updatedAt: datetime('updated_at').default(new Date()).notNull(),
})

export const messages = mysqlTable('messages', {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    userId: varchar('userId', { length: 36 })
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    body: text('body').notNull(),
    replyToId: varchar('replyToId', { length: 36 }),
    retweetOfId: varchar('retweetOfId', { length: 36 }),
    createdAt: datetime('created_at').default(new Date()).notNull(),
    updatedAt: datetime('updated_at').default(new Date()).notNull(),
    deletedAt: datetime('deleted_at'),
})

export const messageImages = mysqlTable(
    'message_images',
    {
        messageId: varchar('messageId', { length: 36 })
            .notNull()
            .references(() => messages.id, { onDelete: 'cascade' }),
        imageId: varchar('imageId', { length: 36 })
            .notNull()
            .references(() => imageAssets.id, { onDelete: 'cascade' }),
        order: int('order'),
        createdAt: datetime('created_at').default(new Date()).notNull(),
    },
    (table) => [unique().on(table.messageId, table.imageId)],
)

export const messageLikes = mysqlTable(
    'message_likes',
    {
        messageId: varchar('messageId', { length: 36 })
            .notNull()
            .references(() => messages.id, { onDelete: 'cascade' }),
        userId: varchar('userId', { length: 36 })
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        createdAt: datetime('created_at').default(new Date()).notNull(),
    },
    (table) => [unique().on(table.messageId, table.userId)],
)

export const messageBookmarks = mysqlTable(
    'message_bookmarks',
    {
        messageId: varchar('messageId', { length: 36 })
            .notNull()
            .references(() => messages.id, { onDelete: 'cascade' }),
        userId: varchar('userId', { length: 36 })
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        createdAt: datetime('created_at').default(new Date()).notNull(),
    },
    (table) => [unique().on(table.messageId, table.userId)],
)

export const follows = mysqlTable(
    'follows',
    {
        followerId: varchar('followerId', { length: 36 })
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        followingId: varchar('followingId', { length: 36 })
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        createdAt: datetime('created_at').default(new Date()).notNull(),
    },
    (table) => [unique().on(table.followerId, table.followingId)],
)
