"use client"

import { Menu, LogOut, User, CreditCard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, BarChart3, Activity } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { ThreadsBadge } from "@/components/auth/threads-badge"
import { useThreadsAuth } from "@/lib/threads-auth"

interface HeaderProps {
  onMenuClick?: () => void
  className?: string
}

const tabs = [
  {
    id: "dashboard" as const,
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    description: "Overview and quick actions"
  },
  {
    id: "analytics" as const,
    name: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    description: "Detailed analytics and reports"
  },
  {
    id: "activities" as const,
    name: "Activities",
    icon: Activity,
    href: "/dashboard/activities",
    description: "Real-time activities and notifications"
  }
]

export function Header({ onMenuClick, className }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useThreadsAuth()

  // Determine active tab based on current pathname
  const getActiveTab = (): "dashboard" | "analytics" | "activities" => {
    if (pathname.includes("/analytics")) return "analytics"
    if (pathname.includes("/activities")) return "activities"
    return "dashboard"
  }

  const activeTab = getActiveTab()

  const handleTabClick = (href: string) => {
    router.push(href)
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-sm transition-colors duration-300",
      className
    )}>
      {/* Navigation container with consistent padding */}
      <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
        {/* Left side: Navigation */}
        <div className="flex items-center gap-1 flex-1">
          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden mr-2"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Navigation tabs */}
          <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <Button
                key={tab.id}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2 h-9 px-3 transition-all duration-200",
                  isActive && "bg-secondary text-secondary-foreground shadow-sm"
                )}
                onClick={() => handleTabClick(tab.href)}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.name}</span>
              </Button>
            )
          })}
          </div>
        </div>

        {/* Right side: User controls */}
        <div className="flex items-center gap-3">
          {/* Threads Badge */}
          <ThreadsBadge compact />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User menu */}
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.threads_profile_picture_url}
                  alt={user?.username || "User"}
                />
                <AvatarFallback>
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.username || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  @{user?.username || 'threads_user'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </header>
  )
}