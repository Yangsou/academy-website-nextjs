'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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
export default function OurTeam() {
  const { teamMembers } = useMembers()

  return (
    <section className="z-20 mt-0 bg-[#F7F9FD] lg:mt-[-240px]">
      <div className="gap-4 py-12">
        <div className="flex justify-center">
          <div className="grid h-full w-[88%] grid-cols-12 gap-8 py-12">
            <div className="col-span-12 flex flex-col items-start justify-start gap-4">
              <div className="font-[Manrope] text-[56px] font-semibold leading-[110%] tracking-[0%] text-[#0036AF]">
                Our team
              </div>
              <div className="font-regular align-middle font-[Manrope] text-[20px] leading-[150%] tracking-[0%] text-[#525757]">
                Ai+Di is led by a diverse team of visionaries, engineers, educators, and strategists
                — united by one shared belief: that Artificial Intelligence should elevate humanity,
                not replace it. From the founders who shaped the vision to the experts driving
                innovation every day, each person at Ai+Di contributes to building a conscious
                ecosystem where technology grows with people, not against them.
              </div>
            </div>

            {teamMembers.map((teamMember) => (
              <TeamMemberCard
                teamMember={teamMember}
                key={teamMember.id.toString()}
              />
            ))}

            <div className="col-span-12 bg-[#DAF3F4] p-16 lg:col-span-6">
              <div className="font-[Manrope] text-[48px] font-semibold leading-[70px] tracking-[0%] text-[#0036AF]">
                And over 100 members who share the same mission.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
