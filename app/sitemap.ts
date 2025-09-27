import { ResponseArticleList } from '@entities/article'
import dayjs from 'dayjs'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

const getArticles = async () =>
    await fetch(`${process.env.SITE_URL}/api/article?all=true&desc=true`, { cache: 'no-cache' }).then(
        (res) => res.json() as Promise<ResponseArticleList>,
    )

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const articles = await getArticles()
    return articles?.posts?.map((article) => {
        const imageMatches = [...Array.from(article.description?.matchAll(/https:\/\/img\.gumyo\.net\/\S+\.(jpg|jpeg|png|gif)/g) || [])]
        const images = imageMatches?.map((match) => match[0]) || []
        const sitemapObj = {
            url: `${process.env.SITE_URL}/article/${article.postId}`,
            lastModified: dayjs(article.createdAt).format('YYYY-MM-DD'),
            priority: 1,
            images,
        }
        return sitemapObj
    })
}

export default sitemap
