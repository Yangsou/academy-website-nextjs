'use client'

import { motion } from 'framer-motion'

export default function AboutBanner() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0036AF 0%, #001749 100%)',
      }}
    >
      <div className="gap-4 py-12">
        <div className="flex justify-center">
          <div className="container grid h-full grid-cols-12 gap-4 py-12">
            <div className="col-span-12 flex flex-col items-start justify-center gap-4 lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="font-manrope font-[Manrope] text-[30px] font-semibold leading-[110%] tracking-[0%] text-[#FFFFFF] lg:text-[56px]">
                  Rooted in Vietnam. <br /> Built for a mindful future.
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="align-middle font-[Manrope] text-[20px] font-normal leading-[150%] tracking-[0%] text-[#FFFFFF]">
                  Founded in 2025, Ai+Di was born from a simple yet profound belief: we are <br />{' '}
                  not merely creating products, but igniting a shift in human consciousness — where
                  AI does not replace people, but helps them understand themselves and live in
                  harmony with the natural order.
                </div>
              </motion.div>
            </div>
            <div className="col-span-12 flex items-center justify-center lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="about/about-logo-aidi.svg"
                  alt="AI+DI Logo"
                  className="h-[363px] object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
