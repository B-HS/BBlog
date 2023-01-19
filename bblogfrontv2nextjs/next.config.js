/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/blogapi/:path*",
                destination: `http://localhost:10500/blogapi/:path*`,
            },
            {
                source: "/blog/blogapi/image/:path*",
                destination: `http://localhost:10500/blogapi/image/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
