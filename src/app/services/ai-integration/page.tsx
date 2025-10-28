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
  Shield,
  Settings,
  Workflow,
  BarChart3,
  Globe,
  Lock
} from 'lucide-react'
import Logo from '@/components/Logo'
import BookingModal from '@/components/BookingModal'
import ServiceCTASection from '@/components/ServiceCTASection'
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
              AI Integration{' '}
              <GradientText 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text"
                gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                duration={3}
              >
                Services
              </GradientText>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Build Connected, Intelligent Systems That Work Smarter Together
            </p>
            
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto">
              Disconnected tools slow businesses down. VeloceAI&apos;s AI Integration Services unify your data, systems, and automation platforms into one intelligent ecosystem that works seamlessly across every touchpoint.
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
              AI Integration Services for Smart Business Operations
            </h3>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Transform Your Operations with{' '}
              <GradientText 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                duration={2}
              >
                Connected AI Systems
              </GradientText>
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Whether you&apos;re scaling a startup, optimizing eCommerce operations, or leading a tech team, we help you integrate AI where it creates the biggest impact: efficiency, personalization, and customer satisfaction.
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
    { number: "70%", label: "Operations Automated", color: "from-blue-500 to-cyan-500" },
    { number: "60%", label: "Cost Reduction", color: "from-cyan-500 to-teal-500" },
    { number: "24/7", label: "System Availability", color: "from-teal-500 to-green-500" },
    { number: "2 Weeks", label: "Average Deployment", color: "from-green-500 to-emerald-500" }
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
                
                <motion.div 
                  className="text-xs sm:text-sm md:text-base text-gray-300 text-center leading-tight"
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
            VeloceAI specializes in connecting AI across your business operations. We make your tools work together intelligently, so your teams can focus on what truly matters: growth, innovation, and customers.
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
      title: "Identify AI Opportunities",
      description: "Pinpoint areas where AI can drive the most significant improvements in your business processes and outcomes. We analyze your workflows and customer touchpoints to reveal untapped automation potential.",
      icon: Brain,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Enhance Operational Efficiency",
      description: "Optimize operations and reduce costs by automating repetitive tasks and optimizing resource allocation. Free your team from manual work to focus on strategic initiatives that grow your business.",
      icon: Zap,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: 3,
      title: "Accelerate Time-to-Market",
      description: "Launch AI-powered features in weeks, not months. Our rapid integration process helps you deploy intelligent solutions faster than competitors, giving you a critical market advantage.",
      icon: Rocket,
      color: "from-teal-500 to-green-500"
    },
    {
      number: 4,
      title: "Scale Customer Experience",
      description: "Deliver personalized, 24/7 customer interactions without scaling your support team. AI integration enables you to handle 10x more customer conversations while maintaining quality and consistency.",
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: 5,
      title: "Navigate Technical Complexity",
      description: "Keep balance between innovation, efficiency, and technical feasibility. We handle the complexity of AI integration so you can focus on business outcomes, not technical implementation challenges.",
      icon: Settings,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 6,
      title: "Future-Proof Your Technology",
      description: "Build integrations that evolve with your business. Our scalable solutions adapt to new tools, growing data volumes, and changing market demands without requiring complete system overhauls.",
      icon: Workflow,
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
            Unlock competitive advantages with strategic AI integration tailored to your business goals
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
                  
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {capability.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    {capability.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${capability.color} opacity-0 rounded-xl blur-xl`}
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

// AI Integration Capabilities Section
const AIIntegrationCapabilitiesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const integrations = [
    {
      number: 1,
      title: "AI-Powered Platform Integration",
      description: "Deploy intelligent AI solutions across websites, CRMs, and messaging tools, and watch them sync effortlessly with your existing systems.",
      details: "Connect VeloceAI's AI solutions to automate customer interactions, track engagement, and deliver consistent service everywhere.",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "CRM & Helpdesk Integration",
      description: "Integrate AI directly into tools like HubSpot, Salesforce, and Zendesk.",
      details: "VeloceAI enables automated ticket routing, response generation, and conversation summaries so your team spends more time solving and less time searching.",
      icon: Users,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: 3,
      title: "eCommerce System Integration",
      description: "Connect AI to Shopify, WooCommerce, and other platforms to power intelligent product recommendations, automate order updates, and reduce cart abandonment.",
      details: "Your online store gets smarter, faster, and more customer-centric with every interaction.",
      icon: Database,
      color: "from-teal-500 to-green-500"
    },
    {
      number: 4,
      title: "Custom Workflow Automation",
      description: "Our engineers build custom AI workflows that connect APIs, analytics, and databases to streamline internal operations.",
      details: "Automate repetitive processes, reduce manual tasks, and scale business performance effortlessly.",
      icon: Workflow,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: 5,
      title: "Data & Analytics Integration",
      description: "Unify your data ecosystem with AI-driven insights that help you make faster, smarter decisions.",
      details: "VeloceAI connects your data sources and leverages advanced models to reveal trends and predict customer behavior.",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxScroll speed={0.2} direction="up" className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 8) % 100}%`,
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
                delay: i * 0.2,
              }}
            />
          ))}
        </ParallaxScroll>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            Our AI Integration Capabilities
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            Seamless connections between your tools, data, and customers
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {integrations.map((integration, index) => (
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
                  className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 rounded-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${integration.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                      <span className="text-xl font-bold text-white">{integration.number}</span>
                    </div>
                    <integration.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {integration.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-3 flex-grow">
                    {integration.description}
                  </p>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {integration.details}
                  </p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 rounded-xl blur-xl`}
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

// Key Benefits Section
const KeyBenefitsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const benefits = [
    {
      title: "Faster Operations",
      description: "Automate up to 70% of manual workflows and reduce delays across departments.",
      icon: Zap,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Lower Costs",
      description: "Save up to 60% on repetitive support and administrative work.",
      icon: DollarSign,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "Smarter Insights",
      description: "Gain AI-powered analytics that uncover opportunities in real time.",
      icon: BarChart3,
      color: "from-teal-500 to-green-500"
    },
    {
      title: "Improved Customer Experience",
      description: "Deliver consistent, personalized, and on-brand interactions 24/7 across all channels.",
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Scalable Growth",
      description: "Integrations that expand with your tools, data, and business size without limitations.",
      icon: Rocket,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Competitive Advantage",
      description: "Deploy AI features faster than competitors and capture market opportunities first.",
      icon: Shield,
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            Key Benefits of AI Integration
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            Real results that drive business growth and operational excellence
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index} className="group">
              <motion.div
                className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300 relative overflow-hidden text-center h-full flex flex-col"
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
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 rounded-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center transition-all duration-300`}>
                      <benefit.icon className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 rounded-xl blur-xl`}
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

// Why Choose VeloceAI Section
const WhyChooseVeloceAISection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const reasons = [
    {
      title: "Production-Ready AI Systems",
      description: "We build AI integrations designed for real-world performance, not just demos. Our solutions handle scale, errors, and edge cases from day one so you can trust your systems in production.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Rapid Deployment Without Disruption",
      description: "Go live in weeks with expert-led integrations. We work within your existing infrastructure, ensuring smooth implementation without disrupting current operations or requiring massive system overhauls.",
      icon: Rocket,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "Cost-Effective Innovation",
      description: "We balance cutting-edge AI capabilities with practical business ROI. Every integration is evaluated for technical excellence, maintenance costs, and long-term value. Innovation that makes financial sense.",
      icon: DollarSign,
      color: "from-teal-500 to-green-500"
    },
    {
      title: "Flexible Integration Approach",
      description: "Whether you have extensive data or are just starting, we adapt. We can gather and prepare data for you, or work with your existing datasets to build custom AI solutions that fit your exact needs.",
      icon: Settings,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Enterprise-Grade Security & Compliance",
      description: "Bank-level encryption, GDPR compliance, and SOC 2 readiness built into every integration. Your customer data stays private and secure. We handle AI integration with the security standards your business demands.",
      icon: Lock,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Full Process Transparency",
      description: "From kickoff to launch, you have complete visibility. We provide real-time updates on development progress, sprint planning, and resource allocation so you always know where your project stands.",
      icon: BarChart3,
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Multilingual & Global Support",
      description: "Region-aware AI solutions with multilingual capabilities for GCC and global markets. We build integrations that understand local context, languages, and business practices.",
      icon: Globe,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Clear Communication, Fast Results",
      description: "Direct access to our technical team via Slack, email, or video. We sync frequently with detailed updates, speak your language (technical or business), and keep projects on track.",
      icon: MessageSquare,
      color: "from-rose-500 to-red-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxScroll speed={0.2} direction="up" className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 8) % 100}%`,
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
                delay: i * 0.2,
              }}
            />
          ))}
        </ParallaxScroll>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            Why Choose VeloceAI as Your AI Integration Partner
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            Our integrations don&apos;t just connect tools. They connect intelligence, empowering your business to move faster and serve customers better.
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
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
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 rounded-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${reason.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                      <reason.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {reason.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    {reason.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 rounded-xl blur-xl`}
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

// Process Section
const ProcessSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const steps = [
    {
      number: 1,
      title: "Discovery & Strategy",
      description: "We start by understanding your tools, challenges, and business goals. Together, we identify where AI can deliver the most value.",
      icon: Brain,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Integration & Optimization",
      description: "Our team connects your systems (AI tools, CRMs, APIs, or eCommerce) into a single, intelligent network. We test, refine, and optimize for performance.",
      icon: Settings,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: 3,
      title: "Launch & Scale",
      description: "Go live in weeks, not months. We monitor performance, fine-tune AI models, and provide ongoing support to ensure your integrations keep delivering results.",
      icon: Rocket,
      color: "from-teal-500 to-green-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            Our 3-Step AI Integration Process
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            From discovery to deployment in weeks, not months
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <StaggerItem key={index} className="group">
              <motion.div
                className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300 relative overflow-hidden text-center"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
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
                
                <div className="relative z-10">
                  {/* Number Badge */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} bg-opacity-20 border border-blue-500/30 rounded-full flex items-center justify-center transition-all duration-300`}>
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 rounded-xl blur-xl`}
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

// How to Get Started Section
const HowToGetStartedSection = ({ onBookNow }: { onBookNow: () => void }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const steps = [
    {
      number: 1,
      title: "Schedule a Free Consultation",
      description: "Book a no-obligation call with our team. We'll discuss your current systems, challenges, and AI integration opportunities. This initial conversation helps us understand your needs and outline potential solutions.",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Get Your Custom Integration Plan",
      description: "Within 24-48 hours, receive a detailed proposal outlining recommended integrations, timeline, and investment. We map out exactly how AI will connect your tools and the results you can expect.",
      icon: FileText,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: 3,
      title: "Build & Test Your Integration",
      description: "Our engineers begin connecting your systems while keeping you updated weekly. We build, test with your team, gather feedback, and refine until everything works perfectly with your workflows.",
      icon: Settings,
      color: "from-teal-500 to-green-500"
    },
    {
      number: 4,
      title: "Launch & Monitor Performance",
      description: "Go live with your AI integration and watch your operations transform. We monitor performance, provide ongoing support, and optimize based on real-world usage to ensure continued success.",
      icon: Rocket,
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxScroll speed={0.2} direction="up" className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 8) % 100}%`,
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
                delay: i * 0.2,
              }}
            />
          ))}
        </ParallaxScroll>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            How to Get Started with Our AI Integration Service?
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            You can start your AI integration journey with VeloceAI in four easy steps
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <StaggerItem key={index} className="group">
              <motion.div
                className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
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
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 rounded-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="relative z-10">
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                    <step.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 rounded-xl blur-xl`}
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


// Main App Component
export default function AIIntegrationPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      // Set page title and meta description
      document.title = "AI Integration Services | VeloceAI - Connect Your Systems Intelligently"
      
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Streamline your operations with VeloceAI\'s AI integration services. Connect AI systems, CRMs, and automation tools to deliver intelligent, real-time customer experiences.')
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = 'Streamline your operations with VeloceAI\'s AI integration services. Connect AI systems, CRMs, and automation tools to deliver intelligent, real-time customer experiences.'
        document.head.appendChild(meta)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection onBookNow={() => setIsBookingOpen(true)} />
      <MainValuePropositionSection />
      <StatsSection />
      <WhatWeDoSection />
      <CapabilitiesSection />
      <AIIntegrationCapabilitiesSection />
      <KeyBenefitsSection />
      <WhyChooseVeloceAISection />
      <ProcessSection />
      <HowToGetStartedSection onBookNow={() => setIsBookingOpen(true)} />
      <ServiceCTASection 
        onBookNow={() => setIsBookingOpen(true)}
        title="Start Your AI Integration Journey"
        titleGradientText="AI Integration Journey"
        subtitle="AI is most powerful when it's connected. VeloceAI's AI Integration Services help you align every system, from chat to CRM, so your business works as one intelligent engine."
        description=""
        highlightText="Transform your operations with connected AI systems"
      />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
