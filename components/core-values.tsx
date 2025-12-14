'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
// import { motion } from 'framer-motion'
// import { Heart, Zap, Shield, ArrowRight } from 'lucide-react'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
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

export default function CoreValues() {
  const coreValData = [
    {
      title: 'Honesty',
      highlightColor: 'text-4xl text-[#00A5C3]',
      className: cn(
        'absolute left-1/2 top-1/2 z-10 w-52 text-[#626262]',
        'xl:translate-x-[-286px] xl:translate-y-[-324px]',
        'lg:translate-x-[-250px] lg:translate-y-[-276px]'
      ),
      description:
        'We act with transparency, truth, and integrity — doing what we say and keeping our promises.',
    },
    {
      title: 'Empathy',
      highlightColor: 'text-4xl text-[#F94725]',
      className: cn(
        'absolute left-1/2 top-1/2 z-10 w-52 text-[#626262]',
        'xl:translate-x-24 xl:translate-y-[-324px]',
        'lg:translate-x-16 lg:translate-y-[-276px]'
      ),
      description:
        'We respect and understand others, always placing people at the heart of every decision.',
    },
    {
      title: 'Tuning',
      highlightColor: 'text-4xl text-[#32B6AE]',
      className: cn(
        'absolute left-1/2 top-1/2 z-10 w-52 text-[#626262]',
        'xl:w-52 xl:translate-x-[-428px] xl:translate-y-[10px]',
        'lg:w-32 lg:translate-x-[-328px] lg:translate-y-[10px]'
      ),
      description:
        'We simplify and clarify — keeping things practical, understandable, and applicable for everyone.',
    },
    {
      title: 'Accompaniment',
      highlightColor: 'text-4xl text-[#FF9800]',
      className: cn(
        'absolute left-1/2 top-1/2 z-10 text-[#626262]',
        'xl:w-52 xl:translate-x-[224px] xl:translate-y-[10px]',
        'lg:w-36 lg:translate-x-[184px] lg:translate-y-[10px]'
      ),
      description:
        'We grow together — listening, supporting, and collaborating in both work and life.',
    },
    {
      title: 'Reinvention',
      highlightColor: 'text-4xl text-[#8ED332]',
      className: cn(
        'absolute left-1/2 top-1/2 z-10 w-52 text-[#626262]',
        'xl:translate-x-[-80px] xl:translate-y-[290px]',
        'lg:translate-x-[-80px] lg:translate-y-[220px]'
      ),
      description:
        'We dare to try, to fail, and to learn — embracing creativity and openness in every challenge.',
    },
  ]
  return (
    <section className="bg-white">
      <div className="gap-4 py-12">
        <div className="flex justify-center">
          <div className="grid h-full w-[88%] grid-cols-12 gap-4 py-12">
            <div className="col-span-12 flex flex-col items-start justify-start gap-4">
              <div className="font-[Manrope] text-[56px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF]">
                Core Values
              </div>
              <div className="align-middle font-[Manrope] text-[20px] font-normal leading-[150%] tracking-[0%] text-[#626262]">
                "Trust is the life energy of human beings, and it is also the foundation of all
                creativity." <br /> Trust lies at the heart of AI+DI’s culture — the trust between
                people, between humans and technology, and <br /> between individuals and
                themselves. From this trust, five core values were born to nurture and protect it.
              </div>
            </div>
            <div className="relative col-span-12 flex justify-center">
              <div className="relative lg:h-[940px] lg:w-[940px] xl:h-[1146px] xl:w-[1146px]">
                {/* Background Image */}
                <Image
                  src="/about/core-value-images.png"
                  alt="Core Values"
                  fill
                  className="pointer-events-none z-10 object-cover"
                />
                {coreValData.map((value) => (
                  <div
                    key={value.title}
                    className={value.className}
                  >
                    <p className="font-[Manrope] text-3xl">
                      <span className={value.highlightColor}>{value.title.charAt(0)}</span>
                      {value.title.slice(1)}
                    </p>
                    <p className="font-[Manrope] text-xs">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
