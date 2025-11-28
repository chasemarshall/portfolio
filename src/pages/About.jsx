import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

function About() {
  const [clickCount, setClickCount] = useState(0)
  const [showClickCat, setShowClickCat] = useState(false)
  const [showHoverCat, setShowHoverCat] = useState(false)
  const hoverTimeoutRef = useRef(null)

  const handleChaseClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    if (newCount === 5) {
      setShowClickCat(true)
      setTimeout(() => {
        setShowClickCat(false)
        setClickCount(0)
      }, 5000)
    }
  }

  const handleHoverStart = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowHoverCat(true)
      setTimeout(() => {
        setShowHoverCat(false)
      }, 5000)
    }, 3000)
  }

  const handleHoverEnd = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="back-button">
        ← BACK
      </Link>

      <motion.div
        className="content-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="page-title">ABOUT</h1>
        <div className="page-text">
          <p>
            I'm{' '}
            <span
              onClick={handleChaseClick}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Chase
            </span>
            {' '}and{' '}
            <span
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              style={{ cursor: 'default' }}
            >
              code with AI
            </span>
          </p>
        </div>

        <AnimatePresence>
          {showClickCat && (
            <motion.div
              className="easter-egg-cat"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <pre>{`
   /\\_/\\
  ( ^.^ ) ~meow~
   > ^ <
  /|   |\\
 (_|   |_)
              `}</pre>
            </motion.div>
          )}

          {showHoverCat && (
            <motion.div
              className="easter-egg-cat"
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: 50, rotate: 10 }}
              transition={{ duration: 0.4 }}
            >
              <pre>{`
    /\\_/\\
   ( o.o )
    > v <  ~purr~
   /|   |\\
  (_|   |_)
              `}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default About
