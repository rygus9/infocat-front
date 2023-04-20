/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return {
      beforeFiles: [{
        source: "/api/v1/:path*",
        destination: "http://api.infocat.link/api/v1/:path*"
      }]
    }
  }
};

module.exports = nextConfig;
