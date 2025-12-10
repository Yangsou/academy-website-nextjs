import axios, { isAxiosError } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

import { requireEnv, trimTrailingSlash } from '@/lib/env'

import type { JobResponse } from '../type'
import type { AxiosRequestConfig } from 'axios'

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const searchParams = new URLSearchParams()
    const { slug: identifier } = params
    const baseUrl = trimTrailingSlash(requireEnv('STRAPI_API_URL'))
    const apiKey = requireEnv('STRAPI_API_KEY')
    searchParams.set('filters[$or][0][slug][$eq]', identifier)
    searchParams.set('populate', '*')
    const requestConfig: AxiosRequestConfig<JobResponse> = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/jobs?${searchParams.toString()}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }

    const response = await axios.request<JobResponse>(requestConfig)
    const responseData = Array.isArray(response.data.data) ? response.data.data : []
    const [job] = responseData

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: job }, { status: 200 })
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Article detail fetch error:', error.response?.data ?? error.message)
    } else {
      console.error('Article detail fetch error:', error)
    }

    return NextResponse.json(
      { error: 'Failed to fetch article details. Please try again later.' },
      { status: 500 }
    )
  }
}
