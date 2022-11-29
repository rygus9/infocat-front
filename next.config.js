/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          destination: 'http://localhost:8080/:path*',
          source: '/:path*',
        },
      ];
    }
  },
};

module.exports = nextConfig;
