/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/v1/:path*",
                destination: `https://blog.hyns.dev/v1/:path*`,
            },
            {
                source: "/image/:path*",
                destination: `https://blog.hyns.dev/v1/image/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
