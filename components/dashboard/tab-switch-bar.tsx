"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, BarChart3, Activity } from "lucide-react"

interface TabSwitchBarProps {
  activeTab: "dashboard" | "analytics" | "activities"
  onTabChange: (tab: "dashboard" | "analytics" | "activities") => void
  className?: string
}

const tabs = [
  {
    id: "dashboard" as const,
    name: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview and quick actions"
  },
  {
    id: "analytics" as const,
    name: "Analytics",
    icon: BarChart3,
    description: "Detailed analytics and reports"
  },
  {
    id: "activities" as const,
    name: "Activities",
    icon: Activity,
    description: "Real-time activities and notifications"
  }
]

export function TabSwitchBar({ activeTab, onTabChange, className }: TabSwitchBarProps) {
  return (
    <div className={cn("border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm", className)}>
      <div className="flex items-center gap-1 p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <Button
              key={tab.id}
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "gap-2 h-9 px-3",
                isActive && "bg-secondary text-secondary-foreground shadow-sm"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.name}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}