"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Brain, Heart, HelpCircle, Users, Lightbulb, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const blogPosts = [
  {
    id: 1,
    category: "AI & Humanity",
    icon: Brain,
    title: "AI & Humanity: The Symbiotic Future",
    excerpt:
      "Exploring how artificial intelligence and human consciousness can evolve together, creating a future where technology amplifies rather than replaces human potential.",
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400&text=AI+Symbiosis",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    category: "Inner Balance",
    icon: Heart,
    title: "Finding Your Rhythm in a Digital World",
    excerpt:
      "Practical strategies for maintaining emotional and energetic balance while embracing technological advancement in our daily lives.",
    author: "Marcus Rodriguez",
    date: "2024-01-12",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400&text=Digital+Balance",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 3,
    category: "Right Questions",
    icon: HelpCircle,
    title: "Asking Better Questions in a Chaotic World",
    excerpt:
      "How to navigate information overload by developing the skill of asking more meaningful and purposeful questions that lead to clarity.",
    author: "Dr. Amara Okafor",
    date: "2024-01-10",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400&text=Better+Questions",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    category: "User Stories",
    icon: Users,
    title: "Sarah's Journey: From Burnout to Balanced Living",
    excerpt:
      "A real user's transformation story of how conscious AI integration helped her reclaim work-life balance and rediscover her natural rhythms.",
    author: "Community Team",
    date: "2024-01-08",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400&text=Success+Story",
    gradient: "from-pink-500 to-red-600",
  },
  {
    id: 5,
    category: "AI & Humanity",
    icon: Brain,
    title: "The Ethics of Conscious AI: Building Technology with Intention",
    excerpt:
      "Examining the ethical considerations and responsibilities in developing AI that serves human consciousness and promotes collective well-being.",
    author: "Dr. Sarah Chen",
    date: "2024-01-05",
    readTime: "9 min read",
    image: "/placeholder.svg?height=200&width=400&text=AI+Ethics",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 6,
    category: "Inner Balance",
    icon: Heart,
    title: "Energy Management in the Age of AI",
    excerpt:
      "Understanding how to maintain and optimize your personal energy while working alongside artificial intelligence systems in modern workplaces.",
    author: "Marcus Rodriguez",
    date: "2024-01-03",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400&text=Energy+Management",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 7,
    category: "Right Questions",
    icon: HelpCircle,
    title: "The Art of Conscious Decision Making",
    excerpt:
      "Developing frameworks for making decisions that align with your values and long-term vision in an increasingly complex world.",
    author: "Dr. Amara Okafor",
    date: "2024-01-01",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400&text=Decision+Making",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 8,
    category: "Innovation",
    icon: Lightbulb,
    title: "Mindful Innovation: Creating Technology That Serves",
    excerpt:
      "How to approach technological innovation with mindfulness, ensuring that new developments truly serve human flourishing and well-being.",
    author: "Elena Vasquez",
    date: "2023-12-28",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400&text=Mindful+Innovation",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 9,
    category: "Future Vision",
    icon: Zap,
    title: "The Next Decade of Human-AI Collaboration",
    excerpt:
      "Exploring emerging trends and possibilities for human-AI collaboration that could reshape how we work, learn, and live together.",
    author: "Dr. James Liu",
    date: "2023-12-25",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=400&text=Future+Vision",
    gradient: "from-green-500 to-emerald-600",
  },
]

// Category interface based on Strapi response
interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  articles: Array<{
    id: number
    documentId: string
    title: string
    description: string
    slug: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    short_description: string | null
  }>
}

