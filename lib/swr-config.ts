import type { SWRConfiguration } from 'swr'

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    ;(error as Error & { info: unknown; status: number }).info = await response.json()
    ;(error as Error & { info: unknown; status: number }).status = response.status
    throw error
  }

  return await (response.json() as Promise<T>)
}

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 2000,
  revalidateIfStale: true,
  focusThrottleInterval: 5000,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  keepPreviousData: true,
  fetcher,
}
