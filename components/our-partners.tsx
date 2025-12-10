'use client'

// import { motion } from 'framer-motion'
// import { Heart, Zap, Shield, ArrowRight } from 'lucide-react'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import Link from 'next/link'

// const features = [
//   {
//     icon: 'home/values-1.png',
//     title: 'Learning Rhythm',
//     description:
//       'Personalized learning journeys that adapt to your natural patterns and optimal growth moments.',
//     gradient: 'from-pink-500 to-rose-600',
//   },
//   {
//     icon: 'home/values-2.png',
//     title: 'Working Rhythm',
//     description:
//       'Seamless integration of AI tools that amplify your capabilities while maintaining human creativity.',
//     gradient: 'from-cyan-500 to-blue-600',
//   },
//   {
//     icon: 'home/values-3.png',
//     title: 'Life Rhythm',
//     description:
//       'Embrace conscious living where technology enhances rather than overwhelms your daily experience.',
//     gradient: 'from-purple-500 to-indigo-600',
//   },
//   {
//     icon: 'home/values-4.png',
//     title: 'Organization Rhythm',
//     description:
//       'Foster a living system where businesses, data, and intelligence move in harmony — aligning purpose with performance.',
//     gradient: 'from-purple-500 to-indigo-600',
//   },
// ]

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
        <div className="grid w-[88%] grid-cols-12 gap-[20px] text-[#0036AF] md:gap-[40px]">
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
