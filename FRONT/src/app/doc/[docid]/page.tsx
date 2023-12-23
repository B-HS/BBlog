import { getArticleByMenuName } from '@/api/article/post'
import { Article } from '@/components/article/articleContext'
import DOMPurify from 'isomorphic-dompurify'

export const generateMetadata = async ({ params: { docid } }: { params: { docid: string } }) => {
    const article = (await getArticleByMenuName(docid, true)) || {}
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
        canonical: `https://hyns.dev/doc/${docid}`,
        authors: { name: 'Hyunoseok Byun', url: 'https://hyns.dev' },
        icons: { icon: '/favicon.ico' },
    }
}

const Document = async ({ params: { docid } }: { params: { docid: string } }) => {
    const main = (await getArticleByMenuName(docid, true)) as Article
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(main.context || '') }} />
}

export default Document
