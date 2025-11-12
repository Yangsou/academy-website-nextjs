'use client'

import dynamic from 'next/dynamic'

import AnimatedBackground from '@/components/animated-background'
import { ErrorBoundary } from '@/components/error-boundary'
import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import Navigation from '@/components/navigation'

const ValuesSection = dynamic(() => import('@/components/values-section'), {
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
    </div>
  ),
})

const FourPillarsSection = dynamic(() => import('@/components/four-pillars-section'), {
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
    </div>
  ),
})

const JoinMovementSection = dynamic(() => import('@/components/join-movement-section'), {
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
    </div>
  ),
})

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <ErrorBoundary>
          <ValuesSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <FourPillarsSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <JoinMovementSection />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  )
}
