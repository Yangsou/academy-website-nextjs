"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft, Clock, Tag } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
        const response = await fetch(`/api/articles/${params.documentId}`)
        const result = await response.json()

        if (response.ok) {
          setArticle(result.data.data)
        } else {
          console.error('Failed to fetch article:', result.error)
          setError('Failed to load article')
        }
      } catch (error) {
        console.error('Error fetching article:', error)
        setError('Failed to load article')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.documentId) {
      fetchArticleDetail()
    }
  }, [params.documentId])

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
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryGradient(article.category.slug)} text-white`}
              >
                <Tag className="w-3 h-3 mr-2" />
                {article.category.name}
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
                <span>{article.author.name}</span>
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
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    {article.short_description || article.description}
                  </p>
                  
                  {/* Full Content - For now showing description as content */}
                  <div className="text-gray-400 leading-relaxed space-y-4">
                    <p>
                      {article.description}
                    </p>
                    <p>
                      This is a placeholder for the full article content. In a real implementation, 
                      you would have rich text content from Strapi that could include headings, 
                      paragraphs, lists, images, and other formatted content.
                    </p>
                    <p>
                      The article would be fully populated with the actual content from your CMS, 
                      including any rich text formatting, embedded media, and structured data.
                    </p>
                  </div>
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-cyan-500/20">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{article.author.name}</p>
                        <p className="text-gray-400 text-sm">{article.author.email}</p>
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

      <Footer />
    </div>
  )
} 