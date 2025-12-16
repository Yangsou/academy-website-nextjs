'use client'

import { useInfiniteArticles } from '@/lib/hooks/use-blog-data'

import ArticleItem, { ArticelItemSkeleton } from './article-item'

export default function LastBlog() {
  const { articles, hasMore, loadMore, isLoading } = useInfiniteArticles()

  return (
    <section className="min-h-[calc(100vh_-_420px)] bg-[#F7F9FD]">
      <div className="flex justify-center">
        <div className="container grid h-full grid-cols-12 gap-8 pb-6">
          <div className="col-span-12 mb-2 flex flex-col items-start justify-start gap-4">
            <div className="align-middle font-[Manrope] text-[28px] font-semibold leading-[130%] text-[#202222]">
              Last blog
            </div>
          </div>

          {isLoading && <ArticelItemSkeleton count={6} />}

          {articles.map((article) => (
            <ArticleItem
              article={article}
              key={article.id}
            />
          ))}
          {hasMore && (
            <div className="col-span-12 flex justify-center pt-4">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="border border-[#A0DCDD] px-4 py-2 align-middle font-[Manrope] text-[18px] font-semibold leading-[150%] text-[#0036AF] hover:bg-[#A0DCDD]"
              >
                View more
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
