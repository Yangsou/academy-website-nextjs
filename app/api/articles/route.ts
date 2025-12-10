import axios, { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { requireEnv, trimTrailingSlash } from '@/lib/env'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { NextRequest } from 'next/server'

type ArticleListItem = {
  cover?: {
    url?: string | null
    data?: {
      attributes?: {
        url?: string | null
        formats?: Record<string, { url?: string | null } | null> | null
      } | null
    } | null
    formats?: Record<string, { url?: string | null } | null> | null
  } | null
  cover_url?: string | null
  slug?: string | null
} & Record<string, unknown>

type ArticleListMeta = {
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

type ArticleListResponse = {
  data: ArticleListItem[]
  meta?: ArticleListMeta
} & Record<string, unknown>

const FORMAT_PRIORITY = ['large', 'medium', 'small', 'thumbnail']

const extractUrlFromFormats = (
  formats: Record<string, { url?: string | null } | null> | null | undefined
): string | null => {
  if (!formats) {
    return null
  }

  for (const key of FORMAT_PRIORITY) {
    const format = formats[key]
    if (format?.url && format.url.trim().length > 0) {
      return format.url
    }
  }

  return null
}

const getMediaSourceUrl = (media: ArticleListItem['cover']): string | null => {
  if (!media) {
    return null
  }

  if (typeof media.url === 'string' && media.url.trim().length > 0) {
    return media.url
  }

  const directFormatUrl = extractUrlFromFormats(media.formats ?? undefined)
  if (directFormatUrl) {
    return directFormatUrl
  }

  const dataAttributes = media.data?.attributes
  if (dataAttributes) {
    if (typeof dataAttributes.url === 'string' && dataAttributes.url.trim().length > 0) {
      return dataAttributes.url
    }

    const attributeFormatUrl = extractUrlFromFormats(dataAttributes.formats ?? undefined)
    if (attributeFormatUrl) {
      return attributeFormatUrl
    }
  }

  return null
}

const resolveUrl = (baseUrl: string, value: string | null): string | null => {
  if (!value) {
    return null
  }

  return /^https?:\/\//.test(value) ? value : `${baseUrl}${value}`
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') ?? '1'
    const pageSize = searchParams.get('pageSize') ?? '10'
    const baseUrl = trimTrailingSlash(requireEnv('STRAPI_API_URL'))
    const apiKey = requireEnv('STRAPI_API_KEY')
    const highlight = searchParams.get('highlight')
    const category = searchParams.get('category')
    const isPopular = searchParams.get('popular')
    const excludeSlug = searchParams.get('excludeSlug')

    const newSearchParams = new URLSearchParams()
    newSearchParams.set('populate', 'category')
    newSearchParams.append('populate', 'author')
    newSearchParams.append('populate', 'cover')
    newSearchParams.set('pagination[page]', page)
    newSearchParams.set('pagination[pageSize]', pageSize)
    if (isPopular) {
      newSearchParams.set('filters[isPopular]', 'true')
    }
    if (category) {
      newSearchParams.set('filters[category][name]', category)
    }
    if (highlight) {
      newSearchParams.set('filters[highlight]', 'true')
    }
    if (excludeSlug) {
      newSearchParams.set('filters[slug][$ne]', excludeSlug)
    }
    // const url = `${baseUrl}/api/articles?populate=category&populate=author&populate=cover&pagination[page]=${page}&pagination[pageSize]=${pageSize}${highlight ? `&filters[highlight]=${highlight}` : ''}`
    const url = `${baseUrl}/api/articles?${newSearchParams.toString()}`
    const config: AxiosRequestConfig<ArticleListResponse> = {
      method: 'get',
      maxBodyLength: Infinity,
      url,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }

    const response: AxiosResponse<ArticleListResponse> =
      await axios.request<ArticleListResponse>(config)

    const transformedArticles = response.data.data.map((article) => {
      const sourceUrl = getMediaSourceUrl(article.cover ?? null)
      const normalizedCoverUrl = resolveUrl(baseUrl, sourceUrl)

      return {
        ...article,
        cover_url: normalizedCoverUrl,
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: transformedArticles,
        ...(response.data.meta ? { meta: response.data.meta } : {}),
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Articles fetch error:', error.response?.data ?? error.message)
    } else {
      console.error('Articles fetch error:', error)
    }

    return NextResponse.json(
      { error: 'Failed to fetch articles. Please try again later.' },
      { status: 500 }
    )
  }
}
