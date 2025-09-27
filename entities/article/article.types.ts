import { Category } from '@entities/category'
import { CommentProps } from '@entities/comment'
import { Pagination } from '@entities/common'
import { posts, tags } from 'drizzle/schema'

export type Article = typeof posts.$inferSelect
export type ArticleDetail = {
    post: Article
    tags: string[] | string
    category: string
    categoryId?: number
    comments: CommentProps[]
}
export type Tag = typeof tags.$inferSelect
export type ResponseArticleList = { posts: Article[]; categories?: Category[]; tags?: string[]; pagination?: Pagination }
