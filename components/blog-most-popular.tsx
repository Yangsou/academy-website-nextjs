'use client'

import Image from 'next/image'
import Link from 'next/link'

import { getCategoryReadTime } from '@/lib/blog-helpers'
import { usePopularArticles } from '@/lib/hooks/use-blog-data'
import { formatDateString } from '@/lib/utils'

export default function BlogMostPopular() {
  const { articles } = usePopularArticles()

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="bg-[#F7F9FD]">
      <div className="flex justify-center">
        <div className="grid h-full w-[88%] grid-cols-12 gap-8 py-8">
          <div className="col-span-12 mb-2 flex flex-col items-start justify-start gap-4">
            <div className="align-middle font-[Manrope] text-[28px] font-semibold leading-[110%] text-[#202222]">
              Most popular
            </div>
          </div>

          <div className="col-span-12 flex w-full flex-col gap-4">
            {articles.length === 0 ? (
              <p className="text-[#525757]">No blogs available</p>
            ) : (
              articles.map((blog, index) => (
                <div
                  key={blog.id}
                  className="grid h-full w-full grid-cols-12"
                >
                  <div className="relative col-span-12 h-[300px] w-full lg:col-span-4 lg:h-full">
                    <Image
                      src={blog.cover_url ?? '/blog/blog-banner-image.svg'}
                      alt={blog.title}
                      fill
                      className="h-full w-full object-cover object-center"
                      priority={index === 0}
                    />
                  </div>
                  <div className="col-span-12 flex flex-col gap-4 bg-[#FFFFFF] lg:col-span-8">
                    <div className="p-8">
                      <div className="font-manrope text-[18px] font-semibold uppercase leading-[140%] text-[#00C8B3]">
                        {blog.category?.name}
                      </div>
                      <Link
                        href={`/blog/${blog.slug ?? ''}`}
                        className="font-[Manrope] text-[28px] font-semibold leading-[130%] text-[#202222]"
                      >
                        {blog.title}
                      </Link>
                      <div className="mt-4 flex items-center justify-start gap-12">
                        <div className="font-[Manrope] text-[16px] font-normal leading-[150%] text-[#525757]">
                          {formatDateString(blog.publishedAt)}
                        </div>
                        <div className="flex items-center gap-2 font-[Manrope] text-[16px] font-normal leading-[150%] text-[#525757]">
                          <div className="h-[13px] w-[13px] rounded-full bg-[#00C8B3]" />{' '}
                          {getCategoryReadTime(blog)}
                        </div>
                      </div>
                      <div className="pt-4">
                        <Link href={`/blog/${blog.slug ?? ''}`}>
                          <button className="border border-[#A0DCDD] px-4 py-2 align-middle font-[Manrope] text-[18px] font-semibold leading-[150%] text-[#A0DCDD] transition-colors hover:bg-[#A0DCDD] hover:text-white">
                            Read more<span className="ml-2">→</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* <div className="col-span-12 h-[100px] bg-[#DAF3F4] lg:col-span-4 lg:h-full" /> */}
        </div>
      </div>
    </section>
  )
}
