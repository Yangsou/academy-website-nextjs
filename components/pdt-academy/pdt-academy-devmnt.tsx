'use client'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import CheckCicle from '../icons/check-circle'

function Item({ text, className }: { text: string; className?: string }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-0 w-6">
        <CheckCicle />
      </div>
      <p className={cn('text-base font-normal text-[#525757]', className)}>{text}</p>
    </div>
  )
}
function BlockItems({
  title,
  items,
  itemClassName,
  titleClassName,
}: {
  title: string
  items: string[]
  itemClassName?: string
  titleClassName?: string
}) {
  return (
    <>
      <p className={cn('text-xl font-medium text-[#202222]', titleClassName)}>{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <div
            className="text-[32px] text-[#202222]"
            key={index}
          >
            <Item
              text={item}
              className={itemClassName ?? ''}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default function PdtAcademyDevmnt() {
  const dataSection1 = {
    title: `Tăng hiệu suất giảng dạy, giảm tải công việc soạn bài, tăng sáng tạo`,
    items: [
      `Trợ lý AI đề suất giáo trình từ bộ Ngân Hàng câu hỏi, bài tập,bộ đề thi trong quá khứ`,
      `Soạn thảo dựa theo xu hướng ra đề thi`,
      `Chuyển thể bài giảng sang định dạng E - learning`,
      `Hỗ trợ chấm & giải đáp thắc mắc`,
    ],
  }
  const dataSection2 = {
    title: `Phát hiện sớm tiềm năng học sinh`,
    items: [
      `AI tích hợp: phân tích dữ liệu học tập dựa trên hệ thống quản trị nhà trường (CRM/LMS)`,
      `AI đồng hành: gợi ý lộ trình dựa vào năng lực thực tế, đề xuất kỹ năng cần "làm đầy"`,
    ],
  }
  const dataSection3 = {
    title: `Cầu nối phụ huynh và nhà trường`,
    items: [`Trợ lý giáo vụ AI`, `Tư vấn lộ trình học tập dài hạn`, `Chủ động nắm tiến độ học tập`],
  }
  const dataSection4 = {
    title: `An toàn và giáo dục`,
    items: [
      {
        title: `Ôn tập cá nhân hóa`,
        sub: `Phân tích dựa trên kết quả để nhận biết học sinh yếu phần nào, từ đó "AI đồng hành" đề xuất luyện tập`,
      },
      {
        title: `Thi thử - Nhận phản hồi tức thời`,
        sub: `Đề xuất Bộ đề thi và ngân hàng câu hỏi dựa theo giáo trình chuẩn,
học sinh thi thử và nhận phản hồi tức thời từ AI (hỏi, đáp, giải thích trên kết quả)`,
      },
      {
        title: `Theo dõi kết quả theo thời gian thực`,
        sub: `Báo cáo kết quả tiến độ, năng lực theo thời gian cho giáo viên và phụ huynh`,
      },
    ],
  }
  return (
    <div className="container py-12">
      <p className="text-[32px] text-[#202222]">Đồng hành và phát triển</p>

      <div className="mt-2 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-4">
        <div>
          <div className="relative mb-2 h-[78px] w-[78px]">
            <Image
              src="/product/pdt-aca-ai-icon-01.png"
              fill
              alt=""
            />
          </div>
          <BlockItems
            title={dataSection1.title}
            items={dataSection1.items}
          />
        </div>
        <div>
          <div className="relative mb-2 h-[78px] w-[78px]">
            <Image
              src="/product/pdt-aca-ai-icon-02.png"
              fill
              alt=""
            />
          </div>
          <BlockItems
            title={dataSection2.title}
            items={dataSection2.items}
          />
        </div>

        <div className="relative">
          <Image
            src="/product/pdt-aca-ai-image-02.png"
            alt=""
            fill
          />
        </div>
      </div>

      <div className="mt-12 gap-6 space-y-6 lg:flex lg:space-y-0">
        <div className="relative h-[186px] w-[340px] rounded-[20px]">
          <Image
            src="/product/pdt-aca-ai-icon-03.jpg"
            fill
            alt=""
            objectFit="cover"
            objectPosition="top"
            className="rounded-[20px]"
          />
        </div>
        <div className="relative h-[186px] w-[340px] rounded-[20px]">
          <Image
            src="/product/pdt-aca-ai-icon-04.jpg"
            objectFit="cover"
            objectPosition="top"
            className="rounded-[20px]"
            fill
            alt=""
          />
        </div>
        <div>
          <BlockItems
            items={dataSection3.items}
            title={dataSection3.title}
            titleClassName="text-[32px] font-normal"
            itemClassName="text-[#202222] text-[20px] font-medium"
          />
        </div>
      </div>

      <div className="mt-10 justify-between gap-6 lg:flex">
        <div className="lg:w-2/5">
          <p className="text-[32px] text-[#202222]">{dataSection4.title}</p>

          <div className="mt-6 space-y-6">
            {dataSection4.items.map(({ sub, title }, index) => (
              <div key={index}>
                <Item
                  text={title}
                  className="text-xl font-medium text-[#202222]"
                />
                <p className="mt-1 text-base font-normal text-[#525757] lg:max-w-[464px]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-6 h-[192px] max-w-[732px] md:h-[376px] lg:mt-0 lg:h-[386px] lg:w-3/5">
          <Image
            src="/product/pdt-aca-ai-image-03.png"
            objectFit="cover"
            objectPosition="center"
            className="rounded-[20px]"
            fill
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
