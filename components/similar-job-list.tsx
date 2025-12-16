import Link from 'next/link'

import { useRelatedJobs } from '@/lib/hooks/use-job-data'

import { Separator } from './ui/separator'

function SimilarJobSkeleton() {
  return (
    <>
      <div className="border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <div className="mb-4 h-6 w-3/4 animate-pulse rounded-md bg-gray-200" />
          <div className="mb-4 h-4 w-32 animate-pulse rounded-md bg-gray-200" />
          <div className="flex space-x-3">
            <div className="mb-4 h-4 w-8 animate-pulse rounded-md bg-gray-200" />
            <div className="mb-4 h-4 w-8 animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <div className="mb-4 h-6 w-3/4 animate-pulse rounded-md bg-gray-200" />
          <div className="mb-4 h-4 w-32 animate-pulse rounded-md bg-gray-200" />
          <div className="flex space-x-3">
            <div className="mb-4 h-4 w-8 animate-pulse rounded-md bg-gray-200" />
            <div className="mb-4 h-4 w-8 animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </>
  )
}

export default function SimilarJobList({
  excludeSlug,
  location,
}: {
  location?: string
  excludeSlug?: string
}) {
  const { jobs, isLoading } = useRelatedJobs({
    pageSize: 3,
    excludeSlug: excludeSlug ?? '',
    location: location ?? '',
  })
  return (
    <div className="mt-6 bg-white py-4 md:mt-0 md:w-[296px]">
      <p className="px-4 pb-4 font-[Manrope] text-2xl text-[#202222]">Similar works</p>
      <Separator />

      {isLoading && <SimilarJobSkeleton />}

      {!isLoading && jobs.length === 0 && (
        <div className="p-4">
          <p className="text-[#626262]">No similar jobs found.</p>
        </div>
      )}
      {!isLoading &&
        jobs.map((job) => (
          <div
            key={job.id}
            className="border-b border-gray-200 last:border-0"
          >
            <div className="p-4">
              <Link
                href={`/career/${job.slug}`}
                className="font-[Manrope] text-lg font-semibold text-[#202222]"
              >
                {job.title}
              </Link>
              <p className="mt-2 font-[Manrope] text-sm text-[#626262]">{job.shortDescription}</p>
              <div className="mt-3 flex space-x-2">
                {job.job_tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
