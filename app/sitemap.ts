import { ResponseArticleList } from '@entities/article'
import dayjs from 'dayjs'
import type { MetadataRoute } from 'next'

const getArticles = async () =>
    await fetch(`${process.env.SITE_URL}/api/article?all=true&desc=true`, { next: { revalidate: 60 * 60 } }).then(
        (res) => res.json() as ResponseArticleList,
    )

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const articles = await getArticles()
    return articles?.posts?.map((article) => {
        const imageMatches = [...Array.from(article.description.matchAll(/https:\/\/img\.gumyo\.net\/\S+\.(jpg|jpeg|png|gif)/g))]
        const images = imageMatches.map((match) => match[0]) || []
        const sitemapObj = {
            url: `${process.env.SITE_URL}/article/${article.postId}`,
            lastModified: dayjs(article.createdAt).format('YYYY-MM-DD'),
            priority: 1,
            // TODO : Check image sitemap when upgraded to nextjs 15
            // Perhaps ... nextjs 14 not support image sitemap
            // condiering update to nextjs 15
            images,
        }
        return sitemapObj
    })
}

export default sitemap
