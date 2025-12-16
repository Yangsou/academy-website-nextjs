/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
'use client'

import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { motion } from 'framer-motion'
import { ArrowLeft, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import RelatedBlog from '@/components/related-blog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCategoryReadTime } from '@/lib/blog-helpers'
import { useArticleDetail } from '@/lib/hooks/use-blog-data'
import { formatDateString } from '@/lib/utils'

import type { Article } from '@/lib/hooks/use-blog-data'
import type { BlocksContent } from '@strapi/blocks-react-renderer'
// Block interfaces based on Strapi response
type RichTextBlock = {
  __component: 'shared.rich-text'
  id: number
  body: string
}

type QuoteBlock = {
  __component: 'shared.quote'
  id: number
  title: string
  body: string
}

type ImageFormats = {
  large?: { url: string }
  medium?: { url: string }
  small?: { url: string }
  thumbnail?: { url: string }
}

type MediaFile = {
  id?: number
  url: string
  processed_url?: string
  alternativeText?: string | null
  caption?: string | null
  formats?: ImageFormats | null
}

type MediaBlock = {
  __component: 'shared.media'
  id: number
  desc?: string | null
  file?: MediaFile | null
}

type SliderBlock = {
  __component: 'shared.slider'
  id: number
  files?: Array<MediaFile | null | undefined> | null
}

type Block = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock

// Article detail interface based on Strapi response
type ArticleDetail = {
  id: number
  documentId: string
  title: string
  description: BlocksContent
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  short_description: string | null
  cover?: {
    url: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
      small?: { url: string }
      thumbnail?: { url: string }
    }
  }
  cover_url?: string
  category?: {
    id: number
    documentId: string
    name: string
    slug: string
    description: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  author?: {
    id: number
    documentId: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  } | null
  blocks?: Block[] | null
}

type NormalizedArticleDetail = ArticleDetail & {
  category: NonNullable<ArticleDetail['category']>
  author: NonNullable<ArticleDetail['author']>
  blocks: Block[]
}

const getStrapiBaseUrl = (): string =>
  process.env.NODE_ENV === 'development' ? (process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '') : ''

const resolveMediaUrl = (file: MediaFile | null | undefined): string => {
  if (!file) {
    return ''
  }

  if (file.processed_url) {
    return file.processed_url
  }

  const baseUrl = getStrapiBaseUrl()
  const candidate =
    file.formats?.large?.url ??
    file.formats?.medium?.url ??
    file.formats?.small?.url ??
    file.formats?.thumbnail?.url ??
    file.url

  if (!candidate) {
    return ''
  }

  return candidate.startsWith('http') ? candidate : `${baseUrl}${candidate}`
}

const getMediaAltText = (file: MediaFile | null | undefined, fallback: string): string => {
  if (!file) {
    return fallback
  }

  return file.alternativeText ?? file.caption ?? fallback
}

const isBlock = (block: Block | null | undefined): block is Block =>
  Boolean(block && typeof block === 'object' && '__component' in block)

const FALLBACK_CATEGORY: NonNullable<ArticleDetail['category']> = {
  id: 0,
  documentId: 'fallback-category',
  name: 'Uncategorized',
  slug: 'default',
  description: null,
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
}

const FALLBACK_AUTHOR: NonNullable<ArticleDetail['author']> = {
  id: 0,
  documentId: 'fallback-author',
  name: 'Unknown Author',
  email: 'unknown@example.com',
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
}

// Component to render markdown-like content
const RichTextRenderer = ({ content }: { content: string }) => {
  // Function to parse and render links within text
  const parseLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }

      // Add the link
      parts.push(
        <a
          key={`link-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline transition-colors hover:text-cyan-300"
        >
          {match[1]}
        </a>
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text after the last link
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  // Function to parse and render italic text
  const parseItalic = (text: string | React.ReactNode) => {
    if (typeof text !== 'string') return text

    const italicRegex = /\*([^*]+)\*/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = italicRegex.exec(text)) !== null) {
      // Add text before the italic
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }

      // Add the italic text
      parts.push(
        <em
          key={`italic-${match.index}`}
          className="italic"
        >
          {match[1]}
        </em>
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text after the last italic
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  // Main rendering function
  const renderContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        const headingText = line.replace('## ', '')
        return (
          <h2
            key={index}
            className="mb-4 mt-8 text-2xl font-bold text-white"
          >
            {parseItalic(headingText)}
          </h2>
        )
      }
      if (line.startsWith('### ')) {
        const headingText = line.replace('### ', '')
        return (
          <h3
            key={index}
            className="mb-3 mt-6 text-xl font-semibold text-white"
          >
            {parseItalic(headingText)}
          </h3>
        )
      }
      if (line.startsWith('- ')) {
        const listText = line.replace('- ', '')
        return (
          <li
            key={index}
            className="font-spaceGrotesk ml-4 text-gray-300"
          >
            {parseItalic(parseLinks(listText))}
          </li>
        )
      }
      if (line.trim() === '') {
        return <br key={index} />
      }
      return (
        <p
          key={index}
          className="font-spaceGrotesk mb-4 leading-relaxed text-gray-300"
        >
          {parseItalic(parseLinks(line))}
        </p>
      )
    })
  }

  return <div className="prose prose-invert max-w-none">{renderContent(content)}</div>
}

// Component to render quote blocks
const QuoteRenderer = ({ block }: { block: QuoteBlock }) => {
  return (
    <div className="my-8 rounded-r-lg border-l-4 border-cyan-400 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6">
      <div className="flex items-start space-x-3">
        <Quote className="mt-1 h-6 w-6 flex-shrink-0 text-cyan-400" />
        <div>
          <blockquote className="mb-2 text-lg italic text-gray-200">"{block.body}"</blockquote>
          <cite className="font-medium text-cyan-400">— {block.title}</cite>
        </div>
      </div>
    </div>
  )
}

// Component to render media blocks
const MediaRenderer = ({ block }: { block: MediaBlock }) => {
  const { file } = block
  if (!file?.url) {
    return null
  }

  const imageUrl = resolveMediaUrl(file)
  if (!imageUrl) {
    return null
  }

  return (
    <div className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-800">
        <Image
          src={imageUrl}
          alt={block.desc ?? getMediaAltText(file, 'Article media')}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>
      {block.desc && <p className="mt-2 text-center text-sm italic text-gray-400">{block.desc}</p>}
    </div>
  )
}

// Component to render slider blocks
const SliderRenderer = ({ block }: { block: SliderBlock }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const files = block.files ?? []
  if (files.length === 0) {
    return null
  }

  const normalizedFiles = files.filter((file): file is MediaFile => Boolean(file?.url))
  if (normalizedFiles.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % normalizedFiles.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + normalizedFiles.length) % normalizedFiles.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const activeIndex =
    ((currentSlide % normalizedFiles.length) + normalizedFiles.length) % normalizedFiles.length
  const activeFile = normalizedFiles[activeIndex] ?? null
  const activeImageUrl = resolveMediaUrl(activeFile)

  if (!activeFile || !activeImageUrl) {
    return null
  }

  return (
    <div className="my-8">
      <div className="group relative">
        {/* Main Slider Container */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-800">
          <motion.div
            key={activeIndex}
            className="relative h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={activeImageUrl}
              alt={getMediaAltText(activeFile, `Slider image ${activeIndex + 1}`)}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority={activeIndex === 0}
            />
          </motion.div>

          {/* Navigation Arrows */}
          {normalizedFiles.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-black/70 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-black/70 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Slide Counter */}
          {normalizedFiles.length > 1 && (
            <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {activeIndex + 1} / {normalizedFiles.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {normalizedFiles.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {normalizedFiles.map((file, index) => {
              const thumbnailUrl = resolveMediaUrl(file)
              if (!thumbnailUrl) {
                return null
              }

              return (
                <button
                  key={file.id ?? index}
                  onClick={() => goToSlide(index)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    index === activeIndex
                      ? 'scale-105 border-cyan-400'
                      : 'border-slate-600 hover:border-slate-400'
                  }`}
                >
                  <Image
                    src={thumbnailUrl}
                    alt={getMediaAltText(file, `Thumbnail ${index + 1}`)}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// Component to render blocks
const BlockRenderer = ({ block }: { block: Block }) => {
  switch (block.__component) {
    case 'shared.rich-text':
      return <RichTextRenderer content={block.body} />
    case 'shared.quote':
      return <QuoteRenderer block={block} />
    case 'shared.media':
      return <MediaRenderer block={block} />
    case 'shared.slider':
      return <SliderRenderer block={block} />
    default:
      return null
  }
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()

  const slugParam = params.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : (slugParam ?? '')

  const { article: rawArticle, isLoading, isError } = useArticleDetail(slug)

  const article = useMemo<NormalizedArticleDetail | null>(() => {
    if (!rawArticle) return null

    const blocks = 'blocks' in rawArticle ? (rawArticle.blocks as Block[] | undefined) : undefined

    return {
      ...rawArticle,
      slug: rawArticle.slug ?? rawArticle.documentId,
      category: rawArticle.category ?? FALLBACK_CATEGORY,
      author: rawArticle.author ?? FALLBACK_AUTHOR,
      blocks: (blocks ?? []).filter(isBlock),
    } as unknown as NormalizedArticleDetail
  }, [rawArticle])

  const handleBackToBlog = () => {
    router.push('/blog')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden text-white">
        <Navigation />
        <main className="relative z-10 pt-16">
          <div className="container py-20">
            <div className="animate-pulse">
              <div className="mb-4 h-8 rounded bg-slate-300" />
              <div className="mb-8 h-12 rounded bg-slate-300" />
              <div className="mb-8 aspect-video rounded bg-slate-300" />
              <div className="space-y-4">
                <div className="h-4 rounded bg-slate-300" />
                <div className="h-4 rounded bg-slate-300" />
                <div className="h-4 w-3/4 rounded bg-slate-300" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (isError || (!isLoading && !article)) {
    return (
      <div className="min-h-screen overflow-x-hidden text-white">
        <Navigation />
        <main className="relative z-10 pt-16">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h1 className="mb-4 text-2xl font-bold text-red-400">Article Not Found</h1>
            <p className="mb-8 text-gray-400">
              {isError
                ? 'Failed to load the article. Please try again later.'
                : 'The article you are looking for does not exist.'}
            </p>
            <Button
              onClick={handleBackToBlog}
              className="font-spaceGrotesk bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Article must exist at this point (checked above)
  if (!article) {
    return null
  }

  // Handle missing fields gracefully
  const { category, blocks, publishedAt, description } = article

  return (
    <div className="relative z-10 min-h-[calc(100vh_-_240px)] pt-16">
      <ErrorBoundary>
        <div className="container mx-auto py-20">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            {/* Category Badge */}
            <div className="mb-6 flex items-center space-x-3">
              <span className="font-[Manrope] text-[24px] font-semibold uppercase leading-[140%] text-[#00C8B3]">
                {category?.name}
              </span>
              <p>{formatDateString(publishedAt)}</p>
              <p>{getCategoryReadTime(article as unknown as Article)}</p>
            </div>

            {/* Title */}
            <h1 className="font-[Manrope] text-[28px] font-semibold leading-[130%] text-[#202222]">
              {article.title}
            </h1>
          </motion.div>

          {/* Featured Image */}
          {article.cover_url && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-800">
                <Image
                  src={article.cover_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="border-transparent shadow-none">
              <CardContent className="p-0">
                <BlocksRenderer content={description ?? []} />

                {/* Blocks Content */}
                {blocks.length > 0 && (
                  <div className="space-y-6">
                    {blocks.map((block, index) => (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                      >
                        <BlockRenderer block={block} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Article Footer */}
                {/* <div className="mt-12 border-t border-cyan-500/20 pt-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                          <User className="h-6 w-6 text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{author.name}</p>
                          <p className="text-sm text-gray-400">{author.email}</p>
                        </div>
                      </div>
                      <Button
                        onClick={handleBackToBlog}
                        variant="outline"
                        className="font-spaceGrotesk border-cyan-500/30 text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                      </Button>
                    </div>
                  </div> */}
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <RelatedBlog
            categoryName={article.category.name}
            excludeSlug={slug ?? ''}
          />
        </motion.div>
      </ErrorBoundary>
    </div>
  )
}
