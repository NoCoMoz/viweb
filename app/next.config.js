/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/viweb' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/viweb/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
}

module.exports = nextConfig;
