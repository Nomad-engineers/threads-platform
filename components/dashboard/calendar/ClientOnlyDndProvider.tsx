"use client"

import React, { useState, useEffect } from 'react'

interface ClientOnlyDndProviderProps {
  children: React.ReactNode
}

export function ClientOnlyDndProvider({ children }: ClientOnlyDndProviderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Render children without DND context during SSR and hydration
  // Only enable DND functionality after client-side mount
  if (!isClient) {
    return <>{children}</>
  }

  return <>{children}</>
}