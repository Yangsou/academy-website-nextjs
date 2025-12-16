'use client'

import { motion } from 'framer-motion'

import ProductSectionList from './product-section-list'

export default function ProductSectionNew() {
  return (
    <section className="bg-white">
      <div className="gap-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="container grid h-full grid-cols-12 gap-8">
            <div className="col-span-12 flex flex-col items-start justify-center gap-4 lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="align-middle font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-[0%] text-[#202222]">
                  Two pillars,
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="align-middle font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF]">
                  One human-centered ecosystem.
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="font-[Manrope] text-[16px] font-normal leading-[150%] tracking-[0%] text-[#525757]">
                  Ai+Di's two core platforms — Ai+Di ERP and Ai+Di Academy — form a complete
                  ecosystem that connects people and organizations, measuring and nurturing both
                  happiness and performance. Together, they create Organizational and Human
                  Intelligence — a powerful foundation where businesses optimize with AI, and
                  individuals grow toward balance and sustainable progress.
                </div>
              </motion.div>
            </div>
            <div className="col-span-12 flex items-center justify-center lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="product/products-banner.svg"
                  alt=""
                  className="h-[363px] object-contain"
                />
              </motion.div>
            </div>
          </div>
          <ProductSectionList />
        </div>
      </div>
    </section>
  )
}
