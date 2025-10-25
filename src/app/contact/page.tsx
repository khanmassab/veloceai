'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import Logo from '@/components/Logo'
import { NeuralNetworkBackground, PageWrapper } from '@/components/NeuralNetworkBackground'
import { ScrollAnimation, StaggerContainer, StaggerItem, GradientText } from '@/components/ScrollAnimations'

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
      value: "+92 337 7004251"
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
      <ScrollAnimation direction="up" distance={40}>
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
          Let's create a great{' '}
          <GradientText 
            className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #3b82f6)"
            duration={2}
          >
            communication experience
          </GradientText>{' '}
          together!
        </h2>
        <p className="text-xl text-gray-200 leading-relaxed">
          Effective communication enhances collaboration and innovation. Join us to ensure every interaction is clear and constructive. Together, we can achieve more!
        </p>
      </ScrollAnimation>

      <StaggerContainer className="space-y-6">
        {contactDetails.map((detail, index) => (
          <StaggerItem key={index} className="flex items-start space-x-4 group">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <detail.icon className="w-6 h-6 text-blue-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{detail.title}</h3>
              <p className="text-gray-300 mb-1">{detail.description}</p>
              <p className="text-blue-400 font-medium">{detail.value}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}

// Main Contact Page Component
export default function ContactPage() {
  return (
    <PageWrapper backgroundVariant="full" className="neural-bg text-white dark">
      <div className="container mx-auto px-6 pt-24 pb-24">
        <ScrollAnimation direction="up" distance={50}>
          <div className="relative text-center mb-16">
            {/* Enhanced decorative background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="mx-auto h-64 w-64 md:h-80 md:w-80 bg-gradient-to-tr from-blue-600/30 via-cyan-400/20 to-purple-500/30 blur-3xl opacity-40 rounded-full" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 flex items-center justify-center gap-4 leading-tight">
              <Logo className="w-10 h-10 md:w-12 md:h-12" />
              <span>
                Contact{' '}
                <GradientText 
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                  duration={3}
                >
                  Us
                </GradientText>
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to transform your customer support? Let's discuss how VeloceAI can help your business scale.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Left Section - Contact Info */}
          <StaggerContainer className="lg:col-span-2">
            <ContactInfo />
          </StaggerContainer>

          {/* Right Section - Contact Form */}
          <ScrollAnimation direction="left" distance={50} delay={0.2}>
            <div className="lg:col-span-1">
              <ContactForm variant="page" />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </PageWrapper>
  )
}
