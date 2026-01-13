'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutBanner() {
  const t = useTranslations('AboutPage.Banner')
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0036AF 0%, #001749 100%)',
      }}
    >
      <div className="gap-4 py-12">
        <div className="flex justify-center">
          <div className="container grid h-full grid-cols-12 gap-y-4 py-12">
            <div className="col-span-12 flex flex-col items-start justify-center gap-4 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="font-manrope whitespace-break-spaces font-[Manrope] text-3xl font-semibold leading-[110%] tracking-[0%] text-[#FFFFFF] lg:text-[56px]">
                  {t('title')}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="align-middle font-[Manrope] text-[20px] font-normal leading-[150%] tracking-[0%] text-[#FFFFFF]">
                  {t('description')}
                </div>
              </motion.div>
            </div>
            <div className="col-span-12 flex items-center justify-center lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/about/about-logo-aidi.svg"
                  alt="AI+DI Logo"
                  className="h-[363px] object-contain"
                  width={364}
                  height={364}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
