import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobile } from '../hooks/useMobile'

const MobileRipple = memo(function MobileRipple() {
  const [ripples, setRipples] = useState([])
  const isMobile = useMobile()

  useEffect(() => {
    if (!isMobile) return

    const handleTouch = (e) => {
      const touch = e.touches[0]
      const newRipple = {
        id: Date.now() + Math.random(),
        x: touch.clientX,
        y: touch.clientY
      }

      setRipples(prev => [...prev, newRipple])

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 1000)
    }

    document.addEventListener('touchstart', handleTouch)
    return () => document.removeEventListener('touchstart', handleTouch)
  }, [isMobile])

  if (!isMobile) return null

  return (
    <div className="mobile-ripple-container">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="touch-ripple"
            style={{
              left: ripple.x,
              top: ripple.y
            }}
            initial={{
              scale: 0,
              opacity: 0.6
            }}
            animate={{
              scale: 3,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
})

export default MobileRipple
