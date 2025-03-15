/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
