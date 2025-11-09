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
    color: "text-gray-700",
  },
  {
    name: "New Followers",
    value: "24",
    change: "+18.2%",
    icon: Users,
    color: "text-gray-700",
  },
  {
    name: "Engagement Rate",
    value: "8.4%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-gray-700",
  },
  {
    name: "Comments",
    value: "89",
    change: "+24.3%",
    icon: Activity,
    color: "text-gray-700",
  },
]

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">Activities</h1>
        <p className="text-gray-700 mt-2">
          Monitor your recent interactions and engagement across all your posts with advanced filtering.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600">
                <span className="text-gray-900">{stat.change}</span> from last week
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