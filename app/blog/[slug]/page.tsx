"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft, Clock, Tag, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import ContactSection from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Block interfaces based on Strapi response
interface RichTextBlock {
  __component: "shared.rich-text"
  id: number
  body: string
}

interface QuoteBlock {
  __component: "shared.quote"
  id: number
  title: string
  body: string
}

interface MediaBlock {
  __component: "shared.media"
  id: number
  desc?: string | null
  file?: {
    id?: number
    url: string
    processed_url?: string
    alternativeText?: string
    caption?: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
      small?: { url: string }
      thumbnail?: { url: string }
    }
  }
}

interface SliderBlock {
  __component: "shared.slider"
  id: number
  files?: Array<{
    id?: number
    url: string
    processed_url?: string
    alternativeText?: string
    caption?: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
      small?: { url: string }
      thumbnail?: { url: string }
    }
  }>
}

type Block = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock

// Article detail interface based on Strapi response
interface ArticleDetail {
  id: number
  documentId: string
  title: string
  description: string
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
  category: {
    id: number
    documentId: string
    name: string
    slug: string
    description: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  author: {
    id: number
    documentId: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  blocks: Block[]
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
          className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
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
        <em key={`italic-${match.index}`} className="italic">
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
          <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
            {parseItalic(headingText)}
          </h2>
        )
      }
      if (line.startsWith('### ')) {
        const headingText = line.replace('### ', '')
        return (
          <h3 key={index} className="text-xl font-semibold text-white mt-6 mb-3">
            {parseItalic(headingText)}
          </h3>
        )
      }
      if (line.startsWith('- ')) {
        const listText = line.replace('- ', '')
        return (
          <li key={index} className="text-gray-300 ml-4">
            {parseItalic(parseLinks(listText))}
          </li>
        )
      }
      if (line.trim() === '') {
        return <br key={index} />
      }
      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-4">
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
    <div className="my-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-400 rounded-r-lg">
      <div className="flex items-start space-x-3">
        <Quote className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
        <div>
          <blockquote className="text-lg text-gray-200 italic mb-2">
            "{block.body}"
          </blockquote>
          <cite className="text-cyan-400 font-medium">— {block.title}</cite>
        </div>
      </div>
    </div>
  )
}

// Component to render media blocks
const MediaRenderer = ({ block }: { block: MediaBlock }) => {
  if (!block.file) return null

  const getImageUrl = (file: any) => {
    // Use processed URL if available, otherwise fallback to original logic
    if (file.processed_url) {
      return file.processed_url
    }
    
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? process.env.NEXT_PUBLIC_STRAPI_API_URL 
      : ''
    
    if (file.formats?.large?.url) {
      return `${baseUrl}${file.formats.large.url}`
    }
    if (file.formats?.medium?.url) {
      return `${baseUrl}${file.formats.medium.url}`
    }
    return `${baseUrl}${file.url}`
  }

  return (
    <div className="my-8">
      <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl overflow-hidden">
        <img
          src={getImageUrl(block.file)}
          alt={block.desc || block.file.alternativeText || block.file.caption || "Article media"}
          className="w-full h-full object-cover"
        />
      </div>
      {block.desc && (
        <p className="text-gray-400 text-sm mt-2 text-center italic">
          {block.desc}
        </p>
      )}
    </div>
  )
}

