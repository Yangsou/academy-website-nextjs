'use client'
import { ArrowUpIcon } from 'lucide-react'

import { Button } from './ui/button'

export default function BtnScrollTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <Button
      size="icon"
      variant="default"
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 z-50 border border-solid border-[#A0DCDD] bg-white p-3 text-[#A0DCDD] shadow-sm hover:bg-[#A0DCDD] hover:text-white"
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="h-5 w-5" />
    </Button>
  )
}