// Article interface based on Strapi response
interface Article {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  short_description: string | null
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
  author?: {
    id: number
    documentId: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  cover_url?: string
}

export default function BlogSection() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [articlesLoading, setArticlesLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [articlesError, setArticlesError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const result = await response.json()

      if (response.ok) {
        setCategories(result.data.data || [])
      } else {
        console.error('Failed to fetch categories:', result.error)
        setError('Failed to load categories')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Failed to load categories')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch articles function
  const fetchArticles = async (page: number = 1, append: boolean = false) => {
    try {
      const response = await fetch(`/api/articles?page=${page}&pageSize=10`)
      const result = await response.json()

      if (response.ok) {
        const newArticles = result.data.data || []
        const pagination = result.data.meta?.pagination
        
        if (append) {
          setArticles(prev => [...prev, ...newArticles])
        } else {
          setArticles(newArticles)
        }
        
        // Check if there are more pages
        if (pagination) {
          setHasMorePages(page < pagination.pageCount)
        }
      } else {
        console.error('Failed to fetch articles:', result.error)
        setArticlesError('Failed to load articles')
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      setArticlesError('Failed to load articles')
    } finally {
      setArticlesLoading(false)
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchArticles(1, false)
  }, [])

  // Calculate total articles count from articles data
  const totalArticlesCount = articles.length

  // Create categories array with "All" option
  const categoriesWithAll = [
    { name: "All", count: totalArticlesCount, slug: "all" },
    ...categories.map(category => ({
      name: category.name,
      count: articles.filter(article => article.category?.slug === category.slug).length,
      slug: category.slug
    }))
  ]

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category?.name === selectedCategory)

  // Helper function to get gradient color based on category
  const getCategoryGradient = (categoryName: string): string => {
    const gradients: { [key: string]: string } = {
      'tech': 'from-cyan-500 to-blue-600',
      'news': 'from-blue-500 to-purple-600',
      'food': 'from-amber-500 to-orange-600',
      'nature': 'from-green-500 to-emerald-600',
      'story': 'from-pink-500 to-rose-600',
      'default': 'from-slate-500 to-gray-600'
    }
    return gradients[categoryName] || gradients.default
  }

  // Helper function to get icon based on category
  const getCategoryIcon = (categoryName: string) => {
    const icons: { [key: string]: any } = {
      'tech': Brain,
      'news': Users,
      'food': Heart,
      'nature': Lightbulb,
      'story': HelpCircle,
      'default': Zap
    }
    return icons[categoryName] || icons.default
  }

  // Handle read more button click
  const handleReadMore = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  // Handle load more articles
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMorePages) return
    
    setIsLoadingMore(true)
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    await fetchArticles(nextPage, true)
  }

  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Ecosystem Thinking
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Deep insights on AI, humanity, and conscious living. Explore our thoughts on building a more intentional
            relationship with technology.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {isLoading ? (
            // Loading skeleton for categories
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-9 w-24 bg-slate-800 rounded-lg animate-pulse"
              />
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-4">
              <p className="text-red-400 text-sm">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 px-4 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded text-sm transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          ) : (
            // Categories
            categoriesWithAll.map((category) => (
              <Button
                key={category.slug}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={`border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 ${
                  selectedCategory === category.name 
                    ? 'bg-cyan-500/20 border-cyan-400/50' 
                    : 'bg-slate-800/30'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs bg-cyan-500/20 px-2 py-0.5 rounded-full">{category.count}</span>
              </Button>
            ))
          )}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesLoading ? (
            // Loading skeleton for articles
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border border-cyan-500/20 transition-all duration-300 h-full group overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-slate-700 rounded mb-3 animate-pulse"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-3 bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-3 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-slate-700 rounded w-20 animate-pulse"></div>
                      <div className="h-3 bg-slate-700 rounded w-16 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : articlesError ? (
            // Error state for articles
            <div className="col-span-full text-center py-12">
              <p className="text-red-400 text-lg">{articlesError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          ) : filteredArticles.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">
                {selectedCategory === "All" 
                  ? "No articles found." 
                  : `No articles found in "${selectedCategory}" category.`
                }
              </p>
            </div>
          ) : (
            // Articles
            filteredArticles.map((article, index) => {
              const CategoryIcon = getCategoryIcon(article.category?.slug || 'default')
              const gradient = getCategoryGradient(article.category?.slug || 'default')
              
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 h-full group overflow-hidden">
                    {/* Image Thumbnail */}
                    <div className="relative overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800">
                        {article.cover_url ? (
                          <img
                            src={article.cover_url}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <img
                            src="/placeholder.svg"
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={`flex items-center space-x-2 bg-gradient-to-r ${gradient} px-3 py-1 rounded-full backdrop-blur-sm`}
                        >
                          <CategoryIcon className="w-3 h-3 text-white" />
                          <span className="text-white text-xs font-medium">{article.category?.name || 'Uncategorized'}</span>
                        </div>
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {article.short_description || article.description}
                      </p>

                      {/* Meta information */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{article.author?.name || 'Anonymous'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className="text-cyan-400">5 min read</span>
                      </div>

                      {/* Read More Button */}
                      <Button
                        variant="ghost"
                        onClick={() => handleReadMore(article.slug)}
                        className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 p-0 h-auto justify-start group/btn border-t border-cyan-500/20 pt-4"
                      >
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>

                    {/* Subtle glow effect on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                    />
                    <div
                      className={`absolute -inset-1 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none blur-xl -z-10`}
                    />
                  </Card>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Load More Button */}
        {hasMorePages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white border-0 px-8 py-3 text-lg font-medium group shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              {isLoadingMore ? (
                <>
                  Loading...
                  <div className="ml-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  Load More Articles
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
