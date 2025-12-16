'use client'

import { Suspense } from 'react'

import JobList from './job-list'
import JobLocationList from './job-location-list'

export default function WeAreSeeking() {
  return (
    <section className="bg-[#EDF3FF]">
      <Suspense>
        <div className="flex justify-center">
          <div className="container grid h-full grid-cols-12 gap-8 py-12">
            <div className="col-span-12 align-middle font-[Manrope] text-[32px] font-semibold leading-[130%] tracking-normal text-[#202222]">
              We are seeking for
            </div>
            <div className="col-span-12 md:col-span-4">
              <JobLocationList />
            </div>
            <JobList />
          </div>
        </div>
      </Suspense>
    </section>
  )
}
