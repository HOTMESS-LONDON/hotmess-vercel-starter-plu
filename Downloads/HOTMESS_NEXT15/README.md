# HOTMESS — Headless Shopify Frontend (Next 15)

- Next.js **15.x** (App Router) • Node **>=18.18**
- Storefront GraphQL product grid & PDP (variants + **Buy Now** → checkout)
- Orders webhook with **HMAC verify**
- UTM persistence across links
- RadioKing player + HNH ICS

## Setup
```bash
npm i
cp .env.local.example .env.local
# edit .env.local:
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=<Storefront access token>
SHOPIFY_STOREFRONT_API_VERSION=2024-07
NEXT_PUBLIC_RADIOKING_STREAM_URL=https://listen.radioking.com/radio/736103/stream/802454
npm run dev
```
Generated 2025-08-25T23:53:58.781670Z
