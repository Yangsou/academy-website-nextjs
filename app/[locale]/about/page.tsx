import AboutBanner from '@/components/about-banner'
import CoreValues from '@/components/core-values'
import OurTeam from '@/components/our-team'

export default function AboutPage() {
  return (
    <div className="relative">
      <AboutBanner />
      <CoreValues />
      <OurTeam />
      <div className="relative h-[104px] w-full bg-[#DAF3F4] bg-[url('/about/footer-bg.png')] bg-cover bg-bottom bg-no-repeat sm:h-[208px] lg:h-[280px] lg:bg-cover xl:h-[382px] 2xl:h-[504px]" />
    </div>
  )
}