// Component to render slider blocks
const SliderRenderer = ({ block }: { block: SliderBlock }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  if (!block.files || block.files.length === 0) return null

  const getImageUrl = (file: any) => {
    // Use processed URL if available, otherwise fallback to original logic
    if (file.processed_url) {
      return file.processed_url
    }
    
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? process.env.NEXT_PUBLIC_STRAPI_API_URL 
      : ''
    
    if (file.formats?.large?.url) {
      return `${baseUrl}${file.formats.large.url}`
    }
    if (file.formats?.medium?.url) {
      return `${baseUrl}${file.formats.medium.url}`
    }
    return `${baseUrl}${file.url}`
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % block.files!.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + block.files!.length) % block.files!.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="my-8">
      <div className="relative group">
        {/* Main Slider Container */}
        <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl overflow-hidden">
          <motion.img
            key={currentSlide}
            src={getImageUrl(block.files![currentSlide])}
            alt={block.files![currentSlide].alternativeText || block.files![currentSlide].caption || `Slider image ${currentSlide + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Navigation Arrows */}
          {block.files!.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          {/* Slide Counter */}
          {block.files!.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentSlide + 1} / {block.files!.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {block.files!.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {block.files!.map((file, index) => (
              <button
                key={file.id || index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentSlide 
                    ? 'border-cyan-400 scale-105' 
                    : 'border-slate-600 hover:border-slate-400'
                }`}
              >
                <img
                  src={getImageUrl(file)}
                  alt={file.alternativeText || file.caption || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Component to render blocks
const BlockRenderer = ({ block }: { block: Block }) => {
  switch (block.__component) {
    case "shared.rich-text":
      return <RichTextRenderer content={block.body} />
    case "shared.quote":
      return <QuoteRenderer block={block} />
    case "shared.media":
      return <MediaRenderer block={block} />
    case "shared.slider":
      return <SliderRenderer block={block} />
    default:
      return null
  }
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        console.log('Looking for slug:', params.slug)
        
        // First, fetch all articles to find the one with matching slug
        const articlesResponse = await fetch('/api/articles')
        const articlesResult = await articlesResponse.json()

        if (!articlesResponse.ok) {
          throw new Error('Failed to fetch articles')
        }

        console.log('Available articles:', articlesResult.data.data.map((a: any) => ({ slug: a.slug, title: a.title })))

        // Find the article with matching slug
        const targetArticle = articlesResult.data.data.find((article: any) => 
          article.slug === params.slug
        )

        console.log('Target article found:', targetArticle)

        if (!targetArticle) {
          setError('Article not found')
          setIsLoading(false)
          return
        }

        // Now fetch the detailed article using the documentId
        const detailResponse = await fetch(`/api/articles/${targetArticle.documentId}`)
        const detailResult = await detailResponse.json()

        if (detailResponse.ok) {
          setArticle(detailResult.data.data)
        } else {
          console.error('Failed to fetch article:', detailResult.error)
          setError('Failed to load article')
        }
      } catch (error) {
        console.error('Error fetching article:', error)
        setError('Failed to load article')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      fetchArticleDetail()
    }
  }, [params.slug])

  const handleBackToBlog = () => {
    router.push('/blog')
  }

  // Helper function to get gradient color based on category
  const getCategoryGradient = (categorySlug: string): string => {
    const gradients: { [key: string]: string } = {
      'tech': 'from-cyan-500 to-blue-600',
      'news': 'from-blue-500 to-purple-600',
      'food': 'from-amber-500 to-orange-600',
      'nature': 'from-green-500 to-emerald-600',
      'story': 'from-pink-500 to-rose-600',
      'default': 'from-slate-500 to-gray-600'
    }
    return gradients[categorySlug] || gradients.default
  }

  // Handle missing fields gracefully
  const category = article?.category || { name: 'Uncategorized', slug: 'default' }
  const author = article?.author || { name: 'Unknown Author', email: 'unknown@example.com' }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        <AnimatedBackground />
        <Navigation />
        <main className="relative z-10 pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-800 rounded mb-4"></div>
              <div className="h-12 bg-slate-800 rounded mb-8"></div>
              <div className="aspect-video bg-slate-800 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-800 rounded"></div>
                <div className="h-4 bg-slate-800 rounded"></div>
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        <AnimatedBackground />
        <Navigation />
        <main className="relative z-10 pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">{error || 'The article you are looking for does not exist.'}</p>
            <Button
              onClick={handleBackToBlog}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button
              onClick={handleBackToBlog}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryGradient(category.slug)} text-white`}
              >
                <Tag className="w-3 h-3 mr-2" />
                {category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {article.title}
              </span>
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          {article.cover_url && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl overflow-hidden">
                <img
                  src={article.cover_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
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
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border border-cyan-500/20">
              <CardContent className="p-8">
                {/* Description */}
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {article.short_description || article.description}
                  </p>
                </div>
                
                {/* Blocks Content */}
                {article.blocks && article.blocks.length > 0 ? (
                  <div className="space-y-6">
                    {article.blocks.map((block, index) => (
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
                ) : (
                  <div className="text-gray-400 leading-relaxed space-y-4">
                    <p>
                      {article.description}
                    </p>
                    <p>
                      This is a placeholder for the full article content. In a real implementation, 
                      you would have rich text content from Strapi that could include headings, 
                      paragraphs, lists, images, and other formatted content.
                    </p>
                  </div>
                )}

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-cyan-500/20">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{author.name}</p>
                        <p className="text-gray-400 text-sm">{author.email}</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleBackToBlog}
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back to Blog
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <ContactSection />

      <Footer />
    </div>
  )
} 