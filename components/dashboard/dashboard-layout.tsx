"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/contexts/theme-context"
import { Header } from "./header"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="threads-boost-ui-theme"
    >
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Mobile close button */}
          <div className="flex h-12 items-center px-6 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full">
          {/* Unified Header */}
          <Header onMenuClick={() => setSidebarOpen(true)} />

          {/* Page content */}
          <main className="min-h-[calc(100vh-4rem)] w-full transition-colors duration-300">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}