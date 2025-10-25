'use client'

import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode, useState, useEffect } from 'react'

// Enhanced scroll-triggered animation component
interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
}

export const ScrollAnimation = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 100,
  once = true,
  threshold = 0.1
}: ScrollAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once
  })
  const shouldReduceMotion = useReducedMotion()

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { opacity: 0 }
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, scale: 0.95 }
      case 'down':
        return { opacity: 0, y: -distance, scale: 0.95 }
      case 'left':
        return { opacity: 0, x: distance, scale: 0.95 }
      case 'right':
        return { opacity: 0, x: -distance, scale: 0.95 }
      case 'scale':
        return { opacity: 0, scale: 0.5 }
      case 'rotate':
        return { opacity: 0, rotate: -15, scale: 0.8 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getAnimatePosition = () => {
    if (shouldReduceMotion) return { opacity: 1 }
    
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax scroll component
interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

export const ParallaxScroll = ({ 
  children, 
  className = '', 
  speed = 0.5, 
  direction = 'up' 
}: ParallaxProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const shouldReduceMotion = useReducedMotion()
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'up' 
      ? [100 * speed, -100 * speed] 
      : [-100 * speed, 100 * speed]
  )

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

// Staggered animation container
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
}

export const StaggerContainer = ({ 
  children, 
  className = '', 
  staggerDelay = 0.1,
  threshold = 0.1
}: StaggerContainerProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true
  })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            delayChildren: shouldReduceMotion ? 0 : 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger item component
interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export const StaggerItem = ({ 
  children, 
  className = '', 
  direction = 'up',
  distance = 30
}: StaggerItemProps) => {
  const shouldReduceMotion = useReducedMotion()

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { opacity: 0 }
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, scale: 0.9 }
      case 'down':
        return { opacity: 0, y: -distance, scale: 0.9 }
      case 'left':
        return { opacity: 0, x: distance, scale: 0.9 }
      case 'right':
        return { opacity: 0, x: -distance, scale: 0.9 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  return (
    <motion.div
      className={className}
      variants={{
        initial: getInitialPosition(),
        animate: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: shouldReduceMotion ? 0.1 : 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Magnetic button component
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  magneticStrength?: number
}

export const MagneticButton = ({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  magneticStrength = 0.3
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || disabled || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    ref.current.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px) scale(1.05)`
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion || disabled || !ref.current) return
    ref.current.style.transform = 'translate(0px, 0px) scale(1)'
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.button>
  )
}

// Scroll progress indicator
interface ScrollProgressProps {
  className?: string
  color?: string
  height?: number
}

export const ScrollProgress = ({ 
  className = '', 
  color = '#3b82f6',
  height = 4
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{ height: `${height}px` }}
    >
      <motion.div
        className="w-full h-full origin-left"
        style={{
          scaleX,
          backgroundColor: color
        }}
      />
    </motion.div>
  )
}

// Reveal animation with intersection observer
interface RevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
}

export const Reveal = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  threshold = 0.1
}: RevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true
  })
  const shouldReduceMotion = useReducedMotion()

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { opacity: 0 }
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, scale: 0.95 }
      case 'down':
        return { opacity: 0, y: -distance, scale: 0.95 }
      case 'left':
        return { opacity: 0, x: distance, scale: 0.95 }
      case 'right':
        return { opacity: 0, x: -distance, scale: 0.95 }
      case 'fade':
        return { opacity: 0, scale: 0.95 }
      case 'scale':
        return { opacity: 0, scale: 0.5 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1
      } : getInitialPosition()}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

// Text reveal with typewriter effect
interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export const TypewriterText = ({ 
  text, 
  className = '', 
  speed = 0.05,
  delay = 0
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text)
      return
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed * 1000)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed, shouldReduceMotion])

  useEffect(() => {
    if (delay > 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0)
        setDisplayText('')
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [delay])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  )
}

// Floating elements animation
interface FloatingElementProps {
  children: ReactNode
  className?: string
  intensity?: number
  duration?: number
}

export const FloatingElement = ({ 
  children, 
  className = '', 
  intensity = 10,
  duration = 4
}: FloatingElementProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
        x: [0, intensity / 2, 0],
        rotate: [0, 1, 0, -1, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Gradient text animation
interface GradientTextProps {
  children: ReactNode
  className?: string
  gradient?: string
  duration?: number
}

export const GradientText = ({ 
  children, 
  className = '',
  gradient = 'linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6)',
  duration = 3
}: GradientTextProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <motion.span
      className={className}
      style={{
        background: gradient,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {children}
    </motion.span>
  )
}
