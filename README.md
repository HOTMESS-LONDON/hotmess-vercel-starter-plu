# HOTMESS London Vercel Starter

Unified Next.js 14 + Vercel + TypeScript + TailwindCSS starter for HOTMESS London projects.

## 🛠️ Tech Stack

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

## 📁 Project Structure

```
├── app/                   # Next.js App Router pages
│   ├── (routes)/         # Page components
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── RadioPlayer.tsx   # Custom radio player
│   └── Schedule.tsx      # Schedule component
├── lib/                  # Utility functions
├── test/                 # Test files
├── data/                 # Static data files
└── public/               # Static assets
```

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

## 🖇️ Contributing

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
