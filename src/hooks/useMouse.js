import { useContext } from 'react'
import { MouseContext } from '../contexts/MouseContext'

export function useMouse() {
  const context = useContext(MouseContext)
  if (!context) {
    throw new Error('useMouse must be used within a MouseProvider')
  }
  return context
}
