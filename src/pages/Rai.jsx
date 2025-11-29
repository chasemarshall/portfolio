import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Rai() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="back-button">
          ← BACK
        </Link>
      </motion.div>

      <motion.div
        className="page-content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 10
          }}
          style={{
            fontSize: '10rem',
            lineHeight: 1
          }}
        >
          💕
        </motion.div>
      </motion.div>
    </>
  )
}

export default Rai
