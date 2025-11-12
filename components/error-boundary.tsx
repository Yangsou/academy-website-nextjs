'use client'

import { Component, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 * Prevents the entire app from crashing when a component error occurs
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  private readonly handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold text-red-400">Something went wrong</h2>
          <p className="mb-6 max-w-md text-gray-400">
            We encountered an unexpected error. Please try again or contact support if the problem
            persists.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-6 max-w-2xl rounded bg-slate-950 p-4 text-left">
              <summary className="cursor-pointer text-sm font-medium text-gray-300">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 overflow-auto text-xs text-red-400">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <Button
            onClick={this.handleReset}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700"
          >
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Simplified error fallback component for specific sections
 */
export function ErrorFallback({ error, resetError }: { error?: Error; resetError?: () => void }) {
  return (
    <div className="rounded-lg border border-red-500/20 bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-center">
      <p className="mb-2 text-lg font-semibold text-red-400">Error loading content</p>
      <p className="mb-4 text-sm text-gray-400">
        {error?.message ?? 'An unexpected error occurred'}
      </p>
      {resetError && (
        <Button
          onClick={resetError}
          size="sm"
          variant="outline"
          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
        >
          Retry
        </Button>
      )}
    </div>
  )
}
