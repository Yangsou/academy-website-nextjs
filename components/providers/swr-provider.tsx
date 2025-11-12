'use client'

import { SWRConfig } from 'swr'

import { swrConfig } from '@/lib/swr-config'

import type { ReactNode } from 'react'

type SWRProviderProps = {
  children: ReactNode
}

export function SWRProvider({ children }: SWRProviderProps) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>
}
