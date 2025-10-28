'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  ArrowDown,
  MessageSquare,
  Users,
  Zap,
  Database,
  Sparkles,
  Brain,
  Network,
  Calendar,
  Rocket,
  Send,
  AlertCircle,
  User,
  Mail,
  Phone as PhoneIcon,
  Shield
} from 'lucide-react'
import Logo from '@/components/Logo'
import BookingModal from '@/components/BookingModal'
import ReCAPTCHA from 'react-google-recaptcha'
import PhoneInput, { Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { getCountryFromTimezone } from '@/lib/countryDetection'
import { ScrollAnimation, ParallaxScroll, StaggerContainer, StaggerItem, MagneticButton, Reveal, GradientText } from '@/components/ScrollAnimations'
import { ThreeJSBackground, Card3D } from '@/components/ThreeJSBackground'
import { fadeInUp, staggerContainer, staggerItem, hoverScale, magnetic, gradientText } from '@/lib/animations'

// Enhanced animation variants with better easing
const enhancedFadeInUp = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" as const
    }
  }
}

const enhancedStaggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

// Floating Neural Network Background
const NeuralNetworkBackground = () => {
  // Pre-calculate positions to avoid hydration mismatch
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: (i * 5) % 100,
    top: (i * 7) % 100,
    delay: i * 0.2,
    duration: 3 + (i % 3),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        {Array.from({ length: 15 }, (_, i) => (
          <motion.line
            key={i}
            x1={`${(i * 7) % 100}%`}
            y1={`${(i * 11) % 100}%`}
            x2={`${(i * 13) % 100}%`}
            y2={`${(i * 17) % 100}%`}
            stroke="url(#gradient)"
            strokeWidth="0.5"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Enhanced Button Component
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'lg'
  onClick?: () => void
  className?: string
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'lg',
  onClick,
  className = ''
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer relative overflow-hidden group"
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105",
    secondary: "bg-transparent text-blue-400 border-2 border-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105",
    ghost: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:scale-105"
  }
  const sizes = {
    sm: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  )
}

// Contact Form Component for Hero
const HeroContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [detectedCountry, setDetectedCountry] = useState<Country | undefined>(undefined)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  // Detect country on mount
  useEffect(() => {
    const country = getCountryFromTimezone()
    if (country) {
      setDetectedCountry(country as Country)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePhoneChange = (value: string | undefined) => {
    setFormData({
      ...formData,
      phone: value || ''
    })
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    
    if (!isLocalhost && !recaptchaToken) {
      if (recaptchaRef.current) {
        recaptchaRef.current.execute()
        return
      }
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: isLocalhost ? null : recaptchaToken
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', requirements: '' })
        setRecaptchaToken(null)
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full"
    >
      <div className="glass-dark rounded-2xl p-8 shadow-2xl border-2 border-blue-500/30 backdrop-blur-xl relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500" />
        
        {/* Form Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-white">Get Started Today</h3>
            <div className="flex items-center space-x-1 text-green-400 text-xs">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm">Fill out the form and we'll get back to you within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="hero-name" className="block text-sm font-medium text-gray-200 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="hero-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="hero-email" className="block text-sm font-medium text-gray-200 mb-2">
              Work Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="hero-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="john@company.com"
              />
            </div>
          </div>

          {/* Phone Field with International Support */}
          <div>
            <label htmlFor="hero-phone" className="block text-sm font-medium text-gray-200 mb-2">
              Phone Number *
            </label>
            <PhoneInput
              international
              defaultCountry={detectedCountry}
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              className="phone-input-custom"
              id="hero-phone"
              required
            />
            {detectedCountry && (
              <p className="text-xs text-gray-400 mt-1">
                Auto-detected: {detectedCountry}
              </p>
            )}
          </div>

          {/* Requirements Field */}
          <div>
            <label htmlFor="hero-requirements" className="block text-sm font-medium text-gray-200 mb-2">
              Tell us about your needs *
            </label>
            <textarea
              id="hero-requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              placeholder="Describe your customer support challenges..."
            />
          </div>

          {/* reCAPTCHA */}
          {typeof window !== 'undefined' && 
           window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1' && 
           process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              size="invisible"
              badge="bottomright"
            />
          )}

          {/* Success Message */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-green-400 bg-green-500/10 border border-green-500/30 p-3 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Success! We'll contact you within 24 hours.</span>
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Failed to send. Please try again.</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Start Your Free Consultation</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>

          <p className="text-xs text-gray-400 text-center mt-2">
            No credit card required • Free consultation • Response within 24h
          </p>
        </form>
      </div>
    </motion.div>
  )
}

// Enhanced Hero Section with Advanced Scroll Animations
const HeroSection = ({ onBookNow }: { onBookNow: () => void }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const scale = useTransform(scrollY, [0, 500], [1, 0.8])
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-screen flex items-center justify-center neural-bg text-white overflow-hidden dark pt-20">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.3} particleCount={150} />
      {/* Fixed Neural Network Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <NeuralNetworkBackground />
      </div>
      
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: 2 Columns with Logo Between | Mobile: Stack */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative">
            {/* Left Side - Hero Copy with Enhanced Animations */}
            <motion.div 
              initial={{ opacity: 0, x: -60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut" as const
              }}
              style={{ 
                y: shouldReduceMotion ? 0 : y,
                opacity: shouldReduceMotion ? 1 : opacity,
                scale: shouldReduceMotion ? 1 : scale
              }}
              className="space-y-6 lg:space-y-8 lg:pr-8"
            >
              {/* Logo Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                  <Logo className="w-full h-full" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full border-2 border-blue-400/20 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Headline with Gradient Animation */}
              <div className="space-y-5">
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                  VeloceAI{' '}
                  <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 align-middle">|</span>{' '}
                  Your Strategic{' '}
                  <GradientText 
                    className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text"
                    gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                    duration={3}
                  >
                    Digital Solutions Partner
                  </GradientText>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Revolutionize support with VeloceAI's Digital Solutions. Our AI integration services automate conversations, enhance customer experiences, and scale your business.
                </motion.p>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-4 lg:gap-6"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-400 flex-shrink-0" />
                  <span className="text-xs lg:text-sm text-gray-300">Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-400 flex-shrink-0" />
                  <span className="text-xs lg:text-sm text-gray-300">24h Response Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-400 flex-shrink-0" />
                  <span className="text-xs lg:text-sm text-gray-300">No Credit Card</span>
                </div>
              </motion.div>

              {/* Enhanced Secondary CTA with Magnetic Effect */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <MagneticButton 
                  className="bg-transparent text-blue-400 border-2 border-blue-400 hover:bg-blue-400 hover:text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center px-6 py-3 text-base cursor-pointer relative overflow-hidden group"
                  magneticStrength={0.2}
                  onClick={() => document.getElementById('solution-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Learn How It Works
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Right Side - Enhanced Contact Form with 3D Card */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="lg:pl-8"
            >
              <Card3D intensity={0.1}>
                <HeroContactForm />
              </Card3D>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </section>
  )
}

// Main Value Proposition Section
const MainValuePropositionSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">
              Digital Solutions & AI Integration Services for Smart Customer Support
            </h3>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Transform Customer Support with{' '}
              <GradientText 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                duration={2}
              >
                AI Digital Solutions That Actually Work
              </GradientText>
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Launch AI digital solutions for customer support in weeks, not months. Automate 70% of queries, reduce support costs by 60%, and delight your customers 24/7 across every channel.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Enhanced Stats Section with Advanced Animations
const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const stats = [
    { number: "70%", label: "Queries Automated", color: "from-blue-500 to-cyan-500" },
    { number: "60%", label: "Cost Reduction", color: "from-cyan-500 to-teal-500" },
    { number: "24/7", label: "Always Available", color: "from-teal-500 to-green-500" },
    { number: "2 Sec", label: "Average Response Time", color: "from-green-500 to-emerald-500" }
  ]

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StaggerItem key={index} className="text-center group">
              <motion.div
                className="relative"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold mb-2 relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <GradientText 
                    className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    gradient={`linear-gradient(45deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`}
                    duration={2}
                  >
                    {stat.number}
                  </GradientText>
                </motion.div>
                
                <motion.div 
                  className="text-sm md:text-base text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {stat.label}
                </motion.div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 rounded-lg blur-xl -z-10`}
                  whileHover={shouldReduceMotion ? {} : { opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// Enhanced Problem Section with Advanced Scroll Animations
const ProblemSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const problems = [
    {
      icon: Clock,
      text: "Overwhelmed Support Teams - Your team drowns in repetitive questions about passwords, shipping, and billing instead of solving complex customer problems that actually need human expertise.",
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      iconColor: "text-red-400"
    },
    {
      icon: DollarSign,
      text: "Rising Support Costs - Hiring more agents isn't scalable. Training costs, infrastructure expenses, and management overhead eat into your margins with every new team member.",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-400"
    },
    {
      icon: FileText,
      text: "Frustrated Customers - Long wait times and inconsistent answers damage your brand reputation. Customers expect instant support on their preferred channels, any time of day.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      iconColor: "text-yellow-400"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxScroll speed={0.3} direction="up" className="absolute inset-0">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-400/10 rounded-full"
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </ParallaxScroll>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={50}>
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            Stop Losing Customers to{' '}
            <GradientText 
              className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
              gradient="linear-gradient(45deg, #ef4444, #f97316, #ef4444)"
              duration={2}
            >
              Slow Support
            </GradientText>
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={30} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-300 max-w-4xl mx-auto">
            Your customers expect instant answers. Every delayed response is a lost opportunity. Traditional support teams struggle to keep up, leading to frustrated customers and skyrocketing costs. You need digital solutions that scale.
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-3 gap-12">
          {problems.map((problem, index) => (
            <StaggerItem key={index} className="text-center group">
              <motion.div
                className="relative"
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="relative mb-6">
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-br ${problem.bgColor} border ${problem.borderColor} rounded-2xl flex items-center justify-center mx-auto transition-all duration-300`}
                    whileHover={shouldReduceMotion ? {} : { 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <problem.icon className={`w-10 h-10 ${problem.iconColor}`} />
                  </motion.div>
                  
                  {/* Animated glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 rounded-2xl blur-xl`}
                    whileHover={shouldReduceMotion ? {} : { 
                      opacity: 0.3,
                      scale: 1.2,
                      transition: { duration: 0.3 }
                    }}
                  />
                </div>
                
                <motion.p 
                  className="text-lg text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2 + 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {problem.text}
                </motion.p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Highlight Box */}
        <Reveal direction="up" distance={40} delay={0.6}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-l-4 border-blue-500 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">
                You need intelligent automation that works around the clock, not just another tool that creates more work.
              </h3>
              <p className="text-lg text-gray-200 leading-relaxed">
                That’s exactly what VeloceAI delivers through its AI chatbot development services, an AI-powered chatbot that understands your customers, solves problems instantly, and escalates complex issues to human agents with full context.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Enhanced Solution Section with Storytelling Scroll
const SolutionSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const features = [
    { 
      title: "Lightning-Fast Responses", 
      description: "Answer customer queries in seconds, not hours. Our AI chatbot handles unlimited conversations simultaneously across all channels without breaking a sweat.",
      color: "from-blue-500 to-cyan-500", 
      icon: Zap,
      delay: 0
    },
    { 
      title: "Smart & Accurate", 
      description: "Powered by advanced AI and trained on your knowledge base, our chatbots provide accurate, contextual answers that truly help your customers get what they need.",
      color: "from-cyan-500 to-teal-500", 
      icon: Brain,
      delay: 0.2
    },
    { 
      title: "Reduce Costs by 60%", 
      description: "Automate 70-80% of repetitive support queries. Free your team to focus on complex issues that require human expertise and empathy.",
      color: "from-purple-500 to-pink-500", 
      icon: DollarSign,
      delay: 0.4
    },
    { 
      title: "24/7 Multilingual Support", 
      description: "Never miss a customer inquiry. Provide instant support in multiple languages, across time zones, any time of day or night.",
      color: "from-green-500 to-emerald-500", 
      icon: Clock,
      delay: 0.6
    }
  ]

  return (
    <section id="solution-section" ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      {/* Animated neural network overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxScroll speed={0.2} direction="up" className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <motion.line
                key={i}
                x1={`${(i * 5) % 100}%`}
                y1={`${(i * 8) % 100}%`}
                x2={`${(i * 13) % 100}%`}
                y2={`${(i * 17) % 100}%`}
                stroke="url(#neuralGradient)"
                strokeWidth="0.5"
                opacity="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 3, delay: i * 0.1 }}
              />
            ))}
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </ParallaxScroll>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-16">
            Meet Your{' '}
            <GradientText 
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
              gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
              duration={3}
            >
              AI Support Assistant
            </GradientText>
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            VeloceAI builds intelligent chatbots that understand your customers, solve problems instantly, and never sleep. It's like having a support team that scales infinitely without the costs.
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <StaggerItem key={index} className="group">
              <motion.div
                className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  duration: 0.8, 
                  delay: feature.delay,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 rounded-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="flex items-start space-x-4 relative z-10">
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300`}
                    whileHover={shouldReduceMotion ? {} : { 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-semibold mb-3 text-white"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: feature.delay + 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: feature.delay + 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 rounded-xl blur-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.2,
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// How It Works Section
const HowItWorksSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      number: 1,
      title: "Connect Your Data",
      description: "Upload your FAQs, knowledge base, or product information. Our AI analyzes and learns from your content in minutes, understanding your business context."
    },
    {
      number: 2,
      title: "Customize & Train",
      description: "Personalize your chatbot's personality, conversation flows, and escalation rules. Train it to handle your specific use cases and brand voice."
    },
    {
      number: 3,
      title: "Launch & Scale",
      description: "Deploy across all your channels with one click. Monitor performance in real-time and watch your AI assistant handle thousands of conversations effortlessly."
    }
  ]

  return (
    <section id="how-it-works" ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.15} particleCount={80} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center mb-6 text-white"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Get Started in 3 Simple Steps
        </motion.h2>
        
        <motion.p 
          className="text-xl text-center mb-16 text-gray-200 max-w-3xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Most businesses go live in 1-2 weeks with full automation running smoothly. No technical expertise required.
        </motion.p>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="text-center group"
              variants={fadeInUp}
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {step.title}
              </h3>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced Features Section
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: MessageSquare,
      text: "Intelligent Chatbot - Advanced AI that understands customer intent, answers questions accurately, and learns from every interaction to improve over time.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      text: "Omnichannel Support - One chatbot, every platform. Deploy across website, WhatsApp, Facebook Messenger, Instagram, and mobile apps seamlessly.",
      color: "from-cyan-500 to-teal-500"
    },
    {
      icon: Zap,
      text: "Knowledge Base Integration - Connect your existing documentation and FAQs. The AI automatically learns from your content to provide accurate answers.",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: Database,
      text: "Real-Time Analytics - Monitor performance with detailed dashboards. Track resolution rates, customer satisfaction, peak hours, and common queries.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Sparkles,
      text: "Customizable Design - Match your brand perfectly. Customize colors, logos, chat widgets, and conversation flows to reflect your unique identity.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      text: "Enterprise Security - Bank-level encryption, GDPR compliant, and SOC 2 ready. Your customer data stays private and secure at all times.",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-white"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Everything You Need in One Digital Solutions Platform
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-dark rounded-xl p-6 group hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {feature.text.split(' - ')[0]}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {feature.text.split(' - ')[1]}
                  </p>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 rounded-xl group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Use Cases Section
const UseCasesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const useCases = [
    {
      title: "E-Commerce Support",
      description: "Handle order tracking, returns, product questions, and checkout issues automatically. Reduce cart abandonment and increase customer lifetime value during peak seasons.",
      icon: MessageSquare
    },
    {
      title: "SaaS Customer Success", 
      description: "Automate onboarding, feature explanations, troubleshooting, and billing inquiries. Let your CS team focus on expansion opportunities and strategic accounts.",
      icon: Users
    },
    {
      title: "Startup Growth",
      description: "Scale support without scaling headcount. Launch customer support from day one without hiring a full team or sacrificing quality.",
      icon: Zap
    },
    {
      title: "Developer Tools",
      description: "Provide instant API documentation, integration help, and technical support. Developers get answers fast without waiting for human agents to respond.",
      icon: Database
    }
  ]

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Built for Businesses That Move Fast
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index}
              className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <useCase.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-white">{useCase.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{useCase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


// Enhanced CTA Section with Advanced Animations
const CTASection = ({ onBookNow }: { onBookNow: () => void }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.4} particleCount={200} />
      
      {/* Animated particles */}
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
            Ready to Transform Your{' '}
            <GradientText 
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
              gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
              duration={2}
            >
              Customer Support?
            </GradientText>
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
            Join hundreds of businesses delivering exceptional customer experiences with our AI digital solutions. Get started in minutes, no credit card required.
          </p>
        </Reveal>
        
        <Reveal direction="up" distance={30} delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
              magneticStrength={0.3}
              onClick={() => window.location.href = '/contact'}
            >
              <Rocket className="w-5 h-5" />
              <span>Get Started Free</span>
            </MagneticButton>
            
            <MagneticButton 
              className="bg-transparent text-blue-400 border-2 border-blue-400 hover:bg-blue-400 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
              magneticStrength={0.2}
              onClick={onBookNow}
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Demo</span>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.6}>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>14-Day Free Trial</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Setup in Minutes</span>
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

// Main App Component
export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      // Set page title and meta description
      document.title = "VeloceAI - AI Chatbot for Customer Support | 24/7 Automated Service"
      
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Transform your customer support with VeloceAI\'s intelligent chatbot. Automate 70% of queries, reduce costs by 60%, and delight customers 24/7. Perfect for startups and e-commerce.')
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = 'Transform your customer support with VeloceAI\'s intelligent chatbot. Automate 70% of queries, reduce costs by 60%, and delight customers 24/7. Perfect for startups and e-commerce.'
        document.head.appendChild(meta)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection onBookNow={() => setIsBookingOpen(true)} />
      <MainValuePropositionSection />
      <StatsSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <UseCasesSection />
      <CTASection onBookNow={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
