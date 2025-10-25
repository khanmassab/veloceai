import { Variants } from 'framer-motion'

// Enhanced animation variants for scroll-triggered effects
export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const fadeInLeft = {
  initial: { 
    opacity: 0, 
    x: -60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const fadeInRight = {
  initial: { 
    opacity: 0, 
    x: 60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

export const staggerItem: Variants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

// Parallax animation variants
export const parallaxUp = {
  initial: { 
    opacity: 0, 
    y: 100,
    scale: 0.8
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
}

export const parallaxDown = {
  initial: { 
    opacity: 0, 
    y: -100,
    scale: 0.8
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
}

// Scale and rotate animations for cards
export const scaleIn = {
  initial: { 
    opacity: 0, 
    scale: 0.5,
    rotateY: -15
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

// Hover animations
export const hoverScale = {
  hover: { 
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export const hoverGlow = {
  hover: { 
    boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
    transition: {
      duration: 0.3
    }
  }
}

// Text reveal animations
export const textReveal = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

// Loading animations
export const pulse = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const spin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// Magnetic button effect
export const magnetic = {
  hover: {
    scale: 1.1,
    rotate: 2,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

// Gradient text animation
export const gradientText = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// Section transition animations
export const sectionTransition = {
  initial: { 
    opacity: 0,
    y: 100
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

// Scroll-triggered reveal animations
export const revealFromBottom = {
  initial: { 
    opacity: 0, 
    y: 100,
    scale: 0.8
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const revealFromTop = {
  initial: { 
    opacity: 0, 
    y: -100,
    scale: 0.8
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const revealFromLeft = {
  initial: { 
    opacity: 0, 
    x: -100,
    scale: 0.8
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const revealFromRight = {
  initial: { 
    opacity: 0, 
    x: 100,
    scale: 0.8
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

// 3D flip animations
export const flip3D = {
  initial: { 
    opacity: 0,
    rotateY: -90,
    scale: 0.8
  },
  animate: { 
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
}

// Morphing animations
export const morph = {
  initial: { 
    scale: 0,
    rotate: -180
  },
  animate: { 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

// Particle system animations
export const particleFloat = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    opacity: [0.3, 0.8, 0.3],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Neural network line drawing
export const drawLine = {
  initial: { 
    pathLength: 0,
    opacity: 0
  },
  animate: { 
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeOut"
    }
  }
}

// Glow effects
export const glow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 40px rgba(59, 130, 246, 0.6)",
      "0 0 20px rgba(59, 130, 246, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Typewriter effect
export const typewriter = {
  initial: { 
    width: 0
  },
  animate: { 
    width: "100%",
    transition: {
      duration: 2,
      ease: "easeOut"
    }
  }
}

// Slide in from different directions
export const slideInFromTop = {
  initial: { 
    opacity: 0, 
    y: -100
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const slideInFromBottom = {
  initial: { 
    opacity: 0, 
    y: 100
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const slideInFromLeft = {
  initial: { 
    opacity: 0, 
    x: -100
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

export const slideInFromRight = {
  initial: { 
    opacity: 0, 
    x: 100
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}
