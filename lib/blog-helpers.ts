import { Brain, Heart, HelpCircle, Users, Zap, type LucideIcon } from 'lucide-react'

import type { Article } from './hooks/use-blog-data'

export const getCategoryGradient = (categoryName: string | null | undefined): string => {
  const gradients: Record<string, string> = {
    'ai-humanity': 'from-cyan-500 to-blue-600',
    'inner-balance': 'from-blue-500 to-purple-600',
    'right-questions': 'from-purple-500 to-pink-600',
    'real-stories': 'from-pink-500 to-rose-600',
    'ai & humanity': 'from-cyan-500 to-blue-600',
    'inner balance': 'from-blue-500 to-purple-600',
    'right questions in a chaotic world': 'from-purple-500 to-pink-600',
    'real stories from ai+di users': 'from-pink-500 to-rose-600',
    default: 'from-slate-500 to-gray-600',
  }
  const normalized = categoryName?.toLowerCase() ?? 'default'
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return gradients[normalized] ?? gradients.default!
}

/**
 * Helper function to get icon based on category
 */
export const getCategoryIcon = (categoryName: string | null | undefined): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    'ai-humanity': Brain,
    'inner-balance': Heart,
    'right-questions': HelpCircle,
    'real-stories': Users,
    'ai & humanity': Brain,
    'inner balance': Heart,
    'right questions in a chaotic world': HelpCircle,
    'real stories from ai+di users': Users,
    default: Zap,
  }
  const normalized = categoryName?.toLowerCase() ?? 'default'
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return icons[normalized] ?? icons.default!
}

/**
 * Helper function to get read time based on category
 */
export const getCategoryReadTime = (article?: Article): string => {
  if (!article) return ''

  const { category, readingTime } = article
  const categoryName = category?.name
  const readTimes: Record<string, string> = {
    'ai-humanity': '8 min read',
    'inner-balance': '6 min read',
    'right-questions': '7 min read',
    'real-stories': '5 min read',
    'ai & humanity': '8 min read',
    'inner balance': '6 min read',
    'right questions in a chaotic world': '7 min read',
    'real stories from ai+di users': '5 min read',
    default: '6 min read',
  }
  const normalized = categoryName?.toLowerCase() ?? 'default'
  return readingTime
    ? `${readingTime.toString()} min read`
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (readTimes[normalized] ?? readTimes.default!)
}
