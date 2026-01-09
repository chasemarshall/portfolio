import { motion, AnimatePresence, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback } from 'react'
import MagneticText from '../components/MagneticText'
import { useMouse } from '../hooks/useMouse'

// Route prefetch map
const routeImports = {
  '/about': () => import('./About'),
  '/projects': () => import('./Projects'),
  '/photos': () => import('./Photography'),
  '/contact': () => import('./Contact'),
}

function Home() {
  const [selection, setSelection] = useState(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [fadingBoxes, setFadingBoxes] = useState([])
  const { mouseX, mouseY } = useMouse()

  const springConfig = { damping: 25, stiffness: 200 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const menuItems = useMemo(() => [
    { id: 'about', label: 'ABOUT', path: '/about' },
    { id: 'projects', label: 'PROJECTS', path: '/projects' },
    { id: 'photos', label: 'PHOTOS', path: '/photos' },
    { id: 'contact', label: 'CONTACT', path: '/contact' }
  ], [])

  // Prefetch route on hover
  const prefetchRoute = useCallback((path) => {
    routeImports[path]?.()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  }

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.closest('a, button')) return
      const x = smoothX.get()
      const y = smoothY.get()
      setIsSelecting(true)
      setSelection({
        startX: x,
        startY: y
      })
    }

    const handleMouseUp = () => {
      if (isSelecting && selection) {
        const endX = smoothX.get()
        const endY = smoothY.get()
        const box = {
          id: Date.now(),
          x: Math.min(selection.startX, endX),
          y: Math.min(selection.startY, endY),
          width: Math.abs(endX - selection.startX),
          height: Math.abs(endY - selection.startY)
        }
        if (box.width > 5 && box.height > 5) {
          setFadingBoxes(prev => [...prev, box])
          setTimeout(() => {
            setFadingBoxes(prev => prev.filter(b => b.id !== box.id))
          }, 500)
        }
      }
      setIsSelecting(false)
      setSelection(null)
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isSelecting, selection, smoothX, smoothY])

  const boxLeft = useTransform(smoothX, (x) =>
    selection ? Math.min(selection.startX, x) : 0
  )
  const boxTop = useTransform(smoothY, (y) =>
    selection ? Math.min(selection.startY, y) : 0
  )
  const boxWidth = useTransform(smoothX, (x) =>
    selection ? Math.abs(x - selection.startX) : 0
  )
  const boxHeight = useTransform(smoothY, (y) =>
    selection ? Math.abs(y - selection.startY) : 0
  )

  return (
    <>
      <motion.nav
        className="menu"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {menuItems.map((menuItem) => (
          <motion.div key={menuItem.id} variants={item}>
            <Link
              to={menuItem.path}
              className="menu-item"
              onMouseEnter={() => prefetchRoute(menuItem.path)}
              onFocus={() => prefetchRoute(menuItem.path)}
            >
              <MagneticText>
                {menuItem.label}
              </MagneticText>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {isSelecting && selection && (
        <motion.div
          style={{
            position: 'fixed',
            left: boxLeft,
            top: boxTop,
            width: boxWidth,
            height: boxHeight,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.05)',
            pointerEvents: 'none',
            zIndex: 50
          }}
        />
      )}

      <AnimatePresence>
        {fadingBoxes.map(box => (
          <motion.div
            key={box.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.05)',
              pointerEvents: 'none',
              zIndex: 50
            }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}

export default Home
