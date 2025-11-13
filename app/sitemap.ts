import { MetadataRoute } from 'next'
import { getAllPosts } from '@entities/post'

export default async () => {
    const posts = await getAllPosts()

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${process.env.SITE_URL}/article/${post.postId}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
        images: [`${process.env.SITE_URL}/api/thumbnail/${post.postId}`],
    }))

    return [
        {
            url: process.env.SITE_URL || 'https://gumyo.net',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...postEntries,
    ]
}