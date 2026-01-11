/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import { useLocale } from 'next-intl'
import useSWR from 'swr'

import { fetcher } from '../swr-config'

type Activity = {
  id: number
  documentId: string
  slug: string
  title: string
  description: string
  image_url?: string | null
}
export type ActivityDetail = Activity & {
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
type ArticleDetailApiResponse = {
  data?: ActivityDetail
  error?: string
  success?: boolean
}

export function useActivityDetail(identifier: string | undefined) {
  const locale = useLocale()
  const { data, error, isLoading, mutate } = useSWR<ArticleDetailApiResponse>(
    identifier ? `/api/activities/${identifier}?locale=${locale}` : null,
    fetcher
  )

  return {
    activity: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
