# HOTMESS Vercel Starter Project

A resilient Vercel/Next.js starter project for HOTMESS with enhanced Shopify integration and calendar scheduling features.

## Features

- **Resilient Shopify Integration**: Enhanced fetch logic with 2-second timeout and single retry for improved reliability
- **ICS Calendar Generation**: Dynamic calendar file generation from Shopify orders using JavaScript template literals
- **Node.js Version Management**: Pinned to Node.js 20 for consistency across environments
- **TypeScript Support**: Full TypeScript implementation for better development experience
- **Error Handling**: Comprehensive error handling and logging throughout the application

## Quick Start

### Prerequisites

- Node.js 20 (specified in `.node-version`)
- A Shopify store with API access
- Vercel account for deployment

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Shopify Configuration
SHOPIFY_SHOP_DOMAIN=your-shop-name
SHOPIFY_ACCESS_TOKEN=your-shopify-access-token
SHOPIFY_API_VERSION=2023-10

# Optional: Custom timeout settings
SHOPIFY_TIMEOUT=2000
SHOPIFY_RETRIES=1
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

### `/api/schedule.ics`

Generates an ICS calendar file from Shopify orders.

**Parameters:**
- `limit` (optional): Number of orders to fetch (default: 50)

**Example:**
```
GET /api/schedule.ics?limit=100
```

**Response:** ICS calendar file with order-based events

## Project Structure

```
├── lib/
│   └── shopify.ts          # Enhanced Shopify client with resilience features
├── pages/
│   └── api/
│       └── schedule.ics.ts # ICS calendar generation endpoint
├── .node-version           # Node.js version specification
├── package.json            # Project dependencies and scripts
├── README.md              # This file
├── OPERATIONS.md          # Operational procedures
├── RUNBOOK.md            # Troubleshooting guide
└── RELEASE_NOTES.md      # Version history and changes
```

## Key Enhancements

### 1. Resilient Shopify Client

The Shopify client in `lib/shopify.ts` includes:
- 2-second request timeout
- Single retry on failure
- Exponential backoff between retries
- Proper error handling for different HTTP status codes
- AbortController for request cancellation

### 2. ICS Calendar Generation

The `/api/schedule.ics` endpoint:
- Uses JavaScript template literals (not Python f-strings)
- Properly formats ICS dates and escapes special characters
- Converts Shopify orders to calendar events
- Supports customizable order limits

### 3. Environment Management

- Node.js version pinned to 20 via `.node-version`
- Environment variable validation
- Graceful error handling for missing configuration

## Development

### Code Quality

```bash
# Run linting
npm run lint

# Type checking (if TypeScript)
npx tsc --noEmit
```

### Testing

Basic testing commands (extend as needed):

```bash
# Add your test commands here
npm test
```

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Ensure these are set in your Vercel project settings:
- `SHOPIFY_SHOP_DOMAIN`
- `SHOPIFY_ACCESS_TOKEN`
- `SHOPIFY_API_VERSION` (optional, defaults to 2023-10)

## Troubleshooting

See [RUNBOOK.md](./RUNBOOK.md) for detailed troubleshooting information.

## Operations

See [OPERATIONS.md](./OPERATIONS.md) for operational procedures and monitoring guidelines.

## Release Notes

See [RELEASE_NOTES.md](./RELEASE_NOTES.md) for version history and changes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.