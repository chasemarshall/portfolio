import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Rai from './pages/Rai'
import NotFound from './pages/NotFound'
import CursorOrb from './components/CursorOrb'
import MobileRipple from './components/MobileRipple'
import CustomCursor from './components/CustomCursor'
import './App.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rai" element={<Rai />} />
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
        <AnimatedRoutes />
      </div>
    </Router>
  )
}

export default App
