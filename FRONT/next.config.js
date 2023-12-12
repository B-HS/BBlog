/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.gumyo.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig