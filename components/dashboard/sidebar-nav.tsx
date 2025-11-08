"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Calendar,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  FileText,
  LayoutDashboard,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    current: true,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    current: false,
  },
  {
    name: "Content",
    href: "/dashboard/content",
    icon: FileText,
    current: false,
  },
  {
    name: "Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
    current: false,
    badge: "New",
  },
  {
    name: "Comments",
    href: "/dashboard/comments",
    icon: MessageSquare,
    current: false,
  },
  {
    name: "Growth",
    href: "/dashboard/growth",
    icon: TrendingUp,
    current: false,
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: Users,
    current: false,
    badge: "Pro",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    current: false,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10",
                isActive && "bg-secondary text-secondary-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.name}</span>
              {item.badge && (
                <Badge
                  variant={item.badge === "Pro" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}