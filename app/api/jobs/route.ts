import axios, { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { requireEnv, trimTrailingSlash } from '@/lib/env'

import type { JobResponse } from './type'
import type { AxiosRequestConfig } from 'axios'
import type { NextRequest } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    const baseUrl = trimTrailingSlash(requireEnv('STRAPI_API_URL'))
    const apiKey = requireEnv('STRAPI_API_KEY')
    const { searchParams } = new URL(_request.url)
    const page = searchParams.get('page') ?? '1'
    const pageSize = searchParams.get('pageSize') ?? '10'
    const locations = searchParams.getAll('location')
    const excludeSlug = searchParams.get('excludeSlug')

    const newSearchParams = new URLSearchParams()
    newSearchParams.set('populate', '*')
    newSearchParams.set('pagination[page]', page)
    newSearchParams.set('pagination[pageSize]', pageSize)
    if (locations.length > 0) {
      locations.forEach((location, index) => {
        newSearchParams.set(`filters[job_location][name][$in][${index}]`, location)
      })
    }
    if (excludeSlug) {
      newSearchParams.set('filters[slug][$ne]', excludeSlug)
    }

    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/jobs?${newSearchParams.toString()}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }

    const response = await axios.request<JobResponse>(config)
    const jobs = response.data.data

    return NextResponse.json(
      { success: true, data: jobs, meta: response.data.meta },
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
