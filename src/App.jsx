import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { MouseProvider } from './contexts/MouseContext'
import ErrorBoundary from './components/ErrorBoundary'
import CursorOrb from './components/CursorOrb'
import MobileRipple from './components/MobileRipple'
import CustomCursor from './components/CustomCursor'
import InteractiveParticles from './components/InteractiveParticles'
import './App.css'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Photography = lazy(() => import('./pages/Photography'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loading-spinner" />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/photos" element={<Photography />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <MouseProvider>
        <ErrorBoundary>
          <div className="container" id="main-content">
            <CustomCursor />
            <CursorOrb />
            <MobileRipple />
            <InteractiveParticles />
            <AnimatedRoutes />
          </div>
        </ErrorBoundary>
      </MouseProvider>
      <Analytics />
      <SpeedInsights />
    </Router>
  )
}

export default App
