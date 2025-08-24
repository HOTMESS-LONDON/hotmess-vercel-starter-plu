# HOTMESS Vercel Starter Plus

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview
HOTMESS is a Next.js 14 App Router project that powers a fashion, radio, lube, and affiliate ecosystem. The project integrates with Vercel, Shopify, and HOTMESS Radio (RadioKing) with automation flows.

**Technology Stack:**
- Next.js 14 (App Router)
- TypeScript (strict mode ON)
- Node.js 20 LTS
- Vercel deployment
- Shopify Storefront API
- RadioKing streaming integration

## Environment Setup and Dependencies

### Initial Setup
```bash
# Ensure Node.js 20 LTS is installed
node --version  # Should show v20.x.x

# Install dependencies
npm ci
```

### Required Environment Variables
Create `.env.local` file with these variables (typed in `env.ts`):
```
NEXT_PUBLIC_RADIOKING_STREAM_URL=
NEXT_PUBLIC_RADIOKING_FALLBACK_URL=
NEXT_PUBLIC_SITE_URL=
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_TOKEN=
RADIOKING_METADATA_URL=
```

## Build and Development

### Development Server
```bash
# Start development server
npm run dev
# Development server typically starts in 10-15 seconds
```

### Build Process
```bash
# Full production build
npm run build
# NEVER CANCEL: Build takes 2-5 minutes depending on project size. Set timeout to 10+ minutes.
```

### Type Checking
```bash
# Run TypeScript type checking
npm run typecheck
# Type checking typically takes 30-60 seconds. Set timeout to 5+ minutes.
```

### Linting and Code Quality
```bash
# Run ESLint
npm run lint
# NEVER CANCEL: Linting takes 1-3 minutes. Set timeout to 5+ minutes.

# Run Prettier formatting
npm run format
# Formatting typically takes 30 seconds. Set timeout to 2+ minutes.
```

### Testing
```bash
# Run all tests
npm test
# NEVER CANCEL: Test suite takes 2-5 minutes. Set timeout to 10+ minutes.
```

## Code Standards and Requirements

### Non-Negotiable Rules
- Use Node 20 LTS, TypeScript, strict mode ON
- Enforce ESLint + Prettier (no blocking warnings)
- Ensure zero TypeScript errors before suggesting code
- Always write graceful fallback states (never crash UI if envs are missing)
- Respect timezone: Europe/London for all scheduling logic
- Security: keep CSP/HSTS/Permissions-Policy headers intact in `vercel.json`

### File Structure and Key Locations
```
/
├── app/
│   ├── data/
│   │   └── hotmess_radio_daily_show_programming.json  # Radio schedule data
│   ├── radio/                                         # Radio player page
│   ├── schedule/                                      # Radio schedule page
│   ├── shop/
│   │   └── featured/                                  # Shopify featured products
│   └── api/
│       └── schedule.ics/                              # ICS calendar endpoint
├── env.ts                                             # Environment variable types
├── vercel.json                                        # Vercel configuration
├── OPERATIONS.md                                      # Operations documentation
├── RUNBOOK.md                                         # Runbook documentation
├── ONBOARDING.md                                      # Onboarding documentation
└── RELEASE_NOTES.md                                   # Release notes
```

## Key Features and Validation

### Radio Feature
- **/radio page**: Player with retry, fallback URL, Media Session API
- **/schedule page**: Renders from `app/data/hotmess_radio_daily_show_programming.json` (validated), highlights "LIVE NOW"
- **/api/schedule.ics**: Serve valid recurring ICS file
- **Shows include**: Wake the Mess, Dial-a-Daddy, Hand-in-Hand, Drive Time Mess, Guest DJ Takeovers

### Shopify Integration
- **/shop/featured page**: Server-side fetch with 2s timeout + single retry
- Show "Shopify not connected (reason)" if envs missing
- Graceful fallback when Shopify is unavailable

### Data Integrity
- Radio programming comes from `app/data/hotmess_radio_daily_show_programming.json`
- Maintain JSON validity and segment timing
- Always validate JSON structure after editing

## Manual Validation Scenarios

