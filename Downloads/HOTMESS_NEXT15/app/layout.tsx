import './globals.css'
import ClientLayout from './client-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL("https://hotmess.london"),
  title: { default: "HOTMESS London", template: "%s — HOTMESS London" },
  description: "Fashion + Lube + Radio + Records. Always too much, never enough.",
  openGraph: {
    title: "HOTMESS London",
    description: "Streaming filth 24/7. Care-first, stigma-smashing.",
    url: "https://hotmess.london",
    siteName: "HOTMESS",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "en_GB", type: "website",
  },
  twitter: { card: "summary_large_image", site: "@hotmessldn" },
  alternates: { canonical: "https://hotmess.london" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="hm">
      <body>
        {children}
      </body>
    </html>
  );
}
