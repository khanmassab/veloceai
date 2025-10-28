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
      value: "hello@veloceai.co"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (480) 639-4580"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our business office",
      value: "4539 N 22nd St, Ste R, Phoenix, AZ 85016, United States"
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
            AI solution
          </GradientText>{' '}
          together!
        </h2>
          <p className="text-xl text-gray-200 leading-relaxed">
            Whether you need chatbots, AI integration, automation, custom AI development, web applications, mobile apps, or any other tech solution - we're here to help transform your business with intelligent technology. Let's discuss your project and bring your vision to life!
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

      {/* Enhanced Google Maps Integration */}
      <ScrollAnimation direction="up" distance={40} delay={0.3}>
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              Find Us on the{' '}
              <GradientText 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                duration={2}
              >
                Map
              </GradientText>
            </h3>
            <p className="text-gray-300">
              Visit our business office in Phoenix, Arizona
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group w-full"
          >
            {/* Glass morphism container */}
            <div className="relative glass-dark rounded-xl p-4 border border-blue-500/20 overflow-hidden">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              {/* Map container with enhanced styling */}
              <div className="relative rounded-lg overflow-hidden shadow-xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                {/* Map overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/20 pointer-events-none z-10" />
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                  animate={{
                    background: [
                      'linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
                      'linear-gradient(45deg, #06b6d4, #8b5cf6, #3b82f6, #06b6d4)',
                      'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6)',
                      'linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.123456789!2d-112.123456789!3d33.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s4539%20N%2022nd%20St%2C%20Phoenix%2C%20AZ%2085016!5e0!3m2!1sen!2sus!4v1761627942679!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VeloceAI Business Office - 4539 N 22nd St, Phoenix, AZ"
                  className="relative z-20 rounded-lg"
                />
              </div>

              {/* Location info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-4 flex items-center justify-center space-x-3"
              >
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-4 h-4 text-blue-400" />
                </motion.div>
                <div className="text-center">
                  <p className="text-white font-semibold">4539 N 22nd St, Ste R</p>
                  <p className="text-gray-300 text-sm">Phoenix, AZ 85016, United States</p>
                </div>
              </motion.div>
            </div>

            {/* Floating particles around the map */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${30 + (i * 10)}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 8, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + (i % 2),
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollAnimation>
    </div>
  )
}

// Main Contact Page Component
export default function ContactPage() {
  return (
    <PageWrapper backgroundVariant="full" className="neural-bg text-white dark">
      <div className="container mx-auto px-6 pt-24 pb-24 max-w-full overflow-x-hidden">
        <ScrollAnimation direction="up" distance={50}>
          <div className="relative text-center mb-16">
            {/* Enhanced decorative background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="mx-auto h-64 w-64 md:h-80 md:w-80 bg-gradient-to-tr from-blue-600/30 via-cyan-400/20 to-purple-500/30 blur-3xl opacity-40 rounded-full" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Contact{' '}
              <GradientText 
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)"
                duration={3}
              >
                Us
              </GradientText>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to transform your customer support? Let's discuss how VeloceAI can help your business scale.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto overflow-x-hidden">
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
