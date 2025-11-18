'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Blog = {
  id: number
  documentId: string
  title: string
  subtitle?: string
  description: string
  cover_url?: string | null
  createdDate: string
  readingTime?: number
}

type BlogsResponse = {
  success: boolean
  data: Blog[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export default function BlogMostPopular() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs?pageSize=3')

        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }

        const blogsData = (await response.json()) as BlogsResponse

        setBlogs(blogsData.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleString('en', { month: 'short' })
    const year = date.getFullYear().toString().slice(-2)
    return `${day}/${month}/${year}`
  }

  if (loading) {
    return (
      <section className="bg-[#F7F9FD]">
        <div className="flex justify-center py-12">
          <p className="text-[#525757]">Loading blogs...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#F7F9FD]">
        <div className="flex justify-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    )
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

          <div className="col-span-12 flex flex-col gap-4 lg:col-span-8">
            {blogs.length === 0 ? (
              <p className="text-[#525757]">No blogs available</p>
            ) : (
              blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="grid h-full w-full grid-cols-12"
                >
                  <div className="relative col-span-12 h-[300px] w-full lg:col-span-8 lg:h-full">
                    {blog.cover_url ? (
                      <Image
                        src={blog.cover_url}
                        alt={blog.title}
                        fill
                        className="h-full w-full object-cover object-center"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="h-full w-full bg-[#DAF3F4]" />
                    )}
                  </div>
                  <div className="col-span-12 flex flex-col gap-4 bg-[#FFFFFF] lg:col-span-4">
                    <div className="p-8">
                      {blog.subtitle && (
                        <div className="font-[Manrope] text-[18px] font-semibold uppercase leading-[140%] text-[#00C8B3]">
                          {blog.subtitle}
                        </div>
                      )}
                      <p className="font-[Manrope] text-[28px] font-semibold leading-[130%] text-[#202222]">
                        {blog.title}
                      </p>
                      <div className="mt-4 flex items-center justify-start gap-12">
                        <div className="font-[Manrope] text-[16px] font-normal leading-[150%] text-[#525757]">
                          {formatDate(blog.createdDate)}
                        </div>
                        <div className="flex items-center gap-2 font-[Manrope] text-[16px] font-normal leading-[150%] text-[#525757]">
                          <div className="h-[13px] w-[13px] rounded-full bg-[#00C8B3]" />{' '}
                          {blog.readingTime ?? 5} min read
                        </div>
                      </div>
                      <div className="pt-4">
                        <Link href={`/blog/${blog.documentId}`}>
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

          <div className="col-span-12 h-[100px] bg-[#DAF3F4] lg:col-span-4 lg:h-full" />
        </div>
      </div>
    </section>
  )
}
