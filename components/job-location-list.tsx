'use client'

import { useSearchParams, useRouter } from 'next/navigation'

import { useJobLocations } from '@/lib/hooks/use-job-data'

import { Skeleton } from './ui/skeleton'

import type { ChangeEventHandler } from 'react'

function JobLocationSkeleton() {
  return (
    <>
      <div className="flex w-full items-center gap-3">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <div className="flex w-full items-center gap-3">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <div className="flex w-full items-center gap-3">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    </>
  )
}
export default function JobLocationList() {
  const router = useRouter()
  const { jobLocations, isLoading, isError } = useJobLocations()
  const searchParams = useSearchParams()
  const lcts = searchParams.getAll('location')

  const handleChangeLocation: ChangeEventHandler<HTMLInputElement> = (event) => {
    const params = new URLSearchParams(searchParams.toString())
    const { checked, name } = event.currentTarget
    if (checked) {
      params.append('location', name)
    }
    if (!checked) {
      params.delete('location', name)
    }

    router.push(`?${params.toString()}`, {
      scroll: false,
    })
  }

  if (isError) {
    return (
      <div className="bg-white px-[30px] py-[25px]">
        <div className="font-[Manrope] text-[28px] font-semibold leading-[130%] tracking-normal text-[#202222]">
          Location
        </div>
        <p className="text-red-500">Failed to load</p>
      </div>
    )
  }
  return (
    <div className="bg-white px-[30px] py-[25px]">
      <div className="font-[Manrope] text-[28px] font-semibold leading-[130%] tracking-normal text-[#202222]">
        Location
      </div>
      <div className="mt-4 space-y-3">
        {isLoading && <JobLocationSkeleton />}
        {jobLocations.map(({ id, name }) => (
          <label
            key={id.toString()}
            className="flex cursor-pointer select-none items-center gap-3"
          >
            <input
              type="checkbox"
              name={name}
              defaultChecked={lcts.includes(name)}
              className="h-5 w-5 rounded-sm border border-gray-400 accent-[#0036AF]"
              onChange={handleChangeLocation}
            />
            <span className="font-[Manrope] text-[18px] font-normal leading-[150%] text-[#525757]">
              {name}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
