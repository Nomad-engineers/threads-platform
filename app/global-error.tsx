'use client'

import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error('Global error caught:', error)
  }, [error])

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          padding: '20px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '400px',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '32px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 16px',
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                style={{ display: 'block' }}
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Something went wrong!
            </h2>

            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>
              An unexpected error occurred while loading this page.
              {process.env.NODE_ENV === 'development' && error?.message && (
                <span style={{ display: 'block', marginTop: '8px', fontSize: '12px' }}>
                  Error: {error.message}
                </span>
              )}
            </p>

            <button
              onClick={reset}
              style={{
                width: '100%',
                backgroundColor: '#111827',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#374151'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#111827'
              }}
            >
              Try again
            </button>

            {process.env.NODE_ENV === 'development' && error?.digest && (
              <p style={{
                fontSize: '12px',
                color: '#9ca3af',
                marginTop: '12px'
              }}>
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}