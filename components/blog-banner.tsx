'use client'
import Image from 'next/image'
import Link from 'next/link'

import { getCategoryReadTime } from '@/lib/blog-helpers'
import { useHighlightArticle } from '@/lib/hooks/use-blog-data'
import { formatDateString } from '@/lib/utils'

import { Skeleton } from './ui/skeleton'

import type { Article } from '@/lib/hooks/use-blog-data'

const BannerSkeleton = () => {
  return (
    <>
      <div className="col-span-12 lg:col-span-6">
        <div className="p-8">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="mt-4 h-20 w-full" />

          <div className="mt-8 flex space-x-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      <Skeleton className="col-span-12 h-[400px] w-full lg:col-span-6 lg:h-full" />
    </>
  )
}

function BannerItem({ article }: { article: Article }) {
  const { title, category, slug = '', publishedAt, cover_url: coverUrl } = article
  return (
    <>
      <div className="col-span-12 flex flex-col gap-4 bg-[#FFFFFF] lg:col-span-6">
        <div className="p-8">
          <div className="font-[Manrope] text-[24px] font-semibold uppercase leading-[140%] text-[#00C8B3]">
            {category?.name}
          </div>
          <Link
            href={`/blog/${slug ?? ''}`}
            className="font-[Manrope] text-[28px] font-semibold leading-[130%] text-[#202222] lg:text-[42px]"
          >
            {title}
          </Link>
          <div className="mt-4 flex items-center justify-start gap-12">
            <div className="font-[Manrope] text-[20px] font-normal leading-[150%] text-[#525757]">
              {formatDateString(publishedAt)}
            </div>
            <div className="flex items-center gap-2 font-[Manrope] text-[20px] font-normal leading-[150%] text-[#525757]">
              <div className="h-[13px] w-[13px] rounded-full bg-[#00C8B3]" />{' '}
              {getCategoryReadTime(article)}
            </div>
          </div>
          <div className="pt-4">
            <Link href={`/blog/${slug ?? ''}`}>
              <button className="border border-[#A0DCDD] px-4 py-2 align-middle font-[Manrope] text-[18px] font-semibold leading-[150%] text-[#A0DCDD] hover:border-transparent hover:bg-[#A0DCDD] hover:text-white">
                Read more<span className="ml-2">→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative col-span-12 h-[400px] w-full lg:col-span-6 lg:h-full">
        <Image
          src={coverUrl ?? '/blog/blog-banner-image.svg'}
          alt="AI and human connection"
          fill
          className="h-full w-full object-cover object-center"
          priority
        />
      </div>
    </>
  )
}

export default function BlogBanner() {
  const { article, isLoading } = useHighlightArticle()

  return (
    <section className="bg-[#F7F9FD]">
      <div className="flex justify-center">
        <div className="container grid h-full grid-cols-12 pt-12">
          <div className="col-span-12 mb-8 flex flex-col items-start justify-start gap-4">
            <div className="align-middle font-[Manrope] text-[42px] font-semibold leading-[110%] text-[#202222]">
              Insight Thinkings
            </div>
            <div className="font-[Manrope] text-[16px] font-normal leading-[150%] text-[#525757]">
              Deep insights on AI, humanity, and conscious living. Explore our <br /> thoughts on
              building a more intentional relationship with technology.
            </div>
          </div>

          {isLoading && <BannerSkeleton />}

          {!!article && <BannerItem article={article} />}
        </div>
      </div>
    </section>
  )
}
