/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          destination: 'http://localhost:8080/api/v1/:path*',
          source: '/api/v1/:path*',
        },
      ];
    } else {
      return [];
    }
  },
};

module.exports = nextConfig;
