import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function ScrambleText({ children, className }) {
  const [displayText, setDisplayText] = useState(children)
  const [isScrambling, setIsScrambling] = useState(false)

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)

    let iteration = 0
    const originalText = children

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return originalText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iteration += 1 / 3

      if (iteration >= originalText.length) {
        clearInterval(interval)
        setDisplayText(originalText)
        setIsScrambling(false)
      }
    }, 30)
  }

  return (
    <motion.span
      className={className}
      onMouseEnter={scramble}
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </motion.span>
  )
}

export default ScrambleText
