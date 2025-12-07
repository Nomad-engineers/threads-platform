// Comprehensive monitoring dashboard component

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PerformanceMonitor } from './performance-monitor'
import { useAnalytics } from '@/lib/analytics/hooks/use-analytics'
import { usePerformanceMonitoring } from '@/lib/analytics/hooks/use-performance-monitoring'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Users,
  MousePointer,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle,
  Download,
  Activity,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'

interface MonitoringDashboardProps {
  showDetails?: boolean
  compact?: boolean
}

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  conversions: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{ path: string; views: number }>
  deviceBreakdown: Array<{ type: string; value: number; color: string }>
  performanceMetrics: Array<{ metric: string; value: number; threshold: number }>
}

export function MonitoringDashboard({ showDetails = false, compact = false }: MonitoringDashboardProps) {
  const { trackEvent } = useAnalytics()
  const { metrics, getMetricsSummary } = usePerformanceMonitoring()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    conversions: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    topPages: [],
    deviceBreakdown: [],
    performanceMetrics: [],
  })

  // Simulate analytics data (in real app, this would come from your analytics API)
  useEffect(() => {
    const mockData: AnalyticsData = {
      pageViews: 1250,
      uniqueVisitors: 850,
      conversions: 125,
      bounceRate: 32,
      avgSessionDuration: 245,
      topPages: [
        { path: '/', views: 450 },
        { path: '/dashboard', views: 320 },
        { path: '/pricing', views: 280 },
        { path: '/features', views: 200 },
      ],
      deviceBreakdown: [
        { type: 'Desktop', value: 58, color: '#8884d8' },
        { type: 'Mobile', value: 35, color: '#82ca9d' },
        { type: 'Tablet', value: 7, color: '#ffc658' },
      ],
      performanceMetrics: [
        { metric: 'LCP', value: 1800, threshold: 2500 },
        { metric: 'FID', value: 75, threshold: 100 },
        { metric: 'CLS', value: 0.08, threshold: 0.1 },
        { metric: 'FCP', value: 1200, threshold: 1800 },
        { metric: 'TTFB', value: 450, threshold: 800 },
      ],
    }
    setAnalyticsData(mockData)
  }, [])

  const handleExportData = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `analytics-data-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (compact) {
    // Compact view with key metrics
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Quick Analytics
            </div>
            <Button size="sm" variant="ghost" onClick={handleExportData}>
              <Download className="h-3 w-3" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard
              title="Page Views"
              value={analyticsData.pageViews}
              icon={<Eye className="h-4 w-4" />}
              trend="+12%"
            />
            <MetricCard
              title="Visitors"
              value={analyticsData.uniqueVisitors}
              icon={<Users className="h-4 w-4" />}
              trend="+8%"
            />
            <MetricCard
              title="Conversions"
              value={analyticsData.conversions}
              icon={<TrendingUp className="h-4 w-4" />}
              trend="+23%"
            />
            <MetricCard
              title="Bounce Rate"
              value={analyticsData.bounceRate}
              icon={<Activity className="h-4 w-4" />}
              trend="-5%"
              formatAsPercentage
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  // Full dashboard view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive monitoring and analytics</p>
        </div>
        <Button onClick={handleExportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Page Views"
          value={analyticsData.pageViews}
          icon={<Eye className="h-4 w-4" />}
          trend="+12%"
          description="Last 30 days"
        />
        <MetricCard
          title="Unique Visitors"
          value={analyticsData.uniqueVisitors}
          icon={<Users className="h-4 w-4" />}
          trend="+8%"
          description="Last 30 days"
        />
        <MetricCard
          title="Conversions"
          value={analyticsData.conversions}
          icon={<TrendingUp className="h-4 w-4" />}
          trend="+23%"
          description="Conversion rate: 10%"
        />
        <MetricCard
          title="Avg. Session"
          value={analyticsData.avgSessionDuration}
          icon={<Activity className="h-4 w-4" />}
          trend="-2%"
          formatAsSeconds
          description="Average session duration"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Device Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={analyticsData.deviceBreakdown.map(d => ({ name: d.type, value: d.value, color: d.color }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {analyticsData.deviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {analyticsData.deviceBreakdown.map((device) => (
                    <div key={device.type} className="text-center">
                      <div className="text-sm font-medium">{device.type}</div>
                      <div className="text-xs text-muted-foreground">{device.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={analyticsData.topPages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="path" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {analyticsData.topPages.map((page) => (
                    <div key={page.path} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{page.path}</span>
                      <span className="text-sm text-muted-foreground">{page.views} views</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <PerformanceMonitor showDetails={showDetails} />
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <PerformanceMonitor showDetails={true} />
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Journey Analysis
              </CardTitle>
              <CardDescription>
                Track user behavior and engagement patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Traffic Sources</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Direct</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Organic Search</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Social Media</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Referral</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">User Engagement</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Avg. Pages/Session</span>
                        <span className="text-sm font-medium">2.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Avg. Duration</span>
                        <span className="text-sm font-medium">4:05</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Return Rate</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Mobile Usage</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversion Tab */}
        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Conversion Funnel
              </CardTitle>
              <CardDescription>
                Track user journey from visit to conversion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { stage: 'Visit', count: 1250, percentage: 100 },
                  { stage: 'Sign Up Started', count: 450, percentage: 36 },
                  { stage: 'Sign Up Completed', count: 320, percentage: 25.6 },
                  { stage: 'Trial Started', count: 280, percentage: 22.4 },
                  { stage: 'Conversion', count: 125, percentage: 10 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Conversion Insights</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>36% of visitors start sign up process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>71% drop off between sign up start and completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span>10% overall conversion rate is above industry average</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: string
  description?: string
  formatAsPercentage?: boolean
  formatAsSeconds?: boolean
}

function MetricCard({ title, value, icon, trend, description, formatAsPercentage = false, formatAsSeconds = false }: MetricCardProps) {
  const formattedValue = formatAsPercentage
    ? `${value}%`
    : formatAsSeconds
    ? `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`
    : value.toLocaleString()

  const isPositive = trend && trend.startsWith('+')

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
          </div>
          {trend && (
            <Badge variant={isPositive ? 'default' : 'secondary'} className="flex items-center gap-1">
              {trend}
            </Badge>
          )}
        </div>
        <div className="text-2xl font-bold">{formattedValue}</div>
        {description && (
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        )}
      </CardContent>
    </Card>
  )
}