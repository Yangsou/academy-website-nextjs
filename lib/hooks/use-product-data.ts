/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import useSWR from 'swr'

import { fetcher } from '@/lib/swr-config'

export type Product = {
  id: number
  name: string
  title: string
  description: string | null
  contact_email: string
}
type ProductsApiResponse = {
  data?: Product[]
  error?: string
  success?: boolean
}

export function useProducts() {
  const { data, error, isLoading } = useSWR<ProductsApiResponse>('/api/products', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  return {
    products: data?.data ?? [],
    isLoading,
    isError: error,
  }
}
