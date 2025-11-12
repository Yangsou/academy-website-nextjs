'use client'

import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCategoryGradient, getCategoryIcon, getCategoryReadTime } from '@/lib/blog-helpers'

import type { Article } from '@/lib/hooks/use-blog-data'

type VirtualArticleListProps = {
  articles: Article[]
  selectedCategory?: string
}

type ArticleRowProps = {
  index: number
  style: React.CSSProperties
  data: {
    articles: Article[]
    handleReadMore: (article: Article) => void
  }
}

/**
 * Individual article row component
 * Memoized to prevent unnecessary re-renders
 */
const ArticleRow = ({ index, style, data }: ArticleRowProps) => {
  const { articles, handleReadMore } = data
  const article = articles[index]

  if (!article) {
    return null
  }

  const categoryName = article.category?.name ?? 'default'
  const CategoryIcon = getCategoryIcon(categoryName)
  const gradient = getCategoryGradient(categoryName)
  const readTime = getCategoryReadTime(categoryName)

  return (
    <div style={style}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="px-4 py-4"
      >
        <Card className="group flex h-full flex-col overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50">
          {/* Image Thumbnail */}
          <div className="relative flex-shrink-0 overflow-hidden">
            <div className="relative aspect-[3/2] bg-gradient-to-br from-slate-700 to-slate-800">
              <Image
                src={article.cover_url ?? '/placeholder.svg'}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {/* Category badge */}
            <div className="absolute left-4 top-4">
              <div
                className={`flex items-center space-x-2 bg-gradient-to-r ${gradient} rounded-full px-3 py-1 backdrop-blur-sm`}
              >
                <CategoryIcon className="h-3 w-3 text-white" />
                <span className="text-xs font-medium text-white">
                  {article.category?.name ?? 'Uncategorized'}
                </span>
              </div>
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <CardContent className="flex flex-1 flex-col p-4">
            {/* Title */}
            <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-white transition-colors duration-300 group-hover:text-cyan-400">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-400">
              {article.description}
            </p>

            {/* Article Meta */}
            <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="h-3.5 w-3.5" />
                <span>{article.author?.name ?? 'Unknown Author'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Read time and Read more */}
            <div className="mt-auto flex items-center justify-between">
              <span className="flex items-center space-x-2 text-xs text-cyan-400">
                <Clock className="h-3.5 w-3.5" />
                <span>{readTime}</span>
              </span>
              <Button
                onClick={() => handleReadMore(article)}
                variant="ghost"
                className="font-spaceGrotesk text-cyan-400 hover:bg-cyan-500/10"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

/**
 * Virtual Article List Component
 * Renders only visible articles for optimal performance
 */
export default function VirtualArticleList({
  articles,
  selectedCategory,
}: VirtualArticleListProps) {
  const router = useRouter()

  // Filter articles based on selected category
  const filteredArticles = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') {
      return articles
    }

    return articles.filter((article) => article.category?.name === selectedCategory)
  }, [articles, selectedCategory])

  // Handle read more button click
  const handleReadMore = useCallback(
    (article: Article) => {
      const identifier = article.slug ?? article.documentId
      if (identifier) {
        router.push(`/blog/${identifier}`)
      } else {
        console.error('No slug or documentId found for article:', article)
      }
    },
    [router]
  )

  // Calculate item data for virtual list
  const itemData = useMemo(
    () => ({
      articles: filteredArticles,
      handleReadMore,
    }),
    [filteredArticles, handleReadMore]
  )

  // Calculate list height (3 rows visible at a time)
  const itemHeight = 480 // Height of each article card
  const visibleRows = 3
  const listHeight = itemHeight * visibleRows

  if (filteredArticles.length === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <p className="text-lg text-gray-400">
          {selectedCategory === 'All'
            ? 'No articles found.'
            : `No articles found in "${selectedCategory ?? 'selected'}" category.`}
        </p>
      </div>
    )
  }

  return (
    <List
      height={listHeight}
      itemCount={filteredArticles.length}
      itemSize={itemHeight}
      width="100%"
      itemData={itemData}
      className="scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-cyan-500"
    >
      {ArticleRow}
    </List>
  )
}
