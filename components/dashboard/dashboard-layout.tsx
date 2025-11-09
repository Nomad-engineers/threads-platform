"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TabSwitchBar } from "./tab-switch-bar"
import { TopBar } from "./top-bar"
import { cn } from "@/lib/utils"

type SidebarType = "dashboard" | "analytics" | "activities"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSidebar, setActiveSidebar] = useState<SidebarType>("dashboard")
  const pathname = usePathname()
  const router = useRouter()

  // Determine active sidebar based on pathname
  useEffect(() => {
    if (pathname.startsWith("/dashboard/analytics")) {
      setActiveSidebar("analytics")
    } else if (pathname.startsWith("/dashboard/activities")) {
      setActiveSidebar("activities")
    } else {
      setActiveSidebar("dashboard")
    }
  }, [pathname])

  // Handle tab navigation
  const handleTabChange = (tab: SidebarType) => {
    setActiveSidebar(tab)
    switch (tab) {
      case "dashboard":
        router.push("/dashboard")
        break
      case "analytics":
        router.push("/dashboard/analytics")
        break
      case "activities":
        router.push("/dashboard/activities")
        break
    }
  }

  return (
    <div className="min-h-screen bg-background">
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
      <div className="lg:pl-64">
        {/* Tab Switch Bar */}
        <TabSwitchBar
          activeTab={activeSidebar}
          onTabChange={handleTabChange}
          className="sticky top-0 z-40"
        />

        {/* Top bar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="min-h-[calc(100vh-8rem)] p-6">
          {children}
        </main>
      </div>
    </div>
  )
}