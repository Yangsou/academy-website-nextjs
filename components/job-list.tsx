import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

import { useInfiniteJobs } from '@/lib/hooks/use-job-data'
import { cn, fromNow } from '@/lib/utils'

import { Skeleton } from './ui/skeleton'

import type { ClassNameValue } from 'tailwind-merge'

function JobSkeleton() {
  return (
    <>
      <div className="border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="mt-4 h-8 w-3/4" />
          <Skeleton className="mt-2 h-6 w-1/4" />
        </div>
      </div>
      <div className="border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="mt-4 h-8 w-3/4" />
          <Skeleton className="mt-2 h-6 w-1/4" />
        </div>
      </div>
    </>
  )
}

export default function JobList() {
  const searchParams = useSearchParams()
  const location = searchParams.getAll('location')
  const { jobs, hasMore, isError, isLoading, loadMore } = useInfiniteJobs({
    pageSize: 10,
    location,
  })

  const tagTheme: Record<string, ClassNameValue> = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    teal: 'bg-teal-100 text-teal-600',
    pink: 'bg-pink-100 text-pink-600',
    green: 'bg-green-100 text-green-600',
    '': '',
  }
  if (isError) {
    return (
      <div className="col-span-12 md:col-span-8">
        <p className="text-red-500">Failed to load</p>
      </div>
    )
  }
  return (
    <div className="col-span-12 md:col-span-8">
      <div className="space-y-4">
        {isLoading && <JobSkeleton />}
        {!isLoading && jobs.length === 0 && (
          <div className="border border-gray-200 bg-white shadow-sm">
            <div className="p-6 text-black">Empty Data</div>
          </div>
        )}
        {jobs.map((job, index) => (
          <motion.div key={index.toString()}>
            <div
              key={index}
              className="border border-gray-200 shadow-sm"
            >
              <div className="flex w-full flex-col items-start justify-between gap-4 bg-white p-6 px-[30px] py-[25px]">
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {job.job_tags.map((tag) => (
                      <span
                        key={tag.id.toString()}
                        className={cn(
                          'px-3 py-1 font-[manrope] text-[16px] text-xs font-normal leading-[150%] text-[#254BC8]',
                          tagTheme[tag.theme]
                        )}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div>
                    <span className="font-[Manrope] text-[16px] font-normal leading-[150%] text-[#525757]">
                      {fromNow(job.publishedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <h3 className="font-[Manrope] text-[24px] font-semibold leading-[140%] text-[#202222]">
                    {job.title}
                  </h3>

                  <p className="font-[Manrope] text-[18px] font-normal leading-[150%] text-[#525757]">
                    {job.shortDescription}
                  </p>
                </div>
              </div>

              <div className="flex w-full items-center justify-between bg-[#EDF3FF] px-[30px] py-[10px]">
                <div className="flex items-center gap-2">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.875 10.4165C21.875 17.7082 12.5 23.9582 12.5 23.9582C12.5 23.9582 3.125 17.7082 3.125 10.4165C3.125 7.9301 4.11272 5.54553 5.87087 3.78738C7.62903 2.02922 10.0136 1.0415 12.5 1.0415C14.9864 1.0415 17.371 2.02922 19.1291 3.78738C20.8873 5.54553 21.875 7.9301 21.875 10.4165Z"
                      stroke="#202222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 13.5415C14.2259 13.5415 15.625 12.1424 15.625 10.4165C15.625 8.69061 14.2259 7.2915 12.5 7.2915C10.7741 7.2915 9.375 8.69061 9.375 10.4165C9.375 12.1424 10.7741 13.5415 12.5 13.5415Z"
                      stroke="#202222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-[Manrope] text-[16px] font-medium leading-[150%] text-[#202222]">
                    {job.job_location?.name}
                  </span>
                </div>

                {/* <button className="border border-[#4162CF] px-4 py-2 align-middle font-[Manrope] text-[18px] font-normal leading-[150%] text-[#4162CF]">
                      View job
                      <span className="ml-2">→</span>
                    </button> */}
              </div>
            </div>
          </motion.div>
        ))}
        {hasMore && (
          <div className="flex justify-center pt-4">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-[#DAF3F4] px-4 py-2 align-middle font-[Manrope] text-[18px] font-normal leading-[150%] text-[#4162CF]"
            >
              View more
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
