# Voices Ignited Website

A modern web application built with Next.js, featuring Bluesky integration and static site generation.

## 🚀 Deployment

This site is deployed to GitHub Pages at: https://nocomoz.github.io/viweb/

### GitHub Pages Setup

1. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

2. Environment Variables:
   ```env
   NEXT_PUBLIC_BASE_PATH=/viweb
   ```

## 🛠️ Development

1. Install dependencies:
   ```bash
   cd app
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 📦 Static Export

The site is configured for static export to enable GitHub Pages hosting:

1. Build and export:
   ```bash
   npm run deploy
   ```

2. The static site will be generated in the `out` directory

## 🔧 Tech Stack

- Next.js 14
- TypeScript
- SCSS
- Bluesky API Integration
- GitHub Actions for CI/CD

## 📝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details