import { memo } from 'react'
import { useSpring, motion } from 'framer-motion'
import { useMouse } from '../hooks/useMouse'
import { useMobile } from '../hooks/useMobile'

const CursorOrb = memo(function CursorOrb() {
  const isMobile = useMobile()
  const { mouseX, mouseY } = useMouse()

  // Orb uses slightly different spring config for smoother, slower follow
  const orbSpringConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const orbX = useSpring(mouseX, orbSpringConfig)
  const orbY = useSpring(mouseY, orbSpringConfig)

  if (isMobile) return null

  return (
    <motion.div
      className="cursor-orb"
      style={{
        left: orbX,
        top: orbY,
      }}
    />
  )
})

export default CursorOrb
