import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://blog.gumyo.net/sitemap.xml',
    }
}

export default robots
