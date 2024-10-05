import { relations } from 'drizzle-orm/relations'
import { categories, comments, posts, postTags, tags } from './schema'

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.postId],
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
