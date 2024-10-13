/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    transpilePackages: ['shiki', 'next-mdx-remote', 'next-mdx-remote/serialize'],
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.gumyo.net',
            },
            {
                protocol: 'https',
                hostname: 'mi.gumyo.net',
            },
        ],
    },
}

export default nextConfig
