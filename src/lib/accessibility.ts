// Accessibility utilities for scroll animations

import { useEffect, useRef, useCallback, useState } from 'react'

// Check for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Focus management for animated elements
export const useFocusManagement = () => {
  const focusableElements = useRef<HTMLElement[]>([])
  const currentFocusIndex = useRef(0)

  const updateFocusableElements = useCallback(() => {
    focusableElements.current = Array.from(
      document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[]
  }, [])

  const focusNext = useCallback(() => {
    updateFocusableElements()
    currentFocusIndex.current = (currentFocusIndex.current + 1) % focusableElements.current.length
    focusableElements.current[currentFocusIndex.current]?.focus()
  }, [updateFocusableElements])

  const focusPrevious = useCallback(() => {
    updateFocusableElements()
    currentFocusIndex.current = 
      currentFocusIndex.current === 0 
        ? focusableElements.current.length - 1 
        : currentFocusIndex.current - 1
    focusableElements.current[currentFocusIndex.current]?.focus()
  }, [updateFocusableElements])

  return { focusNext, focusPrevious, updateFocusableElements, focusableElements }
}

// Screen reader announcements
export const useAnnouncements = () => {
  const announcementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Create live region for announcements
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    document.body.appendChild(liveRegion)
    announcementRef.current = liveRegion

    return () => {
      if (announcementRef.current) {
        document.body.removeChild(announcementRef.current)
      }
    }
  }, [])

  const announce = useCallback((message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message
    }
  }, [])

  return { announce }
}

// Keyboard navigation for animated elements
export const useKeyboardNavigation = () => {
  const { focusNext, focusPrevious, focusableElements } = useFocusManagement()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Tab':
          if (event.shiftKey) {
            event.preventDefault()
            focusPrevious()
          } else {
            event.preventDefault()
            focusNext()
          }
          break
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()
          focusNext()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()
          focusPrevious()
          break
        case 'Home':
          event.preventDefault()
          focusableElements.current[0]?.focus()
          break
        case 'End':
          event.preventDefault()
          focusableElements.current[focusableElements.current.length - 1]?.focus()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [focusNext, focusPrevious, focusableElements])
}

// High contrast mode detection
export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setIsHighContrast(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isHighContrast
}

// Color scheme detection
export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setColorScheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return colorScheme
}

// Animation accessibility controls
export const useAnimationControls = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setAnimationsEnabled(!prefersReducedMotion)
  }, [prefersReducedMotion])

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(prev => !prev)
  }, [])

  return {
    animationsEnabled,
    toggleAnimations,
    prefersReducedMotion
  }
}

// Skip links for keyboard navigation
export const useSkipLinks = () => {
  const createSkipLink = useCallback((target: string, text: string) => {
    const skipLink = document.createElement('a')
    skipLink.href = `#${target}`
    skipLink.textContent = text
    skipLink.className = 'skip-link'
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
      transition: top 0.3s;
    `
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px'
    })
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px'
    })

    return skipLink
  }, [])

  return { createSkipLink }
}

// ARIA live regions for dynamic content
export const useLiveRegion = (type: 'polite' | 'assertive' = 'polite') => {
  const liveRegionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', type)
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    document.body.appendChild(liveRegion)
    liveRegionRef.current = liveRegion

    return () => {
      if (liveRegionRef.current) {
        document.body.removeChild(liveRegionRef.current)
      }
    }
  }, [type])

  const announce = useCallback((message: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message
    }
  }, [])

  return { announce }
}

// Focus trap for modals and overlays
export const useFocusTrap = (isActive: boolean) => {
  const trapRef = useRef<HTMLElement | null>(null)
  const firstFocusableRef = useRef<HTMLElement | null>(null)
  const lastFocusableRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !trapRef.current) return

    const focusableElements = Array.from(
      trapRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[]

    if (focusableElements.length === 0) return

    firstFocusableRef.current = focusableElements[0]
    lastFocusableRef.current = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableRef.current) {
            event.preventDefault()
            lastFocusableRef.current?.focus()
          }
        } else {
          if (document.activeElement === lastFocusableRef.current) {
            event.preventDefault()
            firstFocusableRef.current?.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    firstFocusableRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive])

  return { trapRef }
}

// Animation timing for accessibility
export const getAccessibleAnimationTiming = (baseDuration: number, prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      duration: 0.1,
      ease: 'easeOut'
    }
  }

  return {
    duration: baseDuration,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
}

// Screen reader friendly animations
export const useScreenReaderAnimations = () => {
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false)

  useEffect(() => {
    // Detect screen reader usage
    const detectScreenReader = () => {
      const hasScreenReader = 
        window.speechSynthesis ||
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver')
      
      setIsScreenReaderActive(!!hasScreenReader)
    }

    detectScreenReader()
    
    // Listen for screen reader events
    const handleFocus = () => setIsScreenReaderActive(true)
    const handleBlur = () => setIsScreenReaderActive(false)

    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)

    return () => {
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
    }
  }, [])

  return isScreenReaderActive
}
