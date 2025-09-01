import Link from 'next/link'
import { ExternalLink, Radio, Heart } from 'lucide-react'
import { SITE_CONFIG, FOOTER_LINKS, type BaseFooterLink } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const renderFooterSection = (
    title: string,
    links: readonly BaseFooterLink[],
    className?: string
  ) => (
    <div className={className}>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 text-xl font-bold tracking-tight">
              <Radio className="h-6 w-6 text-primary" />
              <span>{SITE_CONFIG.name}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Footer Links */}
          {renderFooterSection('Legal', FOOTER_LINKS.legal)}
          {renderFooterSection('Accessibility', FOOTER_LINKS.accessibility)}
          {renderFooterSection('Connect', FOOTER_LINKS.social)}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-4">
            <p>© {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
            <p className="hidden md:block">•</p>
            <p>Broadcasting from London with care and compassion.</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by the HOTMESS London team</span>
          </div>
        </div>

        {/* Additional Legal Info */}
        <div className="mt-6 rounded-lg bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            HOTMESS London is committed to creating inclusive and accessible content. 
            If you experience any accessibility issues, please contact us at{' '}
            <Link 
              href="mailto:accessibility@hotmess.london"
              className="underline hover:text-foreground"
            >
              accessibility@hotmess.london
            </Link>
            . We are continuously working to improve our digital accessibility.
          </p>
        </div>
      </div>
    </footer>
  )
}