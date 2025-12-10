import axios, { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { requireEnv, trimTrailingSlash } from '@/lib/env'

import type { AxiosRequestConfig } from 'axios'
import type { NextRequest } from 'next/server'

type StrapiProduct = {
  id: number
  title: string
  description: string | null
  name: string
  publishedAt: string
  logo?: {
    id: number
    url: string
  } | null
  icon?: {
    id: number
    url: string
  } | null
}

type ProductResponse = {
  data: StrapiProduct[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
export const dynamic = 'force-dynamic'

export async function GET(_request: NextRequest) {
  try {
    const baseUrl = trimTrailingSlash(requireEnv('STRAPI_API_URL'))
    const apiKey = requireEnv('STRAPI_API_KEY')

    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/products?populate=*&sort=priority:ASC`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }

    const response = await axios.request<ProductResponse>(config)
    const products = response.data.data.map((product) => ({
      ...product,
      logo: {
        ...product.logo,
        url: product.logo ? `${baseUrl}${product.logo.url}` : undefined,
      },
      icon: {
        ...product.icon,
        url: product.icon ? `${baseUrl}${product.icon.url}` : undefined,
      },
    }))

    return NextResponse.json(
      { success: true, data: products, meta: response.data.meta },
      { status: 200 }
    )
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Products fetch error:', error.response?.data ?? error.message)
    } else {
      console.error('Products fetch error:', error)
    }

    return NextResponse.json(
      { error: 'Failed to fetch Products. Please try again later.' },
      { status: 500 }
    )
  }
}
