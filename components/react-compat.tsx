'use client';

import React, { StrictMode } from 'react';

interface ReactCompatProps {
  children: React.ReactNode;
  strictMode?: boolean;
}

export function ReactCompat({ children, strictMode = true }: ReactCompatProps) {
  const Component = strictMode ? StrictMode : React.Fragment;
  return <Component>{children}</Component>;
}

// Hook for stable component references across HMR updates
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = React.useRef(callback);

  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return React.useCallback(((...args) => callbackRef.current(...args)) as T, []);
}

// Hook for stable refs across HMR updates
export function useStableRef<T>(value: T): React.MutableRefObject<T> {
  const ref = React.useRef(value);
  React.useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}

// Error boundary specifically for HMR issues
export function HMRBoundary({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading component...</p>
          </div>
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}