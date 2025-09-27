import { fetchArticlesByTag } from '@entities/article/article.webapi'
import { ArticleList } from '@widgets/article'

const TagSearchPage = async (props: { params: Promise<{ tag: number | string }> }) => {
    const params = await props.params
    const articlesData = await fetchArticlesByTag(String(params.tag))

    return (
        <div className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-3 p-2'>
                <h1 className='font-bold text-xl'>
                    Search result for{' '}
                    <span className='underline underline-offset-8 text-2xl'>{decodeURIComponent((params.tag + '').replace(/\+/g, '%20'))}</span> tag
                </h1>
                <ArticleList articles={articlesData?.posts} category={articlesData.categories} />
            </section>
        </div>
    )
}

export default TagSearchPage
