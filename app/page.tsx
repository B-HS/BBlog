import { Article, ResponseArticleList } from '@entities/article'
import { Category } from '@entities/category'
import { useCurrentPath } from '@shared/hooks/use-current-path'
import { Github, Misskey, Resume } from '@shared/icons'

const ArticleList = ({ articles, category }: { articles?: Article[]; category?: Category[] }) => {
    if (articles?.length === 0) return <section>No articles found</section>
    return (
        <section>
            {articles?.map((article) => (
                <section key={article.postId}>
                    <p>{article.title}</p>
                    <p>{category?.find((c) => c.categoryId === article.categoryId)?.category}</p>
                    <p>{article.updatedAt.toString()}</p>
                    <p>{article.isNotice ? 'Notice' : 'Article'}</p>
                </section>
            ))}
        </section>
    )
}

const Page = async () => {
    const { url } = useCurrentPath()
    const { posts, categories } = await fetch(`${url}/api/article`, {
        method: 'GET',
    }).then((res) => res.json() as ResponseArticleList)

    return (
        <section className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-2'>
                <p className='font-extrabold text-xl'>Informations</p>
                <section className='space-x-1'>
                    <Github variant='outline' />
                    <Resume variant='outline' />
                    <Misskey variant='outline' />
                </section>
            </section>

            <p className='font-extrabold text-xl'>Recent Articles</p>
            <ArticleList articles={posts} category={categories} />
        </section>
    )
}

export default Page
