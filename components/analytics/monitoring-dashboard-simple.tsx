// Simple monitoring dashboard component (without charts)

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PerformanceMonitor } from './performance-monitor'
import { useAnalytics } from '@/lib/analytics/hooks/use-analytics'
import { usePerformanceMonitoring } from '@/lib/analytics/hooks/use-performance-monitoring'
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Users,
  Eye,
  AlertTriangle,
  CheckCircle,
  Download,
  Activity,
  Globe,
  Monitor,
  Smartphone
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

      <div className="space-y-6">
        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {analyticsData.deviceBreakdown.map((device) => (
                <div key={device.type} className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{device.value}%</div>
                  <div className="text-sm font-medium">{device.type}</div>
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
            <div className="space-y-3">
              {analyticsData.topPages.map((page) => (
                <div key={page.path} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{page.path}</span>
                  <span className="text-sm text-muted-foreground">{page.views} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <PerformanceMonitor showDetails={showDetails} />
      </div>
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