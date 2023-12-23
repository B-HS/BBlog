import { getPostById } from '@/api/article/post'
import ArticleContext from '@/components/article/articleContext'
import CommentList from '@/components/article/commentList'
import Flex from '@/components/flex'
import { Separator } from '@/components/ui/separator'
import DOMPurify from 'isomorphic-dompurify'

export const generateMetadata = async ({ params: { aid, category } }: { params: { aid: string; category: string } }) => {
    const article = (await getPostById(aid, true)) || {}
    const context = DOMPurify.sanitize(article.context || '').replace(/<\/?[^>]+(>|$)/g, '')

    return {
        title: article.title || 'Article | BBlog',
        description: context || 'Article | BBlog',
        keywords: article.tags?.join(', ') || 'Article | BBlog',
        openGraph: {
            title: article.title || 'Article | BBlog',
            description: context || 'Article | BBlog',
            images: article.thumbnail ? [`https://img.gumyo.net/${article.thumbnail}`] : undefined,
        },
        twitter: {
            title: article.title || 'Article | BBlog',
            description: context || 'Article | BBlog',
        },
        robots: {
            index: true,
            follow: true,
        },
        canonical: `https://gumyo.net/${category}/${aid}`,
        authors: { name: 'Hyunoseok Byun', url: 'https://gumyo.net' },
        icons: { icon: '/favicon.ico' },
    }
}

const Article = async ({ params: { aid, category } }: { params: { aid: string; category: string } }) => {
    const article = (await getPostById(aid, true)) || {}
    return (
        <Flex className='flex-col flex-wrap justify-start w-full'>
            <ArticleContext data={article} category={category} />
            <Separator className='my-5' />
            <CommentList />
        </Flex>
    )
}
export default Article
