/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

import { fetcher } from '../swr-config'

import type { BlocksContent } from '@strapi/blocks-react-renderer'

export type JobLocation = {
  id: number
  name: string
  description: string | null
  publishedAt: string
}

type JobLocationsApiResponse = {
  data?: JobLocation[]
  error?: string
  success?: boolean
}
export type Job = {
  id: number
  title: string
  slug: string
  shortDescription: string | null
  description: BlocksContent
  publishedAt: string
  job_location: JobLocation | null
  job_tags: Array<{
    id: number
    name: string
    theme: string
  }>
}
type JobsApiResponse = {
  data?: Job[]
  error?: string
  success?: boolean
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
type JobDetailAPiResponse = {
  data?: Job | null
  error?: string
  success?: boolean
}
export function useJobLocations() {
  const { data, error, isLoading, mutate } = useSWR<JobLocationsApiResponse>(
    '/api/job-locations',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    jobLocations: data?.data ?? [],
    isLoading,
    isError: error as string,
    mutate,
  }
}

export function useInfiniteJobs({ pageSize, location }: { pageSize: number; location?: string[] }) {
  const getKey = (pageIndex: number, previousPageData: JobsApiResponse | null) => {
    if (previousPageData && !previousPageData.data?.length) return null
    const lct = (location ?? []).filter(Boolean).reduce((a, b) => `${a}&location=${b}`, '')

    return `/api/jobs?page=${pageIndex + 1}&pageSize=${pageSize}${lct}`
  }

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite<JobsApiResponse>(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateAll: false,
    }
  )

  const jobs = data?.flatMap((page) => page.data ?? []) ?? []

  const pagination = data?.[data.length - 1]?.meta?.pagination
  const hasMore = pagination ? size < pagination.pageCount : false
  const countMore = pagination ? pagination.total - jobs.length : 0

  const loadMore = () => {
    if (!isLoading && hasMore) {
      void setSize(size + 1)
    }
  }

  return {
    jobs,
    isLoading,
    isError: error as string,
    hasMore,
    loadMore,
    size,
    mutate,
    countMore,
  }
}

export function useJobDetail(slug: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<JobDetailAPiResponse | null>(
    slug ? `/api/jobs/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    job: data?.data ?? null,
    isLoading,
    isError: error as string,
    mutate,
  }
}

export function useRelatedJobs({
  location,
  excludeSlug,
  pageSize = 3,
}: {
  excludeSlug: string
  location: string
  pageSize: number
}) {
  const { data, error, isLoading } = useSWR<JobsApiResponse>(
    `/api/jobs?page=${1}&pageSize=${pageSize}&location=${location}&excludeSlug=${excludeSlug}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  )

  return {
    jobs: data?.data ?? [],
    isLoading,
    isError: error as string,
  }
}
