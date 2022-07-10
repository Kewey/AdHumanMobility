/** @type {import('next').NextConfig} */
module.exports = () => ({
  reactStrictMode: false,
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN],
  },
})
