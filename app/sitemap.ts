import dayjs from 'dayjs'
import { db } from 'drizzle'
import { desc } from 'drizzle-orm'
import { posts } from 'drizzle/schema'
import type { MetadataRoute } from 'next'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    // API server may closed while building nextjs map (Ofcousre, it could be opened)
    // Directly access to database with drizzle
    const articles = await db.select().from(posts).groupBy(posts.postId).orderBy(desc(posts.updatedAt))

    return articles?.map((article) => {
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
