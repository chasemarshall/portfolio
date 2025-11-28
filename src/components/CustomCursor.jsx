import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
    if (isMobile) return

    setIsVisible(true)

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = (e) => {
      if (e.target.closest('a, button, .menu-item, .project-link, .contact-link')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e) => {
      if (!e.target.closest('a, button, .menu-item, .project-link, .contact-link')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 1
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="custom-cursor-dot"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
    </>
  )
}

export default CustomCursor
