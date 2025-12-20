import Image from 'next/image'
import Link from 'next/link'

import { getCategoryReadTime } from '@/lib/blog-helpers'
import { formatDateString } from '@/lib/utils'

import { Skeleton } from './ui/skeleton'

import type { Article } from '@/lib/hooks/use-blog-data'

export function ArticelItemSkeleton({ count }: { count: number }) {
  const data = new Array(count).fill(1)
  return (
    <div>
      {data.map((_, index) => (
        <div
          className="col-span-12 md:col-span-6 lg:col-span-4"
          key={index}
        >
          <Skeleton className="h-[284px] w-full" />
          <Skeleton className="mt-8 h-6 w-1/3" />
          <Skeleton className="mt-4 h-6 w-full" />
          <div className="mt-6 flex space-x-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ArticleItem({ article }: { article: Article }) {
  const { title, slug, category, cover_url: coverUrl, publishedAt, date } = article
  return (
    <Link
      href={`/blog/${slug ?? ''}`}
      className="col-span-12 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md md:col-span-6 lg:col-span-4"
    >
      {/* Image */}
      <div className="relative h-[285px] w-full">
        <Image
          src={coverUrl ?? '/blog/blog-banner-image.svg'}
          alt="AI and human connection"
          fill
          className="h-full w-full object-cover object-center"
          priority
        />
      </div>

      {/* Text */}
      <div className="p-4">
        {/* Category */}
        <div className="font-manrope text-[18px] font-semibold uppercase leading-[140%] text-[#00C8B3]">
          {category?.name}
        </div>

        {/* Title */}
        <Link
          href={`/blog/${slug ?? ''}`}
          className="font-manrope text-[20px] font-bold leading-[130%] text-[#202222]"
        >
          {title}
        </Link>

        {/* Meta info */}
        <div className="mt-4 flex items-center justify-between gap-12">
          <div className="font-manrope text-[16px] font-normal leading-[150%] text-[#525757]">
            {formatDateString(date ? date : publishedAt)}
          </div>

          <div className="font-manrope flex items-center gap-2 text-[16px] font-normal leading-[150%] text-[#525757]">
            <div className="h-[13px] w-[13px] rounded-full bg-[#00C8B3]" />
            {getCategoryReadTime(article)}
          </div>
        </div>
      </div>
    </Link>
  )
}
