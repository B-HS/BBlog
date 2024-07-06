/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports:[
            'shiki',
            'next-mdx-remote',
            'next-mdx-remote/serialize',
            'lucide-react'
        ]
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.gumyo.net',
            },
        ],
    },
}

export default nextConfig
