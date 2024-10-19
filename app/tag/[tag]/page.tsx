import { ResponseArticleList } from '@entities/article'
import { ArticleList } from '@widgets/article'

const TagSearchPage = async ({ params }: { params: { tag: number | string } }) => {
    const articlesData = await fetch(`${process.env.SITE_URL}/api/tag/${params.tag}`).then((res) => res.json() as ResponseArticleList)
    return (
        <section className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-3 p-2'>
                <p className='font-bold text-xl'>
                    Search result for{' '}
                    <span className='underline underline-offset-8 text-2xl'>{decodeURIComponent((params.tag + '').replace(/\+/g, '%20'))}</span> tag
                </p>
                <ArticleList articles={articlesData?.posts} category={articlesData.categories} />
            </section>
        </section>
    )
}

export default TagSearchPage
