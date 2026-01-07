import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function About() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/" className="back-button">
          ← BACK
        </Link>
      </motion.div>

      <motion.div
        className="page-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="content-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="page-title">ABOUT</h1>
          <div className="page-text">
            <p>
              i'm chase, i code with ai.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default About
