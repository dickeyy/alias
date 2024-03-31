/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.qrserver.com"
            }
        ]
    }
};

export default nextConfig;
