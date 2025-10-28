'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar, ChevronDown, Network, MessageSquare, Settings, Globe } from 'lucide-react'
import BookingModal from './BookingModal'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isServicesOpen && servicesButtonRef.current && !servicesButtonRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isServicesOpen])

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '#', 
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'AI Integration', 
          href: '/ai-integration-services', 
          description: 'Connect your systems intelligently',
          icon: Network
        },
            {
              name: 'Chatbot Solutions',
              href: '/ai-chatbot-development-services',
              description: '24/7 AI customer support',
              icon: MessageSquare
            },
        { 
          name: 'Web Development', 
          href: '/web-development-services', 
          description: 'Fast, scalable, intelligent websites',
          icon: Globe
        },
        { 
          name: 'Custom Development', 
          href: '/contact', 
          description: 'Tailored AI solutions',
          icon: Settings
        }
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  // Helper function to determine if a nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Helper function to check if services dropdown should be active
  const isServicesActive = () => {
    return pathname.startsWith('/services/')
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 relative ${
          isScrolled 
            ? 'bg-slate-900/90 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-blue-500/10' 
            : 'bg-slate-900/70 backdrop-blur-sm'
        }`}
      >
        {/* Neural Network Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <motion.line
                key={i}
                x1={`${(i * 12) % 100}%`}
                y1={`${(i * 15) % 100}%`}
                x2={`${(i * 18) % 100}%`}
                y2={`${(i * 25) % 100}%`}
                stroke="url(#headerGradient)"
                strokeWidth="0.5"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.1 }}
              />
            ))}
            <defs>
              <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Floating particles */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${(i * 15) % 100}%`,
                top: `${(i * 20) % 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + (i % 2),
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              VeloceAI
            </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button
                        ref={servicesButtonRef}
                        className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          isServicesActive()
                            ? 'text-blue-400'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {isServicesActive() && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg shadow-lg shadow-blue-500/20"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {/* Services Dropdown */}
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-blue-500/20 rounded-xl shadow-2xl shadow-blue-500/10 overflow-hidden"
                            style={{ zIndex: 9999 }}
                          >
                            <div className="p-4">
                              <h3 className="text-sm font-semibold text-blue-400 mb-3">Our Services</h3>
                              <div className="space-y-2">
                                {item.dropdownItems?.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
                                  >
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                      <dropdownItem.icon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors duration-200">
                                        {dropdownItem.name}
                                      </h4>
                                      <p className="text-xs text-gray-400 mt-1">
                                        {dropdownItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'text-blue-400'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg shadow-lg shadow-blue-500/20"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>


            {/* Book Now Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Now
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-blue-500/20 relative overflow-hidden"
            >
              {/* Mobile Menu Background Pattern */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  {Array.from({ length: 4 }, (_, i) => (
                    <motion.line
                      key={i}
                      x1={`${(i * 25) % 100}%`}
                      y1={`${(i * 30) % 100}%`}
                      x2={`${(i * 35) % 100}%`}
                      y2={`${(i * 40) % 100}%`}
                      stroke="url(#mobileGradient)"
                      strokeWidth="0.5"
                      opacity="0.2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                  <defs>
                    <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="container mx-auto px-6 py-4 relative z-10">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                              isServicesActive()
                                ? 'text-blue-400'
                                : 'text-white/80 hover:text-white'
                            }`}
                          >
                            <span>{item.name}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {isServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mt-2 space-y-2"
                              >
                                {item.dropdownItems?.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false)
                                      setIsServicesOpen(false)
                                    }}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
                                  >
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <dropdownItem.icon className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors duration-200">
                                        {dropdownItem.name}
                                      </h4>
                                      <p className="text-xs text-gray-400 mt-1">
                                        {dropdownItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                            isActive(item.href)
                              ? 'text-blue-400'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setIsBookingOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 mt-4"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Now</span>
                  </button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}

export default Header
