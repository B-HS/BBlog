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
}

export default nextConfig
