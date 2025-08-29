# Contributing to HOTMESS London

Thank you for your interest in contributing to HOTMESS London! This guide will help you get started and ensure your contributions align with our project standards.

## 🤝 How to Contribute

### Getting Started

1. **Fork the repository** and clone it locally
2. **Set up your development environment** following the [README](README.md) setup instructions
3. **Create a feature branch** from `main` for your changes
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description

### Development Workflow

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Run tests during development
pnpm test

# 4. Before committing, run full checks
pnpm lint
pnpm typecheck
pnpm test:ci
pnpm build
```

## 📋 Contribution Guidelines

### Code Style

- **TypeScript**: All new code should be written in TypeScript
- **ESLint & Prettier**: Follow the configured linting and formatting rules
- **Naming Conventions**: Use descriptive names for variables, functions, and components
- **File Structure**: Follow the existing directory structure and naming patterns

### Component Development

- **React Components**: Use functional components with TypeScript
- **Styling**: Use TailwindCSS classes following the existing design system
- **Accessibility**: Ensure WCAG compliance with proper ARIA labels and semantic HTML
- **Testing**: Add tests for new components using Vitest and React Testing Library

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new radio feature"
git commit -m "fix: resolve audio player bug"
git commit -m "docs: update setup instructions"
```

**Commit Types:**

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring without functional changes
- `test:` Test additions/updates
- `chore:` Maintenance tasks (dependencies, build tools, etc.)

### Pull Request Process

1. **Update documentation** if your changes affect setup, usage, or architecture
2. **Add or update tests** for any new functionality
3. **Ensure all checks pass** (linting, type checking, tests, build)
4. **Write descriptive PR title and description** following our template
5. **Link related issues** using keywords like "Closes #123"

### Branch Naming

Use descriptive branch names that reflect the type of work:

```bash
feature/radio-player-improvements
fix/audio-streaming-issue
docs/update-setup-guide
chore/update-dependencies
```

## 🧪 Testing Guidelines

### Test Coverage

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions and API endpoints
- **Accessibility Tests**: Verify WCAG compliance
- **Error Handling**: Test error states and edge cases

### Writing Tests

```typescript
// Example component test
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    // Test user interactions
  })
})
```

## 🎨 Design System

### TailwindCSS Usage

- **Consistency**: Use existing design tokens and utilities
- **Responsive**: Follow mobile-first responsive design patterns
- **Accessibility**: Maintain proper color contrast and focus states
- **Components**: Leverage shadcn/ui components where appropriate

### Color Scheme

Follow the custom CSS variables defined in the project for theming consistency.

## 🔧 Development Environment

### Required Tools

- **Node.js**: Version 20 or higher
- **pnpm**: Package manager (version 9.0.0)
- **Git**: Version control

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_RADIOKING_STREAM_URL=https://your-stream-url.example/stream
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Project Structure

```
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
├── lib/                # Utility functions and configurations
├── data/               # Static data files
├── test/               # Test files
├── public/             # Static assets
└── README.md           # Project documentation
```

## 📝 Documentation

### Code Documentation

- **JSDoc**: Add JSDoc comments for complex functions and components
- **README Updates**: Update README.md for significant changes
- **Inline Comments**: Add comments for complex logic or business rules

### Component Documentation

```typescript
/**
 * RadioPlayer component for streaming HOTMESS radio
 * @param streamUrl - The URL of the radio stream
 * @param title - Optional title for the player (defaults to "HOTMESS Radio")
 */
interface RadioPlayerProps {
  streamUrl: string
  title?: string
}
```

## 🆘 Getting Help

- **Issues**: Check existing [GitHub Issues](https://github.com/HOTMESS-LONDON/hotmess-vercel-starter-plu/issues)
- **Discussions**: Use [GitHub Discussions](https://github.com/HOTMESS-LONDON/hotmess-vercel-starter-plu/discussions)
- **Community**: Join our Telegram rooms (see `/rooms` page)

## 🛡️ Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

**Thank you for contributing to HOTMESS London! 🎉**
