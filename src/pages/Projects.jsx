import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Projects() {
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
        <h1 className="page-title">PROJECTS</h1>

        <div className="projects-list">
          <motion.a
            href="https://github.com/chasemarshall/solace"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5)",
              transition: { duration: 0.3 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            solace.
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Projects
