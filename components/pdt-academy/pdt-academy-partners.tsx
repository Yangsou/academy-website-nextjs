import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { Button } from '../ui/button'

export default function PdtAcademyPartners() {
  const t = useTranslations('AcademyPage')

  return (
    <>
      <div className="container mt-6">
        <div className="gap-[20px] text-[#0036AF] md:gap-[40px] lg:flex">
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-4">
            <img
              src="/home/logo-auhs.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-4">
            <img
              src="/home/logo-uni-brid.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-6">
            <img
              src="/home/logo-mcp-hs.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-6">
            <img
              src="/home/logo-antioch-uni.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
        </div>
      </div>
      <div className="relative bg-[#DAF3F4] py-14 text-center">
        <div className="absolute left-0 top-0 h-full w-full bg-[#DAF3F4] bg-[url('/about/footer-bg.png')] bg-cover bg-bottom bg-no-repeat lg:bg-cover" />

        <div className="relative space-y-6">
          <p className="px-4 text-2xl font-normal text-[#202222] lg:text-[32px]">
            Khai phá tiềm năng giáo dục với AI hôm nay
          </p>
          <Button
            size="lg"
            asChild
            className="font-spaceGrotesk group h-[64px] rounded-none border-0 bg-[#6DC9CB] px-[30px] align-middle font-[Manrope] text-[18px] font-semibold leading-[150%] tracking-[0%] text-white transition-all duration-300 hover:bg-[#A0DCDD] hover:shadow-cyan-500/25 [&_svg]:size-6"
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
