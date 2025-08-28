import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Rooms',
  description: 'HOTMESS London Telegram community rooms. Safe spaces for authentic conversation and connection.',
}

export default function RoomsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          ROOMS
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Safe spaces for community conversation on Telegram. Real talk, real support, real connection.
        </p>
      </section>

      {/* What Are Rooms */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">What Are HOTMESS Rooms?</h2>
        <div className="prose prose-lg prose-invert max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed">
            HOTMESS Rooms are curated Telegram spaces where community members can 
            continue conversations that start on our radio shows, share resources, 
            and support each other through life's messiest moments.
          </p>
          <p className="text-lg leading-relaxed">
            Each room has its own purpose, tone, and moderation style—but all are 
            grounded in respect, authenticity, and the belief that everyone deserves 
            to be heard.
          </p>
        </div>
      </section>

      {/* Available Rooms */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Our Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                🎵 General Chat
                <span className="text-sm bg-green-500 text-white px-2 py-1 rounded">Active</span>
              </CardTitle>
              <CardDescription>
                Main community space for casual conversation, sharing music, and daily check-ins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our most active room. Talk about anything—the radio shows, life updates, random thoughts. Moderated but relaxed.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Join General Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                🫂 Hand-in-Hand Support
                <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">Sundays</span>
              </CardTitle>
              <CardDescription>
                Dedicated space for deeper conversations related to Sunday's Hand-in-Hand show.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Share voice notes, continue therapeutic conversations, and support each other through growth and healing.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Join Support Room
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                💰 Resource Sharing
                <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded">Curated</span>
              </CardTitle>
              <CardDescription>
                Share tools, apps, services, and products that actually improve your life.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                No affiliate spam—just genuine recommendations from community members who've tested and loved products.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Join Resource Room
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                🎨 Creative Showcase
                <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded">New</span>
              </CardTitle>
              <CardDescription>
                Share your art, music, writing, and creative projects with a supportive community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get feedback, find collaborators, and celebrate each other's creative victories—big and small.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Join Creative Room
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="bg-secondary rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Community Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-400">We Encourage</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Authentic sharing and vulnerability</li>
              <li>• Supporting other community members</li>
              <li>• Asking questions and seeking help</li>
              <li>• Sharing resources and recommendations</li>
              <li>• Celebrating wins and mourning losses</li>
              <li>• Respectful disagreement and discussion</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-400">We Don't Allow</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Hate speech or discrimination</li>
              <li>• Spam or excessive self-promotion</li>
              <li>• Sharing private information without consent</li>
              <li>• Harassment or targeted attacks</li>
              <li>• Content that could trigger or harm others</li>
              <li>• Anything illegal or dangerous</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Safety & Moderation */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Safety & Moderation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Human Moderators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real people who understand context and nuance. Available for questions and concerns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                What's shared in rooms stays in rooms. No screenshots or sharing without permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Graduated Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Issues addressed through conversation first. Bans only for serious violations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join CTA */}
      <section className="text-center space-y-6 bg-primary text-primary-foreground rounded-lg p-8">
        <h2 className="text-3xl font-bold">Ready to Join?</h2>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Our Telegram rooms are currently in private beta. We're carefully building 
          our community with listeners who've been engaging with HOTMESS Radio.
        </p>
        <div className="space-y-4">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" disabled>
            Request Invite
          </Button>
          <p className="text-sm opacity-75">
            Listen to HOTMESS Radio and participate in shows to get priority access.
          </p>
        </div>
      </section>

      {/* Listen First */}
      <section className="text-center space-y-4">
        <h3 className="text-xl font-semibold">New to HOTMESS?</h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Start by listening to our radio shows. The best community members are those who 
          understand our vibe and values first.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/radio">
            <Button size="lg">
              Listen to Radio
            </Button>
          </Link>
          <Link href="/hand-in-hand">
            <Button size="lg" variant="outline">
              Learn About Hand-in-Hand
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}