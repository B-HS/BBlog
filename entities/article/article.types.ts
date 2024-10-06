import { Category } from '@entities/category'
import { CommentProps } from '@entities/comment'
import { posts, tags } from 'drizzle/schema'

export type Article = typeof posts.$inferSelect
export type ArticleDetail = {
    post: Article
    tags: string[]
    category: string
    comments: CommentProps[]
}
export type Tag = typeof tags.$inferSelect
export type ResponseArticleList = Promise<{ posts: Article[]; categories?: Category[]; tags?: string[] }>
