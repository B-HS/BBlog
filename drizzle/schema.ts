import { boolean, datetime, int, longtext, mysqlTable, text, unique, varchar } from 'drizzle-orm/mysql-core'

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
    isHide: boolean('isHide').default(false).notNull(),
    isNotice: boolean('isNotice').default(false).notNull(),
    isComment: boolean('isComment').default(true).notNull(),
})

export const comments = mysqlTable('comments', {
    commentId: int('commentId').autoincrement().primaryKey().notNull(),
    postId: int('postId')
        .notNull()
        .references(() => posts.postId),
    nickname: varchar('nickname', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
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

export const visitors = mysqlTable('visitors', {
    visitorId: int('visitorId').autoincrement().primaryKey().notNull(),
    ip: varchar('ip', { length: 255 }).notNull(),
    path: varchar('path', { length: 255 }).notNull(),
    createdAt: datetime('created_at').default(new Date()).notNull(),
})

export const images = mysqlTable('images', {
    imageId: varchar('imageId', { length: 36 }).primaryKey().notNull(),
    extension: varchar('extension', { length: 255 }).notNull(),
    orgName: varchar('orgName', { length: 255 }).notNull(),
    createdAt: datetime('created_at').default(new Date()).notNull(),
})

export const temporalPost = mysqlTable('temporalPost', {
    postId: int('postId').autoincrement().primaryKey(),
    title: longtext('title'),
    description: longtext('description'),
    categoryId: int('categoryId'),
    tags: longtext('tags'),
    createdAt: datetime('created_at').default(new Date()).notNull(),
    updatedAt: datetime('updated_at').default(new Date()).notNull(),
})


