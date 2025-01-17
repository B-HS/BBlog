import { ResponseArticleList } from '@entities/article'
import { currentPath } from '@shared/lib/current-path'
import { Github, Resume } from '@shared/icons'
import { ArticleList } from '@widgets/article'
import { headers } from 'next/headers'

const Page = async () => {
    const { url } = currentPath()
    const { posts, categories } = await fetch(`${url}/api/article`, {
        method: 'GET',
        headers: new Headers(await headers()),
    }).then((res) => res.json() as ResponseArticleList)

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
