# Hotmess Vercel Starter PLU

Hotmess Vercel Starter PLU is a minimal starter repository for creating Next.js applications that deploy to Vercel. This repository begins as an empty template with just a README, requiring full project initialization.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Initial Project Setup
This repository starts empty and requires complete initialization. To set up a working Next.js/Vercel project:

- **Install Node.js (if not available)**: Node.js v20+ is required
- **Install Vercel CLI globally**: `npm install -g vercel` -- takes 15-30 seconds
- **Initialize Next.js project**: `npx create-next-app@latest . --typescript --eslint --app --use-npm --yes` -- takes 25-35 seconds. NEVER CANCEL during package installation.
- **CRITICAL**: Remove Google Fonts imports from `src/app/layout.tsx` to avoid build failures due to network restrictions
- **Install dependencies**: Dependencies are installed during project initialization

### Build and Development Commands
- **Development server**: `npm run dev` -- starts in ~1 second, runs on http://localhost:3000
- **Production build**: `npm run build` -- takes 10-20 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- **Linting**: `npm run lint` -- completes instantly, always run before committing
- **Production server**: `npm run start` -- may have issues in some environments, prefer `npm run dev` for testing

### CRITICAL Timing and Timeout Guidelines
- **NEVER CANCEL builds or installs** - they may appear to hang but are processing
- `npx create-next-app`: 25-35 seconds (NEVER CANCEL - set 120+ second timeout)
- `npm run build`: 10-20 seconds (NEVER CANCEL - set 60+ second timeout) 
- `npm run dev`: ~1 second startup time
- `npm run lint`: Instant execution

## Validation Requirements

### Manual Testing Scenarios
After making any changes, ALWAYS perform these validation steps:

1. **Build validation**: Run `npm run build` and ensure it completes successfully
2. **Development server test**: 
   - Run `npm run dev` 
   - Verify server starts on http://localhost:3000
   - Test that the default Next.js page loads correctly
3. **Code quality**: Run `npm run lint` and fix any errors
4. **Basic functionality**: Navigate through the application to ensure core features work

### Known Issues and Workarounds
- **Google Fonts failure**: Default Next.js templates include Google Fonts imports that fail due to network restrictions. Remove these imports from `app/layout.tsx`:
  ```typescript
  // REMOVE these lines:
  import { Geist, Geist_Mono } from "next/font/google";
  const geistSans = Geist({...});
  const geistMono = Geist_Mono({...});
  
  // REMOVE className references:
  className={`${geistSans.variable} ${geistMono.variable}`}
  ```
- **Production server issues**: `npm run start` may fail with routing errors. Use `npm run dev` for local testing.
- **Port conflicts**: If port 3000 is in use, Next.js will automatically use the next available port

## Vercel Deployment

### Vercel CLI Commands
- **Login**: `vercel login` (requires authentication)
- **Deploy**: `vercel` (deploys current directory)
- **Local Vercel build**: `vercel build` (builds project locally)
- **Development with Vercel**: `vercel dev` (alternative to `npm run dev`)

### Deployment Workflow
1. Ensure all validation steps pass
2. Run `npm run lint` to check code quality
3. Run `npm run build` to verify production build works
4. Deploy with `vercel` command
5. Test deployed application functionality

## Common Tasks

### Repository Structure (after initialization)
```
.
├── .github/
├── .gitignore
├── .next/                 (generated during build)
├── app/
│   ├── globals.css
│   ├── layout.tsx         (MODIFY: remove Google Fonts)
│   └── page.tsx
├── eslint.config.mjs
├── next.config.ts
├── node_modules/          (generated)
├── package.json
├── package-lock.json      (generated)
├── README.md
└── tsconfig.json
```

### Essential package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack", 
    "start": "next start",
    "lint": "eslint"
  }
}
```

### Pre-commit Checklist
Always complete these steps before committing changes:
1. `npm run lint` -- must pass with no errors
2. `npm run build` -- must complete successfully
3. `npm run dev` -- verify application starts and loads correctly
4. Test any modified functionality manually

## Environment Requirements

### Required Tools
- **Node.js**: v20+ (check with `node --version`)
- **npm**: v10+ (included with Node.js)
- **Vercel CLI**: Install with `npm install -g vercel`

### Optional Tools
- **Git**: For version control (pre-installed in most environments)

## Troubleshooting

### Build Failures
- **Font loading errors**: Remove Google Fonts imports from layout files
- **Network timeouts**: Builds may appear stuck but are processing - wait the full timeout period
- **Port conflicts**: Kill existing processes with `pkill -f "next dev"`

### Development Issues
- **Server won't start**: Check if port 3000 is available, Next.js will auto-select alternatives
- **Hot reload not working**: Restart the development server with `npm run dev`

Remember: This is a STARTER repository that begins empty. All project structure and functionality must be created from scratch using the steps outlined above.