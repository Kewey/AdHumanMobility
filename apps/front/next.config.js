module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `**.${process.env.NEXT_PUBLIC_DOMAIN}`,
      },
    ],
  },
}
