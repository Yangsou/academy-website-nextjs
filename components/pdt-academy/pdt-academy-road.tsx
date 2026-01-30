'use client'
import Image from 'next/image'

import CheckCicle from '../icons/check-circle'

export default function PdtAcademyRoad() {
  const roadData = [
    {
      title: `Khai vấn tiềm năng`,
      desc: `Được định hướng ngành nghề, lộ trình học bổng và tài chính du học`,
    },
    {
      title: `Tối ưu tố chất`,
      desc: `Làm giàu năng lực học sinh bằng các khoá học, chứng chỉ quốc tế`,
    },
    {
      title: `Đồng hành thành công`,
      desc: `Cá nhân hoá hồ sơ học tập, giúp học sinh chinh phục học bổng`,
    },
    {
      title: `Trang bị vững vàng`,
      desc: `Đào tạo kỹ năng du học thiết yếu và tinh thần công dân toàn cầu`,
    },
  ]
  return (
    <div>
      <div className="relative py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#6DC9CB]" />
          <Image
            src="/product/pdt-aca-road-bg.png"
            alt="AI and human connection"
            fill
            className="z-10 object-cover object-center opacity-20"
            priority
          />
          {/* Dark overlay for better text readability */}
        </div>

        <div className="container relative z-10">
          <p className="text-3xl font-semibold text-white lg:text-[42px]">
            Tư vấn hướng nghiệp và du học thông minh
          </p>
          <p className="mt-4 text-2xl font-semibold text-white lg:text-[32px] lg:leading-normal">
            Hệ thống AI Career & Scholarship Matching
          </p>

          <div className="mt-12 flex w-full max-w-[1062px] flex-col overflow-hidden rounded-[20px] border-[5px] border-solid border-white border-opacity-30 lg:h-[356px] lg:flex-row">
            <div className="relative h-[356px] w-full bg-[#D4ECFF] lg:flex-1">
              <Image
                src="/product/pdt-aca-image-04.png"
                objectFit="cover"
                className="object-[0_32px]"
                fill
                alt=""
              />
            </div>
            <div className="w-full bg-white px-8 py-8 lg:w-[368px]">
              <CheckCicle
                width={44}
                height={44}
              />
              <p className="text-[38px] font-normal text-[#202222]">
                Học sinh được định hướng sớm, tự tin chọn ngành nghề
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="mt-10 flex w-[1062px] flex-col overflow-hidden rounded-[20px] border-[5px] border-solid border-[#fff] border-opacity-30 lg:h-[356px] lg:flex-row-reverse">
              <div className="relative h-[356px] w-full lg:flex-1">
                <Image
                  src="/product/pdt-aca-image-05.png"
                  objectFit="cover"
                  objectPosition="left"
                  fill
                  alt=""
                />
              </div>
              <div className="w-full bg-white px-8 py-8 lg:w-[368px]">
                <CheckCicle
                  width={44}
                  height={44}
                />
                <p className="text-[38px] font-normal text-[#202222]">
                  Phụ huynh có cơ sở khoa học để đầu tư lộ trình học tập dài hạn
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container relative mt-16 rounded-[20px] bg-white py-10 lg:px-[76px]">
          <div>
            <p className="text-2xl font-medium text-[#202222] lg:text-[32px]">
              Đồng hành trọn vẹn hành trình của học sinh
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-y-10 lg:grid-cols-4">
            {roadData.map(({ desc, title }, index) => (
              <div
                key={index}
                className="relative before:absolute before:left-0 before:top-4 before:hidden before:h-[2px] before:w-full before:bg-[#DAF3F4] last:before:hidden lg:before:block"
              >
                <span className="relative rounded-[20px] bg-[#0036AF] px-5 py-2 text-lg font-medium">
                  Bước {index + 1}
                </span>
                <div className="mt-6 w-[calc(100%_-_40px)] rounded-[20px] bg-[#DAF3F4] py-3 pl-6 pr-5">
                  <p className="text-lg font-bold text-[#202222]">{title}</p>
                  <p className="text-base font-normal text-[#525757]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
