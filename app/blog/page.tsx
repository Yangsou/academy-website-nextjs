'use client'

import dynamic from 'next/dynamic'

import AnimatedBackground from '@/components/animated-background'
import { ErrorBoundary } from '@/components/error-boundary'
import Footer from '@/components/footer'
import Navigation from '@/components/navigation'

const BlogSection = dynamic(() => import('@/components/blog-section'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
        <p className="text-lg text-gray-400">Loading articles...</p>
      </div>
    </div>
  ),
  ssr: false, // Disable SSR for blog section since it fetches data client-side
})

export default function BlogPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-16">
        <ErrorBoundary>
          <BlogSection />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  )
}
