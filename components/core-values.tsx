'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { cn } from '@/lib/utils'

export default function CoreValues() {
  const coreValData = [
    {
      title: 'Honesty',
      icon: 'core-val-h.svg',
      highlightColor: 'text-4xl text-[#00A5C3]',
      className: cn(
        ' text-[#626262] space-y-2',
        'xl:translate-x-[-286px] xl:translate-y-[-356px]',
        'lg:translate-x-[-250px] lg:translate-y-[-324px] lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:w-52'
      ),
      description:
        'We act with transparency, truth, and integrity — doing what we say and keeping our promises.',
    },
    {
      title: 'Empathy',
      icon: 'core-val-e.svg',
      highlightColor: 'text-4xl text-[#F94725]',
      className: cn(
        'text-[#626262]',
        'xl:translate-x-24 xl:translate-y-[-364px]',
        'lg:translate-x-16 lg:translate-y-[-324px] lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:w-52'
      ),
      description:
        'We respect and understand others, always placing people at the heart of every decision.',
    },
    {
      title: 'Tuning',
      icon: 'core-val-t.png',
      highlightColor: 'text-4xl text-[#32B6AE]',
      className: cn(
        'text-[#626262]',
        'xl:w-52 xl:translate-x-[-428px] xl:translate-y-[10px]',
        'lg:w-32 lg:translate-x-[-328px] lg:translate-y-[-36px] lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10'
      ),
      description:
        'We simplify and clarify — keeping things practical, understandable, and applicable for everyone.',
    },
    {
      title: 'Accompaniment',
      icon: 'core-val-a.png',
      highlightColor: 'text-4xl text-[#FF9800]',
      className: cn(
        ' text-[#626262]',
        'xl:w-52 xl:translate-x-[216px] xl:translate-y-[10px]',
        'lg:w-36 lg:translate-x-[184px] lg:translate-y-[10px] lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:w-52'
      ),
      description:
        'We grow together — listening, supporting, and collaborating in both work and life.',
    },
    {
      title: 'Reinvention',
      icon: 'core-val-r.png',
      highlightColor: 'text-4xl text-[#8ED332]',
      className: cn(
        'text-[#626262]',
        'xl:translate-x-[-80px] xl:translate-y-[264px]',
        'lg:translate-x-[-80px] lg:translate-y-[186px] lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:w-52'
      ),
      description:
        'We dare to try, to fail, and to learn — embracing creativity and openness in every challenge.',
    },
  ]
  return (
    <section className="bg-white">
      <div className="gap-4 py-12">
        <div className="flex justify-center">
          <div className="container grid h-full grid-cols-12 gap-4 py-12">
            <div className="col-span-12 flex flex-col items-start justify-start gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="font-[Manrope] text-[56px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF]">
                  Core Values
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="align-middle font-[Manrope] text-[20px] font-normal leading-[150%] tracking-[0%] text-[#626262]">
                  "Trust is the life energy of human beings, and it is also the foundation of all
                  creativity." <br /> Trust lies at the heart of AI+DI’s culture — the trust between
                  people, between humans and technology, and <br /> between individuals and
                  themselves. From this trust, five core values were born to nurture and protect it.
                </div>
              </motion.div>
            </div>
            <div className="relative col-span-12 lg:flex lg:justify-center">
              <div className="relative space-y-8 sm:grid sm:grid-cols-2 sm:gap-4 lg:h-[940px] lg:w-[940px] lg:space-y-0 xl:h-[1146px] xl:w-[1146px]">
                {/* Background Image */}
                <Image
                  src="/about/core-value-images.png"
                  alt="Core Values"
                  fill
                  className="pointer-events-none z-10 hidden object-cover lg:block"
                />
                {coreValData.map((value) => (
                  <div
                    key={value.title}
                    className={value.className}
                  >
                    <Image
                      src={`/about/${value.icon}`}
                      alt="Core Values"
                      width={56}
                      height={56}
                      className="pointer-events-none z-10 ml-6 object-cover"
                    />
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
