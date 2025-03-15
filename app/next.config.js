/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/viweb',
  assetPrefix: '/viweb/',
  trailingSlash: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
}

module.exports = nextConfig;
