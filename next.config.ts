import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    turbopack: {
        root: __dirname,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.gumyo.net',
            },
        ],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
}

export default nextConfig
