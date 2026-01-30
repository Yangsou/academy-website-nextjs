'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useId } from 'react'

import CheckCicle from '../icons/check-circle'
import { AspectRatio } from '../ui/aspect-ratio'

export default function PdtAcademyStatistic() {
  const data = {
    title: `Hiệu quả thực tế của AI theo đánh giá từ các chuyên gia đào tạo`,
    stats: [
      {
        key: useId(),
        label: `Cải thiện việc chấm điểm`,
        value: `57%`,
      },
      {
        key: useId(),
        label: `Giảm tải hành chính`,
        value: `>74%`,
      },
      {
        key: useId(),
        label: `Tiết kiệm thời gian làm việc`,
        value: `↓5,9h`,
      },
      {
        key: useId(),
        label: `Tiết kiệm thời gian soạn bài`,
        value: `>80%`,
      },
    ],
  }
  return (
    <>
      <div className="container pb-20 pt-10">
        <div>
          <p className="mb-10 text-center text-2xl font-normal text-[#202222] lg:text-[32px]">
            {data.title}
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-y-4 rounded-[20px] border-[1px] border-solid border-border py-9 pl-6 lg:grid-cols-4 lg:pl-16 xl:pl-[76px]">
          {data.stats.map(({ key, label, value }) => (
            <div
              key={key}
              className="relative pl-6 before:absolute before:left-0 before:top-0 before:block before:h-full before:w-1 before:bg-[#6DC9CB]"
            >
              <p className="text-4xl text-[#0036AF]">{value}</p>
              <p className="text-sm text-[#525757]">{label}</p>
            </div>
          ))}

          <div className="absolute bottom-0 right-4">
            <Link
              href="https://news.gallup.com/poll/691967/three-teachers-weekly-saving-six-weeks-year.aspx"
              target="__blank"
            >
              <div className="translate-y-full rounded-b-2xl bg-[#6DC9CB] p-2 text-sm">
                *Trích nguồn từ Gallup
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#EEF4FF] py-14">
        <div className="container">
          <div className="gap-16 lg:flex">
            <div className="w-full max-w-[516px]">
              <AspectRatio ratio={2 / 1}>
                <Image
                  src="/product/pdt-aca-ai-image-01.png"
                  fill
                  className="object-cover"
                  alt=""
                />
              </AspectRatio>
            </div>
            <div className="max-w-[640px] space-y-4 pt-4">
              <p className="text-2xl text-[#202222] lg:text-[32px]">
                Công nghệ phụng sự giáo dục vì con người
              </p>
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-6">
                  <CheckCicle />
                </div>
                <p className="text-base text-[#525757]">
                  AI là một công cụ mạnh mẽ không nhằm thay thế con người, mà là trợ lực để giải
                  phóng tiềm năng sáng tạo của giảng viên và học viên.
                </p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-6">
                  <CheckCicle />
                </div>
                <p className="text-[#525757]">
                  AI nâng tầm giá trị nhân văn, giúp con người phát triển toàn diện và giữ vững thấu
                  cảm cùng tư duy phản biện trong học tập.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
