import axios, { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { requireEnv, trimTrailingSlash } from '@/lib/env'

import type { AxiosRequestConfig } from 'axios'
import type { NextRequest } from 'next/server'

type StrapiAvatar = {
  id: number
  url: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: Record<string, unknown> | null
}

type StrapiTeamMember = {
  id: number
  documentId: string
  name: string
  position: string
  bio: string | null
  email: string | null
  linkedin: string | null
  twitter: string | null
  avatar: StrapiAvatar | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

type TeamMembersResponse = {
  data: StrapiTeamMember[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

type TransformedTeamMember = {
  avatarUrl: string | null
} & StrapiTeamMember
export const dynamic = 'force-dynamic'

export async function GET(_request: NextRequest) {
  try {
    const baseUrl = trimTrailingSlash(requireEnv('STRAPI_API_URL'))
    const apiKey = requireEnv('STRAPI_API_KEY')
    const environment = process.env.ENVIRONMENT ?? 'production'

    const newSearchParams = new URLSearchParams()
    newSearchParams.set('populate', 'avatar')
    newSearchParams.set('sort', 'priority:ASC')

    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/team-members?${newSearchParams.toString()}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }

    const response = await axios.request<TeamMembersResponse>(config)

    const transformedData = {
      ...response.data,
      data: response.data.data.map((member: StrapiTeamMember): TransformedTeamMember => {
        let avatarUrl: string | null = null

        if (member.avatar) {
          avatarUrl =
            environment === 'development' ? `${baseUrl}${member.avatar.url}` : member.avatar.url
        }

        return {
          ...member,
          avatarUrl,
        }
      }),
    }

    return NextResponse.json({ success: true, ...transformedData }, { status: 200 })
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Team members fetch error:', error.response?.data ?? error.message)
    } else {
      console.error('Team members fetch error:', error)
    }

    return NextResponse.json(
      { error: 'Failed to fetch team members. Please try again later.' },
      { status: 500 }
    )
  }
}
