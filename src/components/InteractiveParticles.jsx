import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useMobile } from '../hooks/useMobile'

const PARTICLE_COUNT = 20

function generateParticles() {
  return [...Array(PARTICLE_COUNT)].map((_, i) => ({
    id: i,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
    targetX: Math.random() * window.innerWidth,
    targetY: Math.random() * window.innerHeight,
    size: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 20 + 15
  }))
}

const InteractiveParticles = memo(function InteractiveParticles() {
  const [particles] = useState(() => {
    if (typeof window === 'undefined') return []
    return generateParticles()
  })
  const isMobile = useMobile()

  // Reduce particles on mobile for better performance
  const visibleParticles = isMobile ? particles.slice(0, 10) : particles

  return (
    <>
      {visibleParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
            scale: particle.size
          }}
          animate={{
            y: [particle.initialY, particle.targetY],
            x: [particle.initialX, particle.targetX],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{ willChange: 'transform' }}
        />
      ))}
    </>
  )
})

export default InteractiveParticles
