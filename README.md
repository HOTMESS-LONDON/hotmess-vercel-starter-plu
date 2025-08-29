# HOTMESS London

**HOTMESS London** — unified site for radio, drops, hand-in-hand, affiliate, and rooms. London's filth frequency.

A modern Next.js application built with TypeScript, TailwindCSS, and shadcn/ui components.

## ✨ Features

- 🎵 **24/7 Radio Streaming** with custom RadioPlayer component
- 📱 **Responsive Design** optimized for all devices
- 🎨 **Modern UI** with TailwindCSS and shadcn/ui
- ♿ **Accessibility First** with proper ARIA labels and semantic HTML
- 🧪 **Full Test Coverage** with Vitest and React Testing Library
- 🔒 **Type Safety** with TypeScript strict mode
- 🎯 **SEO Optimized** with proper meta tags and OpenGraph
- 🚀 **Production Ready** with CI/CD pipelines

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Framer Motion
- **UI Components**: shadcn/ui + Lucide React
- **Package Manager**: pnpm
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **Hooks**: Husky + lint-staged + commitlint
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/HOTMESS-LONDON/hotmess-vercel-starter-plu.git
cd hotmess-vercel-starter-plu

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                   # Next.js App Router pages
│   ├── (routes)/         # Page components
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── RadioPlayer.tsx  # Custom radio player
│   └── Schedule.tsx     # Schedule component
├── lib/                 # Utility functions
├── test/               # Test files
├── data/               # Static data files
└── public/             # Static assets
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required: RadioKing stream URL
NEXT_PUBLIC_RADIOKING_STREAM_URL=https://your-stream-url.example/stream

# Optional: Site URL for metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📜 Available Scripts

| Script           | Description               |
| ---------------- | ------------------------- |
| `pnpm dev`       | Start development server  |
| `pnpm build`     | Build for production      |
| `pnpm start`     | Start production server   |
| `pnpm lint`      | Run ESLint                |
| `pnpm format`    | Format code with Prettier |
| `pnpm typecheck` | Check TypeScript types    |
| `pnpm test`      | Run tests in watch mode   |
| `pnpm test:ci`   | Run tests with coverage   |

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run tests in watch mode
pnpm test

# Run tests with coverage
pnpm test:ci

# Run specific test file
pnpm test RadioPlayer.test.tsx
```

Tests cover:

- Component functionality and accessibility
- API endpoints
- User interactions
- Error handling

## 🎨 Design System

The app uses a custom design system built on TailwindCSS:

- **Colors**: Custom CSS variables for theming
- **Typography**: System fonts with careful hierarchy
- **Components**: shadcn/ui for consistent UI elements
- **Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG compliant color contrast and focus states

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables for Production

Ensure these variables are set in your deployment environment:

- `NEXT_PUBLIC_RADIOKING_STREAM_URL` - Your radio stream URL
- `NEXT_PUBLIC_SITE_URL` - Your production domain

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflows:

- **Continuous Integration**: Runs on PRs and pushes to main
  - Linting with ESLint
  - Type checking with TypeScript
  - Testing with Vitest
  - Building the application
- **Automatic Deployment**: Via Vercel integration

## 🤝 Contributing

We follow conventional commits and have pre-commit hooks set up:

```bash
# Stage your changes
git add .

# Commit with conventional commit format
git commit -m "feat: add new radio feature"

# Push to your branch
git push origin feature/your-feature
```

### Commit Types

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/updates
- `chore:` Maintenance tasks

## 📚 Pages & Features

### Core Pages

- **Home** (`/`) - Hero section with grid teasers
- **Radio** (`/radio`) - Live streaming with schedule
- **Drops** (`/drop`) - Merchandise and product releases
- **Hand-in-Hand** (`/hand-in-hand`) - Sunday show information
- **Affiliate** (`/affiliate`) - Partnership program details
- **Rooms** (`/rooms`) - Community Telegram spaces

### Components

- **RadioPlayer** - Custom audio player with volume control
- **Schedule** - Weekly show schedule with segments
- **Cards** - Reusable content cards
- **Buttons** - Accessible button components

## 🔧 Troubleshooting

### Common Issues

**Build fails with module resolution errors:**

```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

**Tests fail with environment errors:**

```bash
# Ensure test environment variables are set
cp .env.example .env.test
```

**Linting errors:**

```bash
# Auto-fix linting issues
pnpm lint --fix
pnpm format
```

### Radio Player Issues

- Ensure `NEXT_PUBLIC_RADIOKING_STREAM_URL` is set
- Check that the stream URL is accessible
- Verify CORS headers allow your domain

## 🛡 Security

- Content Security Policy headers configured
- XSS protection enabled
- Secure cookie settings
- Environment variables properly scoped

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/HOTMESS-LONDON/hotmess-vercel-starter-plu/issues)
- **Discussions**: [GitHub Discussions](https://github.com/HOTMESS-LONDON/hotmess-vercel-starter-plu/discussions)
- **Community**: Join our Telegram rooms (see `/rooms` page)

## 📚 Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines and standards
- **[Architecture Guide](ARCHITECTURE.md)** - Project structure and technical decisions
- **[GitHub Copilot Guide](.github/COPILOT.md)** - Best practices for using Copilot with this codebase

## 🎯 Next Steps

- [ ] Connect live RadioKing "now playing" endpoint
- [ ] Add sitemap generation
- [ ] Implement E2E testing with Playwright
- [ ] Add analytics integration
- [ ] Set up content management system
- [ ] Add push notifications for live shows
- [ ] Implement user authentication for rooms
- [ ] Add RSS feed for schedule

---

**Built with ❤️ by the HOTMESS London team**
