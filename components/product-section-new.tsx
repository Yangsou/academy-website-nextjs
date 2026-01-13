'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import ProductSectionList from './product-section-list'

export default function ProductSectionNew() {
  const t = useTranslations('ProductPage')

  return (
    <section className="relative bg-white">
      <div className="absolute bottom-0 left-0 h-[400px] w-full bg-[url('/blog/related-blog-bg.svg')] bg-contain bg-bottom bg-no-repeat lg:h-[524px] lg:bg-cover xl:h-[632px] 2xl:h-[776px]" />

      <div className="relative z-10 gap-4 pb-36 pt-12">
        <div className="flex flex-col items-center justify-center pb-12">
          <div className="container grid h-full grid-cols-12 gap-8">
            <div className="col-span-12 flex flex-col items-start justify-center gap-4 lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="align-middle font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-[0%] text-[#202222]">
                  {t('two_pillars')},
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="align-middle font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF]">
                  {t('one_human')}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div
                  className="whitespace-break-spaces font-[Manrope] text-[16px] font-normal leading-[150%] tracking-[0%] text-[#525757]"
                  dangerouslySetInnerHTML={{
                    __html: t.markup('description', {
                      b: (content) => `<b>${content}</b>`,
                    }),
                  }}
                />
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
                  src="/product/products-banner.svg"
                  alt=""
                  className="h-[363px] object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <ProductSectionList />
      </div>
    </section>
  )
}
