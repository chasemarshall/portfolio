import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1 className="page-title">Something went wrong</h1>
          <p className="page-text">An unexpected error occurred.</p>
          <Link
            to="/"
            className="back-button"
            style={{ position: 'static', marginTop: '2rem' }}
            onClick={() => this.setState({ hasError: false })}
          >
            ← GO HOME
          </Link>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
