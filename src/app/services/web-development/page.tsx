'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  ArrowDown,
  Code,
  Users,
  Zap,
  Database,
  Sparkles,
  Brain,
  Network,
  Calendar,
  Rocket,
  Shield,
  Settings,
  Workflow,
  BarChart3,
  Globe,
  Lock,
  Bot,
  Headphones,
  Languages,
  TrendingUp,
  Target,
  Cpu,
  Mic,
  ShoppingCart,
  Monitor,
  Smartphone,
  Palette,
  Search,
  Layers,
  Wrench,
  Star,
  Mail,
  ExternalLink
} from 'lucide-react'
import Logo from '@/components/Logo'
import BookingModal from '@/components/BookingModal'
import ServiceCTASection from '@/components/ServiceCTASection'
import { ScrollAnimation, ParallaxScroll, StaggerContainer, StaggerItem, MagneticButton, Reveal, GradientText } from '@/components/ScrollAnimations'
import { ThreeJSBackground, Card3D } from '@/components/ThreeJSBackground'
import { fadeInUp, staggerContainer, staggerItem, hoverScale, magnetic, gradientText } from '@/lib/animations'

// Enhanced animation variants with better easing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Neural Network Background Component
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

// Enhanced Hero Section for Services Page
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
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="relative w-20 h-20 lg:w-24 lg:h-24 mx-auto">
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
          <motion.div 
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut" as const
            }}
            style={{ 
              y: shouldReduceMotion ? 0 : y,
              opacity: shouldReduceMotion ? 1 : opacity,
              scale: shouldReduceMotion ? 1 : scale
            }}
            className="space-y-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Web Development{' '}
              <GradientText 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text"
                gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                duration={3}
              >
                Services
              </GradientText>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              We Build Websites That Work. Fast.
            </p>
            
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto">
              Your website is the digital face of your business, it needs to be beautiful, fast, and built to perform. At VeloceAI, we combine modern web development with AI-driven automation to create websites that not only look stunning but also convert visitors into customers.
            </p>
          </motion.div>

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
              Web Development Services for Modern Business Growth
            </h3>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Build Fast, Scalable, and{' '}
              <GradientText 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                duration={2}
              >
                Intelligent Websites
              </GradientText>
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              From sleek eCommerce platforms to robust business sites and AI-powered portals, our development team builds custom solutions tailored to your goals, audience, and brand identity.
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
    { number: "500+", label: "Websites Built", color: "from-blue-500 to-cyan-500" },
    { number: "99.9%", label: "Uptime Guarantee", color: "from-cyan-500 to-teal-500" },
    { number: "50%", label: "Faster Load Times", color: "from-teal-500 to-green-500" },
    { number: "24/7", label: "Support Available", color: "from-green-500 to-emerald-500" }
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
        <StaggerContainer className="grid grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StaggerItem key={index} className="text-center group">
              <motion.div
                className="relative w-full h-32 flex flex-col justify-center items-center"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div 
                  className="font-bold mb-2 relative text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl"
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
                <motion.p 
                  className="text-gray-300 text-sm sm:text-base font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// What We Do Section
const WhatWeDoSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxScroll speed={0.3} direction="up" className="absolute inset-0">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/10 rounded-full"
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
            What We Do
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={30} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-300 max-w-4xl mx-auto">
            We create modern, high-performance websites that combine cutting-edge technology with beautiful design. Our full-stack development approach ensures your website is fast, secure, and ready to scale.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// Capabilities Section
const CapabilitiesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const capabilities = [
    {
      number: 1,
      title: "Custom Web Development",
      description: "We build websites from the ground up, designed around your business objectives. Our developers create responsive, SEO-friendly, and high-performing web platforms that scale with your growth.",
      icon: Code,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "E-Commerce Development",
      description: "We develop powerful and secure e-commerce websites that enable businesses to sell products and services seamlessly online. From responsive designs to secure payment gateways.",
      icon: ShoppingCart,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: 3,
      title: "CMS Development",
      description: "We build flexible, easy-to-use CMS platforms that allow businesses to manage their website content effortlessly. Our CMS solutions are designed with scalability in mind.",
      icon: Settings,
      color: "from-teal-500 to-green-500"
    },
    {
      number: 4,
      title: "Web Application Development",
      description: "We specialize in building sophisticated web applications that streamline business processes and enhance user engagement. From SaaS platforms to API-driven applications.",
      icon: Globe,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: 5,
      title: "API Development & Integration",
      description: "We specialize in integrating third-party services and APIs into your web platform to enhance functionality and improve efficiency. Seamless integration with payment gateways, CRM systems, and more.",
      icon: Network,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 6,
      title: "Website Maintenance & Optimization",
      description: "Once your website is live, we provide ongoing maintenance and support services to ensure it runs smoothly, remains secure, and stays up-to-date with the latest technology trends.",
      icon: Shield,
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <section id="capabilities-section" ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            We Will Help You to Succeed on the Market
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            Unlock competitive advantages with strategic web development tailored to your business goals
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => (
            <StaggerItem key={index} className="group">
              <motion.div
                className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300 relative overflow-hidden h-full flex flex-col"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
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
                  className={`absolute inset-0 bg-gradient-to-br ${capability.color} opacity-0 rounded-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${capability.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                      <span className="text-xl font-bold text-white">{capability.number}</span>
                    </div>
                    <capability.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {capability.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// Why Choose VeloceAI Section
const WhyChooseVeloceAISection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const benefits = [
    {
      title: "We Don't Overbuild",
      description: "Most agencies add features you don't need. We build what moves your business forward. No six-month roadmaps. No feature bloat.",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "AI Integration Built In",
      description: "Every site we build is ready for AI features. Add chatbots, recommendations, or smart search later without rebuilding.",
      icon: Brain,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "Modern Tech Stack",
      description: "React, Next.js, Node.js, Python. Frameworks that will be relevant in five years. No legacy PHP. No jQuery spaghetti.",
      icon: Code,
      color: "from-teal-500 to-green-500"
    },
    {
      title: "You Own Everything",
      description: "Code lives in your GitHub. Hosted on your servers. No vendor lock-in. No licensing fees. Full ownership.",
      icon: Shield,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Fixed Price, Not Hourly",
      description: "Fixed scope. Fixed price. No surprise invoices. You know exactly what you're paying before we start.",
      icon: DollarSign,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Fast Timeline",
      description: "Business sites in 4-6 weeks. Web apps in 8-16 weeks. We ship in weeks while competitors plan for months.",
      icon: Clock,
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Production-Ready Code",
      description: "Clean, maintainable code. Documented. Version controlled. Your next developer won't curse us.",
      icon: CheckCircle,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Mobile-First Design",
      description: "60%+ of traffic is mobile. We design for mobile first, then scale up. Not the other way around.",
      icon: Smartphone,
      color: "from-rose-500 to-red-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={50}>
          <h2 className="text-5xl font-bold text-center mb-6 text-white">
            Why VeloceAI for Web Development
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={30} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-300 max-w-4xl mx-auto">
            We ship production-ready code. Not prototypes.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index} className="group">
              <motion.div
                className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// Process Section
const ProcessSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const steps = [
    {
      number: "01",
      title: "Discovery & Scoping",
      description: "We figure out what you actually need. Understand business goals, map user journeys, define technical requirements. You get a scope document, timeline estimate, fixed price quote, and tech stack recommendation.",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Design & Planning",
      description: "We design the UI before writing code. You approve wireframes, UI mockups, and feature set. Then we build. No surprises mid-project.",
      icon: Palette,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: "03",
      title: "Development",
      description: "We build in sprints. Weekly demos. Continuous deployment to staging. You test features as we build and request changes early.",
      icon: Code,
      color: "from-teal-500 to-green-500"
    },
    {
      number: "04",
      title: "Testing & QA",
      description: "Cross-browser testing. Mobile responsiveness. Load time optimization. Security audit. We test before you do. No 'works on my machine' excuses.",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: "05",
      title: "Launch & Support",
      description: "Production deployment. DNS configuration. SSL setup. Analytics integration. Then 2 weeks included support plus 30 days bug fixes.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={50}>
          <h2 className="text-5xl font-bold text-center mb-6 text-white">
            Our Development Process
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={30} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-300 max-w-4xl mx-auto">
            Clear steps. No surprises. Weekly progress updates.
          </p>
        </Reveal>

        <StaggerContainer className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <StaggerItem key={index} className="group">
                <motion.div
                  className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
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
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 rounded-xl`}
                    whileHover={shouldReduceMotion ? {} : { 
                      opacity: 0.1,
                      transition: { duration: 0.3 }
                    }}
                  />
                  
                  <div className="relative z-10 flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <step.icon className="w-8 h-8 text-blue-400" />
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

// How to Get Started Section
const HowToGetStartedSection = ({ onBookNow }: { onBookNow: () => void }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const steps = [
    {
      icon: Calendar,
      title: "Schedule a Call",
      description: "Book a free consultation to discuss your project requirements"
    },
    {
      icon: FileText,
      title: "Get a Quote",
      description: "Receive a detailed proposal with timeline and pricing"
    },
    {
      icon: Code,
      title: "Start Development",
      description: "We begin building your website with regular updates"
    },
    {
      icon: Rocket,
      title: "Launch & Grow",
      description: "Your website goes live and we help you optimize for growth"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={50}>
          <h2 className="text-5xl font-bold text-center mb-6 text-white">
            How to Get Started
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={30} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-300 max-w-4xl mx-auto">
            Ready to build your next website? Here's how we make it simple and stress-free.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <StaggerItem key={index} className="text-center group">
              <motion.div
                className="relative"
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-blue-400" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal direction="up" distance={30} delay={0.4}>
          <div className="text-center">
            <MagneticButton
              onClick={onBookNow}
              className="px-12 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xl rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Start Your Project Today
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Main App Component
export default function WebDevelopmentPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    // Add meta description
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'Custom web development with AI integration. Fast, scalable websites built for SaaS, eCommerce, and business growth. Modern tech stack. Production-ready code. Ship in weeks.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Custom web development with AI integration. Fast, scalable websites built for SaaS, eCommerce, and business growth. Modern tech stack. Production-ready code. Ship in weeks.'
      document.head.appendChild(meta)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection onBookNow={() => setIsBookingOpen(true)} />
      <MainValuePropositionSection />
      <StatsSection />
      <WhatWeDoSection />
      <CapabilitiesSection />
      <WhyChooseVeloceAISection />
      <ProcessSection />
      <HowToGetStartedSection onBookNow={() => setIsBookingOpen(true)} />
      <ServiceCTASection 
        onBookNow={() => setIsBookingOpen(true)}
        title="Ready to Build Your Dream Website?"
        titleGradientText="Dream Website?"
        subtitle="Let's create something amazing together. Our web development team is ready to bring your vision to life with cutting-edge technology and beautiful design."
        description=""
        highlightText="Transform your online presence with professional web development"
      />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}