'use client'

// import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CareerBanner() {
  return (
    <section className="bg-white">
      <div className="gap-4 py-12">
        <div className="flex justify-center">
          <div className="container grid h-full grid-cols-12 gap-8 py-12">
            <div className="col-span-12 mb-8 flex flex-col items-center justify-center gap-4">
              <div className="text-center align-middle font-[Manrope] text-[50px] font-semibold leading-[130%] tracking-normal text-[#202222] md:text-[56px]">
                Find your <span className="bg-[#0036AF] text-[#FFFFFF]">dream jobs</span> at <br />{' '}
                Ai+Di JSC
              </div>
              <div className="font-regular text-center align-middle font-[Manrope] text-[14px] leading-[150%] tracking-[0%] text-[#525757] md:text-[20px]">
                When you’re searching for a job, there are a few things <br /> you can do to get the
                most out of your search
              </div>
            </div>
            <div className="col-span-12 flex items-start justify-start gap-4 lg:col-span-4">
              <div className="relative">
                <Image
                  src="/career/career-1.svg"
                  alt="AI and human connection"
                  width={66}
                  height={66}
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div>
                <div className="align-middle font-[manrope] text-[24px] font-semibold leading-[140%] tracking-normal text-[#202222]">
                  Human-Centered Culture
                </div>
                <p className="align-middle font-[manrope] text-[16px] font-normal leading-[150%] tracking-normal text-[#626262]">
                  Trust, empathy, and collaboration are at the <br /> core of how we work together.
                  Every voice <br /> matters, and every contribution counts.
                </p>
              </div>
            </div>
            <div className="col-span-12 flex items-start justify-start gap-4 lg:col-span-4">
              <div className="relative">
                <Image
                  src="/career/career-2.svg"
                  alt="AI and human connection"
                  width={66}
                  height={66}
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div>
                <div className="align-middle font-[manrope] text-[24px] font-semibold leading-[140%] tracking-normal text-[#202222]">
                  Growth and Learning
                </div>
                <p className="align-middle font-[manrope] text-[16px] font-normal leading-[150%] tracking-normal text-[#626262]">
                  Continuous learning is part of our culture. <br /> You’ll have access to
                  mentorship, skill <br /> development programs, and room to <br /> explore your
                  ideas.
                </p>
              </div>
            </div>
            <div className="col-span-12 flex items-start justify-start gap-4 lg:col-span-4">
              <div className="relative">
                <Image
                  src="/career/career-3.svg"
                  alt="AI and human connection"
                  width={66}
                  height={66}
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div>
                <div className="align-middle font-[manrope] text-[24px] font-semibold leading-[140%] tracking-normal text-[#202222]">
                  Flexible and Supportive
                </div>
                <p className="align-middle font-[manrope] text-[16px] font-normal leading-[150%] tracking-normal text-[#626262]">
                  We offer a dynamic, hybrid <br /> workplace that encourages <br /> creativity,
                  autonomy, and balance <br /> between work and personal life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
