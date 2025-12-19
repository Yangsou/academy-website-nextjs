import dynamic from 'next/dynamic'

import BlogBanner from '@/components/blog-banner'
import BlogMostPopular from '@/components/blog-most-popular'
import { ErrorBoundary } from '@/components/error-boundary'

const BlogSection = dynamic(() => import('@/components/last-blog'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center pb-8">
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
    <div className="pt-16">
      <ErrorBoundary>
        <BlogBanner />
        <BlogMostPopular />
        <BlogSection />
      </ErrorBoundary>
    </div>
  )
}
