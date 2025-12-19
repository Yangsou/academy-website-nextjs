'use client'

import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { notFound, useParams } from 'next/navigation'

import SimilarJobList from '@/components/similar-job-list'
import { useJobDetail } from '@/lib/hooks/use-job-data'
import { cn } from '@/lib/utils'

import type { ClassNameValue } from 'tailwind-merge'

export default function CareerDetailPage() {
  const params = useParams()
  const slugParam = params.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : (slugParam ?? '')

  const { job, isLoading, isError } = useJobDetail(slug)
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
  if (isLoading) {
    return <div className="min-h-screen">Loading...</div>
  }

  if (isError) {
    return notFound()
  }
  return (
    <div className="">
      <div className="relative z-10 pt-16 text-[#202222]">
        <div className="container space-y-3 px-4 py-10 sm:px-6 lg:px-8">
          <p className="font-[Manrope] text-[42px]">{job?.title}</p>
          <p className="text-2xl">{job?.shortDescription}</p>
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
              {job?.job_location?.name}
            </span>
            <div className="flex flex-wrap gap-2">
              {job?.job_tags.map((tag) => (
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
          </div>
        </div>

        <div className="flex bg-[url('/career/bg-gradient.png')] bg-cover bg-center bg-no-repeat">
          <div className="container w-full gap-6 py-8 md:flex">
            <div className="bg-white md:mr-6 md:w-[calc(100%_-_296px_-_24px)]">
              <div className="bg-white p-4 md:p-8">
                <BlocksRenderer content={job?.description ?? []} />
              </div>
              <div className="bg-[#F7F9FD] p-4 md:p-8">
                <h1 className="font-[Manrope] text-3xl text-[#0036AF]">How to Apply</h1>
                <div className="space-y-1 pt-4">
                  <p>Please send your CV (and portfolio, if applicable) to careers@aidi.vn</p>
                  <p>Subject line: Application - [{job?.title}]</p>
                </div>
              </div>
            </div>
            <SimilarJobList
              excludeSlug={slug ?? ''}
              location={job?.job_location?.name ?? ''}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
