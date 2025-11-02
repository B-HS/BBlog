import { MetadataRoute } from 'next'

export default () => {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${process.env.SITE_URL}/sitemap.xml`,
    } satisfies MetadataRoute.Robots
}
