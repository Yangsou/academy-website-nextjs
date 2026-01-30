'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function PdtAcademyHero() {
  const t = useTranslations('AcademyPage.Hero')

  return (
    <div className="relative w-full lg:h-[560px] 2xl:h-[740px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/product/bg-hero-section.png"
          alt="AI and human connection"
          fill
          className="z-10 object-cover object-center"
          priority
        />
      </div>

      <div className="container relative z-10 h-full grid-cols-2 lg:grid">
        <div className="flex-col justify-center pt-24 lg:flex lg:pl-10 lg:pt-0 xl:pl-20">
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
            <span className="bg-[#6DC9CB] text-3xl font-semibold text-white lg:text-[42px]">
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
              src="/product/hero-section.png"
              objectFit="contain"
              objectPosition="bottom"
            />
          </motion.div>
        </div>

        <div className="absolute -left-10 top-16 h-[86px] w-[86px]">
          <Image
            src="/product/pdt-aca-hero-icon-01.png"
            fill
            alt=""
          />
        </div>
        <div className="absolute bottom-16 left-0 h-[86px] w-[86px]">
          <Image
            src="/product/pdt-aca-hero-icon-02.png"
            fill
            alt=""
          />
        </div>
        <div className="absolute bottom-32 left-[calc(50%_-_86px)] h-[86px] w-[86px]">
          <Image
            src="/product/pdt-aca-hero-icon-03.png"
            fill
            alt=""
          />
        </div>
        <div className="absolute right-[calc(30%_-_86px)] top-32 h-[86px] w-[86px]">
          <Image
            src="/product/pdt-aca-hero-icon-04.png"
            fill
            alt=""
          />
        </div>
        <div className="absolute right-0 top-1/2 h-[86px] w-[86px]">
          <Image
            src="/product/pdt-aca-hero-icon-05.png"
            fill
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
