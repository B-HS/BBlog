/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: `https://blog.hyns.dev/:path*`,
            },
            {
                source: "/blog/image/:path*",
                destination: `https://blog.hyns.dev/image/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
