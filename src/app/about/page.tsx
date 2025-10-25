'use client'

import { Metadata } from 'next'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  Brain, 
  Zap, 
  Users, 
  Target, 
  Heart,
  Shield,
  TrendingUp,
  Globe,
  Sparkles,
  MessageSquare,
  Clock,
  CheckCircle,
  ArrowRight,
  Rocket
} from 'lucide-react'
import { PageWrapper } from '@/components/NeuralNetworkBackground'
import { ScrollAnimation, StaggerContainer, StaggerItem, GradientText, MagneticButton } from '@/components/ScrollAnimations'

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
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: (i * 5) % 100,
    top: (i * 7) % 100,
    delay: i * 0.2,
    duration: 3 + (i % 3),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

export default function AboutPage() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <PageWrapper backgroundVariant="full" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollAnimation direction="right" distance={50}>
                <div className="mb-8">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Brain className="w-10 h-10 text-blue-400" />
                  </motion.div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Meet the{' '}
                    <GradientText 
                      className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                      gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                      duration={3}
                    >
                      VeloceAI Team
                    </GradientText>
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    We're a passionate team of AI engineers and customer support veterans who've experienced the pain of scaling support firsthand. 
                    Now we're building the solutions we wish we had - making AI support accessible to every business.
                  </p>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation direction="left" distance={50} delay={0.2}>
                <div className="relative">
                  <div className="glass-dark rounded-2xl p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        V
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">VeloceAI Team</h3>
                        <p className="text-blue-400">AI & Support Experts</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      "We believe exceptional customer support shouldn't require a massive team or endless resources. 
                      That's why we're building AI chatbot platforms that are powerful, affordable, and incredibly easy to use."
                    </p>
                    <div className="flex space-x-4">
                      <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                        Contact Us
                      </a>
                      <a href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                        Our Blog
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-5xl font-bold text-center mb-16 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Story
            </motion.h2>
            
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">Where It Started</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                <span className="text-blue-400 font-semibold">VeloceAI was born from a simple frustration: watching great companies struggle to scale their customer support.</span>
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We saw startups losing customers because they couldn't respond fast enough. E-commerce brands drowning in repetitive questions during peak seasons. Growing SaaS companies choosing between hiring expensive support teams or disappointing their users.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                The existing solutions were either too complex, too expensive, or simply didn't work. Enterprise chatbot platforms required months of implementation and six-figure budgets. DIY tools left businesses with clunky bots that frustrated customers more than helped them.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed font-semibold text-cyan-400">
                We knew there had to be a better way to make AI support accessible to every business.
              </p>
            </motion.div>
            
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">The VeloceAI Solution</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                So we built VeloceAI—an AI-powered chatbot platform that combines enterprise-grade intelligence with startup-friendly simplicity. A solution that any business can deploy in weeks, not months, without breaking the bank or needing a technical team.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We focused on what matters most: making AI that actually understands customers, provides accurate answers, and seamlessly hands off complex issues to humans when needed. No buzzwords, no complexity—just intelligent automation that works.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Today, we're proud to help hundreds of businesses deliver exceptional customer experiences while reducing costs and scaling efficiently. From early-stage startups to established e-commerce brands, VeloceAI powers support conversations that delight customers and drive growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 neural-bg text-white dark">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Vision & Mission
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div 
              className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                To democratize AI-powered customer support, making it accessible, affordable, and effective for businesses of all sizes. 
                We believe exceptional customer support shouldn't require a massive team or endless resources. We're building the future where every company can provide instant, intelligent, and personalized support—without the complexity or cost of traditional solutions.
              </p>
            </motion.div>
            <motion.div 
              className="glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
            <p className="text-lg text-gray-300 leading-relaxed">
                We envision a world where exceptional customer support is the norm, not the exception. Where businesses of any size can leverage cutting-edge AI to delight their customers, scale effortlessly, and compete with industry giants—all while maintaining the human touch that builds lasting relationships.
            </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What Drives Us
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our values aren't just words on a wall—they guide every decision we make and every feature we build.
          </motion.p>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Customer-First Always</h3>
              <p className="text-gray-300">
                Every feature we build starts with one question: "Does this help our customers serve their customers better?" If the answer isn't a clear yes, we don't build it.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Speed Matters</h3>
              <p className="text-gray-300">
                In customer support, every second counts. We're obsessed with reducing response times, simplifying workflows, and helping businesses move faster.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Simplicity Through Innovation</h3>
              <p className="text-gray-300">
                The best technology is invisible. We build powerful AI that's incredibly easy to use, so you can focus on growing your business, not managing complex tools.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Partnership, Not Just Software</h3>
              <p className="text-gray-300">
                We're not just a software provider—we're your growth partner. Your success is our success, and we're committed to helping you achieve your support goals.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-orange-400" />
            </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Continuous Improvement</h3>
              <p className="text-gray-300">
                The AI landscape evolves daily. We're constantly learning, iterating, and improving our platform to deliver cutting-edge capabilities.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Trust & Transparency</h3>
              <p className="text-gray-300">
                We handle your customer data with the highest security standards and maintain complete transparency in how our AI works and what it can do.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 neural-bg text-white dark">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            VeloceAI: A Hub of Innovation, Engineering Intelligent Solutions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            With a passion for AI innovation and a commitment to creating lasting impact, we're actively shaping the future of customer support.
          </motion.p>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="text-4xl font-bold text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">AI-Powered</div>
              <div className="text-lg text-gray-300">Advanced Technology</div>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="text-4xl font-bold text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">Enterprise</div>
              <div className="text-lg text-gray-300">Grade Security</div>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="text-4xl font-bold text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-lg text-gray-300">Always Available</div>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="text-4xl font-bold text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">Global</div>
              <div className="text-lg text-gray-300">Multilingual Support</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            A Sneak Peek Into Our Vibrant Culture
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Dive into the heart of our culture: Where collaboration, innovation, and customer success thrive, uniting our team and driving excellence.
          </motion.p>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Innovation First</h3>
              <p className="text-gray-300">
                We embrace cutting-edge AI technology and encourage our team to experiment, learn, and push boundaries daily.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">People-Centric</h3>
              <p className="text-gray-300">
                We believe technology should serve people, not the other way around. Our culture prioritizes human connection and empathy.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Celebrate Success</h3>
              <p className="text-gray-300">
                We take our work seriously but have fun doing it. Every customer win is a team win, and we celebrate together.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-orange-400" />
          </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Learn & Grow</h3>
              <p className="text-gray-300">
                Continuous learning is at our core. We invest in our team's growth through training, mentorship, and real-world challenges.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 neural-bg text-white dark">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Built by a Support & AI Expert
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            VeloceAI is built by a team of customer support veterans and AI engineers who've spent years solving support challenges at high-growth companies. We've experienced the pain of scaling support firsthand—and now we're using that experience to build solutions that actually work.
          </motion.p>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              We combine expertise in natural language processing, machine learning, user experience design, and enterprise software to deliver a chatbot platform that's both powerful and practical.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              As problem-solvers, innovators, and customer advocates, we're united by a common goal: making exceptional customer support accessible to every business, regardless of size or budget.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-white">Interested in joining the journey?</strong> We're always looking for talented individuals who share our passion for AI innovation and customer success as VeloceAI grows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We're Good At Section */}
      <section className="py-24 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What We're Good At
          </motion.h2>
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-blue-400 font-semibold mb-6">
              We build intelligent AI chatbot solutions that transform your customer support by automating processes, streamlining operations, and creating exceptional customer experiences.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Our unique approach combines cutting-edge natural language processing with practical business solutions. We don't just provide technology—we deliver complete support transformation that drives real business results.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Whether you're a startup looking to scale support from day one, an e-commerce brand managing seasonal peaks, or an established SaaS company optimizing operations, we help you harness the power of AI to:
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Intelligent Automation</h3>
              <p className="text-gray-300">
                Deploy smart chatbots that understand context, intent, and sentiment to provide accurate, helpful responses.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Analytics & Insights</h3>
              <p className="text-gray-300">
                Make data-driven decisions with comprehensive analytics on performance, customer satisfaction, and support trends.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Seamless Integration</h3>
              <p className="text-gray-300">
                Connect with your existing tech stack—CRM, helpdesk, e-commerce platforms, and communication tools.
              </p>
            </motion.div>
            <motion.div 
              className="text-center glass-dark rounded-xl p-8 group hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-orange-400" />
          </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Personalization</h3>
              <p className="text-gray-300">
                Deliver personalized experiences at scale with AI that remembers customer history and preferences.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 neural-bg text-white dark">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Customer Support?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join hundreds of businesses already using VeloceAI to deliver exceptional customer experiences. 
            Let's discuss how we can help you build intelligent, scalable support solutions that grow with your business.
          </motion.p>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

