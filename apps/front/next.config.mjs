/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.adhumanmobility.com",
        port: "",
      },
    ],
  },
}

export default nextConfig
