/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites() {
        return [
            {
                source: "/v1/:path*",
                destination: `http://localhost:10500/v1/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
