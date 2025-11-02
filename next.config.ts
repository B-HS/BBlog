import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#streaming-metadata
    // 굳이 streaming metadata 사용하지 않아도 됨, 어차피 사이트가 그리 크지 않고 캐싱될거임
    htmlLimitedBots: /.*/,
    cacheComponents: true,
    reactCompiler: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.gumyo.net',
            },
        ],
    },
}

export default nextConfig
