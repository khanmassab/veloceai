// Performance optimization utilities for scroll animations

import { useEffect, useRef, useCallback, useState } from 'react'

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Debounce function for resize events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// Intersection Observer hook for performance
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      ...options
    })

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [callback, options])

  return targetRef
}

// Performance monitoring
export const usePerformanceMonitor = () => {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const fps = useRef(60)

  const measureFPS = useCallback(() => {
    frameCount.current++
    const currentTime = performance.now()
    
    if (currentTime - lastTime.current >= 1000) {
      fps.current = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current))
      frameCount.current = 0
      lastTime.current = currentTime
    }
    
    return fps.current
  }, [])

  return { measureFPS, fps: fps.current }
}

// Memory usage monitoring
export const useMemoryMonitor = () => {
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      }
    }
    return null
  }, [])

  return { getMemoryUsage }
}

// Device capability detection
export const useDeviceCapabilities = () => {
  const isLowEndDevice = useRef(false)
  const isMobile = useRef(false)
  const supportsWebGL = useRef(false)

  useEffect(() => {
    // Detect mobile
    isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    // Detect low-end device
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    supportsWebGL.current = !!gl

    // Simple heuristic for low-end devices
    const connection = (navigator as any).connection
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 2
    const isSlowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2

    isLowEndDevice.current = isMobile.current || isSlowConnection || isLowMemory || isSlowCPU
  }, [])

  return {
    isLowEndDevice: isLowEndDevice.current,
    isMobile: isMobile.current,
    supportsWebGL: supportsWebGL.current
  }
}

// Animation performance optimization
export const useAnimationOptimization = () => {
  const { isLowEndDevice, isMobile } = useDeviceCapabilities()
  const { measureFPS } = usePerformanceMonitor()

  const shouldReduceAnimations = useCallback(() => {
    const fps = measureFPS()
    return isLowEndDevice || isMobile || fps < 30
  }, [isLowEndDevice, isMobile, measureFPS])

  const getOptimalAnimationSettings = useCallback(() => {
    const shouldReduce = shouldReduceAnimations()
    
    return {
      duration: shouldReduce ? 0.3 : 0.8,
      ease: shouldReduce ? 'easeOut' : [0.25, 0.46, 0.45, 0.94],
      staggerDelay: shouldReduce ? 0.05 : 0.15,
      particleCount: shouldReduce ? 50 : 200,
      intensity: shouldReduce ? 0.1 : 0.3
    }
  }, [shouldReduceAnimations])

  return {
    shouldReduceAnimations,
    getOptimalAnimationSettings
  }
}

// Lazy loading for heavy components
export const useLazyLoading = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [threshold])

  return { targetRef, isVisible }
}

// Preload critical animations
export const preloadAnimations = () => {
  // Preload critical CSS animations
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `
  document.head.appendChild(style)
}

// Cleanup animations on unmount
export const useAnimationCleanup = () => {
  const cleanupRef = useRef<(() => void)[]>([])

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupRef.current.push(cleanup)
  }, [])

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach(cleanup => cleanup())
    }
  }, [])

  return { addCleanup }
}

// Optimize scroll performance
export const useOptimizedScroll = (callback: (scrollY: number) => void, deps: any[] = []) => {
  const rafId = useRef<number>()
  const lastScrollY = useRef(0)

  const handleScroll = useCallback(
    throttle(() => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }

      rafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        if (Math.abs(scrollY - lastScrollY.current) > 1) {
          callback(scrollY)
          lastScrollY.current = scrollY
        }
      })
    }, 16), // ~60fps
    deps
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll])

  return { handleScroll }
}

// Memory-efficient particle system
export const useParticleSystem = (particleCount: number, isActive: boolean) => {
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number }>>([])
  const animationId = useRef<number>()

  useEffect(() => {
    if (!isActive) return

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: Math.random()
    }))

    const animate = () => {
      particlesRef.current = particlesRef.current
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.01
        }))
        .filter(particle => particle.life > 0)

      // Add new particles to maintain count
      while (particlesRef.current.length < particleCount) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1
        })
      }

      animationId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [particleCount, isActive])

  return particlesRef.current
}
