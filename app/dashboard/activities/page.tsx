"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityFeed } from "@/components/dashboard/activities/activity-feed"
import {
  Activity,
  TrendingUp,
  Users,
} from "lucide-react"

const stats = [
  {
    name: "Total Activities",
    value: "156",
    change: "+12.5%",
    icon: Activity,
    color: "text-muted-foreground",
  },
  {
    name: "New Followers",
    value: "24",
    change: "+18.2%",
    icon: Users,
    color: "text-muted-foreground",
  },
  {
    name: "Engagement Rate",
    value: "8.4%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-muted-foreground",
  },
  {
    name: "Comments",
    value: "89",
    change: "+24.3%",
    icon: Activity,
    color: "text-muted-foreground",
  },
]

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-light tracking-tight text-foreground">Activities</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your recent interactions and engagement across all your posts with advanced filtering.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border border-border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground">{stat.change}</span> from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Feed with Filtering */}
      <ActivityFeed />
    </div>
  )
}