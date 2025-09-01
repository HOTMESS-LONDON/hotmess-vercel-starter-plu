// Site-wide constants for HOTMESS London
export const SITE_CONFIG = {
  name: 'HOTMESS London',
  description: 'Fashion + Lube + Radio + Records. Always too much, never enough.',
  tagline: "London's filth frequency. Clothes, lube, radio, survival.",
  url: 'https://hotmess.london',
  twitter: '@hotmessldn',
  email: 'hello@hotmess.london',
} as const

// Navigation items for the main site navigation
export const NAVIGATION_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Radio',
    href: '/radio',
    description: '24/7 streaming. Hand-in-Hand is the only place to land.',
  },
  {
    label: 'Drops',
    href: '/drop',
    description: 'Exclusive merchandise and limited releases.',
  },
  {
    label: 'Hand-in-Hand',
    href: '/hand-in-hand',
    description: 'Sunday\'s transformative show. Connection, community, conversation.',
  },
  {
    label: 'Rooms',
    href: '/rooms',
    description: 'Safe spaces for community conversation on Telegram.',
  },
  {
    label: 'Affiliate',
    href: '/affiliate',
    description: 'Partnership program details.',
  },
] as const

// Footer links organized by category
export const FOOTER_LINKS = {
  legal: [
    {
      label: 'Privacy Policy',
      href: '/privacy',
    },
    {
      label: 'Terms of Service',
      href: '/terms',
    },
    {
      label: 'Cookie Policy',
      href: '/cookies',
    },
  ],
  accessibility: [
    {
      label: 'Accessibility Statement',
      href: '/accessibility',
    },
    {
      label: 'Report an Issue',
      href: 'mailto:accessibility@hotmess.london',
    },
  ],
  social: [
    {
      label: 'Twitter',
      href: 'https://twitter.com/hotmessldn',
      external: true,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/hotmessldn',
      external: true,
    },
    {
      label: 'Telegram',
      href: '/rooms',
    },
  ],
} as const

// Age verification constants
export const AGE_GATE = {
  minimumAge: 18,
  cookieKey: 'hotmess_age_verified',
  cookieMaxAge: 60 * 60 * 24 * 365, // 1 year in seconds
  title: 'Age Verification Required',
  message: 'You must be 18 or older to access this content. By clicking "I am 18 or older", you confirm that you meet this age requirement.',
  confirmText: 'I am 18 or older',
  denyText: 'I am under 18',
} as const

export type NavigationItem = (typeof NAVIGATION_ITEMS)[number]
export type FooterLinkCategory = keyof typeof FOOTER_LINKS
export type FooterLink = (typeof FOOTER_LINKS)[FooterLinkCategory][number]

// Base types for better type inference
export interface BaseNavigationItem {
  label: string
  href: string
  description?: string
}

export interface BaseFooterLink {
  label: string
  href: string
  external?: boolean
}