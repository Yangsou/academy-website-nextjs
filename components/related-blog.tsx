import { useRelatedArticles } from '@/lib/hooks/use-blog-data'

import ArticleItem, { ArticelItemSkeleton } from './article-item'

type Props = {
  categoryName?: string
  excludeSlug?: string
}
export default function RelatedBlog({ excludeSlug, categoryName }: Props) {
  const { articles, isError, isLoading } = useRelatedArticles({
    categoryName: categoryName ?? '',
    excludeSlug: excludeSlug ?? '',
    pageSize: 3,
  })

  if (isError) {
    return null
  }

  if (!isLoading && articles.length === 0) {
    return null
  }

  return (
    <div className="relative overflow-hidden bg-[#DAF3F4] pb-32 pt-8">
      <div className="absolute left-0 top-0 h-full w-full bg-[url('/blog/related-blog-bg.svg')] bg-cover bg-center" />
      <div className="container relative z-10">
        <div className="mb-6 align-middle font-[Manrope] text-xl font-semibold leading-[130%] text-[#202222]">
          Related Topic
        </div>

        <div className="grid h-full w-full grid-cols-12 gap-8 pb-6">
          {isLoading && <ArticelItemSkeleton count={3} />}

          {articles.map((article) => (
            <ArticleItem
              article={article}
              key={article.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
