'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: '/home/values-1.svg',
    title: 'Learning Rhythm',
    description:
      'Personalized learning journeys that adapt to your natural patterns and optimal growth moments.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: '/home/values-2.svg',
    title: 'Working Rhythm',
    description:
      'Seamless integration of AI tools that amplify your capabilities while maintaining human creativity.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: '/home/values-3.svg',
    title: 'Life Rhythm',
    description:
      'Embrace conscious living where technology enhances rather than overwhelms your daily experience.',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    icon: '/home/values-4.svg',
    title: 'Organization Rhythm',
    description:
      'Foster a living system where businesses, data, and intelligence move in harmony — aligning purpose with performance.',
    gradient: 'from-purple-500 to-indigo-600',
  },
]

export default function ValuesSection() {
  return (
    <section className="relative bg-white">
      <div className="absolute left-1/2 top-[-60px] w-[88%] -translate-x-1/2 bg-white shadow-2xl md:top-[-150px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid h-full grid-cols-12 gap-2 p-4"
        >
          <div
            className="relative col-span-12 h-[200px] w-full md:col-span-6 md:h-[463px]"
            style={{
              background: 'linear-gradient(180deg, #0036AF 0%, #001749 100%)',
            }}
          >
            <Image
              src="/home/human-of-light.png"
              alt="AI and human connection"
              fill
              className="z-10 object-cover object-center"
              priority
            />
          </div>
          <div className="align-center col-span-12 flex flex-col justify-center gap-4 px-0 md:col-span-6 md:px-20 md:px-4">
            <motion.div className="font-[Manrope] text-[30px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF] md:text-[40px] lg:text-[56px]">
              What We Do
            </motion.div>
            <motion.p className="align-middle font-[Manrope] text-[14px] font-normal leading-[150%] tracking-[0%] text-[#525757] md:text-[20px]">
              Developed in Vietnam, Ai+Di is not just about technology — it’s about understanding
              people. By merging the precision of Artificial Intelligence with the awareness and
              empathy of Natural Intelligence, Ai+Di becomes a true companion that reflects who you
              are, supports how you grow, and harmonizes the way you live and work.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-4 flex flex-col justify-start gap-4 sm:flex-row md:mb-12"
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="font-spaceGrotesk group h-[64px] rounded-none border-0 bg-[#DAF3F4] px-[30px] align-middle font-[Manrope] text-[18px] font-semibold leading-[150%] tracking-[0%] text-[#0036AF] shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-cyan-500/25"
                >
                  View our products
                  <ArrowRight className="ml-[10px] h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="mx-auto max-w-[88%] pb-16 pt-[500px] md:pt-[450px] lg:pt-[400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 text-left"
        >
          <h2 className="font-[Manrope] text-[32px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF] md:text-[42px]">
            Insight – 4 rhythm
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="group h-full overflow-hidden rounded-none border-none shadow-none">
                <CardContent className="p-0 text-center shadow-none">
                  <motion.div className="relative mx-auto flex h-[320px] items-center justify-start">
                    <Image
                      src="/home/values-bg.svg"
                      alt="AI and human connection"
                      className="z-10 object-cover object-center"
                      fill
                      priority
                    />
                    <div className="absolute z-20 flex h-full w-full flex-col items-center justify-end pb-[20px]">
                      <Image
                        src={feature.icon}
                        alt="AI and human connection"
                        className="z-10 object-cover object-center"
                        priority
                        height={146}
                        width={121}
                      />
                      <Image
                        width={277}
                        height={66}
                        src="/home/footer-values.svg"
                        alt="AI and human connection"
                        className="z-10 object-cover object-center"
                        priority
                      />
                    </div>
                  </motion.div>

                  <div className="h-[206px] bg-[#F7F9FD] p-[20px] text-left">
                    <h3 className="mb-4 align-middle font-[Manrope] text-[24px] font-semibold leading-[120%] tracking-[2%] text-[#202222]">
                      {feature.title}
                    </h3>

                    <p className="align-middle font-[Manrope] text-[18px] font-normal leading-[150%] tracking-[0%] text-[#626262]">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
