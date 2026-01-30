'use client'
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
        <div className="flex-col pt-12 lg:pl-10 lg:pt-48 xl:pl-20">
          <p className="text-3xl font-semibold text-white lg:text-[42px]">{t('title')}</p>
          <p className="mt-2 lg:mt-7">
            <span className="bg-[#6DC9CB] text-3xl font-semibold text-white lg:text-[42px]">
              {t('highlight')}
            </span>
          </p>
          <div>
            <p className="mt-4 max-w-[460px] text-lg font-normal">{t('description')}</p>
          </div>
        </div>

        <div className="flex items-end justify-end">
          <div className="relative h-[300px] w-full max-w-[730px] lg:h-[390px]">
            <Image
              fill
              alt="academy"
              src="/product/hero-section.png"
              objectFit="contain"
              objectPosition="bottom"
            />
          </div>
        </div>

        <div className="absolute top-16 hidden h-[86px] w-[86px] lg:left-0 lg:block 2xl:-left-10">
          <Image
            src="/product/pdt-aca-hero-icon-01.png"
            fill
            alt=""
          />
        </div>
        <div className="absolute bottom-16 left-0 hidden h-[124px] w-[124px] lg:block">
          <Image
            src="/product/pdt-aca-hero-icon-02.png"
            fill
            alt=""
          />
        </div>
        <div className="absolute bottom-56 left-[calc(50%_-_170px)] hidden h-[86px] w-[86px] lg:block">
          <Image
            src="/product/pdt-aca-hero-icon-03.png"
            fill
            alt=""
          />
        </div>
        <div className="absolute hidden h-[86px] w-[86px] lg:block xl:right-52 xl:top-14 2xl:right-44 2xl:top-28">
          <Image
            src="/product/pdt-aca-hero-icon-04.png"
            fill
            alt=""
          />
        </div>
        <div className="absolute -right-[40px] hidden h-[86px] w-[86px] lg:right-0 lg:block xl:top-52 2xl:top-1/2">
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
