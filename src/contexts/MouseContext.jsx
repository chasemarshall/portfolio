import { createContext, useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

export const MouseContext = createContext(null)

export function MouseProvider({ children }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <MouseContext.Provider value={{ mouseX, mouseY }}>
      {children}
    </MouseContext.Provider>
  )
}
