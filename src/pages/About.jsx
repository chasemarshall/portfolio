import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

function About() {
  const [clickCount, setClickCount] = useState(0)
  const [showClickCat, setShowClickCat] = useState(false)
  const [showHoverCat, setShowHoverCat] = useState(false)
  const [showRai, setShowRai] = useState(false)
  const hoverTimeoutRef = useRef(null)
  const raiTimeoutRef = useRef(null)

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

  const handleAIClick = () => {
    // Simple click/tap handler - works on both desktop and mobile
    setShowHoverCat(true)
    setTimeout(() => {
      setShowHoverCat(false)
    }, 5000)
  }

  const handleRaiHoverStart = () => {
    setShowRai(true)
  }

  const handleRaiHoverEnd = () => {
    setShowRai(false)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (raiTimeoutRef.current) {
        clearTimeout(raiTimeoutRef.current)
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
              onMouseEnter={handleRaiHoverStart}
              onMouseLeave={handleRaiHoverEnd}
              style={{ cursor: 'pointer', userSelect: 'none', position: 'relative' }}
            >
              Chase
              <AnimatePresence>
                {showRai && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      left: '110%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      whiteSpace: 'nowrap',
                      fontSize: '0.9em'
                    }}
                  >
                    💕 rai
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            {' '}and{' '}
            <span
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              onClick={handleAIClick}
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                touchAction: 'manipulation'
              }}
            >
              code with AI
            </span>
          </p>
        </div>

        <AnimatePresence>
          {showClickCat && (
            <motion.div
              className="easter-egg-cat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <pre>{`
   /\\_/\\
  ( ^.^ )
   > ^ <
  /|   |\\
 (_|   |_)
              `}</pre>
              <motion.div
                className="cat-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                ~meow~
              </motion.div>
            </motion.div>
          )}

          {showHoverCat && (
            <motion.div
              className="easter-egg-cat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <pre>{`
   /\\_/\\
  ( o.o )
   > v <
  /|   |\\
 (_|   |_)
              `}</pre>
              <motion.div
                className="cat-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                ~purr~
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default About
