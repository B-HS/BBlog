import { Category } from '@entities/category'
import { posts, tags } from 'drizzle/schema'

export type Article = typeof posts.$inferSelect
export type Tag = typeof tags.$inferSelect
export type ResponseArticleList = Promise<{ posts: Article[]; categories?: Category[] }>
