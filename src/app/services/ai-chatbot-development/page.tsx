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
  Lock,
  Bot,
  Headphones,
  Languages,
  TrendingUp,
  Target,
  Cpu,
  Mic,
  ShoppingCart
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
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.1)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
          </linearGradient>
        </defs>
        <g fill="url(#neuralGradient)">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100}
              cy={Math.random() * 100}
              r="0.5"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </g>
        <g stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.1" fill="none">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 100}
              y1={Math.random() * 100}
              x2={Math.random() * 100}
              y2={Math.random() * 100}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </g>
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
              AI Chatbot{' '}
              <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-300 align-middle">|</span>{' '}
              <GradientText 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text"
                gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                duration={3}
              >
                Development
              </GradientText>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Build Intelligent Chatbots That Drive Engagement and Efficiency
            </p>
            
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto">
              At VeloceAI, we build AI chatbots that do more than talk. They understand, assist, and grow with your business through advanced natural language processing and intelligent automation.
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
            Transform Customer Interactions with Conversational AI
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            Empower your business with AI-powered chatbots that communicate naturally, automate customer interactions, and deliver personalized support around the clock.
          </p>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.4}>
          <p className="text-lg text-center mb-16 text-gray-300 max-w-5xl mx-auto">
            VeloceAI's AI Chatbot Development Services combine conversational intelligence with advanced automation, helping you create smarter, faster, and more human-like digital assistants.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// Stats Section
const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const stats = [
    { number: "60%", label: "Support Cost Reduction", color: "from-blue-500 to-cyan-500" },
    { number: "24/7", label: "Customer Availability", color: "from-cyan-500 to-teal-500" },
    { number: "10x", label: "More Conversations", color: "from-teal-500 to-green-500" },
    { number: "2-3", label: "Weeks to MVP", color: "from-green-500 to-emerald-500" }
  ]

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
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

