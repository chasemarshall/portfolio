import { useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

function InteractiveParticles() {
  const [particles, setParticles] = useState([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    // Generate initial particles spread across entire screen
    const initialParticles = [...Array(25)].map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      size: Math.random() * 0.5 + 0.5
    }))
    setParticles(initialParticles)

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
            scale: particle.size
          }}
          animate={{
            y: [particle.initialY, Math.random() * window.innerHeight],
            x: [particle.initialX, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      ))}
    </>
  )
}

export default InteractiveParticles
