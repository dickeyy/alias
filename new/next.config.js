/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "api.qrserver.com"
      }
    ]
  }
}

module.exports = nextConfig
