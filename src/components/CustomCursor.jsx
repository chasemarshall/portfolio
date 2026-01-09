import { memo } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useMouse } from '../hooks/useMouse'
import { useMobile } from '../hooks/useMobile'

const CustomCursor = memo(function CustomCursor() {
  const isMobile = useMobile()
  const { mouseX, mouseY } = useMouse()

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  if (isMobile) return null

  return (
    <motion.div
      className="custom-cursor-dot"
      style={{
        left: cursorX,
        top: cursorY,
      }}
    />
  )
})

export default CustomCursor
