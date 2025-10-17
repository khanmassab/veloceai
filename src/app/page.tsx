'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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
  Calendar
} from 'lucide-react'
import Logo from '@/components/Logo'
import BookingModal from '@/components/BookingModal'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
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

// Hero Section with Enhanced AI Aesthetic
const HeroSection = ({ onBookNow }: { onBookNow: () => void }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <section className="relative min-h-screen flex items-center justify-center neural-bg text-white overflow-hidden dark">
      <NeuralNetworkBackground />
      

      
      <motion.div 
        className="container mx-auto px-6 text-center z-10"
        style={{ y }}
      >

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Logo className="w-full h-full" />
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full border border-blue-400/20 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ship your AI support bot in{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text">
            6 weeks
          </span>.{' '}
          Not 6 months.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We build production-ready AI features while your competitors are still hiring teams.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" className="magnetic" onClick={onBookNow}>
            <Calendar className="w-5 h-5 mr-2" />
            Book a Call
          </Button>
          <Button variant="ghost" size="lg">
            <Brain className="w-5 h-5 mr-2" />
            Learn More
          </Button>
        </motion.div>
      </motion.div>

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

// Enhanced Problem Section
const ProblemSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const problems = [
    {
      icon: Clock,
      text: "Hiring takes 6+ months. $500K+ in salaries. They still might not ship.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: DollarSign,
      text: "Agencies bill for discovery. 20 weeks later, you get a prototype.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FileText,
      text: "You need working features. Not meeting notes.",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-white"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Most companies waste months on AI
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {problems.map((problem, index) => (
            <motion.div 
              key={index}
              className="text-center group"
              variants={fadeInUp}
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className="w-10 h-10 text-red-400" />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`} />
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                {problem.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced Solution Section
const SolutionSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const timeline = [
    { weeks: "Week 1-2", task: "Ticket analysis & architecture", color: "bg-blue-500", icon: Network },
    { weeks: "Week 3-5", task: "Build & testing", color: "bg-cyan-500", icon: Zap },
    { weeks: "Week 6-8", task: "Launch & tuning", color: "bg-purple-500", icon: Database },
    { weeks: "Result", task: "Production-ready bot", color: "bg-green-500", icon: CheckCircle }
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
          We ship in 6-10 weeks
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center mb-8 last:mb-0 group"
              variants={fadeInUp}
            >
              <div className="flex-shrink-0 w-32 text-right mr-8">
                <span className="text-blue-400 font-semibold">{item.weeks}</span>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-400 mr-8 relative">
                <div className={`absolute inset-0 rounded-full ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <item.icon className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="flex-1">
                <div className="glass-dark rounded-xl p-6 group-hover:bg-white/10 transition-all duration-300">
                  <p className="text-lg">{item.task}</p>
                </div>
              </div>
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
      text: "Handles tier 1 questions (password resets, billing, how-to)",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      text: "Routes to right human when uncertain",
      color: "from-cyan-500 to-teal-500"
    },
    {
      icon: Zap,
      text: "Uses agentic workflows for escalation",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: Database,
      text: "RAG for accurate retrieval",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-white"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Your support bot that actually works
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex items-start space-x-4 group"
              variants={fadeInUp}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-blue-400" />
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced CTA Section
const CTASection = ({ onBookNow }: { onBookNow: () => void }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          className="text-5xl font-bold mb-6"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          Ready to ship?
        </motion.h2>
        
        <motion.p 
          className="text-xl mb-12 text-gray-200 max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ delay: 0.2 }}
        >
          Book a 20-minute call. We'll scope your bot and give you a timeline.
        </motion.p>
        
        <motion.div 
          className="space-y-4 flex flex-column justify-center items-center"
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ delay: 0.4 }}
        >
          <div className="d-flex flex-column gap-4 mb-4">
          <Button size="lg" className="magnetic mb-4" onClick={onBookNow}>
            <Calendar className="w-5 h-5 mr-2" />
            Book a Call
          </Button>
          </div>
        </motion.div>
      </div>
      <p className="text-gray-300 text-center">
            Or email <a href="mailto:massab@veloceai.co" className="text-blue-400 hover:underline">massab@veloceai.co</a>
          </p>
    </section>
  )
}

// Main App Component
export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    // Set page title and meta description
    document.title = "VeloceAI - Ship AI features in weeks, not quarters"
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ship your AI support bot in 6 weeks. We build production-ready AI features while your competitors are still hiring teams.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Ship your AI support bot in 6 weeks. We build production-ready AI features while your competitors are still hiring teams.'
      document.head.appendChild(meta)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection onBookNow={() => setIsBookingOpen(true)} />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <CTASection onBookNow={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
