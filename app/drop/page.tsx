import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Drops',
  description: 'Exclusive HOTMESS London merchandise and limited releases. Clothes, accessories, and more.',
}

export default function DropsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          DROPS
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Exclusive merchandise and limited releases. Wear your mess with pride.
        </p>
      </section>

      {/* Promo Section */}
      <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Next Drop Coming Soon</h2>
        <p className="text-lg mb-6 opacity-90">
          Be the first to know when our latest collection launches. Premium quality, limited quantities.
        </p>
        <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
          Notify Me
        </Button>
      </section>

      {/* Product Categories */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:bg-card/80 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">Apparel</CardTitle>
              <CardDescription>
                T-shirts, hoodies, and statement pieces for the boldest looks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start" disabled>
                Coming Soon →
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:bg-card/80 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">Accessories</CardTitle>
              <CardDescription>
                Pins, patches, stickers, and other ways to show your HOTMESS pride.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start" disabled>
                Coming Soon →
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:bg-card/80 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">Essentials</CardTitle>
              <CardDescription>
                The items that make survival possible. Carefully curated for quality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start" disabled>
                Coming Soon →
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-secondary rounded-lg p-8">
        <h2 className="text-3xl font-bold">Stay Connected</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Follow our channels to be the first to know about new drops, exclusive previews, and special offers.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/radio">
            <Button variant="outline">
              Listen to Radio
            </Button>
          </Link>
          <Link href="/rooms">
            <Button variant="outline">
              Join Telegram
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}