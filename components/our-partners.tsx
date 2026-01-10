import { useTranslations } from 'next-intl'

export default function OurPartners() {
  const t = useTranslations('HomePage.PartnerSection')

  return (
    <section className="bg-white">
      <div className="gap-4 py-12">
        <div className="text-center font-[Manrope] text-[56px] font-bold leading-[110%] tracking-[0%] text-[#0036AF]">
          {t('our_partners')}
        </div>
        {/* <div className="mx-auto mt-3 max-w-[730px] text-center align-middle font-[Manrope] text-xl font-normal leading-[150%] tracking-[0%] text-[#525757]">
          {t('our_partners_desc')}
        </div> */}
      </div>
      <div className="relative flex justify-center bg-[#0036AF] pb-28 pt-12">
        <div className="container grid grid-cols-12 gap-[20px] text-[#0036AF] md:gap-[40px]">
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-4">
            <img
              src="home/logo-nbc.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-4">
            <img
              src="home/logo-auhs.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-4">
            <img
              src="home/logo-uni-brid.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-6">
            <img
              src="home/logo-mcp-hs.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
          <div className="col-span-12 flex justify-center bg-white p-[20px] md:col-span-6">
            <img
              src="home/logo-antioch-uni.png"
              alt="AI+DI Logo"
              className="h-[120px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
