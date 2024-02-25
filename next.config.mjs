/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.gumyo.net'
            }
        ]
    }
}

export default nextConfig;