'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'

type RichTextBlock = {
  type?: string
  text?: string
  children?: RichTextBlock[]
}

type Activity = {
  id: number
  documentId: string
  title: string
  description: string | RichTextBlock | RichTextBlock[]
  image_url?: string | null
}

// Helper function to extract text from Strapi rich text
const extractText = (description: string | RichTextBlock | RichTextBlock[]): string => {
  if (typeof description === 'string') {
    return description
  }

  if (Array.isArray(description)) {
    return description
      .map((block) => {
        if (typeof block === 'string') return block
        if (typeof block === 'object') {
          if (block.children) {
            return extractText(block.children)
          }
          if (block.text) {
            return block.text
          }
        }
        return ''
      })
      .join(' ')
  }

  if (typeof description === 'object') {
    if (description.children) {
      return extractText(description.children)
    }
    if (description.text) {
      return description.text
    }
  }

  return ''
}

type ApiResponse = {
  success: boolean
  data: Activity[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export default function OurActivitys() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities?pageSize=5')
        if (!response.ok) {
          throw new Error('Failed to fetch activities')
        }
        const data = (await response.json()) as ApiResponse
        setActivities(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    void fetchActivities()
  }, [])
  if (loading) {
    return (
      <section className="bg-[#DAF3F4]">
        <div className="gap-4 py-12">
          <div className="text-center font-[Manrope] text-[56px] font-bold leading-[110%] tracking-[0%] text-[#202222]">
            Our Activitys
          </div>
          <div className="flex items-center justify-center py-12">
            <p className="text-[#525757]">Loading activities...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#DAF3F4]">
        <div className="gap-4 py-12">
          <div className="text-center font-[Manrope] text-[56px] font-bold leading-[110%] tracking-[0%] text-[#202222]">
            Our Activitys
          </div>
          <div className="flex items-center justify-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  const [firstActivity, ...restActivities] = activities

  return (
    <section className="bg-[#DAF3F4]">
      <div className="gap-4 py-12">
        <div className="text-center font-[Manrope] text-[56px] font-bold leading-[110%] tracking-[0%] text-[#202222]">
          Our Activitys
        </div>
        <div className="font-regular text-center align-middle font-[Manrope] text-[20px] leading-[150%] tracking-[0%] text-[#525757]">
          To create an AI grounded in trust and humanity — one that blends Artificial and <br />{' '}
          Natural Intelligence to enhance human awareness, happiness, and growth.
        </div>

        {activities.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-[#525757]">No activities available</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid h-full w-[88%] grid-cols-12 gap-8 py-12">
              {/* First Large Activity */}
              {firstActivity && (
                <div className="col-span-12 h-full lg:col-span-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="h-full bg-[#F7F9FD]"
                  >
                    <Card className="group h-full overflow-hidden rounded-none border-none shadow-none">
                      <CardContent className="p-0 text-center shadow-none">
                        <motion.div className="relative mx-auto flex h-[489px] items-center justify-start">
                          {firstActivity.image_url ? (
                            <Image
                              src={firstActivity.image_url}
                              alt={firstActivity.title}
                              fill
                              className="z-10 object-cover object-center"
                              priority
                            />
                          ) : (
                            <div className="h-full w-full bg-[#0036AF]" />
                          )}
                        </motion.div>

                        <div className="h-[206px] p-[20px] text-left">
                          <h3 className="align-middle font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-[0%] text-[#202222]">
                            {firstActivity.title}
                          </h3>
                          <p className="align-middle font-[Manrope] text-[18px] font-normal leading-[150%] tracking-[0%] text-[#626262x]">
                            {extractText(firstActivity.description)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              )}

              {/* Smaller Activities Grid */}
              <div className="col-span-12 md:col-span-12 lg:col-span-6">
                <div className="grid grid-cols-12 gap-8">
                  {restActivities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="col-span-12 md:col-span-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                      >
                        <Card className="group h-full overflow-hidden rounded-none border-none shadow-none">
                          <CardContent className="p-0 text-center shadow-none">
                            <motion.div className="relative mx-auto flex h-[160px] items-center justify-start">
                              {activity.image_url ? (
                                <Image
                                  src={activity.image_url}
                                  alt={activity.title}
                                  fill
                                  className="z-10 object-cover object-center"
                                  priority={index < 2}
                                />
                              ) : (
                                <div className="h-full w-full bg-[#0036AF]" />
                              )}
                            </motion.div>

                            <div className="h-[206px] bg-[#F7F9FD] p-[20px] text-left">
                              <h3 className="align-middle font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-[0%] text-[#202222]">
                                {activity.title}
                              </h3>
                              <p className="align-middle font-[Manrope] text-[18px] font-normal leading-[150%] tracking-[0%] text-[#626262x]">
                                {extractText(activity.description)}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
