import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Contact() {
  return (
    <>
      <Link to="/" className="back-button">
        ← BACK
      </Link>

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
          <h1 className="page-title">CONTACT</h1>
          <div className="page-text">
            <motion.a
              href="mailto:chase@m.com"
              className="contact-link"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5)",
                transition: { duration: 0.3 }
              }}
            >
              chase@m.com
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Contact
