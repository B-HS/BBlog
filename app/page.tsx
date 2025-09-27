import { fetchAllArticles } from '@entities/article/article.webapi'
import { Github, Resume } from '@shared/icons'
import { ArticleList } from '@widgets/article'

const Page = async () => {
    const { categories, posts } = await fetchAllArticles()

    return (
        <div className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-2 p-2'>
                <h2 className='font-bold text-2xl'>Informations</h2>
                <div className='space-x-2'>
                    <Github variant='outline' />
                    <Resume variant='outline' />
                </div>
            </section>
            <section className='flex flex-col gap-2 p-2'>
                <h2 className='font-bold text-2xl'>Recent Articles</h2>
                <ArticleList articles={posts} category={categories} />
            </section>
        </div>
    )
}

export default Page
