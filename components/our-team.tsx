'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { useMembers } from '@/lib/hooks/use-member-data'

import type { TeamMember } from '@/lib/hooks/use-member-data'

function TeamMemberCard({ teamMember }: { teamMember: TeamMember }) {
  const { shortDescription, name, job_title: jobTitle, avatarUrl } = teamMember
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="h-[180px] w-[180px]">
          <Image
            src={avatarUrl ?? ''}
            alt="AI+DI Logo"
            className="h-full w-full rounded-full"
            width={180}
            height={180}
          />
        </div>
        <div className="mt-4 flex flex-col items-start justify-start gap-2">
          <div className="align-middle font-[Manrope] text-[24px] font-semibold leading-[110%] tracking-[0%] text-[#202222]">
            {name || ''}
          </div>
          <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#0036AF]">
            {jobTitle}
          </div>
          <div className="align-middle font-[Manrope] text-[16px] font-normal leading-[150%] tracking-[0%] text-[#626262]">
            {shortDescription ?? ''}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
function TeamMemberSkeleton() {
  return (
    <>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="h-[180px] w-[180px] rounded-full bg-gray-300" />
        <div className="mt-4 flex flex-col items-start justify-start gap-2">
          <div className="h-6 w-32 rounded bg-gray-300" />
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="mt-3 h-4 w-5/6 rounded bg-gray-300" />
          <div className="h-3 w-4/5 rounded bg-gray-300" />
          <div className="h-3 w-4/5 rounded bg-gray-300" />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="h-[180px] w-[180px] rounded-full bg-gray-300" />
        <div className="mt-4 flex flex-col items-start justify-start gap-2">
          <div className="h-6 w-32 rounded bg-gray-300" />
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="mt-3 h-4 w-5/6 rounded bg-gray-300" />
          <div className="h-3 w-4/5 rounded bg-gray-300" />
          <div className="h-3 w-4/5 rounded bg-gray-300" />
        </div>
      </div>
    </>
  )
}

export default function OurTeam() {
  const t = useTranslations('AboutPage.OurTeam')
  const { teamMembers, isLoading } = useMembers()

  return (
    <section className="lg:mot-[-240px] z-20 mt-0 bg-[#F7F9FD]">
      <div className="container grid h-full grid-cols-12 gap-8 py-12">
        <div className="col-span-12 mb-4 flex flex-col items-start justify-start gap-4">
          <div className="font-[Manrope] text-[56px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF]">
            {t('title')}
          </div>
          {/* <div className="font-regular max-w-[844px] align-middle font-[Manrope] text-[20px] leading-[150%] tracking-[0%] text-[#525757]">
            {t('description')}
          </div> */}
        </div>

        {isLoading && <TeamMemberSkeleton />}
        {teamMembers.map((teamMember) => (
          <TeamMemberCard
            teamMember={teamMember}
            key={teamMember.id.toString()}
          />
        ))}

        <div className="col-span-12 hidden bg-[#DAF3F4] p-4 md:p-16 lg:col-span-6">
          <div className="font-[Manrope] text-4xl font-semibold tracking-[0%] text-[#0036AF] md:text-[48px] md:leading-[70px]">
            {t('quote')}
          </div>
        </div>
      </div>
    </section>
  )
}
