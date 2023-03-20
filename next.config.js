/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.massivejohn.com', 'placeimg.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
