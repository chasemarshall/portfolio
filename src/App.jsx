import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Photography from './pages/Photography'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import CursorOrb from './components/CursorOrb'
import MobileRipple from './components/MobileRipple'
import CustomCursor from './components/CustomCursor'
import InteractiveParticles from './components/InteractiveParticles'
import './App.css'

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.href = to
  }, [to])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/photos" element={<Photography />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solace" element={<ExternalRedirect to="https://github.com/chasemarshall/solace" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <div className="container">
        <CustomCursor />
        <CursorOrb />
        <MobileRipple />
        <InteractiveParticles />
        <AnimatedRoutes />
      </div>
      <Analytics />
      <SpeedInsights />
    </Router>
  )
}

export default App
