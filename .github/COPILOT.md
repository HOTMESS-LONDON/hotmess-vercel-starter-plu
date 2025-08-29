# GitHub Copilot Guidelines

This document provides specific guidance for using GitHub Copilot effectively with the HOTMESS London codebase.

## 🤖 Copilot Best Practices

### Code Context

When working with this codebase, ensure Copilot has access to:

1. **Component Structure**: Open related component files to provide context
2. **Type Definitions**: Keep TypeScript interfaces and types visible
3. **Testing Patterns**: Reference existing test files for consistent patterns
4. **Styling Conventions**: Have TailwindCSS utility patterns in view

### Effective Prompts

#### Component Creation

```typescript
// Create a new accessible button component with variants
// Should use shadcn/ui patterns and support size/variant props
// Include proper TypeScript interfaces and forward refs
```

#### Testing

```typescript
// Write comprehensive Vitest tests for RadioPlayer component
// Include accessibility testing and user interaction scenarios
// Mock audio API and test error states
```

#### API Development

```typescript
// Create Next.js API route for schedule data
// Include proper error handling and TypeScript types
// Follow RESTful conventions and return JSON
```

### Project-Specific Patterns

#### Component Development

- **Use functional components** with TypeScript
- **Implement proper props interfaces** with JSDoc comments
- **Follow accessibility patterns** with ARIA labels
- **Use TailwindCSS** for styling with responsive modifiers

#### Testing Conventions

- **Test file naming**: `ComponentName.test.tsx`
- **Test structure**: Describe blocks for component sections
- **Accessibility testing**: Include screen reader and keyboard tests
- **User interaction testing**: Use React Testing Library patterns

#### Styling Guidelines

- **Mobile-first responsive design**
- **Use design tokens** from CSS variables
- **Consistent spacing** with Tailwind scale
- **Accessible color contrast** following WCAG guidelines

## 🎯 Context-Aware Development

### File Organization

When asking Copilot to create files, specify the location:

```typescript
// Create in components/ui/ for reusable UI components
// Create in components/features/ for feature-specific components
// Create in app/ for page components using App Router
// Create in lib/ for utility functions and helpers
```

### Import Patterns

Standard import structure for this project:

```typescript
// 1. React and Next.js imports
import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

// 2. Third-party libraries
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 3. Internal components and utilities
import RadioPlayer from '@/components/RadioPlayer'
import { cn } from '@/lib/utils'

// 4. Types and interfaces
import type { ComponentProps } from '@/lib/types'
```

### Code Style Preferences

#### TypeScript

```typescript
// Prefer interfaces over types for object shapes
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

// Use proper generics for reusable components
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}
```

#### React Components

```typescript
// Use forwardRef for components that need DOM access
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
```

## 🧪 Testing Guidance

### Component Tests

Standard test structure:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Component from './Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    render(<Component />)
    fireEvent.click(screen.getByRole('button'))
    // Assert expected behavior
  })

  it('meets accessibility requirements', () => {
    render(<Component />)
    // Test ARIA labels, keyboard navigation, etc.
  })
})
```

### API Tests

For API route testing:

```typescript
import { describe, it, expect } from 'vitest'
import { GET } from './route'

describe('/api/endpoint', () => {
  it('returns expected data structure', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('success', true)
  })
})
```

## 🎨 Styling with Copilot

### TailwindCSS Patterns

Common utility combinations used in this project:

```typescript
// Responsive layout
'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'

// Button styling
'bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md'

// Card styling
'bg-card text-card-foreground rounded-lg border p-6 shadow-sm'

// Typography
'text-3xl md:text-4xl font-bold tracking-tight'
```

### Responsive Design

Always include responsive modifiers:

```typescript
// Mobile-first approach
'text-sm md:text-base lg:text-lg'
'p-4 md:p-6 lg:p-8'
'space-y-4 md:space-y-6'
```

## 🔧 Development Workflow

### Local Development

When starting work, run:

```bash
# Install dependencies
pnpm install

# Start development server with hot reload
pnpm dev

# Run tests in watch mode
pnpm test

# Type check in watch mode
pnpm typecheck --watch
```

### Pre-Commit Checks

Before committing, ensure:

```bash
# Lint and fix issues
pnpm lint --fix

# Format code
pnpm format

# Run all tests
pnpm test:ci

# Build successfully
pnpm build
```

## 📚 Learning Resources

### Project-Specific

- **Component Library**: Explore `components/ui/` for patterns
- **Existing Tests**: Reference `test/` directory for testing conventions
- **Data Structures**: Check `data/` for expected data formats
- **API Patterns**: Review `app/api/` for endpoint structures

### External Documentation

- **Next.js App Router**: [Next.js Documentation](https://nextjs.org/docs)
- **TailwindCSS**: [Tailwind Documentation](https://tailwindcss.com/docs)
- **shadcn/ui**: [shadcn/ui Documentation](https://ui.shadcn.com)
- **Vitest**: [Vitest Documentation](https://vitest.dev)

## 💡 Copilot Tips

### Maximizing Effectiveness

1. **Open Related Files**: Keep relevant components, tests, and types open
2. **Use Descriptive Comments**: Write detailed comments about intended functionality
3. **Follow Existing Patterns**: Reference similar components in the codebase
4. **Iterate and Refine**: Use Copilot suggestions as a starting point, then refine

### Common Prompts

#### Creating Components

```typescript
// Create a responsive navigation component for HOTMESS
// Include mobile menu, accessibility features, and active state
// Use existing Button and Link components
```

#### Writing Tests

```typescript
// Test the RadioPlayer component thoroughly
// Include play/pause functionality, volume control, and error states
// Mock the audio API and test accessibility features
```

#### API Development

```typescript
// Create API endpoint for fetching show schedule
// Include proper error handling and caching headers
// Return TypeScript-safe response format
```

## 🚀 Advanced Patterns

### Custom Hooks

```typescript
// Create custom hook for audio player state management
// Include play, pause, volume control, and loading states
// Handle browser compatibility and error scenarios
```

### Context Providers

```typescript
// Create React context for global app state
// Include theme, user preferences, and audio settings
// Provide TypeScript types and default values
```

### Server Components

```typescript
// Create Next.js server component for schedule display
// Fetch data at build time and handle streaming
// Include proper error boundaries and loading states
```

---

**Remember**: Copilot is a powerful assistant, but always review and test generated code to ensure it meets our quality standards and accessibility requirements.
