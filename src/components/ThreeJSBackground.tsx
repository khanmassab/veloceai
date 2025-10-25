'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import * as THREE from 'three'
import { useScroll, motion } from 'framer-motion'

interface ThreeJSBackgroundProps {
  className?: string
  intensity?: number
  particleCount?: number
  scrollSpeed?: number
}

export const ThreeJSBackground = ({
  className = '',
  intensity = 0.5,
  particleCount = 200,
  scrollSpeed = 0.5
}: ThreeJSBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Particle system
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      // Color (blue to cyan gradient)
      const colorIntensity = Math.random()
      colors[i3] = 0.2 + colorIntensity * 0.3 // R
      colors[i3 + 1] = 0.5 + colorIntensity * 0.4 // G
      colors[i3 + 2] = 1.0 // B

      // Size
      sizes[i] = Math.random() * 2 + 1
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Shader material for particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        intensity: { value: intensity }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float intensity;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Animate particles
          mvPosition.y += sin(time + position.x * 0.01) * intensity;
          mvPosition.x += cos(time + position.z * 0.01) * intensity * 0.5;
          
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Neural network lines
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(particleCount * 6) // 2 points per line
    
    for (let i = 0; i < particleCount; i++) {
      const i6 = i * 6
      const i3 = i * 3
      
      // Start point
      linePositions[i6] = positions[i3]
      linePositions[i6 + 1] = positions[i3 + 1]
      linePositions[i6 + 2] = positions[i3 + 2]
      
      // End point (connect to random nearby particle)
      const targetIndex = Math.floor(Math.random() * particleCount)
      const targetI3 = targetIndex * 3
      linePositions[i6 + 3] = positions[targetI3] + (Math.random() - 0.5) * 2
      linePositions[i6 + 4] = positions[targetI3 + 1] + (Math.random() - 0.5) * 2
      linePositions[i6 + 5] = positions[targetI3 + 2] + (Math.random() - 0.5) * 2
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Update particle material
      if (material.uniforms) {
        material.uniforms.time.value = time
      }

      // Rotate particles
      particles.rotation.y = time * 0.1
      particles.rotation.x = time * 0.05

      // Update camera based on scroll
      const scrollProgress = scrollYProgress.get()
      camera.position.z = 5 + scrollProgress * 2
      camera.rotation.x = scrollProgress * 0.1

      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [intensity, particleCount, scrollYProgress])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}

// Simplified 3D element for performance
interface Simple3DElementProps {
  children: ReactNode
  className?: string
  depth?: number
  rotationSpeed?: number
}

export const Simple3DElement = ({
  children,
  className = '',
  depth = 0,
  rotationSpeed = 0.5
}: Simple3DElementProps) => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateY: scrollYProgress.get() * 360 * rotationSpeed,
        rotateX: scrollYProgress.get() * 180 * rotationSpeed,
        z: scrollYProgress.get() * depth
      }}
      transition={{
        duration: 0.1,
        ease: 'linear'
      }}
    >
      {children}
    </motion.div>
  )
}

// 3D Card component
interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export const Card3D = ({ 
  children, 
  className = '', 
  intensity = 0.1 
}: Card3DProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height

    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d'
      }}
      animate={{
        rotateY: mousePosition.x * intensity * 20,
        rotateX: -mousePosition.y * intensity * 20,
        scale: 1 + Math.abs(mousePosition.x) * intensity * 0.1
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}
