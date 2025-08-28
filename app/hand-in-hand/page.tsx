import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Hand-in-Hand',
  description: 'Sunday transformative show on HOTMESS Radio. Connection, community, conversation.',
}

export default function HandInHandPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          HAND-IN-HAND
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sunday's transformative show. Connection, community, conversation.
        </p>
        <div className="bg-primary text-primary-foreground rounded-lg p-4 inline-block">
          <p className="font-semibold">Every Sunday • 2PM–6PM GMT</p>
        </div>
      </section>

      {/* Show Explainer */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">What Is Hand-in-Hand?</h2>
        <div className="prose prose-lg prose-invert max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed">
            Hand-in-Hand is more than a radio show—it's a weekly gathering where 
            authentic voices meet intentional space. Every Sunday, we create room 
            for the conversations that matter most.
          </p>
          <p className="text-lg leading-relaxed">
            Through carefully curated segments, guest conversations, and community 
            check-ins, Hand-in-Hand explores themes of connection, growth, and 
            survival in an increasingly disconnected world.
          </p>
        </div>
      </section>

      {/* Show Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Community Check-ins</CardTitle>
            <CardDescription>
              Real voices sharing real experiences. Anonymous voice notes and live call-ins.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A safe space for listeners to share what's really happening in their lives.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Transformative Conversations</CardTitle>
            <CardDescription>
              Deep dives with guests who are changing the world, one conversation at a time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Artists, activists, thinkers, and healers sharing their wisdom.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Therapeutic Interludes</CardTitle>
            <CardDescription>
              AI-assisted emotional support and guided reflection moments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Technology meets humanity in healing-focused segments.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Product Integration</CardTitle>
            <CardDescription>
              Thoughtful discussions about tools, products, and resources for better living.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Honest reviews and recommendations that actually matter.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-secondary rounded-lg p-8">
        <h2 className="text-3xl font-bold">Join the Conversation</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Hand-in-Hand is live every Sunday. Tune in, call in, or just listen in. 
          Your presence makes the difference.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/radio">
            <Button size="lg">
              Listen Live on Sunday
            </Button>
          </Link>
          <Link href="/rooms">
            <Button size="lg" variant="outline">
              Join Community Rooms
            </Button>
          </Link>
        </div>
      </section>

      {/* How to Participate */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">How to Participate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto">
              1
            </div>
            <h3 className="text-xl font-semibold">Listen</h3>
            <p className="text-muted-foreground">
              Tune in every Sunday at 2PM GMT on HOTMESS Radio
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto">
              2
            </div>
            <h3 className="text-xl font-semibold">Share</h3>
            <p className="text-muted-foreground">
              Send voice notes or join live call-ins during the show
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto">
              3
            </div>
            <h3 className="text-xl font-semibold">Connect</h3>
            <p className="text-muted-foreground">
              Continue conversations in our community Telegram rooms
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}