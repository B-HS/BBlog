import { fetchAllArticles } from '@entities/article/article.webapi'
import { Github, Resume } from '@shared/icons'
import { ArticleList } from '@widgets/article'

export const dynamic = 'force-dynamic'

const Page = async () => {
    const { categories, posts } = await fetchAllArticles()

    return (
        <section className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-2 p-2'>
                <p className='font-bold text-2xl'>Informations</p>
                <section className='space-x-2'>
                    <Github variant='outline' />
                    <Resume variant='outline' />
                </section>
            </section>
            <section className='flex flex-col gap-2 p-2'>
                <p className='font-bold text-2xl'>Recent Articles</p>
                <ArticleList articles={posts} category={categories} />
            </section>
        </section>
    )
}

export default Page
