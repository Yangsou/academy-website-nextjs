'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function MissionAndVision() {
  const t = useTranslations('HomePage.MissionVisionSection')

  return (
    <section
      id="mission-and-vision"
      className="relative flex h-[860px] overflow-hidden bg-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home/mission-and-vision-bg.svg"
          alt="AI and human connection"
          fill
          className="hidden object-cover object-bottom lg:block"
          priority
        />
        <div className="flex h-full w-full items-start justify-center lg:items-center">
          <div className="container grid h-full grid-cols-12 py-4 lg:py-32">
            <div className="relative col-span-12 flex flex-col gap-4 lg:col-span-6">
              <Image
                src="/home/mission-image.png"
                alt="AI and human connection"
                width={162}
                height={165}
              />
              <div className="font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-normal text-[#0036AF] lg:text-[#FFFFFF]">
                {t('mission')}
              </div>
              <p className="w-auto align-middle font-[Manrope] text-[20px] font-normal leading-[150%] tracking-normal text-[#202222] lg:w-[486px] lg:text-[#FFFFFF]">
                {t('mission_desc')}
              </p>
            </div>

            <div className="relative col-span-12 flex flex-col items-start gap-4 text-left lg:col-span-6 lg:items-end lg:text-right">
              <Image
                src="/home/vision-image.svg"
                alt="AI and human connection"
                width={162}
                height={165}
              />
              <div className="font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-normal text-[#0036AF]">
                {t('vision')}
              </div>
              <p className="w-auto align-middle font-[Manrope] text-[20px] font-normal leading-[150%] tracking-normal text-[#202222] lg:w-[486px]">
                {t('vision_desc')}
              </p>
            </div>
          </div>
        </div>
        {/* Dark overlay for better text readability */}
      </div>
    </section>
  )
}
