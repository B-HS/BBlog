import { getArticleByMenuName } from '@/api/article/post'
import { Article } from '@/components/article/articleContext'
import DOMPurify from 'isomorphic-dompurify'

export const generateMetadata = async ({ params: { docid } }: { params: { docid: string } }) => {
    const article = (await getArticleByMenuName('MAIN', true)) as Article
    const context = DOMPurify.sanitize(article.context || '').replace(/<\/?[^>]+(>|$)/g, '')

    return {
        title: 'Hyunseok Byun - BBlog',
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
        canonical: `https://gumyo.net/doc/${docid}`,
        authors: { name: 'Hyunoseok Byun', url: 'https://gumyo.net' },
        icons: { icon: '/favicon.ico' },
    }
}

const Home = async () => {
    const main = (await getArticleByMenuName('MAIN', true)) as Article
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(main.context || '') }} />
}

export default Home
