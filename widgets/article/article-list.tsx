import { Article } from '@entities/article'
import { Category } from '@entities/category'
import { ArticleCard } from '@features/article'

export const ArticleList = ({ articles, category }: { articles?: Article[]; category?: Category[] }) => {
    if (articles?.length === 0) return <section>No articles found</section>
    return (
        <section className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
            {articles?.filter((article) => article.isNotice).map((article) => ArticleCard({ article, category }))}
            {articles?.filter((article) => !article.isNotice).map((article) => ArticleCard({ article, category }))}
        </section>
    )
}
