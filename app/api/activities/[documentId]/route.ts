import axios, { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { routing } from '@/i18n/routing'
import { requireEnv, trimTrailingSlash } from '@/lib/env'

import type { AxiosRequestConfig } from 'axios'
import type { NextRequest } from 'next/server'

type StrapiMediaAttributes = {
  url?: string | null
  formats?: Record<string, { url?: string | null } | null> | null
} & Record<string, unknown>

type StrapiMedia = StrapiMediaAttributes & {
  processed_url?: string | null
  data?: {
    attributes?: StrapiMediaAttributes | null
  } | null
} & Record<string, unknown>

type SharedMediaBlock = {
  __component: 'shared.media'
  file?: StrapiMedia | null
} & Record<string, unknown>

type SharedSliderBlock = {
  __component: 'shared.slider'
  files?: Array<StrapiMedia | null | undefined> | null
} & Record<string, unknown>

type ActivityBlock = (SharedMediaBlock | SharedSliderBlock | Record<string, unknown>) & {
  __component?: string | null
}

type ActivityData = {
  image?: StrapiMedia | null
  image_url?: string | null
  blocks?: ActivityBlock[] | null
  description?: ActivityBlock[] | null
} & Record<string, unknown>

type ActivityResponse = {
  data?: ActivityData[] | null
  meta?: Record<string, unknown>
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

const getMediaSourceUrl = (media: unknown): string | null => {
  if (!media || typeof media !== 'object') {
    return null
  }

  const candidate = (media as StrapiMediaAttributes).url
  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate
  }

  const directFormatUrl = extractUrlFromFormats(
    (media as StrapiMediaAttributes).formats ?? undefined
  )
  if (directFormatUrl) {
    return directFormatUrl
  }

  const dataAttributes = (media as StrapiMedia).data?.attributes
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

export async function GET(_request: NextRequest, { params }: { params: { documentId: string } }) {
  try {
    const { documentId: identifier } = params
    const { searchParams: inputSearchParams } = new URL(_request.url)

    const baseUrl = trimTrailingSlash(requireEnv('STRAPI_API_URL'))
    const apiKey = requireEnv('STRAPI_API_KEY')
    const searchParams = new URLSearchParams()
    // searchParams.set('filters[$or][0][documentId][$eq]', identifier)
    searchParams.set('filters[$or][1][slug][$eq]', identifier)
    searchParams.set('pagination[pageSize]', '1')
    // searchParams.set('populate[blocks][populate]', '*')
    searchParams.set('populate[image]', 'true')
    // searchParams.set('populate[category]', 'true')
    // searchParams.set('populate[author]', 'true')
    searchParams.set('locale', inputSearchParams.get('locale') ?? routing.defaultLocale)

    const requestConfig: AxiosRequestConfig<ActivityResponse> = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/activities?${searchParams.toString()}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }

    const response = await axios.request<ActivityResponse>(requestConfig)
    const responseData = Array.isArray(response.data.data) ? response.data.data : []
    const [activity] = responseData

    if (!activity) {
      return NextResponse.json(
        {
          success: true,
          data: null,
          ...(response.data.meta ? { meta: response.data.meta } : {}),
        },
        { status: 200 }
      )
    }

    const resolveUrl = (value: string | null | undefined): string | null => {
      if (!value) {
        return null
      }
      return /^https?:\/\//.test(value) ? value : `${baseUrl}${value}`
    }

    const normalizeMedia = (media: unknown): StrapiMedia | null => {
      if (!media || typeof media !== 'object') {
        const source = getMediaSourceUrl(media)
        if (!source) {
          return null
        }
        return {
          url: source,
          processed_url: resolveUrl(source),
        }
      }

      const record = media as StrapiMedia
      const source = getMediaSourceUrl(record)

      return {
        ...record,
        url: source ?? record.url ?? null,
        processed_url: resolveUrl(source ?? record.url ?? null),
      }
    }

    const normalizedBlocks = (blocks: ActivityBlock[]) =>
      blocks
        // .filter((block): block is ActivityBlock => Boolean(block && typeof block === 'object'))
        .map((block) => {
          if (!block.__component) {
            return block
          }

          if (block.__component === 'shared.media') {
            const mediaBlock = block as SharedMediaBlock
            mediaBlock.file = normalizeMedia(mediaBlock.file) ?? null
            return mediaBlock
          }

          if (block.__component === 'shared.slider') {
            const sliderBlock = block as SharedSliderBlock
            const normalizedFiles =
              sliderBlock.files
                ?.map((file) => normalizeMedia(file))
                .filter((file): file is StrapiMedia => Boolean(file)) ?? []

            sliderBlock.files = normalizedFiles
            return sliderBlock
          }

          return block
        })

    const coverSourceUrl = getMediaSourceUrl(activity.image ?? null)
    const normalizedCover = normalizeMedia(activity.cover) ?? null

    const normalizedActivity: ActivityData = {
      ...activity,
      cover: normalizedCover,
      cover_url: resolveUrl(coverSourceUrl),
      blocks: normalizedBlocks(activity.blocks ?? []),
    }

    return NextResponse.json(
      {
        success: true,
        data: normalizedActivity,
        ...(response.data.meta ? { meta: response.data.meta } : {}),
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Activity detail fetch error:', error.response?.data ?? error.message)
    } else {
      console.error('Activity detail fetch error:', error)
    }

    return NextResponse.json(
      { error: 'Failed to fetch Activity details. Please try again later.' },
      { status: 500 }
    )
  }
}
