import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MagneticText from '../components/MagneticText'

function Home() {
  const [selection, setSelection] = useState(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [fadingBoxes, setFadingBoxes] = useState([])

  const menuItems = [
    { id: 'about', label: 'ABOUT', path: '/about' },
    { id: 'projects', label: 'PROJECTS', path: '/projects' },
    { id: 'photos', label: 'PHOTOS', path: '/photos' },
    { id: 'contact', label: 'CONTACT', path: '/contact' }
  ]

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
      setIsSelecting(true)
      setSelection({
        startX: e.clientX,
        startY: e.clientY,
        endX: e.clientX,
        endY: e.clientY
      })
    }

    const handleMouseMove = (e) => {
      if (!isSelecting) return
      setSelection(prev => ({
        ...prev,
        endX: e.clientX,
        endY: e.clientY
      }))
    }

    const handleMouseUp = () => {
      if (isSelecting && selection) {
        const box = {
          id: Date.now(),
          x: Math.min(selection.startX, selection.endX),
          y: Math.min(selection.startY, selection.endY),
          width: Math.abs(selection.endX - selection.startX),
          height: Math.abs(selection.endY - selection.startY)
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
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isSelecting, selection])

  const getBoxStyle = (sel) => ({
    position: 'fixed',
    left: Math.min(sel.startX, sel.endX),
    top: Math.min(sel.startY, sel.endY),
    width: Math.abs(sel.endX - sel.startX),
    height: Math.abs(sel.endY - sel.startY),
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.05)',
    pointerEvents: 'none',
    zIndex: 50
  })

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
            >
              <MagneticText>
                {menuItem.label}
              </MagneticText>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {isSelecting && selection && (
        <div style={getBoxStyle(selection)} />
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
