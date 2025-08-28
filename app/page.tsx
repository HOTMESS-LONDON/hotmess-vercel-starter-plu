import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
          HOTMESS
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          London's filth frequency. Clothes, lube, radio, survival.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/radio">
            <Button size="lg" className="text-lg px-8 py-6">
              Open Radio
            </Button>
          </Link>
          <Link href="/drop">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Shop Drops
            </Button>
          </Link>
        </div>
      </section>

      {/* Grid Teasers */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="text-2xl">Radio</CardTitle>
            <CardDescription>
              24/7 streaming. Hand-in-Hand is the only place to land.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/radio">
              <Button variant="ghost" className="w-full justify-start">
                Listen Now →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="text-2xl">Hand-in-Hand</CardTitle>
            <CardDescription>
              Sunday's transformative show. Connection, community, conversation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/hand-in-hand">
              <Button variant="ghost" className="w-full justify-start">
                Learn More →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="text-2xl">Drops</CardTitle>
            <CardDescription>
              Exclusive merchandise and limited releases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/drop">
              <Button variant="ghost" className="w-full justify-start">
                Shop Now →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="text-2xl">Rooms</CardTitle>
            <CardDescription>
              Safe spaces for community conversation on Telegram.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/rooms">
              <Button variant="ghost" className="w-full justify-start">
                Join Rooms →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}