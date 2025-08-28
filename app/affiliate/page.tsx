import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Affiliate',
  description: 'Partner with HOTMESS London. Learn how our affiliate program works and register your interest.',
}

export default function AffiliatePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          AFFILIATE
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Partner with HOTMESS London. Authentic recommendations for products that actually matter.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto">
              1
            </div>
            <h3 className="text-xl font-semibold">Authentic Curation</h3>
            <p className="text-muted-foreground">
              We only recommend products our team actually uses and believes in. No fake endorsements.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto">
              2
            </div>
            <h3 className="text-xl font-semibold">Transparent Integration</h3>
            <p className="text-muted-foreground">
              Products are discussed naturally within our shows and content, never forced or scripted.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto">
              3
            </div>
            <h3 className="text-xl font-semibold">Community First</h3>
            <p className="text-muted-foreground">
              Revenue supports our mission: keeping HOTMESS Radio free and community-focused.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Categories */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Partnership Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Wellness & Self-Care</CardTitle>
              <CardDescription>
                Products that support mental health, physical wellness, and personal growth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Therapy and mental health services</li>
                <li>• Fitness and movement platforms</li>
                <li>• Mindfulness and meditation apps</li>
                <li>• Sexual wellness products</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Creative Tools</CardTitle>
              <CardDescription>
                Platforms, software, and tools that empower creative expression.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Music production software</li>
                <li>• Design and creative platforms</li>
                <li>• Content creation tools</li>
                <li>• Educational resources</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Lifestyle & Fashion</CardTitle>
              <CardDescription>
                Brands that align with our values of authenticity and self-expression.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Sustainable fashion brands</li>
                <li>• Independent beauty products</li>
                <li>• Home and lifestyle items</li>
                <li>• Ethical consumer goods</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Technology & Services</CardTitle>
              <CardDescription>
                Digital services and tech products that improve daily life.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Privacy-focused apps and services</li>
                <li>• Productivity and organization tools</li>
                <li>• Communication platforms</li>
                <li>• Financial wellness services</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Standards */}
      <section className="bg-secondary rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Our Standards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-green-400">What We Look For</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Products our team genuinely uses</li>
              <li>• Companies with ethical practices</li>
              <li>• Value that justifies the cost</li>
              <li>• Alignment with LGBTQ+ values</li>
              <li>• Commitment to sustainability</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-red-400">What We Avoid</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Get-rich-quick schemes</li>
              <li>• Exploitative business models</li>
              <li>• Products that don't work</li>
              <li>• Companies with harmful policies</li>
              <li>• Unsustainable practices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Register Interest */}
      <section className="text-center space-y-6 bg-primary text-primary-foreground rounded-lg p-8">
        <h2 className="text-3xl font-bold">Interested in Partnering?</h2>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          We're always looking for authentic partnerships with brands that align with our values. 
          Let's start a conversation about how we can work together.
        </p>
        <div className="space-y-4">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Register Interest
          </Button>
          <p className="text-sm opacity-75">
            We'll review your submission and get back to you within 5 business days.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="text-center space-y-4">
        <h3 className="text-xl font-semibold">Have Questions?</h3>
        <p className="text-muted-foreground">
          Reach out to us directly through our community channels.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/rooms">
            <Button variant="outline">
              Join Telegram Rooms
            </Button>
          </Link>
          <Link href="/radio">
            <Button variant="outline">
              Listen to Radio
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}