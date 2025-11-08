"use client"

import { MetricCard } from "@/components/analytics/metric-card"
import { EngagementChart } from "@/components/analytics/engagement-chart"
import { GrowthIndicator } from "@/components/analytics/growth-indicator"
import { DateRangePicker } from "@/components/analytics/date-range-picker"
import { PostCard } from "@/components/content/post-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, TrendingUp, Users, MessageSquare, Eye, Heart } from "lucide-react"

// Sample data
const sampleMetrics = [
  {
    title: "Total Followers",
    value: "24,532",
    change: { value: 12.5, label: "vs last month" },
    trend: "up" as const,
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Total Posts",
    value: "1,234",
    change: { value: 8.2, label: "vs last month" },
    trend: "up" as const,
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Total Engagement",
    value: "89.2K",
    change: { value: -2.4, label: "vs last month" },
    trend: "down" as const,
    icon: <Heart className="h-4 w-4" />,
  },
  {
    title: "Total Views",
    value: "2.1M",
    change: { value: 15.7, label: "vs last month" },
    trend: "up" as const,
    icon: <Eye className="h-4 w-4" />,
  },
]

const sampleChartData = [
  { date: "Jan 1", likes: 4000, comments: 2400, shares: 2400, views: 24000 },
  { date: "Jan 2", likes: 3000, comments: 1398, shares: 2210, views: 22100 },
  { date: "Jan 3", likes: 2000, comments: 9800, shares: 2290, views: 22900 },
  { date: "Jan 4", likes: 2780, comments: 3908, shares: 2000, views: 20000 },
  { date: "Jan 5", likes: 1890, comments: 4800, shares: 2181, views: 21810 },
  { date: "Jan 6", likes: 2390, comments: 3800, shares: 2500, views: 25000 },
  { date: "Jan 7", likes: 3490, comments: 4300, shares: 2100, views: 21000 },
]

const samplePosts = [
  {
    id: "1",
    content: "Just shipped a major update to our analytics dashboard! 🚀\n\nNew features:\n- Real-time engagement tracking\n- Advanced filtering options\n- Export capabilities\n\nCheck it out and let me know what you think!",
    author: {
      name: "John Doe",
      username: "johndoe",
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    metrics: {
      likes: 234,
      comments: 45,
      reposts: 12,
      views: 5678,
    },
  },
  {
    id: "2",
    content: "Quick tip: The best time to post on Threads is usually between 9-11 AM on weekdays. We've seen 3x better engagement during these hours! ⏰",
    author: {
      name: "John Doe",
      username: "johndoe",
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    metrics: {
      likes: 567,
      comments: 89,
      reposts: 34,
      views: 12345,
    },
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your Threads account.
        </p>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center justify-between">
        <DateRangePicker className="w-64" />
        <Badge variant="secondary" className="flex items-center gap-2">
          <CalendarDays className="h-3 w-3" />
          Last 7 days
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {sampleMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Growth Indicators */}
      <div className="grid gap-4 md:grid-cols-3">
        <GrowthIndicator
          label="Monthly Growth"
          current={24532}
          target={30000}
          previous={21800}
          showPercentage={true}
        />
        <GrowthIndicator
          label="Engagement Rate"
          current={3.6}
          target={5.0}
          previous={3.2}
          unit="%"
          showPercentage={true}
        />
        <GrowthIndicator
          label="Posts Published"
          current={89}
          target={100}
          previous={76}
          showPercentage={true}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content">Recent Content</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <EngagementChart
            data={sampleChartData}
            timeRange="last 7 days"
          />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4">
            {samplePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Performing Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Product launch announcement</span>
                    <Badge variant="default">12.5K engagement</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Behind-the-scenes video</span>
                    <Badge variant="secondary">8.3K engagement</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User testimonial thread</span>
                    <Badge variant="outline">6.7K engagement</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Audience Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Peak activity time</span>
                    <Badge variant="default">10:00 AM</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Most active day</span>
                    <Badge variant="secondary">Tuesday</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. engagement rate</span>
                    <Badge variant="outline">3.6%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}