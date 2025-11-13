import { MetadataRoute } from 'next'
import { getAllPosts } from '@entities/post'

export default async () => {
    const posts = await getAllPosts()
    const siteUrl = process.env.SITE_URL || 'https://blog.gumyo.net'
    
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${siteUrl}/article/${post.postId}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
        images: [`${siteUrl}/api/thumbnail/${post.postId}`],
    }))

    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...postEntries,
    ]
}