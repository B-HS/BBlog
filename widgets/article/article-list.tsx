import { Article } from '@entities/article'
import { Category } from '@entities/category'
import { ArticleCard } from '@features/article'

export const ArticleList = ({ articles, category }: { articles?: Article[]; category?: Category[] }) => {
    if (articles?.length === 0) return <p>No articles found</p>
    return (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
            {articles
                ?.filter((article) => article.isNotice)
                .map((article) => <ArticleCard key={article.postId} article={article} category={category} />)}
            {articles
                ?.filter((article) => !article.isNotice)
                .map((article) => <ArticleCard key={article.postId} article={article} category={category} />)}
        </div>
    )
}
