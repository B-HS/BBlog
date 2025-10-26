import { relations } from 'drizzle-orm/relations'
import { categories, comments, images, posts, postTags, tags, user } from './schema'

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
}))
