import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
    async rewrites() {
        return [
            {
                source: '/api/auth/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
            },
        ]
    },
}

export default nextConfig
