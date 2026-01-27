'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function PdtAcademyHero() {
  const t = useTranslations('AcademyPage.Hero')

  return (
    <div className="relative w-full lg:h-[420px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/bg-hero-section.png"
          alt="AI and human connection"
          fill
          className="z-10 object-cover object-center opacity-20"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0036AF 0%, #001749 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 h-full grid-cols-2 lg:grid">
        <div className="flex-col justify-center pt-24 lg:flex lg:pt-0">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold text-white lg:text-[42px]"
          >
            {t('title')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-2 lg:mt-7"
          >
            <span className="bg-[#A0DCDD] text-3xl font-semibold text-white lg:text-[42px]">
              {t('highlight')}
            </span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="mt-4 max-w-[460px] text-lg font-normal">{t('description')}</p>
          </motion.div>
        </div>

        <div className="flex items-end justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[390px] w-full max-w-[730px]"
          >
            <Image
              fill
              alt="academy"
              src="/product/pdt-aca-banner-hero.png"
              objectFit="contain"
              objectPosition="bottom"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
