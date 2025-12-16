'use client'

export default function OurPartners() {
  return (
    <section className="bg-white">
      <div className="gap-4 py-12">
        <div className="text-center font-[Manrope] text-[56px] font-bold leading-[110%] tracking-[0%] text-[#0036AF]">
          Our Partners
        </div>
        <div className="text-center align-middle font-[Manrope] text-[20px] font-normal leading-[150%] tracking-[0%] text-[#525757]">
          To create an AI grounded in trust and humanity — one that blends Artificial and <br />{' '}
          Natural Intelligence to enhance human awareness, happiness, and growth.
        </div>
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
