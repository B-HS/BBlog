/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/blogapi/:path*",
                destination: `http://localhost:10500/blogapi/:path*`,
            },
        ];
    },
};
  
module.exports = nextConfig