import { MetadataRoute } from 'next'

export default () => {
    const siteUrl = process.env.SITE_URL || 'https://blog.gumyo.net'
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    } satisfies MetadataRoute.Robots
}