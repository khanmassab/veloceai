'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Network, MessageSquare, Rocket } from 'lucide-react'
import { Reveal, MagneticButton, GradientText } from '@/components/ScrollAnimations'

interface ServiceCTASectionProps {
  onBookNow: () => void
  title: string
  titleGradientText?: string
  subtitle: string
  description: string
  highlightText: string
}

export default function ServiceCTASection({
  onBookNow,
  title,
  titleGradientText,
  subtitle,
  description,
  highlightText
}: ServiceCTASectionProps) {
  const ref = useRef(null)

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${(i * 3) % 100}%`,
              top: `${(i * 5) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold mb-6">
            {titleGradientText ? (
              <>
                {title.split(titleGradientText)[0]}
                <GradientText 
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                  duration={2}
                >
                  {titleGradientText}
                </GradientText>
                {title.split(titleGradientText)[1]}
              </>
            ) : (
              title
            )}
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </Reveal>

        <Reveal direction="up" distance={40} delay={0.3}>
          <p className="text-lg mb-8 text-gray-300 max-w-4xl mx-auto">
            {description}
          </p>
        </Reveal>

        <Reveal direction="up" distance={40} delay={0.4}>
          <p className="text-2xl font-semibold text-blue-400 mb-12">
            {highlightText}
          </p>
        </Reveal>
        
        <Reveal direction="up" distance={30} delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <MagneticButton 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold h-14 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
              magneticStrength={0.3}
              onClick={onBookNow}
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Free Session</span>
            </MagneticButton>
            
            <MagneticButton 
              className="bg-transparent text-blue-400 border-2 border-blue-400 hover:bg-blue-400 hover:text-white font-semibold h-14 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
              magneticStrength={0.2}
              onClick={() => window.location.href = '/contact'}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Contact Us</span>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.6}>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>24h Response Time</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Enterprise Security</span>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.8}>
          <p className="text-gray-300 text-center mt-8">
            Have questions? Contact us at{' '}
            <a 
              href="mailto:hello@veloceai.co" 
              className="text-blue-400 hover:text-cyan-400 transition-colors duration-300 hover:underline font-semibold"
            >
              hello@veloceai.co
            </a>
            {' '}| We respond within 24 hours
          </p>
        </Reveal>
      </div>
    </section>
  )
}
