'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { InstagramIcon, TikTokIcon, FacebookIcon, YouTubeIcon, LinkedInIcon } from './social-icons'

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/aidi',
    icon: FacebookIcon,
    color: 'from-blue-600 to-blue-700',
    hoverColor: 'hover:from-blue-500 hover:to-blue-600',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/ai+di_world',
    icon: InstagramIcon,
    color: 'from-pink-600 to-purple-600',
    hoverColor: 'hover:from-pink-500 hover:to-purple-500',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@AIplusDIJSC',
    icon: YouTubeIcon,
    color: 'from-red-600 to-red-700',
    hoverColor: 'hover:from-red-500 hover:to-red-600',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@aidiworld',
    icon: TikTokIcon,
    color: 'from-slate-800 to-black',
    hoverColor: 'hover:from-slate-700 hover:to-slate-900',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aidiworld',
    icon: LinkedInIcon,
    color: 'from-blue-600 to-blue-700',
    hoverColor: 'hover:from-blue-500 hover:to-blue-600',
  },
]

const contactInfo = [
  {
    icon: Mail,
    title: 'contact@aidi.world',
  },
  {
    icon: MapPin,
    title: '2 Ton Duc Thang, Saigon Ward, Ho Chi Minh City (Headquarters)',
  },
  {
    icon: MapPin,
    title: '1st and 4th Floors, 46 Bach Dang, Tan Son Hoa Ward, Ho Chi Minh City (Business Office)',
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = (await response.json()) as { success?: boolean; error?: string }

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
      } else {
        console.error('Newsletter subscription error:', result.error)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Newsletter subscription submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-cyan-500/20 bg-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.2) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-950/90" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-12 lg:grid-cols-2">
          {/* Left side - Logo and Description */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Logo */}
              <Link
                href="/"
                className="group flex items-center space-x-3"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="relative flex h-[200px] w-[200px] items-center justify-center">
                  <Image
                    src="/aidi-logo-horizontal.svg"
                    alt="Ai+Di Logo"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                {/* <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Ai+Di
                </span> */}
              </Link>

              {/* Description */}
              <p className="max-w-md leading-relaxed text-gray-400">
                Building Ai that reflects human consciousness and enhances our potential for
                conscious living in the digital age. Technology that serves humanity's highest
                aspirations.
              </p>

              {/* Tagline */}
              <p className="text-sm font-medium italic text-cyan-400">
                "Ai that reflects. Not replaces."
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
                <form
                  onSubmit={handleSubscribe}
                  className="space-y-3"
                >
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      required
                      className="flex-1 rounded-lg border border-cyan-500/30 bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 transition-colors duration-300 focus:border-cyan-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-spaceGrotesk rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="rounded-lg border border-green-500/30 bg-green-500/20 p-3">
                      <p className="text-sm text-green-400">
                        Thank you! You've been successfully subscribed.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/20 p-3">
                      <p className="text-sm text-red-400">
                        Sorry, there was an error subscribing. Please try again.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>

          {/* Right side - Social Media, Contact, and Back to Top */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Follow Us Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold uppercase tracking-wider text-white">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`h-14 w-14 bg-gradient-to-br ${social.color} ${social.hoverColor} group flex items-center justify-center rounded-xl border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
                      title={social.name}
                    >
                      <social.icon className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Contact Us Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold uppercase tracking-wider text-white">
                  Contact Us
                </h3>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 text-gray-400 transition-colors duration-200 hover:text-cyan-400"
                    >
                      <contact.icon className="h-5 w-5 flex-shrink-0 text-cyan-500" />
                      <span className="font-semibold text-white">{contact.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to Top Button */}
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="group flex items-center space-x-3 text-gray-400 transition-colors duration-300 hover:text-cyan-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/40">
                    <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="font-spaceGrotesk text-sm font-medium">Back to Top</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-cyan-500/20 pt-8"
        >
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2025 Ai+Di. Made with</span>
              <Heart className="h-4 w-4 animate-pulse fill-current text-red-400" />
              <span>for conscious living.</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
