import dynamic from 'next/dynamic'

import BlogBanner from '@/components/blog-banner'
import BlogMostPopular from '@/components/blog-most-popular'
import { ErrorBoundary } from '@/components/error-boundary'

const BlogSection = dynamic(() => import('@/components/last-blog'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center pb-8">
      <div className="text-center">
        <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    </div>
  ),
  ssr: false, // Disable SSR for blog section since it fetches data client-side
})

export default function BlogPage() {
  return (
    <div className="relative bg-[#F7F9FD] pb-44 pt-16">
      <div className="absolute bottom-0 left-0 h-[400px] w-full bg-[url('/blog/related-blog-bg.svg')] bg-contain bg-bottom bg-no-repeat lg:h-[524px] lg:bg-cover xl:h-[632px] 2xl:h-[776px]" />

      <ErrorBoundary>
        <div className="relative">
          <BlogBanner />
          <BlogMostPopular />
          <BlogSection />
        </div>
      </ErrorBoundary>
    </div>
  )
}
