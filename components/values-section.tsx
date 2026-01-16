'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'

export default function ValuesSection() {
  const t = useTranslations('HomePage.ValuesSection')
  const features = [
    {
      icon: '/home/values-learning.png',
      title: t('learning_rhythm'),
      description: t('learning_rhythm_desc'),
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: '/home/values-working.png',
      title: t('working_rhythm'),
      description: t('working_rhythm_desc'),
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: '/home/values-life.png',
      title: t('life_rhythm'),
      description: t('life_rhythm_desc'),
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: '/home/values-organization.png',
      title: t('organization_rhythm'),
      description: t('organization_rhythm_desc'),
      gradient: 'from-purple-500 to-indigo-600',
    },
  ]
  return (
    <section className="container relative">
      <div className="relative">
        <div className="absolute left-1/2 top-[-60px] w-full -translate-x-1/2 bg-white shadow-2xl md:top-[-150px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid h-full grid-cols-12 gap-8 p-4"
          >
            <div
              className="relative col-span-12 h-full w-full md:col-span-6"
              style={{
                background: 'linear-gradient(180deg, #0036AF 0%, #001749 100%)',
              }}
            >
              <Image
                src="/home/human-of-light.png"
                alt="AI and human connection"
                fill
                className="z-10 object-cover object-center"
                priority
              />
            </div>
            <div className="align-center col-span-12 flex flex-col justify-center gap-4 px-0 pt-6 md:col-span-6 md:px-4 md:pr-8">
              <motion.p className="font-[Manrope] text-4xl font-semibold tracking-[0%] text-[#0036AF] md:text-[42px]">
                {t('what_we_do')}
              </motion.p>
              <motion.p className="whitespace-break-spaces align-middle font-[Manrope] text-[14px] font-normal leading-[150%] tracking-[0%] text-[#525757] md:text-[20px]">
                {t('what_we_do_long_txt')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mb-4 flex flex-col justify-start gap-4 sm:flex-row md:mb-12"
              >
                <Link href="/products">
                  <Button
                    size="lg"
                    className="font-spaceGrotesk group h-[64px] rounded-none border-0 bg-[#DAF3F4] px-[30px] align-middle font-[Manrope] text-[18px] font-semibold leading-[150%] tracking-[0%] text-[#0036AF] transition-all duration-300 hover:bg-[#A0DCDD] hover:shadow-cyan-500/25 [&_svg]:size-6"
                  >
                    {t('what_we_do_btn')}
                    <ArrowRight className="ml-[10px] h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="pb-16 pt-[500px] md:pt-[450px] lg:pt-[400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 text-left"
          >
            <h2 className="pt-4 font-[Manrope] text-[32px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF] md:text-[42px]">
              {t('insight_rhythm')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                // whileHover={{ y: -10 }}
              >
                <Card className="group h-full rounded-none border-none shadow-none hover:shadow-[10px_10px_2px_0_#A0DCDD]">
                  <CardContent className="p-0 text-center shadow-none">
                    <motion.div className="relative mx-auto flex h-[320px] items-center justify-start">
                      <Image
                        src="/home/values-bg.svg"
                        alt="AI and human connection"
                        className="z-10 object-cover object-center"
                        fill
                        priority
                      />
                      <div className="absolute z-20 flex h-full w-full flex-col items-center justify-end pb-[20px]">
                        <Image
                          src={feature.icon}
                          alt="AI and human connection"
                          className="z-10 object-cover object-center"
                          priority
                          fill
                        />
                        {/* <Image
                          width={277}
                          height={66}
                          src="/home/footer-values.svg"
                          alt="AI and human connection"
                          className="z-10 object-cover object-center"
                          priority
                        /> */}
                      </div>
                    </motion.div>

                    <div className="h-[206px] bg-[#F7F9FD] p-[20px] text-left">
                      <h3 className="mb-4 align-middle font-[Manrope] text-[24px] font-semibold leading-[120%] tracking-[2%] text-[#202222]">
                        {feature.title}
                      </h3>

                      <p className="align-middle font-[Manrope] text-[18px] font-normal leading-[150%] tracking-[0%] text-[#626262]">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
