# Architecture Documentation

This document provides an overview of the HOTMESS London project architecture, design decisions, and development patterns.

## 🏗️ Project Overview

HOTMESS London is a Next.js-based web application serving as a unified platform for:

- **Radio streaming** with live audio player
- **Community engagement** through Telegram rooms
- **Content distribution** via drops and merchandise
- **Show information** and scheduling

## 🏛️ Architecture Principles

### Core Values

- **Performance First**: Optimized for fast loading and smooth user experience
- **Accessibility**: WCAG-compliant design for inclusive access
- **Mobile Responsive**: Mobile-first approach for all devices
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive test coverage for reliability

### Design Patterns

- **Component-Based Architecture**: Reusable, composable React components
- **Static Generation**: Pre-rendered pages for optimal performance
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Atomic Design**: Consistent design system with reusable primitives

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (routes)/          # Page components
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility functions
│   ├── utils.ts          # Common utilities
│   └── types.ts          # TypeScript definitions
├── data/                 # Static data
│   └── schedule.json     # Show schedule data
├── test/                 # Test files
│   ├── components/       # Component tests
│   └── pages/           # Page tests
├── public/              # Static assets
└── README.md           # Documentation
```

## 🏗️ Technical Stack

### Frontend Framework

- **Next.js 14**: React framework with App Router
- **React 18**: Component library with modern features
- **TypeScript**: Type-safe development

### Styling & UI

- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Pre-commit linting
- **Commitlint**: Conventional commit enforcement

### Testing

- **Vitest**: Test runner
- **React Testing Library**: Component testing
- **JSDOM**: DOM simulation for tests

### Build & Deployment

- **Vercel**: Hosting and deployment
- **GitHub Actions**: CI/CD pipeline
- **pnpm**: Package management

## 🔧 Key Components

### RadioPlayer Component

```typescript
interface RadioPlayerProps {
  streamUrl: string
  title?: string
}
```

- **Purpose**: Stream HOTMESS radio with volume controls
- **Features**: Play/pause, volume control, loading states
- **Dependencies**: Native HTML5 audio API

### Schedule Component

- **Purpose**: Display weekly show schedule
- **Data Source**: Static JSON file (`data/schedule.json`)
- **Features**: Time-based display, show details

### Card Components

- **Purpose**: Consistent content presentation
- **Variants**: Default, featured, interactive
- **Features**: Responsive design, accessibility

## 🎨 Design System

### Color Palette

```css
:root {
  --background: /* Primary background */ --foreground: /* Primary text */
    --primary: /* Brand primary */ --secondary: /* Brand secondary */ --muted: /* Muted content */
    --accent: /* Accent colors */;
}
```

### Typography Scale

- **Headers**: font-bold with responsive sizing
- **Body**: Default text with proper line height
- **Captions**: text-sm for secondary information

### Spacing System

- Follows TailwindCSS spacing scale (0.25rem increments)
- Consistent margins and padding across components

## 🔄 Data Flow

### Static Data

- **Schedule**: Loaded from JSON at build time
- **Content**: Markdown-based content compilation
- **Assets**: Optimized static asset serving

### Client State

- **Audio Player**: Local component state for playback
- **UI State**: React state for interactive elements
- **Form State**: Controlled components for user input

### API Routes

- **Health Check**: `/api/health` - Server status
- **Schedule**: `/api/schedule` - Dynamic schedule data

## 🔐 Security Considerations

### Content Security Policy

- Configured headers for XSS protection
- Trusted domains for external resources
- Inline script restrictions

### Environment Variables

- Client-side variables prefixed with `NEXT_PUBLIC_`
- Server-side variables kept private
- Development vs production configurations

## 📱 Responsive Design

### Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Mobile-First Approach

- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactive elements

## ♿ Accessibility Features

### WCAG Compliance

- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support

### Keyboard Navigation

- Tab order follows logical flow
- All interactive elements keyboard accessible
- Escape key handling for modals/dropdowns

## 🧪 Testing Strategy

### Unit Tests

- Component rendering and props
- Utility function behavior
- Error handling scenarios

### Integration Tests

- Component interactions
- API endpoint responses
- User workflow testing

### Accessibility Tests

- Screen reader compatibility
- Keyboard navigation
- Color contrast validation

## 🚀 Performance Optimizations

### Core Web Vitals

- **LCP**: Image optimization and lazy loading
- **FID**: Minimal JavaScript bundles
- **CLS**: Reserved space for dynamic content

### Build Optimizations

- Static generation for marketing pages
- Code splitting by route
- Asset optimization and compression

## 🔄 Development Workflow

### Local Development

1. `pnpm install` - Install dependencies
2. `pnpm dev` - Start development server
3. `pnpm test` - Run tests in watch mode
4. `pnpm lint` - Check code quality

### Pre-Commit Hooks

1. ESLint checks and auto-fixes
2. Prettier formatting
3. TypeScript compilation
4. Test execution

### CI/CD Pipeline

1. Install dependencies
2. Run linting and type checking
3. Execute test suite
4. Build application
5. Deploy to Vercel (on main branch)

## 🔮 Future Considerations

### Scalability

- Consider component lazy loading for larger pages
- Implement incremental static regeneration for dynamic content
- Add caching strategies for API responses

### Features

- PWA capabilities for offline access
- Real-time features with WebSockets
- Content management system integration

### Performance

- Bundle analysis and optimization
- Image optimization strategies
- CDN implementation for assets

---

For questions about the architecture or to propose changes, please open a [GitHub Discussion](https://github.com/HOTMESS-LONDON/hotmess-vercel-starter-plu/discussions).
