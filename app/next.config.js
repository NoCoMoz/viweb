/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/viweb',
  assetPrefix: '/viweb/',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
}

module.exports = nextConfig;
