import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Projects() {
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
          <h1 className="page-title">PROJECTS</h1>

          <div className="projects-list">
            <motion.div
              className="project-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
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
              >
                <span className="highlight-strip" />
                solace.
              </motion.a>
              <p className="project-description">
                A modern Twitch frontend with enhanced chat and dual player modes.
              </p>
              <div className="project-tech">
                <a href="/nextjs" target="_blank" rel="noopener noreferrer" className="tech-tag">Next.js 14</a>
                <a href="/react" target="_blank" rel="noopener noreferrer" className="tech-tag">React 18</a>
                <a href="/typescript" target="_blank" rel="noopener noreferrer" className="tech-tag">TypeScript</a>
                <a href="/postgres" target="_blank" rel="noopener noreferrer" className="tech-tag">PostgreSQL</a>
              </div>
            </motion.div>

            <motion.div
              className="project-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.a
                href="https://chasefrazier.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5)",
                  transition: { duration: 0.3 }
                }}
              >
                <span className="highlight-strip" />
                chasefrazier.dev
              </motion.a>
              <p className="project-description">
                This portfolio site. Minimal design with smooth animations.
              </p>
              <div className="project-tech">
                <a href="/react" target="_blank" rel="noopener noreferrer" className="tech-tag">React 19</a>
                <a href="/vite" target="_blank" rel="noopener noreferrer" className="tech-tag">Vite</a>
                <a href="/framer" target="_blank" rel="noopener noreferrer" className="tech-tag">Framer Motion</a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Projects
