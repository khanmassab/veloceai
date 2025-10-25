'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { ScrollMagic } from 'scrollmagic'
import anime from 'animejs'

interface ScrollMagicControllerProps {
  children: ReactNode
  className?: string
  triggerElement?: string
  duration?: number
  offset?: number
  reverse?: boolean
  animationType?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'
  animationDuration?: number
  animationDelay?: number
}

export const ScrollMagicController = ({
  children,
  className = '',
  triggerElement,
  duration = 0,
  offset = 0,
  reverse = true,
  animationType = 'fadeIn',
  animationDuration = 1000,
  animationDelay = 0
}: ScrollMagicControllerProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<any>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Initialize ScrollMagic controller
    controllerRef.current = new ScrollMagic.Controller()

    // Create animation based on type
    const createAnimation = () => {
      const element = elementRef.current
      if (!element) return

      switch (animationType) {
        case 'fadeIn':
          return anime({
            targets: element,
            opacity: [0, 1],
            duration: animationDuration,
            delay: animationDelay,
            easing: 'easeOutExpo'
          })

        case 'slideUp':
          return anime({
            targets: element,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: animationDuration,
            delay: animationDelay,
            easing: 'easeOutExpo'
          })

        case 'slideDown':
          return anime({
            targets: element,
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: animationDuration,
            delay: animationDelay,
            easing: 'easeOutExpo'
          })

        case 'slideLeft':
          return anime({
            targets: element,
            translateX: [50, 0],
            opacity: [0, 1],
            duration: animationDuration,
            delay: animationDelay,
            easing: 'easeOutExpo'
          })

        case 'slideRight':
          return anime({
            targets: element,
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: animationDuration,
            delay: animationDelay,
            easing: 'easeOutExpo'
          })

        case 'scale':
          return anime({
            targets: element,
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: animationDuration,
            delay: animationDelay,
            easing: 'easeOutExpo'
          })

        case 'rotate':
          return anime({
            targets: element,
            rotate: [-15, 0],
            opacity: [0, 1],
            duration: animationDuration,
            delay: animationDelay,
            easing: 'easeOutExpo'
          })

        default:
          return anime({
            targets: element,
            opacity: [0, 1],
            duration: animationDuration,
            delay: animationDelay,
            easing: 'easeOutExpo'
          })
      }
    }

    // Create ScrollMagic scene
    const scene = new ScrollMagic.Scene({
      triggerElement: triggerElement || elementRef.current,
      triggerHook: 0.8,
      duration: duration,
      offset: offset,
      reverse: reverse
    })
    .setTween(createAnimation())
    .addTo(controllerRef.current)

    sceneRef.current = scene

    // Cleanup
    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy(true)
      }
      if (controllerRef.current) {
        controllerRef.current.destroy()
      }
    }
  }, [triggerElement, duration, offset, reverse, animationType, animationDuration, animationDelay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Storytelling scroll component
interface StorytellingScrollProps {
  children: ReactNode
  className?: string
  sections: Array<{
    trigger: string
    animation: () => void
    duration?: number
  }>
}

export const StorytellingScroll = ({
  children,
  className = '',
  sections
}: StorytellingScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    controllerRef.current = new ScrollMagic.Controller()

    sections.forEach((section, index) => {
      const scene = new ScrollMagic.Scene({
        triggerElement: section.trigger,
        triggerHook: 0.8,
        duration: section.duration || 0,
        offset: -100
      })
      .on('enter', () => {
        section.animation()
      })
      .addTo(controllerRef.current)
    })

    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy()
      }
    }
  }, [sections])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Pinned section component
interface PinnedSectionProps {
  children: ReactNode
  className?: string
  duration?: number
  pushFollowers?: boolean
  onPin?: () => void
  onUnpin?: () => void
}

export const PinnedSection = ({
  children,
  className = '',
  duration = 0,
  pushFollowers = true,
  onPin,
  onUnpin
}: PinnedSectionProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<any>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    if (!elementRef.current) return

    controllerRef.current = new ScrollMagic.Controller()

    const scene = new ScrollMagic.Scene({
      triggerElement: elementRef.current,
      triggerHook: 0,
      duration: duration,
      pushFollowers: pushFollowers
    })
    .on('pin', () => {
      if (onPin) onPin()
    })
    .on('unpin', () => {
      if (onUnpin) onUnpin()
    })
    .addTo(controllerRef.current)

    sceneRef.current = scene

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy(true)
      }
      if (controllerRef.current) {
        controllerRef.current.destroy()
      }
    }
  }, [duration, pushFollowers, onPin, onUnpin])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Parallax section component
interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
  offset?: number
}

export const ParallaxSection = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  offset = 0
}: ParallaxSectionProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<any>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    if (!elementRef.current) return

    controllerRef.current = new ScrollMagic.Controller()

    const tween = anime({
      targets: elementRef.current,
      translateY: direction === 'up' ? -100 : 100,
      duration: 1,
      easing: 'linear'
    })

    const scene = new ScrollMagic.Scene({
      triggerElement: elementRef.current,
      triggerHook: 0,
      duration: '200%',
      offset: offset
    })
    .setTween(tween)
    .addTo(controllerRef.current)

    sceneRef.current = scene

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy(true)
      }
      if (controllerRef.current) {
        controllerRef.current.destroy()
      }
    }
  }, [speed, direction, offset])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Progress indicator component
interface ScrollProgressProps {
  className?: string
  color?: string
  height?: number
}

export const ScrollProgressIndicator = ({
  className = '',
  color = '#3b82f6',
  height = 4
}: ScrollProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<any>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    controllerRef.current = new ScrollMagic.Controller()

    const tween = anime({
      targets: progressRef.current,
      scaleX: 1,
      duration: 1,
      easing: 'linear'
    })

    const scene = new ScrollMagic.Scene({
      triggerElement: 'body',
      triggerHook: 0,
      duration: '100%'
    })
    .setTween(tween)
    .addTo(controllerRef.current)

    sceneRef.current = scene

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy(true)
      }
      if (controllerRef.current) {
        controllerRef.current.destroy()
      }
    }
  }, [])

  return (
    <div
      ref={progressRef}
      className={`fixed top-0 left-0 w-full z-50 ${className}`}
      style={{
        height: `${height}px`,
        backgroundColor: color,
        transformOrigin: 'left',
        transform: 'scaleX(0)'
      }}
    />
  )
}

// Timeline animation component
interface TimelineAnimationProps {
  children: ReactNode
  className?: string
  triggerElement?: string
  animations: Array<{
    target: string
    properties: any
    duration?: number
    delay?: number
  }>
}

export const TimelineAnimation = ({
  children,
  className = '',
  triggerElement,
  animations
}: TimelineAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<any>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    controllerRef.current = new ScrollMagic.Controller()

    const timeline = anime.timeline({
      autoplay: false,
      easing: 'easeOutExpo'
    })

    animations.forEach(animation => {
      timeline.add({
        targets: animation.target,
        ...animation.properties,
        duration: animation.duration || 1000,
        delay: animation.delay || 0
      })
    })

    const scene = new ScrollMagic.Scene({
      triggerElement: triggerElement || containerRef.current,
      triggerHook: 0.8,
      duration: '100%'
    })
    .setTween(timeline)
    .addTo(controllerRef.current)

    sceneRef.current = scene

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy(true)
      }
      if (controllerRef.current) {
        controllerRef.current.destroy()
      }
    }
  }, [triggerElement, animations])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
