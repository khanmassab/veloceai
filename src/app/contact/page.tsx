'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'

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

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if we're on localhost (skip reCAPTCHA)
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    
    if (!isLocalhost && !recaptchaToken) {
      alert('Please complete the reCAPTCHA verification')
      return
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
    <div className="glass-dark rounded-2xl p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Your work email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="your.email@company.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Your mobile number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-300 mb-2">
            Tell us about your requirements...
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
            placeholder="Type here..."
          />
        </div>

        {/* reCAPTCHA - only show on production */}
        {typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && (
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LfQrvQrAAAAAJtr1yvnn-dtsi3YPo6BoNtmX_n6'}
              onChange={handleRecaptchaChange}
              theme="dark"
            />
          </div>
        )}

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-green-500 bg-green-50 p-3 rounded-lg"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Message sent successfully! We'll get back to you soon.</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Failed to send message. Please try again.</span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Submit</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>
    </div>
  )
}

// Contact Info Component
const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "massab@veloceai.co"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+92 301 234 5678"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      value: "Lahore, Pakistan"
    }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
          Let's create a great communication experience together!
        </h2>
        <p className="text-xl text-gray-200 leading-relaxed">
          Effective communication enhances collaboration and innovation. Join us to ensure every interaction is clear and constructive. Together, we can achieve more!
        </p>
      </motion.div>

      <motion.div
        className="space-y-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {contactDetails.map((detail, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-4 group"
            variants={fadeInUp}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <detail.icon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{detail.title}</h3>
              <p className="text-gray-300 mb-1">{detail.description}</p>
              <p className="text-blue-400 font-medium">{detail.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Main Contact Page Component
export default function ContactPage() {
  return (
    <div className="min-h-screen neural-bg text-white dark">
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ready to transform your customer support? Let's discuss how VeloceAI can help your business scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Left Section - Contact Info */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <ContactInfo />
          </motion.div>

          {/* Right Section - Contact Form */}
          <motion.div
            className="lg:col-span-1"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
