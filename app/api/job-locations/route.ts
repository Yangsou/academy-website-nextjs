import axios, { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { requireEnv, trimTrailingSlash } from '@/lib/env'

import type { AxiosRequestConfig } from 'axios'
import type { NextRequest } from 'next/server'

type StrapiJobLocation = {
  id: number
  description: string | null
  name: string
  publishedAt: string
}

type JobLocationResponse = {
  data: StrapiJobLocation[]
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
export const revalidate = 0
export async function GET(_request: NextRequest) {
  try {
    const baseUrl = trimTrailingSlash(requireEnv('STRAPI_API_URL'))
    const apiKey = requireEnv('STRAPI_API_KEY')

    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/job-locations?timestamp=${Date.now()}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }

    const response = await axios.request<JobLocationResponse>(config)
    const jobLocations = response.data.data

    return NextResponse.json(
      { success: true, data: jobLocations, meta: response.data.meta },
      { status: 200 }
    )
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Job Location fetch error:', error.response?.data ?? error.message)
    } else {
      console.error('Job Location fetch error:', error)
    }

    return NextResponse.json(
      { error: 'Failed to fetch Job Location. Please try again later.' },
      { status: 500 }
    )
  }
}
