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

        <div className="projects-grid">
          <motion.a
            href="https://github.com/chasemarshall/solace"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="project-name">solace.</h2>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Projects
