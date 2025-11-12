/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

import { fetcher } from '@/lib/swr-config'

export type Category = {
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

export type Article = {
  id: number
  documentId: string
  title: string
  description: string
  slug?: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  short_description: string | null
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
  cover_url?: string
}

export type ArticleDetail = Article & {
  content?: Array<{
    type: string
    children?: Array<{
      type: string
      text?: string
      bold?: boolean
      italic?: boolean
      underline?: boolean
      code?: boolean
    }>
    level?: number
    format?: string
    url?: string
    image?: {
      name: string
      url: string
      width: number
      height: number
      mime: string
    }
  }>
  media?: Array<{
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
      thumbnail?: { url: string }
      small?: { url: string }
      medium?: { url: string }
      large?: { url: string }
    }
    url: string
    mime: string
    size: number
    createdAt: string
    updatedAt: string
    publishedAt: string
  }>
  slider?: Array<{
    id: number
    __component: string
    file?: {
      id: number
      documentId: string
      name: string
      alternativeText: string | null
      caption: string | null
      width: number
      height: number
      url: string
      mime: string
    }
  }>
}

type CategoriesApiResponse = {
  data?: Category[]
  error?: string
  success?: boolean
}

type ArticlesApiResponse = {
  data?: Article[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  error?: string
  success?: boolean
}

type ArticleDetailApiResponse = {
  data?: ArticleDetail
  error?: string
  success?: boolean
}

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<CategoriesApiResponse>(
    '/api/categories',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    categories: data?.data ?? [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useArticles(page = 1, pageSize = 10) {
  const { data, error, isLoading, mutate } = useSWR<ArticlesApiResponse>(
    `/api/articles?page=${page}&pageSize=${pageSize}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  )

  return {
    articles: data?.data ?? [],
    pagination: data?.meta?.pagination,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useInfiniteArticles(pageSize = 10) {
  const getKey = (pageIndex: number, previousPageData: ArticlesApiResponse | null) => {
    if (previousPageData && !previousPageData.data?.length) return null

    return `/api/articles?page=${pageIndex + 1}&pageSize=${pageSize}`
  }

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite<ArticlesApiResponse>(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateAll: false,
    }
  )

  const articles = data?.flatMap((page) => page.data ?? []) ?? []

  const pagination = data?.[data.length - 1]?.meta?.pagination
  const hasMore = pagination ? size < pagination.pageCount : false

  const loadMore = () => {
    if (!isLoading && hasMore) {
      void setSize(size + 1)
    }
  }

  return {
    articles,
    isLoading,
    isError: error,
    hasMore,
    loadMore,
    size,
    mutate,
  }
}

export function useArticleDetail(identifier: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<ArticleDetailApiResponse>(
    identifier ? `/api/articles/${identifier}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  )

  return {
    article: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
