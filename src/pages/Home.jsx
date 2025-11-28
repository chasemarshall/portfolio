import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MagneticText from '../components/MagneticText'
import ScrambleText from '../components/ScrambleText'
import InteractiveParticles from '../components/InteractiveParticles'

function Home() {
  const menuItems = [
    { id: 'about', label: 'ABOUT', path: '/about' },
    { id: 'projects', label: 'PROJECTS', path: '/projects' },
    { id: 'contact', label: 'CONTACT', path: '/contact' }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  }

  return (
    <>
      <motion.nav
        className="menu"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {menuItems.map((menuItem) => (
          <motion.div key={menuItem.id} variants={item}>
            <Link
              to={menuItem.path}
              className="menu-item"
            >
              <MagneticText>
                <ScrambleText>
                  {menuItem.label}
                </ScrambleText>
              </MagneticText>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      <InteractiveParticles />
    </>
  )
}

export default Home
