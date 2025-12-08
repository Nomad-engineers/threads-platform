'use client';

import { ReactNode, useEffect, useState } from 'react';

interface HMRStableWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function HMRStableWrapper({ children, fallback }: HMRStableWrapperProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Ensure component is mounted
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Error</h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'An error occurred while loading this component.'}
          </p>
          <button
            onClick={() => setError(null)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      {children}
    </div>
  );
}

// Hook to prevent HMR issues with complex state
export function useStableState<T>(initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useState(initialValue);
  const isMounted = useState(true)[0];

  const safeSetState = (value: T) => {
    if (isMounted) {
      setState(value);
    }
  };

  return [state, safeSetState];
}