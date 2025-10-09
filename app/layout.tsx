import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI+DI - AI that reflects. Not replaces.',
  description: 'Building AI that reflects human consciousness and enhances our potential for conscious living in the digital age.',
  generator: 'AI+DI Company',
  keywords: ['AI', 'Artificial Intelligence', 'Divine Intelligence', 'Consciousness', 'Technology', 'Innovation'],
  authors: [{ name: 'AI+DI Team' }],
  creator: 'AI+DI',
  publisher: 'AI+DI',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.aidi.world',
    siteName: 'AI+DI',
    title: 'AI+DI - AI that reflects. Not replaces.',
    description: 'Building AI that reflects human consciousness and enhances our potential for conscious living in the digital age.',
    images: [
      {
        url: 'https://www.aidi.world/og-image-fallback.png',
        width: 1200,
        height: 630,
        alt: 'AI+DI - AI that reflects. Not replaces.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aidi_world',
    creator: '@aidi_world',
    title: 'AI+DI - AI that reflects. Not replaces.',
    description: 'Building AI that reflects human consciousness and enhances our potential for conscious living in the digital age.',
    images: ['https://www.aidi.world/og-image-fallback.png'],
  },
  icons: {
    icon: '/aidi-logo-meta.svg',
    shortcut: '/aidi-logo-meta.svg',
    apple: '/aidi-logo-meta.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better social sharing */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:secure_url" content="https://www.aidi.world/og-image-fallback.png" />
        <meta name="twitter:image:alt" content="AI+DI - AI that reflects. Not replaces." />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-TileImage" content="https://www.aidi.world/og-image-fallback.png" />
        <meta name="application-name" content="AI+DI" />
        <meta name="apple-mobile-web-app-title" content="AI+DI" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://www.aidi.world" />
        <link rel="icon" type="image/x-icon" href="/aidi-logo-meta.svg" />
        <link rel="apple-touch-icon" href="/aidi-logo-meta.svg" />
        
        {/* Additional meta tags for better Teams compatibility */}
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-TileImage" content="/aidi-logo-meta.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:secure_url" content="https://www.aidi.world/api/og?v=1" />
        <meta property="og:site_name" content="AI+DI" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aidi.world" />
        <meta property="og:title" content="AI+DI - AI that reflects. Not replaces." />
        <meta property="og:description" content="Building AI that reflects human consciousness and enhances our potential for conscious living in the digital age." />
      </head>
      <body>{children}</body>
    </html>
  )
}