// Capabilities Section
const CapabilitiesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const capabilities = [
    {
      number: "01",
      title: "Customer Support Automation",
      description: "Deploy intelligent chatbots that handle tier 1 support queries, route complex issues to the right team, and reduce support costs by 60% while improving response times.",
      icon: Headphones,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      title: "Lead Generation & Qualification",
      description: "Engage website visitors instantly, qualify leads through natural conversation, and automatically sync data with your CRM for seamless sales handoff.",
      icon: Target,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: "03",
      title: "E-Commerce Assistance", 
      description: "Guide shoppers with product recommendations, answer questions, handle order tracking, and reduce cart abandonment with proactive engagement.",
      icon: ShoppingCart,
      color: "from-teal-500 to-green-500"
    },
    {
      number: "04",
      title: "Business Process Automation",
      description: "Automate repetitive tasks like appointment scheduling, data collection, form filling, and internal workflows to boost team efficiency.",
      icon: Workflow,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: "05",
      title: "Multilingual Communication",
      description: "Serve diverse customer bases with chatbots that detect and respond in multiple languages, expanding your global reach effortlessly.",
      icon: Languages,
      color: "from-emerald-500 to-blue-500"
    },
    {
      number: "06",
      title: "Data Collection & Insights",
      description: "Gather customer feedback, conduct surveys, and extract valuable insights from conversations to inform business decisions.",
      icon: BarChart3,
      color: "from-blue-500 to-purple-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            What Results to Expect from Our AI Chatbot Development Services
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            VeloceAI specializes in creating chatbots that improve business operations and customer interactions. Our solutions are context-aware and adaptable across industries.
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

// AI Chatbot Types Section
const AIChatbotTypesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const chatbotTypes = [
    {
      number: "01",
      title: "GPT-Based Chatbots",
      description: "Leverage advanced language models to handle complex queries and engage in natural, contextual conversations. Perfect for brands seeking interactive, human-like experiences that adapt to user intent.",
      icon: Brain,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Retrieval-Augmented Chatbots (RAG)",
      description: "Ideal for businesses with extensive product catalogs, documentation libraries, or frequently updated policies. Quick, accurate access to relevant information from your knowledge base in real-time.",
      icon: Database,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: "03",
      title: "Multi-Language Chatbots",
      description: "Serve diverse language communities with chatbots that understand and respond in multiple languages. Essential for companies targeting global or regional markets like GCC.",
      icon: Globe,
      color: "from-teal-500 to-green-500"
    },
    {
      number: "04",
      title: "CRM-Integrated Chatbots",
      description: "Connect directly with HubSpot, Salesforce, or Zendesk to update customer information in real-time, provide personalized support, and maintain conversation history across touchpoints.",
      icon: Network,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: "05",
      title: "Voice-Enabled Chatbots",
      description: "Combine text and voice interactions with automatic speech recognition (ASR) and natural language understanding. Create Alexa-like experiences for hands-free customer engagement.",
      icon: Mic,
      color: "from-emerald-500 to-blue-500"
    },
    {
      number: "06",
      title: "Analytics & Reporting Bots",
      description: "For data-driven businesses, automate report generation, provide real-time analytics, identify trends, and offer actionable recommendations based on customer interactions.",
      icon: BarChart3,
      color: "from-blue-500 to-purple-500"
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
            Types of Chatbot Development Solutions
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            We build custom chatbot solutions tailored to your specific business needs and objectives
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {chatbotTypes.map((type, index) => (
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
                  className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 rounded-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${type.color} bg-opacity-20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                      <span className="text-xl font-bold text-white">{type.number}</span>
                    </div>
                    <type.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    {type.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 rounded-xl blur-xl`}
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

// Development Process Section
const DevelopmentProcessSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const processSteps = [
    {
      number: "1",
      title: "Discovery & Planning",
      description: "We identify use cases, define KPIs, and plan your chatbot architecture. Understanding your business challenges and customer needs comes first.",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "2",
      title: "Design & Prototyping",
      description: "We create conversational designs and user flows focused on natural, helpful dialogue. Visual conversation maps ensure every path makes sense.",
      icon: Settings,
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: "3",
      title: "Development & Training",
      description: "Our AI engineers train models, build backend logic, and integrate APIs for real-world accuracy. Your chatbot learns from actual conversations and improves continuously.",
      icon: Cpu,
      color: "from-teal-500 to-green-500"
    },
    {
      number: "4",
      title: "Testing & Optimization",
      description: "We simulate conversations, fine-tune responses, and ensure your chatbot performs flawlessly across platforms. Rigorous testing prevents embarrassing failures.",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500"
    },
    {
      number: "5",
      title: "Deployment & Support",
      description: "Once live, we monitor analytics, retrain models, and continuously enhance performance. Your chatbot doesn't just launch, it evolves.",
      icon: Rocket,
      color: "from-emerald-500 to-blue-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            Our Chatbot Development Process
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            From concept to launch in weeks, with continuous optimization
          </p>
        </Reveal>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
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
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 rounded-xl`}
                  whileHover={shouldReduceMotion ? {} : { 
                    opacity: 0.1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <div className="relative z-10 flex flex-col h-full">
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
                  
                  <p className="text-gray-300 leading-relaxed flex-grow">
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

// Key Benefits Section
const KeyBenefitsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const benefits = [
    {
      title: "Scalable, Multifunctional AI Chatbots",
      description: "We create solutions that optimize manual tasks across your departments, from customer support to sales and operations. One chatbot platform that grows with your business needs.",
      icon: Bot,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Ready-to-Use Integration",
      description: "Our chatbots seamlessly integrate into your existing operational routines and tech stack. Minimal disruption during implementation, maximum impact after launch.",
      icon: Network,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "Comprehensive Analytics",
      description: "Built-in analytics dashboards provide insights into conversation quality, user satisfaction, peak usage times, and common queries. Track performance and ROI in real-time.",
      icon: BarChart3,
      color: "from-teal-500 to-green-500"
    },
    {
      title: "Customizable Solutions",
      description: "We create chatbots that understand context and intent, following well-designed conversation flows tailored to your brand voice and customer expectations.",
      icon: Settings,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Future-Ready Technology",
      description: "Our chatbots are built for continuous improvement. As AI, ML, and NLP technologies advance, your chatbot can be upgraded to leverage new capabilities without starting from scratch.",
      icon: Cpu,
      color: "from-emerald-500 to-blue-500"
    },
    {
      title: "AI-Powered Natural Language Processing",
      description: "We leverage cutting-edge language models like GPT-4 and Claude for deep language understanding, context awareness, and natural response generation.",
      icon: Brain,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Cost Efficiency",
      description: "Reduce support costs by up to 60% while handling 10x more customer conversations. Automate repetitive queries and free your team for high-value interactions.",
      icon: DollarSign,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "24/7 Availability",
      description: "Never miss a customer inquiry. Your chatbot works around the clock across time zones, providing instant responses when your customers need them most.",
      icon: Clock,
      color: "from-pink-500 to-rose-500"
    }
  ]

  return (
    <section ref={ref} className="py-24 neural-bg text-white dark relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <ThreeJSBackground intensity={0.2} particleCount={100} />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal direction="up" distance={60}>
          <h2 className="text-5xl font-bold text-center mb-6">
            Benefits of AI Chatbot App Development Services
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            Transform your customer interactions with intelligent automation and measurable business impact
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
      title: "Rapid Development",
      description: "We deliver MVPs in as little as 2-3 weeks, getting your AI chatbot tested quickly. Full deployment in 6-8 weeks. Speed without compromising quality.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cutting-Edge Technology",
      description: "We stay at the forefront of AI and NLP advancements, ensuring you get the most advanced chatbot solutions leveraging GPT-4, Claude, and Rasa.",
      icon: Cpu,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "Flexible Approach",
      description: "Our agile methodology allows for quick adaptations and refinements based on your feedback throughout the development process.",
      icon: Settings,
      color: "from-teal-500 to-green-500"
    },
    {
      title: "Domain Expertise",
      description: "Experience across multiple industries means we understand unique challenges and opportunities specific to your market and customers.",
      icon: BarChart3,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Full Customization",
      description: "Every chatbot is built from the ground up to meet your needs, integrating seamlessly with your existing systems and workflows.",
      icon: Workflow,
      color: "from-emerald-500 to-blue-500"
    },
    {
      title: "Multilingual Excellence",
      description: "Native English and Arabic support for GCC markets. Expand globally with chatbots that understand cultural context and local languages.",
      icon: Globe,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Enterprise Security",
      description: "Compliant with GDPR, ISO, SOC 2, and industry-specific regulations. Your customer data stays private and secure at all times.",
      icon: Shield,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Ongoing Support",
      description: "We provide continuous monitoring, performance optimization, model retraining, and technical support to ensure your chatbot evolves with your business.",
      icon: Headphones,
      color: "from-pink-500 to-rose-500"
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
            Why Choose VeloceAI as Your AI Chatbot Development Company?
          </h2>
        </Reveal>
        
        <Reveal direction="up" distance={40} delay={0.2}>
          <p className="text-xl text-center mb-16 text-gray-200 max-w-4xl mx-auto">
            We don't just develop chatbots. We create AI-powered digital solutions that redefine how businesses and customers connect.
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


// Main Component
export default function AIChatbotDevelopmentPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <HeroSection onBookNow={() => setIsBookingOpen(true)} />
      <MainValuePropositionSection />
      <StatsSection />
      <CapabilitiesSection />
      <AIChatbotTypesSection />
      <DevelopmentProcessSection />
      <KeyBenefitsSection />
      <WhyChooseVeloceAISection />
      <ServiceCTASection 
        onBookNow={() => setIsBookingOpen(true)}
        title="The Future of Communication Is Conversational"
        subtitle="AI chatbots are transforming customer engagement from reactive to predictive. With VeloceAI's AI Chatbot Development Services, your business gains a digital assistant that's always available, always learning, and always improving."
        description=""
        highlightText="You're not just adding automation. You're adding intelligence."
      />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
