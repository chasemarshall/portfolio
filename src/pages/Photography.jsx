import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

function Photography() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const photos = [
    {
      id: 1,
      title: 'Photo 1',
      src: '/photos/photo1.jpg'
    },
    {
      id: 2,
      title: 'Photo 2',
      src: '/photos/IMG_5490.jpeg'
    },
    {
      id: 3,
      title: 'Photo 3',
      src: '/photos/IMG_8824.jpeg'
    },
    {
      id: 4,
      title: 'Photo 4',
      src: '/photos/IMG_1165.jpeg'
    },
    {
      id: 5,
      title: 'Photo 5',
      src: '/photos/IMG_1193.jpeg'
    },
    {
      id: 6,
      title: 'Photo 6',
      src: '/photos/IMG_1435.jpg'
    }
  ]

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
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
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
                <img src={photo.src} alt={photo.title} className="photo-image" />
              </motion.div>
            ))}
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
            <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); goPrev() }}>
              ‹
            </button>
            <motion.img
              key={selectedPhoto.src}
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="lightbox-image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); goNext() }}>
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Photography
