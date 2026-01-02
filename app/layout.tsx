import BtnScrollTop from '@/components/btn-scroll-top'
import Footer from '@/components/footer'
import GoogleTagManager from '@/components/GoogleTagManager'
import Navigation from '@/components/navigation'
import { SWRProvider } from '@/components/providers/swr-provider'
import { Toaster } from '@/components/ui/sonner'

import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Ai+Di - Ai that reflects. Not replaces.',
  description:
    'Building Ai that reflects human consciousness and enhances our potential for conscious living in the digital age.',
  generator: 'Ai+Di Company',
  keywords: [
    'AI',
    'Artificial Intelligence',
    'Divine Intelligence',
    'Consciousness',
    'Technology',
    'Innovation',
  ],
  authors: [{ name: 'Ai+Di Team' }],
  creator: 'Ai+Di',
  publisher: 'Ai+Di',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.aidi.world',
    siteName: 'Ai+Di',
    title: 'Ai+Di - Ai that reflects. Not replaces.',
    description:
      'Building Ai that reflects human consciousness and enhances our potential for conscious living in the digital age.',
    images: [
      {
        url: 'https://www.aidi.world/og-image-fallback.png',
        width: 1200,
        height: 630,
        alt: 'Ai+Di - Ai that reflects. Not replaces.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aidi_world',
    creator: '@aidi_world',
    title: 'Ai+Di - Ai that reflects. Not replaces.',
    description:
      'Building Ai that reflects human consciousness and enhances our potential for conscious living in the digital age.',
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
        <meta
          property="og:image:width"
          content="1200"
        />
        <meta
          property="og:image:height"
          content="630"
        />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:secure_url"
          content="https://www.aidi.world/og-image-fallback.png"
        />
        <meta
          name="twitter:image:alt"
          content="Ai+Di - Ai that reflects. Not replaces."
        />
        <meta
          name="theme-color"
          content="#0f172a"
        />
        <meta
          name="msapplication-TileColor"
          content="#0f172a"
        />
        <meta
          name="msapplication-TileImage"
          content="https://www.aidi.world/og-image-fallback.png"
        />
        <meta
          name="application-name"
          content="Ai+Di"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Ai+Di"
        />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="canonical"
          href="https://www.aidi.world"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/aidi-logo-meta.svg"
        />
        <link
          rel="apple-touch-icon"
          href="/aidi-logo-meta.svg"
        />

        {/* Additional meta tags for better Teams compatibility */}
        <meta
          name="msapplication-config"
          content="/browserconfig.xml"
        />
        <meta
          name="msapplication-TileColor"
          content="#0f172a"
        />
        <meta
          name="msapplication-TileImage"
          content="/aidi-logo-meta.svg"
        />
        <meta
          property="og:image:width"
          content="1200"
        />
        <meta
          property="og:image:height"
          content="630"
        />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:secure_url"
          content="https://www.aidi.world/api/og?v=1"
        />
        <meta
          property="og:site_name"
          content="Ai+Di"
        />
        <meta
          property="og:locale"
          content="en_US"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:url"
          content="https://www.aidi.world"
        />
        <meta
          property="og:title"
          content="Ai+Di - Ai that reflects. Not replaces."
        />
        <meta
          property="og:description"
          content="Building Ai that reflects human consciousness and enhances our potential for conscious living in the digital age."
        />
      </head>
      <body>
        <GoogleTagManager />
        <SWRProvider>
          <main className="min-h-screen overflow-x-hidden text-white">
            {/* <AnimatedBackground /> */}
            <Navigation />

            <div className="relative z-10">{children}</div>
            <Footer />
            <BtnScrollTop />
          </main>
        </SWRProvider>
        <Toaster />
      </body>
    </html>
  )
}
