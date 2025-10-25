'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, User, Mail, Shield } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import PhoneInput, { Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { getCountryFromTimezone } from '@/lib/countryDetection'

interface ContactFormProps {
  variant?: 'hero' | 'page'
  onSuccess?: () => void
}

export default function ContactForm({ variant = 'page', onSuccess }: ContactFormProps) {
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
      console.log('Detected country:', country)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      let token = null

      // Execute reCAPTCHA v3 automatically if not on localhost
      if (!isLocalhost && recaptchaRef.current && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        try {
          token = await recaptchaRef.current.executeAsync()
          console.log('reCAPTCHA token obtained')
        } catch (error) {
          console.error('reCAPTCHA execution failed:', error)
          setSubmitStatus('error')
          setIsSubmitting(false)
          return
        }
      }

      // Submit form with reCAPTCHA token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', requirements: '' })
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
        if (onSuccess) {
          onSuccess()
        }
      } else {
        const errorData = await response.json()
        console.error('Form submission error:', errorData)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Styling variants
  const isHero = variant === 'hero'
  const containerClass = isHero 
    ? "glass-dark rounded-2xl p-8 shadow-2xl border-2 border-blue-500/30 backdrop-blur-xl relative overflow-hidden"
    : "glass-dark rounded-2xl p-8 shadow-2xl"

  return (
    <motion.div
      initial={{ opacity: 0, x: isHero ? 60 : 0, y: isHero ? 0 : 30 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: isHero ? 0.4 : 0 }}
      className="w-full"
    >
      <div className={containerClass}>
        {/* Decorative gradient overlay for hero variant */}
        {isHero && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500" />
        )}
        
        {/* Form Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-white">
              {isHero ? 'Get Started Today' : 'Send us a message'}
            </h3>
            <div className="flex items-center space-x-1 text-green-400 text-xs">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            Fill out the form and we'll get back to you within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor={`${variant}-name`} className="block text-sm font-medium text-gray-200 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="text"
                id={`${variant}-name`}
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
            <label htmlFor={`${variant}-email`} className="block text-sm font-medium text-gray-200 mb-2">
              Work Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="email"
                id={`${variant}-email`}
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
            <label htmlFor={`${variant}-phone`} className="block text-sm font-medium text-gray-200 mb-2">
              Phone Number *
            </label>
            <PhoneInput
              international
              defaultCountry={detectedCountry}
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              className="phone-input-custom"
              id={`${variant}-phone`}
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
            <label htmlFor={`${variant}-requirements`} className="block text-sm font-medium text-gray-200 mb-2">
              Tell us about your needs *
            </label>
            <textarea
              id={`${variant}-requirements`}
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
              rows={isHero ? 3 : 4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              placeholder="Describe your customer support challenges..."
            />
          </div>

          {/* reCAPTCHA v3 - Invisible, executes automatically on submit */}
          {typeof window !== 'undefined' && 
           window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1' && 
           process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
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
                <span>{isHero ? 'Start Your Free Consultation' : 'Submit'}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {isHero && (
            <p className="text-xs text-gray-400 text-center mt-2">
              No credit card required • Free consultation • Response within 24h
            </p>
          )}
        </form>
      </div>
    </motion.div>
  )
}

