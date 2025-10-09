"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Community", href: "/community" },
  { name: "Blog", href: "/blog" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/70 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5"
          : "bg-slate-950/30 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-[200px] h-[200px] flex items-center justify-center">
                <img src="/aidi-logo-horizontal.svg" alt="AI+DI Logo" className="w-[200px] h-[200px] object-contain" />
              </div>
              {/* <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI+DI
              </span> */}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group hover:shadow-lg hover:shadow-cyan-500/20 ${
                      isActive(item.href) ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transform transition-transform duration-200 ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </motion.div>
                </Link>
              ))}
              <Button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-2 text-sm font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
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
          className="md:hidden bg-slate-950/90 backdrop-blur-xl border-t border-cyan-500/20 shadow-lg shadow-cyan-500/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setIsOpen(false)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                <div
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href) ? "text-cyan-400 bg-cyan-500/10" : "text-gray-300 hover:text-cyan-400"
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-2 text-sm font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
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
