import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { Button } from '../ui/button'

function Items() {
  return (
    <>
      <img
        src="/home/logo-auhs.png"
        alt="AI+DI Logo"
        className="h-[112px] w-[152px] object-contain"
      />
      <img
        src="/home/logo-uni-brid.png"
        alt="AI+DI Logo"
        className="h-[68px] w-[380px] object-contain"
      />
      <img
        src="/home/logo-mcp-hs.png"
        alt="AI+DI Logo"
        className="h-[73px] w-[225px] object-contain"
      />
      <img
        src="/home/logo-antioch-uni.png"
        alt="AI+DI Logo"
        className="h-[48px] w-[385px] object-contain"
      />
    </>
  )
}
function BgWithMask() {
  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <div className="relative h-full w-full">
        <svg
          className="absolute bottom-0 left-0"
          width="108"
          height="202"
          viewBox="0 0 108 202"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.95"
            d="M0 202V0L108 202H0Z"
            fill="#A8E4E5"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0"
          width="240"
          height="95"
          viewBox="0 0 240 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.8"
            d="M0 95V0L240 95H0Z"
            fill="#C2EEEF"
          />
        </svg>

        <svg
          className="absolute bottom-0 right-0"
          width="124"
          height="211"
          viewBox="0 0 124 211"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.8"
            d="M124 211V0L0 211H124Z"
            fill="#C2EEEF"
          />
        </svg>

        <svg
          className="absolute bottom-0 right-0"
          width="239"
          height="90"
          viewBox="0 0 239 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.95"
            d="M239 90V0L0 90H239Z"
            fill="#A8E4E5"
          />
        </svg>
      </div>
    </div>
  )
}
export default function PdtAcademyPartners() {
  const t = useTranslations('AcademyPage')

  return (
    <>
      <div className="container relative my-6 h-[160px] w-full overflow-x-hidden">
        <div className="absolute left-0 flex h-full w-full animate-marquee-infinite items-center gap-[20px] md:gap-[40px]">
          <Items />
          <Items />
          <Items />
        </div>
      </div>
      <div className="relative min-h-[276px] bg-[#DAF3F4] py-14 text-center">
        <Image
          src="/product/pdt-aca-footer-bg.png"
          alt="AI and human connection"
          fill
          className="z-10 object-cover object-center opacity-20"
          priority
        />
        <BgWithMask />
        <div className="relative z-20 space-y-8">
          <p className="px-4 text-2xl font-normal text-[#202222] lg:text-[32px]">
            Khai phá tiềm năng giáo dục với AI hôm nay
          </p>
          <Button
            size="lg"
            asChild
            className="font-spaceGrotesk group h-[64px] rounded-[20px] border-0 bg-[#6DC9CB] px-[30px] align-middle font-[Manrope] text-[18px] font-semibold leading-[150%] tracking-[0%] text-white transition-all duration-300 hover:bg-[#A0DCDD] hover:shadow-cyan-500/25 [&_svg]:size-6"
          >
            <Link href="/contact">
              {t('contact_us')}
              <ArrowRight className="ml-[10px] h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