### CRITICAL: After making any changes, ALWAYS test these scenarios:

#### Radio Player Validation
1. Navigate to `/radio` page
2. Verify player loads and shows current stream status
3. Test play/pause functionality
4. Verify fallback URL works if primary stream fails
5. Check Media Session API integration (browser media controls)
6. Test player on mobile and desktop viewports

#### Schedule Validation
1. Navigate to `/schedule` page
2. Verify schedule loads from JSON data file
3. Check "LIVE NOW" highlighting for current time slot
4. Verify timezone handling (Europe/London)
5. Test schedule ICS endpoint at `/api/schedule.ics`
6. Validate ICS file format and recurring events

#### Shopify Integration Validation
1. Navigate to `/shop/featured` page
2. Verify products load (if env vars configured)
3. Test graceful fallback when Shopify unavailable
4. Check 2-second timeout behavior
5. Verify single retry mechanism

#### Environment Variable Fallbacks
1. Test application with missing environment variables
2. Verify graceful fallback messages display
3. Ensure no crashes occur with incomplete configuration
4. Check "not configured" states render properly

## CI/CD and Quality Assurance

### Pre-commit Validation
Always run these commands before committing:
```bash
npm run typecheck  # Must pass with zero errors
npm run lint       # Must pass with no blocking warnings  
npm run build      # Must complete successfully
```

### GitHub Actions Pipeline
The CI runs: `npm ci && npm run typecheck && npm run lint && npm run build`
- NEVER CANCEL: Full CI pipeline takes 5-10 minutes. Set timeout to 15+ minutes.

### Pull Request Requirements
- PRs must be small, descriptive, and linked to preview deploys on Vercel
- Include Test Plan in PR descriptions (what you verified)
- Always provide copy-paste-ready code
- Suggest full file replacements where necessary (not just snippets)

## Security and Production Considerations

### Headers and Security
- Never remove CSP/HSTS/Permissions-Policy headers from `vercel.json`
- Always validate security headers after deployment changes
- Ensure HTTPS redirect and security headers are maintained

### Error Handling
- If unsure about envs or streams, render "not configured" instead of erroring
- Always write resilient, production-ready code
- Never remove MEGA features (Radio, Schedule, Shopify hook, ICS, APIs)

### Performance
- Server-side fetches must have timeouts (2s for Shopify)
- Implement single retry for external service calls
- Graceful degradation when services unavailable

## Documentation Maintenance
Keep these files updated with any changes:
- `README.md` - Project overview and quick start
- `OPERATIONS.md` - Operational procedures
- `RUNBOOK.md` - Troubleshooting and maintenance
- `ONBOARDING.md` - Developer onboarding
- `RELEASE_NOTES.md` - Change log and releases

## Common Commands Reference

### Repository Exploration
```bash
ls -la                    # List all files including hidden
git status               # Check repository status
git log --oneline -10    # View recent commits
```

### Development Workflow
```bash
npm ci                   # Clean install dependencies
npm run dev             # Start development server
npm run build           # Production build
npm run lint            # Run linting
npm run format          # Format code
npm run typecheck       # Type checking
```

### Environment Validation
```bash
node --version          # Verify Node.js 20 LTS
npm --version           # Verify npm version
which npx              # Verify npx availability
```

## Timeout Reference for Long-Running Commands
- **Development server start**: 30 seconds timeout
- **npm ci**: 5+ minutes timeout  
- **npm run build**: 10+ minutes timeout (NEVER CANCEL)
- **npm run lint**: 5+ minutes timeout (NEVER CANCEL)
- **npm run typecheck**: 5+ minutes timeout
- **npm test**: 10+ minutes timeout (NEVER CANCEL)
- **CI pipeline**: 15+ minutes timeout (NEVER CANCEL)

## CRITICAL REMINDERS
- **NEVER CANCEL builds or long-running commands** - they may take several minutes
- Always test manual validation scenarios after code changes
- Ensure zero TypeScript errors before committing
- Maintain graceful fallbacks for all external integrations
- Keep security headers intact in vercel.json
- Always run complete validation scenarios, not just build/start