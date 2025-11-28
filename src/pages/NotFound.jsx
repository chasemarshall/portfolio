import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function NotFound() {
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
        <h1 className="page-title">404</h1>

        <motion.div
          className="pixel-cat"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <pre>{`
    /\\_/\\
   ( o.o )
    > ^ <
   /|   |\\
  (_|   |_)
          `}</pre>
        </motion.div>

        <div className="page-text">
          <p>Page not found</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default NotFound
