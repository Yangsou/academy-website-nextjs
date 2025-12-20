import { cn } from '@/lib/utils'

import type { ClassNameValue } from 'tailwind-merge'

export default function JobTag({ label, theme = '' }: { label: string; theme?: string }) {
  const tagTheme: Record<string, ClassNameValue> = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    teal: 'bg-teal-100 text-teal-600',
    pink: 'bg-pink-100 text-pink-600',
    green: 'bg-green-100 text-green-600',
    '': '',
  }
  return (
    <span
      className={cn(
        'px-3 py-1 font-[manrope] text-[16px] text-xs font-normal leading-[150%] text-[#254BC8]',
        tagTheme[theme]
      )}
    >
      {label}
    </span>
  )
}
