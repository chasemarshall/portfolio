import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProjects } from '../lib/sanity'

const TECH_LINKS = {
  'Next.js': '/nextjs',
  'Next.js 14': '/nextjs',
  'React': '/react',
  'React 18': '/react',
  'React 19': '/react',
  'TypeScript': '/typescript',
  'PostgreSQL': '/postgres',
  'Vite': '/vite',
  'Framer Motion': '/framer',
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data.map(p => ({
          id: p._id,
          name: p.name,
          description: p.description,
          url: p.url,
          github: p.github,
          tech: p.tech || [],
        })))
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err)
        setLoading(false)
      })
  }, [])

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
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</p>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <motion.a
                    href={project.url}
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
                    {project.name}
                  </motion.a>
                  <p className="project-description">
                    {project.description}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                        title="View on GitHub"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <a
                        key={tech}
                        href={TECH_LINKS[tech] || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tech-tag"
                      >
                        {tech}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Projects
