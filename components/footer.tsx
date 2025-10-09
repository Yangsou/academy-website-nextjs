"use client"

import { motion } from "framer-motion"
import { Heart, ArrowUp, Mail, Phone, MapPin, Globe } from "lucide-react"
import Link from "next/link"
import { InstagramIcon, TikTokIcon, FacebookIcon, YouTubeIcon, LinkedInIcon } from "./social-icons"
import { useState } from "react"

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/aidi",
    icon: FacebookIcon,
    color: "from-blue-600 to-blue-700",
    hoverColor: "hover:from-blue-500 hover:to-blue-600",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ai+di_world",
    icon: InstagramIcon,
    color: "from-pink-600 to-purple-600",
    hoverColor: "hover:from-pink-500 hover:to-purple-500",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@AIplusDIJSC",
    icon: YouTubeIcon,
    color: "from-red-600 to-red-700",
    hoverColor: "hover:from-red-500 hover:to-red-600",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@aidiworld",
    icon: TikTokIcon,
    color: "from-slate-800 to-black",
    hoverColor: "hover:from-slate-700 hover:to-slate-900",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aidiworld",
    icon: LinkedInIcon,
    color: "from-blue-600 to-blue-700",
    hoverColor: "hover:from-blue-500 hover:to-blue-600",
  },
]

const contactInfo = [
  {
    icon: Mail,
    title: "contact@aidi.world",
  },
  {
    icon: MapPin,
    title: "2 Ton Duc Thang, Saigon Ward, Ho Chi Minh City (Headquarters)",
  },
  {
    icon: MapPin,
    title: "1st and 4th Floors, 46 Bach Dang, Tan Son Hoa Ward, Ho Chi Minh City (Business Office)",
  },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setEmail("")
      } else {
        console.error('Newsletter subscription error:', result.error)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error('Newsletter subscription submission error:', error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.2) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-950/90"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
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
                className="flex items-center space-x-3 group"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                  <img src="/aidi-logo-horizontal.svg" alt="AI+DI Logo" className="w-[200px] h-[200px] object-contain" />
                </div>
                {/* <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  AI+DI
                </span> */}
              </Link>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed max-w-md">
                Building AI that reflects human consciousness and enhances our potential for conscious living in the
                digital age. Technology that serves humanity's highest aspirations.
              </p>

              {/* Tagline */}
              <p className="text-sm text-cyan-400 font-medium italic">"AI that reflects. Not replaces."</p>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Stay Updated</h4>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      required
                      className="flex-1 bg-slate-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 font-medium font-spaceGrotesk"
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm">Thank you! You've been successfully subscribed.</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">Sorry, there was an error subscribing. Please try again.</p>
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
                <h3 className="text-white font-semibold text-lg uppercase tracking-wider">Follow Us</h3>
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
                      className={`w-14 h-14 bg-gradient-to-br ${social.color} ${social.hoverColor} backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-xl`}
                      title={social.name}
                    >
                      <social.icon className="text-white w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Contact Us Section */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg uppercase tracking-wider">Contact Us</h3>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                    >
                      <contact.icon className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-white font-semibold">{contact.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to Top Button */}
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/20 rounded-lg flex items-center justify-center group-hover:border-cyan-400/40 transition-all duration-300">
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-medium font-spaceGrotesk">Back to Top</span>
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
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2025 AI+DI. Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
              <span>for conscious living.</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
