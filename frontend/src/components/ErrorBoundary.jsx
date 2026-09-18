import { Component } from 'react'
import i18n from '../i18n'

/**
 * Catches JavaScript errors anywhere in the wrapped tree and shows a
 * friendly fallback instead of an entirely blank white page. React only
 * supports error boundaries via class components (no hook equivalent).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Garde une trace exploitable dans la console pendant le développement.
    console.error('ErrorBoundary a intercepté une erreur :', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-5xl">😕</p>
          <h1 className="text-xl font-bold text-neutral-800">{i18n.t('errorBoundary.title')}</h1>
          <p className="max-w-md text-sm text-neutral-500">
            {i18n.t('errorBoundary.description')}
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-2 max-w-xl overflow-auto rounded-lg bg-neutral-100 p-3 text-left text-xs text-neutral-600">
              {String(this.state.error?.stack || this.state.error)}
            </pre>
          )}
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-2 rounded-full bg-makitii-green px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-makitii-green-dark"
          >
            {i18n.t('errorBoundary.backHome')}
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
