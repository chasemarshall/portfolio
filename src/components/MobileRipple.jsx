import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function MobileRipple() {
  const [ripples, setRipples] = useState([])

  const handleTouch = (e) => {
    const touch = e.touches[0]
    const newRipple = {
      id: Date.now(),
      x: touch.clientX,
      y: touch.clientY
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1000)
  }

  return (
    <div
      className="mobile-ripple-container"
      onTouchStart={handleTouch}
    >
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="touch-ripple"
            initial={{
              x: ripple.x,
              y: ripple.y,
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
}

export default MobileRipple
