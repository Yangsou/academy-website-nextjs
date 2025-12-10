'use client'

// import { motion } from 'framer-motion'
// import { Heart, ArrowUp, Mail, Phone, MapPin, Globe } from 'lucide-react'
import Link from 'next/link'

import { FacebookIcon, YouTubeIcon, LinkedInIcon } from './social-icons'
// import { useState } from 'react'
// import Image from 'next/image'

// const socialLinks = [
//   {
//     name: 'Facebook',
//     href: 'https://facebook.com/aidi',
//     icon: FacebookIcon,
//     color: 'from-blue-600 to-blue-700',
//     hoverColor: 'hover:from-blue-500 hover:to-blue-600',
//   },
//   {
//     name: 'Instagram',
//     href: 'https://instagram.com/ai+di_world',
//     icon: InstagramIcon,
//     color: 'from-pink-600 to-purple-600',
//     hoverColor: 'hover:from-pink-500 hover:to-purple-500',
//   },
//   {
//     name: 'YouTube',
//     href: 'https://www.youtube.com/@AIplusDIJSC',
//     icon: YouTubeIcon,
//     color: 'from-red-600 to-red-700',
//     hoverColor: 'hover:from-red-500 hover:to-red-600',
//   },
//   {
//     name: 'TikTok',
//     href: 'https://www.tiktok.com/@aidiworld',
//     icon: TikTokIcon,
//     color: 'from-slate-800 to-black',
//     hoverColor: 'hover:from-slate-700 hover:to-slate-900',
//   },
//   {
//     name: 'LinkedIn',
//     href: 'https://www.linkedin.com/in/aidiworld',
//     icon: LinkedInIcon,
//     color: 'from-blue-600 to-blue-700',
//     hoverColor: 'hover:from-blue-500 hover:to-blue-600',
//   },
// ]

// const contactInfo = [
//   {
//     icon: Mail,
//     title: 'contact@aidi.world',
//   },
//   {
//     icon: MapPin,
//     title: '2 Ton Duc Thang, Saigon Ward, Ho Chi Minh City (Headquarters)',
//   },
//   {
//     icon: MapPin,
//     title: '1st and 4th Floors, 46 Bach Dang, Tan Son Hoa Ward, Ho Chi Minh City (Business Office)',
//   },
// ]

export default function Footer() {
  // const [email, setEmail] = useState('')
  // const [isSubmitting, setIsSubmitting] = useState(false)
  // const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  // }

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value)
  // }

  // const handleSubscribe = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
  //   setSubmitStatus('idle')

  //   try {
  //     const response = await fetch('/api/subscribe', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email }),
  //     })

  //     const result = await response.json()

  //     if (response.ok) {
  //       setSubmitStatus('success')
  //       setEmail('')
  //     } else {
  //       console.error('Newsletter subscription error:', result.error)
  //       setSubmitStatus('error')
  //     }
  //   } catch (error) {
  //     console.error('Newsletter subscription submission error:', error)
  //     setSubmitStatus('error')
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }
  const data = [
    {
      key: 'contact',
      title: 'Contact',
      content: 'contact@aidi.world',
    },
    {
      key: 'head-office',
      title: 'Head office',
      content: '2 Ton Duc Thang, Saigon Ward, \n HCM City',
    },
    {
      key: 'business-office',
      title: 'Business office',
      content: '1st and 4th Floors, 46 Bach Dang, \n Tan Son Hoa Ward, HCM City',
    },
  ]

  return (
    <footer className="flex justify-center bg-[#0036AF] p-10">
      <div className="w-[88%]">
        <div className="grid grid-cols-12 gap-4">
          {data.map((item) => (
            <div
              key={item.key}
              className="col-span-12 lg:col-span-3"
            >
              <div className="align-middle font-[Manrope] text-[20px] font-bold leading-[150%] tracking-[0%] text-[#EEEEEE]">
                {item.title}
              </div>
              <div className="font-manrope mt-3 whitespace-pre-line align-middle font-[Manrope] text-[18px] font-normal leading-[150%] tracking-[0%] text-[#EEEEEE]">
                {item.content}
              </div>
            </div>
          ))}
          <div className="align-start col-span-12 flex justify-start gap-4 lg:col-span-3 lg:justify-end">
            <FacebookIcon />
            <LinkedInIcon />
            <YouTubeIcon />
          </div>
          <div className="col-span-12 flex w-full flex-col items-center justify-between gap-4 border-b-2 border-[#EEEEEE] pb-4 lg:flex-row">
            <div className="flex items-end justify-start gap-4">
              <img
                src="/footer/logo-footer.svg"
                alt="AI+DI Logo"
                className="h-[60%] w-[60%] object-contain lg:h-[100%] lg:w-[100%]"
              />
              <div className="whitespace-nowrap font-[Manrope] text-[14px] font-bold tracking-[0%] text-[#A0DCDD] lg:text-[20px]">
                Reflect, Not replace
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  Home
                </div>
              </Link>
              <Link href="/about">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  About
                </div>
              </Link>
              <Link href="/products">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  Products
                </div>
              </Link>
              <Link href="/community">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  career
                </div>
              </Link>
              <Link href="/blog">
                <div className="align-middle font-[Manrope] text-[16px] font-bold uppercase leading-[150%] tracking-[0%] text-[#EEEEEE]">
                  Blog
                </div>
              </Link>
            </div>
          </div>
          <div className="font-regular col-span-12 align-middle font-[Manrope] text-[16px] leading-[150%] tracking-[0%] text-[#EEEEEE]">
            Ai+Di JSC. All Rights Reserved 2025
          </div>
        </div>
      </div>
    </footer>
  )
}
