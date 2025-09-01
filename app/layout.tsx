import './globals.css'
import ClientLayout from './client-layout'
import AgeGate from '@/components/AgeGate'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://hotmess.london'),
  title: { default: 'HOTMESS London', template: '%s — HOTMESS London' },
  description: 'Fashion + Lube + Radio + Records. Always too much, never enough.',
  openGraph: {
    title: 'HOTMESS London',
    description: 'Streaming filth 24/7. Care-first, stigma-smashing.',
    url: 'https://hotmess.london',
    siteName: 'HOTMESS',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', site: '@hotmessldn' },
  alternates: { canonical: 'https://hotmess.london' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AgeGate>
          <ClientLayout>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                <div className="container mx-auto max-w-4xl px-4 py-16">{children}</div>
              </main>
              <Footer />
            </div>
          </ClientLayout>
        </AgeGate>
      </body>
    </html>
  )
}
