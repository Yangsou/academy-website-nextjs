/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCategoryGradient, getCategoryIcon, getCategoryReadTime } from '@/lib/blog-helpers'
import { useCategories, useInfiniteArticles, type Article } from '@/lib/hooks/use-blog-data'

export default function BlogSection() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Use SWR hooks for data fetching with automatic caching
  const { categories, isLoading, isError } = useCategories()
  const {
    articles,
    isLoading: articlesLoading,
    isError: articlesError,
    hasMore,
    loadMore,
  } = useInfiniteArticles(10)

  // Calculate total articles count from articles data
  const totalArticlesCount = articles.length

  const categoryArticleCounts = useMemo(() => {
    return articles.reduce<Record<string, number>>((acc, article) => {
      const slug = article.category?.slug
      if (slug) {
        acc[slug] = (acc[slug] ?? 0) + 1
      }
      return acc
    }, {})
  }, [articles])

  // Create categories array with "All" option
  const categoriesWithAll = useMemo(() => {
    return [
      { name: 'All', count: totalArticlesCount, slug: 'all' as const },
      ...categories.map((category) => ({
        name: category.name,
        count: categoryArticleCounts[category.slug] ?? 0,
        slug: category.slug,
      })),
    ]
  }, [categories, categoryArticleCounts, totalArticlesCount])

  const renderCategoryFilters = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <motion.span
          key={index}
          className="h-10 w-32 animate-pulse rounded-full bg-slate-800"
        />
      ))
    }

    if (isError) {
      return (
        <div className="col-span-full py-4 text-center">
          <p className="text-sm text-red-400">Failed to load categories</p>
          <button
            onClick={() => window.location.reload()}
            className="font-spaceGrotesk mt-2 rounded bg-cyan-500 px-4 py-1 text-sm text-white transition-colors duration-300 hover:bg-cyan-600"
          >
            Try Again
          </button>
        </div>
      )
    }

    return categoriesWithAll.map((category) => {
      const isSelected = selectedCategory === category.name
      const baseClass =
        'border-cyan-500/30 text-cyan-400 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10'
      const activeClass = isSelected ? 'border-cyan-400/50 bg-cyan-500/20' : 'bg-slate-800/30'

      return (
        <Button
          key={category.slug}
          variant="outline"
          size="sm"
          onClick={() => setSelectedCategory(category.name)}
          className={`${baseClass} ${activeClass}`}
        >
          {category.name}
          <span className="ml-2 rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs">
            {category.count}
          </span>
        </Button>
      )
    })
  }

  // Filter articles based on selected category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') {
      return articles
    }

    return articles.filter((article) => article.category?.name === selectedCategory)
  }, [articles, selectedCategory])

  const renderArticleGrid = () => {
    if (articlesLoading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="group h-full overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm transition-all duration-300">
            <div className="aspect-video animate-pulse bg-gradient-to-br from-slate-700 to-slate-800" />
            <CardContent className="p-6">
              <div className="mb-3 h-6 animate-pulse rounded bg-slate-700" />
              <div className="mb-4 space-y-2">
                <div className="h-3 animate-pulse rounded bg-slate-700" />
                <div className="h-3 animate-pulse rounded bg-slate-700" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-slate-700" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-20 animate-pulse rounded bg-slate-700" />
                <div className="h-3 w-16 animate-pulse rounded bg-slate-700" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))
    }

    if (articlesError) {
      return (
        <div className="col-span-full py-12 text-center">
          <p className="text-lg text-red-400">Failed to load articles</p>
          <button
            onClick={() => window.location.reload()}
            className="font-spaceGrotesk mt-4 rounded-lg bg-cyan-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-cyan-600"
          >
            Try Again
          </button>
        </div>
      )
    }

    if (filteredArticles.length === 0) {
      return (
        <div className="col-span-full py-12 text-center">
          <p className="text-lg text-gray-400">
            {selectedCategory === 'All'
              ? 'No articles found.'
              : `No articles found in "${selectedCategory}" category.`}
          </p>
        </div>
      )
    }

    return filteredArticles.map((article, index) => {
      const categoryName = article.category?.name ?? 'default'
      const CategoryIcon = getCategoryIcon(categoryName)
      const gradient = getCategoryGradient(categoryName)
      const readTime = getCategoryReadTime(categoryName)

      return (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -8, scale: 1.02 }}
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
      )
    })
  }

  // Handle read more button click
  const handleReadMore = useCallback(
    (article: Article) => {
      // Use slug if available, otherwise fallback to documentId
      const identifier = article.slug ?? article.documentId
      if (identifier) {
        router.push(`/blog/${identifier}`)
      } else {
        console.error('No slug or documentId found for article:', article)
      }
    },
    [router]
  )

  // Handle load more articles
  const handleLoadMore = useCallback(() => {
    loadMore()
  }, [loadMore])

  return (
    <section
      id="blog"
      className="relative py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Ecosystem Thinking
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400">
            Deep insights on AI, humanity, and conscious living. Explore our thoughts on building a
            more intentional relationship with technology.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {renderCategoryFilters()}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{renderArticleGrid()}</div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              onClick={handleLoadMore}
              disabled={articlesLoading}
              className="font-spaceGrotesk group border-0 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {articlesLoading ? (
                <>
                  Loading...
                  <div className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </>
              ) : (
                <>
                  Load More Articles
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
