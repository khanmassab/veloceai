'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

interface NeuralNetworkBackgroundProps {
  intensity?: number
  particleCount?: number
  lineCount?: number
  className?: string
  variant?: 'full' | 'subtle' | 'minimal'
}

export const NeuralNetworkBackground = ({
  intensity = 0.3,
  particleCount = 20,
  lineCount = 15,
  className = '',
  variant = 'full'
}: NeuralNetworkBackgroundProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={`absolute inset-0 ${className}`} />
  }

  const getVariantSettings = () => {
    switch (variant) {
      case 'subtle':
        return {
          particleCount: Math.floor(particleCount * 0.5),
          lineCount: Math.floor(lineCount * 0.6),
          intensity: intensity * 0.5
        }
      case 'minimal':
        return {
          particleCount: Math.floor(particleCount * 0.3),
          lineCount: Math.floor(lineCount * 0.4),
          intensity: intensity * 0.3
        }
      default:
        return { particleCount, lineCount, intensity }
    }
  }

  const settings = getVariantSettings()

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated particles */}
      {Array.from({ length: settings.particleCount }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          style={{
            left: `${(i * 5) % 100}%`,
            top: `${(i * 7) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        {Array.from({ length: settings.lineCount }, (_, i) => (
          <motion.line
            key={i}
            x1={`${(i * 7) % 100}%`}
            y1={`${(i * 11) % 100}%`}
            x2={`${(i * 13) % 100}%`}
            y2={`${(i * 17) % 100}%`}
            stroke="url(#neuralGradient)"
            strokeWidth="0.5"
            opacity={0.3 * settings.intensity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 2, 
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating orbs for full variant */}
      {variant === 'full' && Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-sm"
          style={{
            left: `${20 + (i * 30)}%`,
            top: `${30 + (i * 20)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Page wrapper component for consistent backgrounds
interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  backgroundVariant?: 'full' | 'subtle' | 'minimal'
  showProgress?: boolean
}

export const PageWrapper = ({ 
  children, 
  className = '', 
  backgroundVariant = 'full',
  showProgress = true 
}: PageWrapperProps) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Neural Network Background - Full Viewport Coverage */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <NeuralNetworkBackground variant={backgroundVariant} />
      </div>
      
      {/* Scroll Progress Indicator */}
      {showProgress && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            style={{
              scaleX: 0,
              transformOrigin: "left"
            }}
            animate={{
              scaleX: [0, 1],
            }}
            transition={{
              duration: 0.1,
              ease: "linear"
            }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
