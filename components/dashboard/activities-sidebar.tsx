"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  Users,
  MessageSquare,
  Heart,
  Share2,
  TrendingUp,
  Calendar,
  Settings,
} from "lucide-react"

const navigationItems = [
  {
    title: "Overview",
    icon: Activity,
    href: "/dashboard/activities",
  },
  {
    title: "All Activities",
    icon: Heart,
    href: "/dashboard/activities",
  },
  {
    title: "Followers",
    icon: Users,
    href: "/dashboard/activities?filter=followers",
  },
  {
    title: "Engagement",
    icon: TrendingUp,
    href: "/dashboard/activities?filter=engagement",
  },
]

const quickFilters = [
  { title: "Today", icon: Calendar },
  { title: "This Week", icon: Calendar },
  { title: "This Month", icon: Calendar },
]

interface ActivitiesSidebarProps {
  className?: string
}

export function ActivitiesSidebar({ className }: ActivitiesSidebarProps) {
  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Activities
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Quick Filters
          </h2>
          <div className="space-y-1">
            {quickFilters.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}