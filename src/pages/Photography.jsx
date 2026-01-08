import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { getPhotos, urlFor } from '../lib/sanity'

function Photography() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    getPhotos()
      .then((data) => {
        setPhotos(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch photos:', err)
        setLoading(false)
      })
  }, [])

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null

  const goNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length)
    }
  }, [selectedIndex, photos.length])

  const goPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
    }
  }, [selectedIndex, photos.length])

  const close = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return

      if (e.key === 'ArrowRight') {
        goNext()
      } else if (e.key === 'ArrowLeft') {
        goPrev()
      } else if (e.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, goNext, goPrev, close])

  // Hide cursor when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.classList.add('lightbox-open')
    } else {
      document.body.classList.remove('lightbox-open')
    }
    return () => document.body.classList.remove('lightbox-open')
  }, [selectedIndex])

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
          <h1 className="page-title">PHOTOS</h1>

          <div className="photo-grid">
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</p>
            ) : (
              photos.map((photo, index) => (
                <motion.div
                  key={photo._id}
                  className="photo-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={urlFor(photo.image).width(400).url()}
                    alt={photo.title || 'Photo'}
                    className="photo-image"
                    loading="lazy"
                  />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <div className="lightbox-content">
              <motion.img
                key={selectedPhoto._id}
                src={urlFor(selectedPhoto.image).width(1600).url()}
                alt={selectedPhoto.title || 'Photo'}
                className="lightbox-image"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="lightbox-nav-container">
                <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); goPrev() }}>
                  ‹
                </button>
                <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); goNext() }}>
                  ›
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Photography
