'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Community', href: '/community' },
  { name: 'Blog', href: '/blog' },
]

export default function Navigation() {
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

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-cyan-500/20 bg-slate-950/70 shadow-lg shadow-cyan-500/5 backdrop-blur-xl'
          : 'bg-slate-950/30 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group flex items-center space-x-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="relative flex h-[200px] w-[200px] items-center justify-center">
                <Image
                  src="/aidi-logo-horizontal.svg"
                  alt="Ai+Di Logo"
                  width={200}
                  height={200}
                  className="object-contain"
                  priority
                />
              </div>
              {/* <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Ai+Di
              </span> */}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 ${
                      isActive(item.href) ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-0.5 transform bg-gradient-to-r from-cyan-400 to-blue-400 transition-transform duration-200 ${
                        isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </motion.div>
                </Link>
              ))}
              <Button
                onClick={scrollToContact}
                className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-cyan-500/25"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:text-white focus:outline-none"
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
          className="border-t border-cyan-500/20 bg-slate-950/90 shadow-lg shadow-cyan-500/10 backdrop-blur-xl md:hidden"
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
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button
                onClick={() => {
                  setIsOpen(false)
                  scrollToContact()
                }}
                className="w-full border-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-cyan-500/25"
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
