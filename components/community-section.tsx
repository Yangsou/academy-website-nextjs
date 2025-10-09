"use client"

import { motion } from "framer-motion"
import { MessageCircle, Lightbulb, UserPlus, Award, Users, Heart, Compass } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "Meaningful Conversations",
    description: "Connect with like-minded individuals exploring conscious living and AI integration.",
  },
  {
    icon: Lightbulb,
    title: "Shared Learning",
    description: "Learn from others' experiences and share your own insights on the journey.",
  },
  {
    icon: Award,
    title: "Mentorship Program",
    description: "Become a mentor or find guidance from experienced community members.",
  },
]

const onboardingSteps = [
  {
    step: "01",
    title: "Join the Community",
    description: "Sign up and complete your profile to connect with others on similar journeys.",
    icon: Users,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    step: "02",
    title: "Discover Your Rhythm",
    description: "Take our assessment to understand your unique patterns and connect with compatible members.",
    icon: Heart,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    step: "03",
    title: "Engage & Learn",
    description: "Participate in discussions, attend events, and share experiences with the community.",
    icon: MessageCircle,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    step: "04",
    title: "Guide Others",
    description: "Share your insights and become a mentor to help others on their conscious living journey.",
    icon: Compass,
    gradient: "from-pink-500 to-rose-600",
  },
]

export default function CommunitySection() {
  return (
    <section id="community" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join a community of conscious individuals navigating the intersection of AI and human potential.
          </p>
        </motion.div>

        {/* Why AI Companion Matters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 relative"
        >
          {/* Background Image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <Image
              src="/community-why-an-ai.png"
              alt="Why an AI Companion Matters"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-800/20"></div>
          </div>

          <Card className="relative bg-transparent backdrop-blur-sm border border-cyan-500/20 overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-2xl">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Why an AI Companion Matters
                  </span>
                </h3>
                <p className="text-white text-lg leading-relaxed max-w-4xl mx-auto drop-shadow-lg font-medium">
                  In an age where artificial intelligence is reshaping every aspect of our lives, human connection
                  becomes more precious than ever. An AI companion isn't about replacing human relationships—it's about
                  creating a bridge between technology and consciousness. Our community provides a space for authentic
                  relationships, shared learning, and mutual support as we navigate this transformative landscape
                  together. Here, you'll find others who believe that the future of AI lies not in replacing human
                  connection, but in creating tools that help us connect more meaningfully with ourselves and each
                  other.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {communityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm shadow-lg">
                      <feature.icon className="w-8 h-8 text-cyan-400 drop-shadow-md" />
                    </div>
                    <h4 className="text-white font-bold mb-2 drop-shadow-lg">{feature.title}</h4>
                    <p className="text-white text-sm leading-relaxed drop-shadow-md font-medium">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Onboarding Steps Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Your Journey Starts Here
            </span>
          </h3>
          <p className="text-center text-gray-400 mb-12 text-lg">Four simple steps to join our conscious community</p>

          {/* Timeline for larger screens */}
          <div className="hidden lg:block relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-purple-500/20 transform -translate-y-1/2"></div>

            <div className="grid lg:grid-cols-4 gap-8 relative">
              {onboardingSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Glowing marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-500/50 z-10"></div>

                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 mt-8 group">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-cyan-400 mb-2">{step.step}</div>
                      <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cards for smaller screens */}
          <div className="lg:hidden grid gap-6">
            {onboardingSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-bold text-cyan-400">{step.step}</span>
                          <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ambassador/Mentor Registration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background with abstract shapes */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

          <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Become an AI+DI Ambassador
                  </span>
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                  Ready to help others on their journey toward conscious living with AI? Join our ambassador program and
                  become a guide for those exploring the intersection of technology and human potential.
                </p>
                <div className="space-y-4 mb-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Share your expertise and insights with the community</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Connect with like-minded individuals worldwide</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span className="text-gray-300">Help shape the future of conscious AI development</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 text-white border-0 py-4 px-8 text-lg font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <UserPlus className="mr-2 w-5 h-5 relative z-10" />
                  <span className="relative z-10 font-spaceGrotesk">Join Our Ambassador Network</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
