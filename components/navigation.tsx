'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const t = useTranslations('HomePage')

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  const navItems = [
    { name: t('home'), href: '/' },
    // { name: t('about'), href: '/about' },
    // { name: t('solutions'), href: '/products' },
    // ...(process.env.disableCareer === 'true' ? [] : [{ name: t('career'), href: '/career' }]),
    // { name: t('blog'), href: '/blog' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-cyan-400/20 bg-white shadow-sm shadow-cyan-500/5 backdrop-blur-xl'
          : 'bg-white shadow-lg backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex h-[64px] items-center justify-between">
          <Link
            href="/"
            className="group flex items-center space-x-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <img
                  src="/header/logo.svg"
                  alt="AI+DI Logo"
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden h-16 w-[756px] items-center justify-end md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block h-full"
              >
                <motion.div
                  className={cn(
                    'font-manrope group relative h-full px-6 align-middle text-lg font-normal leading-[64px] tracking-[0%] transition-all',
                    'hover:font-semibolds hover:bg-[#A0DCDD] hover:text-[#0036AF]',
                    {
                      'text-xl font-semibold leading-[64px] text-[#0036AF]': isActive(item.href),
                      'text-[#626262]': !isActive(item.href),
                    }
                  )}
                >
                  <span className="group-hover:opacity-0">{item.name}</span>
                  <span className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-semibold text-[#0036AF] opacity-0 group-hover:opacity-100">
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:text-white focus:outline-none"
              aria-label="toggle"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border-t border-cyan-500/20 bg-white shadow-lg shadow-cyan-500/10 backdrop-blur-xl md:hidden"
        >
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setIsOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <div
                  className={`font-manrope block rounded-md px-3 py-2 align-middle text-[20px] font-semibold leading-[150%] tracking-[0%] transition-colors duration-200 ${
                    isActive(item.href) ? 'text-[#0036AF]' : 'text-[#626262] hover:text-[#0036AF]'
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
            {/* <div className="px-3 py-2">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  scrollToContact();
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-2 text-sm font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get Started
              </Button>
            </div> */}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
