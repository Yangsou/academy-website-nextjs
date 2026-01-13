'use client'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { FacebookIcon, YouTubeIcon, LinkedInIcon, TikTokIcon } from './social-icons'

export default function Footer() {
  const t = useTranslations('HomePage')

  const data = [
    {
      key: 'head-office',
      title: t('head_office'),
      content: t('head_office_desc'),
      address: t('head_office_address'),
    },
    {
      key: 'business-office',
      title: t('business_office'),
      content: t('business_office_desc'),
      address: t('business_office_address'),
    },
    {
      key: 'academy',
      title: '  ',
      content: t('academy_desc'),
      address: t('academy_address'),
    },
  ]

  return (
    <footer className="flex justify-center bg-[#0036AF] py-10">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          {data.map((item) => (
            <div
              key={item.key}
              className="col-span-12 lg:col-span-3"
            >
              <div className="min-h-[30px] align-middle font-[Manrope] text-[20px] font-bold leading-[150%] tracking-[0%] text-[#EEEEEE]">
                {item.title}
              </div>
              <div className="font-manrope mt-3 whitespace-pre-line align-middle font-[Manrope] text-[18px] font-normal leading-[150%] tracking-[0%] text-[#EEEEEE]">
                {item.content}
              </div>
              <p className="mt-2 whitespace-pre-line font-[Manrope] text-sm font-normal leading-[150%] tracking-[0%] text-[#EEEEEE]">
                {item.address}
              </p>
            </div>
          ))}
          <div className="align-start col-span-12 flex justify-start gap-4 lg:col-span-3 lg:justify-end">
            <Link
              href="https://www.facebook.com/aidijsc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/company/ai-di-world/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="https://www.youtube.com/@AiplusDiJSC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon />
            </Link>
            <Link
              href="https://www.tiktok.com/@aidiworld"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokIcon />
            </Link>
          </div>
          <div className="col-span-12 mt-8 flex w-full flex-col items-center justify-between gap-4 border-b-2 border-[#EEEEEE] pb-4 lg:flex-row">
            <div className="flex items-end justify-start gap-4">
              <img
                src="/footer/logo-footer.svg"
                alt="AI+DI Logo"
                className="h-[60%] w-[60%] object-contain lg:h-[100%] lg:w-[100%]"
              />
              <div className="whitespace-nowrap font-[Manrope] text-[14px] font-bold tracking-[0%] text-[#A0DCDD] lg:text-[20px]">
                Reflect, Not Replace
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  {t('home')}
                </div>
              </Link>
              <Link href="/about">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  {t('about')}
                </div>
              </Link>
              <Link href="/products">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  {t('solutions')}
                </div>
              </Link>
              {process.env.disableCareer !== 'true' && (
                <Link href="/career">
                  <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                    {t('career')}
                  </div>
                </Link>
              )}
              <Link href="/blog">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  {t('blog')}
                </div>
              </Link>
            </div>
          </div>
          <div className="font-regular col-span-12 align-middle font-[Manrope] text-[16px] leading-[150%] tracking-[0%] text-[#EEEEEE]">
            Ai+Di JSC. All Rights Reserved 2025
          </div>
        </div>
      </div>
    </footer>
  )
}
