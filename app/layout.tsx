import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'HOTMESS London',
    template: '%s | HOTMESS London',
  },
  description: "HOTMESS London — unified site for radio, drops, hand-in-hand, affiliate, and rooms. London's filth frequency.",
  keywords: ['HOTMESS', 'London', 'radio', 'queer', '24/7', 'stream', 'music'],
  authors: [{ name: 'HOTMESS London' }],
  creator: 'HOTMESS London',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://hotmess-ldn.vercel.app',
    title: 'HOTMESS London',
    description: "London's filth frequency. Clothes, lube, radio, survival.",
    siteName: 'HOTMESS London',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOTMESS London',
    description: "London's filth frequency. Clothes, lube, radio, survival.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <main id="main-content" className="flex-1">
            <div className="container mx-auto max-w-4xl px-4 py-16">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}