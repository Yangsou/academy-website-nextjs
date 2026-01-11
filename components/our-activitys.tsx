'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'

type RichTextBlock = {
  type?: string
  text?: string
  children?: RichTextBlock[]
}

type Activity = {
  id: number
  documentId: string
  slug: string
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

function MaskImage() {
  return (
    <>
      <Image
        src="/home/mask-activities.svg"
        alt="Mask Decoration"
        width={400}
        height={44}
        className="absolute left-1/2 top-0 z-10 h-auto w-auto -translate-x-1/2"
      />
      <Image
        src="/home/mask-activities.svg"
        alt="Mask Decoration"
        width={400}
        height={44}
        className="absolute left-1/2 top-0 z-10 h-auto w-auto -translate-x-1/2 -translate-y-full rotate-180"
      />
    </>
  )
}
export default function OurActivitys() {
  const locale = useLocale()
  const t = useTranslations('HomePage.ActivitiesSection')
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/activities?locale=${locale}&sort=createdAt:DESC`)
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
  }, [locale])
  if (loading) {
    return (
      <section className="bg-[#DAF3F4] pt-12">
        <MaskImage />
        <div className="gap-4 py-12">
          <div className="text-center font-[Manrope] text-[56px] font-bold leading-[110%] tracking-[0%] text-[#202222]">
            {t('our_activities')}
          </div>
          <div className="flex items-center justify-center py-12">
            <p className="text-[#525757]">{t('our_activities_loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#DAF3F4] pt-12">
        <MaskImage />
        <div className="gap-4 py-12">
          <div className="text-center font-[Manrope] text-[56px] font-bold leading-[110%] tracking-[0%] text-[#202222]">
            {t('our_activities')}
          </div>
          <div className="flex items-center justify-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-[#DAF3F4] pt-12">
      <MaskImage />
      <div className="container gap-4 space-y-3 py-12">
        <div className="text-center font-[Manrope] text-4xl font-bold leading-[110%] tracking-[0%] text-[#202222] md:text-[56px]">
          {t('our_activities')}
        </div>
        {/* <div className="font-regular mx-auto mt-2 max-w-[730px] text-center align-middle font-[Manrope] text-lg leading-[150%] tracking-[0%] text-[#525757] md:text-[20px]">
          {t('our_activities_desc')}
        </div> */}

        {activities.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-[#525757]">No activities available</p>
          </div>
        ) : (
          <div className="flex justify-center">
            {/* <div className="grid h-full grid-cols-12 gap-8 py-12"> */}
            {/* First Large Activity */}
            {/* {firstActivity && (
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
                          <h3 className="truncate align-middle font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-[0%] text-[#202222]">
                            {firstActivity.title}
                          </h3>
                          <p className="text- mt-2 line-clamp-4 align-middle font-[Manrope] text-[18px] font-normal leading-[150%] tracking-[0%] text-[#626262x]">
                            {extractText(firstActivity.description)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              )} */}

            {/* </div> */}
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    // whileHover={{ y: -10 }}
                    className="h-full bg-[#F7F9FD]"
                  >
                    <Card className="group h-full overflow-hidden rounded-none border-none shadow-none hover:shadow-md">
                      <CardContent className="p-0 text-center shadow-none">
                        <motion.div className="relative mx-auto flex items-center justify-start md:h-[184px] lg:h-[286px]">
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

                        <div className="p-[20px] text-left">
                          <Link
                            className="line-clamp-3 align-middle font-[Manrope] text-2xl font-semibold leading-[1.25] tracking-[0%] text-[#202222]"
                            href={`/activity/${activity.slug}`}
                          >
                            {activity.title}
                          </Link>
                          <p className="mt-2 line-clamp-4 align-middle font-[Manrope] text-[16px] font-normal leading-[150%] tracking-[0] text-[#626262x]">
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
        )}
      </div>
    </section>
  )
}
