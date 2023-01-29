/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/blogapi/:path*",
                destination: `http://blog.hyns.dev/:path*`,
            },
            {
                source: "/blog/blogapi/image/:path*",
                destination: `https://blog.hyns.dev/image/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
