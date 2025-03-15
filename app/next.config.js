/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/viweb',
  assetPrefix: '/viweb/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig;
