"use client"

import { MetricCard } from "@/components/analytics/metric-card"
import { EngagementChart } from "@/components/analytics/engagement-chart"
import { GrowthIndicator } from "@/components/analytics/growth-indicator"
import { DateRangePicker } from "@/components/analytics/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Clock, Eye, Heart } from "lucide-react"

// Sample analytics data
const detailedMetrics = [
  {
    title: "Impressions",
    value: "456.8K",
    change: { value: 23.5, label: "vs last month" },
    trend: "up" as const,
    icon: <Eye className="h-4 w-4" />,
  },
  {
    title: "Reach",
    value: "234.2K",
    change: { value: 18.2, label: "vs last month" },
    trend: "up" as const,
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: { value: 0.8, label: "vs last month" },
    trend: "up" as const,
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "Avg. Watch Time",
    value: "2:34",
    change: { value: -5.2, label: "vs last month" },
    trend: "down" as const,
    icon: <Clock className="h-4 w-4" />,
  },
]

const contentPerformance = [
  {
    type: "Text Posts",
    count: 89,
    engagement: 3.2,
    reach: 45678,
    color: "bg-blue-500",
  },
  {
    type: "Image Posts",
    count: 45,
    engagement: 5.8,
    reach: 89234,
    color: "bg-green-500",
  },
  {
    type: "Video Posts",
    count: 23,
    engagement: 8.9,
    reach: 123456,
    color: "bg-purple-500",
  },
  {
    type: "Mixed Media",
    count: 34,
    engagement: 6.7,
    reach: 98765,
    color: "bg-orange-500",
  },
]

const topPosts = [
  {
    id: "1",
    content: "Just shipped a major update to our analytics dashboard! 🚀",
    engagement: 12500,
    reach: 45000,
    rate: 8.9,
  },
  {
    id: "2",
    content: "Quick tip: The best time to post on Threads...",
    engagement: 8900,
    reach: 32000,
    rate: 7.2,
  },
  {
    id: "3",
    content: "Behind the scenes at Threads-Boost HQ...",
    engagement: 6700,
    reach: 28000,
    rate: 6.1,
  },
]

export default function AnalyticsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Deep dive into your Threads performance metrics and audience insights.
        </p>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center justify-between">
        <DateRangePicker className="w-64" />
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <BarChart3 className="h-3 w-3 mr-1" />
            Detailed Analytics
          </Badge>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {detailedMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <EngagementChart
              data={[
                { date: "Mon", likes: 4000, comments: 2400, shares: 2400, views: 24000 },
                { date: "Tue", likes: 3000, comments: 1398, shares: 2210, views: 22100 },
                { date: "Wed", likes: 2000, comments: 9800, shares: 2290, views: 22900 },
                { date: "Thu", likes: 2780, comments: 3908, shares: 2000, views: 20000 },
                { date: "Fri", likes: 1890, comments: 4800, shares: 2181, views: 21810 },
                { date: "Sat", likes: 2390, comments: 3800, shares: 2500, views: 25000 },
                { date: "Sun", likes: 3490, comments: 4300, shares: 2100, views: 21000 },
              ]}
              timeRange="last week"
            />

            <Card>
              <CardHeader>
                <CardTitle>Content Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contentPerformance.map((content) => (
                  <div key={content.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{content.type}</span>
                      <Badge variant="outline">{content.count} posts</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Engagement Rate</span>
                        <span>{content.engagement}%</span>
                      </div>
                      <Progress value={content.engagement * 10} className="h-2" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Reach: {content.reach.toLocaleString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPosts.map((post, index) => (
                    <div key={post.id} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{post.content}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            {post.engagement.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {post.reach.toLocaleString()}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {post.rate}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <GrowthIndicator
                      label="Posts Published"
                      current={189}
                      target={200}
                      previous={165}
                      showPercentage={true}
                    />
                    <GrowthIndicator
                      label="Avg. Engagement per Post"
                      current={234}
                      target={300}
                      previous={198}
                      showPercentage={true}
                    />
                    <GrowthIndicator
                      label="Content Consistency Score"
                      current={78}
                      target={85}
                      previous={72}
                      unit="%"
                      showPercentage={true}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">18-24 years</span>
                      <Badge variant="outline">32%</Badge>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">25-34 years</span>
                      <Badge variant="outline">45%</Badge>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">35-44 years</span>
                      <Badge variant="outline">18%</Badge>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">45+ years</span>
                      <Badge variant="outline">5%</Badge>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">United States</span>
                    <Badge variant="default">45%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">United Kingdom</span>
                    <Badge variant="secondary">22%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Canada</span>
                    <Badge variant="outline">18%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Australia</span>
                    <Badge variant="outline">8%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Others</span>
                    <Badge variant="outline">7%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement by Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">6 AM - 12 PM</span>
                    <Badge variant="outline">Low</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">12 PM - 6 PM</span>
                    <Badge variant="default">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">6 PM - 12 AM</span>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">12 AM - 6 AM</span>
                    <Badge variant="outline">Low</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <GrowthIndicator
                  label="Follower Growth Rate"
                  current={12.5}
                  target={15}
                  previous={8.7}
                  unit="%"
                  showPercentage={true}
                />
                <GrowthIndicator
                  label="Engagement Growth"
                  current={18.2}
                  target={20}
                  previous={14.3}
                  unit="%"
                  showPercentage={true}
                />
                <GrowthIndicator
                  label="Reach Expansion"
                  current={156.7}
                  target={200}
                  previous={123.4}
                  unit="K"
                  showPercentage={true}
                />
                <GrowthIndicator
                  label="Content Virality Score"
                  current={67}
                  target={75}
                  previous={58}
                  unit="%"
                  showPercentage={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}