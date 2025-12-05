import { motion } from 'framer-motion'

import { useProducts } from '@/lib/hooks/use-product-data'

import { Skeleton } from './ui/skeleton'

function ProductSkeleton() {
  return (
    <div className="col-span-12 lg:col-span-6">
      <div
        className="relative z-10"
        style={{
          background: 'linear-gradient(180deg, #0036AF 0%, #001749 100%)',
        }}
      >
        <img
          src="home/bg-hero-section.png"
          className="h-[100px] w-full object-cover opacity-20"
          alt=""
        />
      </div>
      <div className="bg-white p-8 shadow-2xl">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-3/4" />
        <Skeleton className="mt-2 h-4 w-3/4" />
        <Skeleton className="mt-2 h-4 w-3/4" />
        <Skeleton className="mt-2 h-4 w-5/6" />
        <Skeleton className="mt-2 h-4 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-6 h-4 w-1/2" />
      </div>
    </div>
  )
}
export default function ProductSectionList() {
  const { products, isLoading } = useProducts()

  return (
    <div className="grid w-[88%] grid-cols-12 items-stretch gap-8">
      {isLoading && (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      )}
      {products.map(({ id, title, name, description, contact_email: email }, index) => (
        <div
          className="col-span-12 flex h-full lg:col-span-6"
          key={id.toString()}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 * index }}
            viewport={{ once: true }}
            className="mb-2"
          >
            <div className="flex h-full w-full flex-col">
              {/* Header */}
              <div
                className="relative z-10"
                style={{
                  background: 'linear-gradient(180deg, #0036AF 0%, #001749 100%)',
                }}
              >
                <img
                  src="home/bg-hero-section.png"
                  className="h-[100px] w-full object-cover opacity-20"
                  alt=""
                />
                <div className="absolute inset-0 flex items-center gap-4 px-8">
                  <img
                    src="product/product-logo-left.svg"
                    className="h-14 w-14"
                    alt=""
                  />
                  <div className="font-[Manrope] text-[42px] font-semibold leading-[110%] tracking-normal text-white">
                    {name}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between gap-4 bg-white p-8 shadow-2xl">
                <div>
                  <div className="font-[Manrope] text-[24px] font-semibold leading-[140%] text-[#000]">
                    {title}
                  </div>
                  <div className="mt-2 font-[Manrope] text-[16px] leading-[150%] text-[#525757]">
                    {description}
                  </div>
                  <a
                    className="mt-4 text-[18px] text-[#007AFF] underline"
                    href={`mailto:${email}`}
                  >
                    Contact us: {email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <img
                    src="product/logo-aidi-product.png"
                    className="h-[38px] w-[154px]"
                    alt=""
                  />
                  {/* <Link href="/products">
                  <Button className="bg-white text-[18px] font-semibold text-[#A0DCDD]">
                    Learn more →
                  </Button>
                </Link> */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
