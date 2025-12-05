/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useSWR from 'swr'

import { fetcher } from '../swr-config'

export type TeamMember = {
  id: number
  name: string
  description: string | null
  shortDescription: string | null
  job_title: string
  avatarUrl: string | null
}
type TeamMemberApiResponse = {
  data?: TeamMember[]
  error?: string
  success?: boolean
}
export function useMembers() {
  const { data, error, isLoading } = useSWR<TeamMemberApiResponse>(`/api/team-members`, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  })

  return {
    teamMembers: data?.data ?? [],
    isLoading,
    isError: error,
  }
}
