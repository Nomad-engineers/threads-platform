// Performance metrics monitor component

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { usePerformanceMonitoring } from '@/lib/analytics/hooks/use-performance-monitoring'
import { PerformanceMetrics, PERFORMANCE_THRESHOLDS } from '@/lib/analytics/tracking/performance'
import { Gauge, Zap, AlertTriangle, CheckCircle, Clock, Image, Download } from 'lucide-react'

interface PerformanceMonitorProps {
  showDetails?: boolean
}

export function PerformanceMonitor({ showDetails = false }: PerformanceMonitorProps) {
  const { metrics, getMetricsSummary } = usePerformanceMonitoring({
    enableCoreWebVitals: true,
    enableResourceTiming: true,
    enableUserTiming: true,
    reportThreshold: 100,
  })

  const [detailedMetrics, setDetailedMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    if (showDetails) {
      setDetailedMetrics(getMetricsSummary())
    }
  }, [showDetails, getMetricsSummary])

  const getMetricIcon = (metric: keyof PerformanceMetrics) => {
    switch (metric) {
      case 'LCP':
        return <Image className="h-4 w-4" />
      case 'FID':
        return <Zap className="h-4 w-4" />
      case 'CLS':
        return <AlertTriangle className="h-4 w-4" />
      case 'FCP':
        return <Clock className="h-4 w-4" />
      case 'TTFB':
        return <Download className="h-4 w-4" />
      case 'INP':
        return <Gauge className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getMetricStatus = (value: number | null, thresholds: { GOOD: number; NEEDS_IMPROVEMENT: number; POOR: number }) => {
    if (value === null) return { status: 'not-measured', variant: 'secondary' as const }

    if (value <= thresholds.GOOD) {
      return { status: 'good', variant: 'default' as const }
    } else if (value <= thresholds.NEEDS_IMPROVEMENT) {
      return { status: 'needs-improvement', variant: 'secondary' as const }
    } else {
      return { status: 'poor', variant: 'destructive' as const }
    }
  }

  const getMetricStatusText = (status: string) => {
    switch (status) {
      case 'good':
        return 'Good'
      case 'needs-improvement':
        return 'Needs Improvement'
      case 'poor':
        return 'Poor'
      case 'not-measured':
        return 'Not Measured'
      default:
        return 'Unknown'
    }
  }

  const getMetricStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-3 w-3" />
      case 'needs-improvement':
        return <AlertTriangle className="h-3 w-3" />
      case 'poor':
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  if (!showDetails) {
    // Compact view
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Gauge className="h-4 w-4" />
            Performance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {getMetricsSummary().score !== null ? Math.round(getMetricsSummary().score) : 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground">
                Grade: {getMetricsSummary().grade}
              </div>
            </div>
            <Badge variant={getMetricsSummary().grade === 'A' || getMetricsSummary().grade === 'B' ? 'default' : 'secondary'}>
              {getMetricsSummary().grade}
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Detailed view
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription>
            Core Web Vitals and performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LCP */}
            <MetricItem
              name="LCP"
              description="Largest Contentful Paint"
              value={metrics.LCP}
              unit="ms"
              icon={<Image className="h-4 w-4" />}
              thresholds={PERFORMANCE_THRESHOLDS.LCP}
              getStatus={getMetricStatus}
              getStatusText={getMetricStatusText}
              getStatusIcon={getMetricStatusIcon}
            />

            {/* FID */}
            <MetricItem
              name="FID"
              description="First Input Delay"
              value={metrics.FID}
              unit="ms"
              icon={<Zap className="h-4 w-4" />}
              thresholds={PERFORMANCE_THRESHOLDS.FID}
              getStatus={getMetricStatus}
              getStatusText={getMetricStatusText}
              getStatusIcon={getMetricStatusIcon}
            />

            {/* CLS */}
            <MetricItem
              name="CLS"
              description="Cumulative Layout Shift"
              value={metrics.CLS}
              unit=""
              icon={<AlertTriangle className="h-4 w-4" />}
              thresholds={PERFORMANCE_THRESHOLDS.CLS}
              getStatus={getMetricStatus}
              getStatusText={getMetricStatusText}
              getStatusIcon={getMetricStatusIcon}
            />

            {/* FCP */}
            <MetricItem
              name="FCP"
              description="First Contentful Paint"
              value={metrics.FCP}
              unit="ms"
              icon={<Clock className="h-4 w-4" />}
              thresholds={PERFORMANCE_THRESHOLDS.FCP}
              getStatus={getMetricStatus}
              getStatusText={getMetricStatusText}
              getStatusIcon={getMetricStatusIcon}
            />

            {/* TTFB */}
            <MetricItem
              name="TTFB"
              description="Time to First Byte"
              value={metrics.TTFB}
              unit="ms"
              icon={<Download className="h-4 w-4" />}
              thresholds={PERFORMANCE_THRESHOLDS.TTFB}
              getStatus={getMetricStatus}
              getStatusText={getMetricStatusText}
              getStatusIcon={getMetricStatusIcon}
            />

            {/* INP */}
            <MetricItem
              name="INP"
              description="Interaction to Next Paint"
              value={metrics.INP}
              unit="ms"
              icon={<Gauge className="h-4 w-4" />}
              thresholds={PERFORMANCE_THRESHOLDS.INP}
              getStatus={getMetricStatus}
              getStatusText={getMetricStatusText}
              getStatusIcon={getMetricStatusIcon}
            />
          </div>

          {/* Overall Score */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Performance Score</span>
              <Badge variant={getMetricsSummary().grade === 'A' || getMetricsSummary().grade === 'B' ? 'default' : 'secondary'}>
                Grade {getMetricsSummary().grade}
              </Badge>
            </div>
            <div className="text-3xl font-bold">{getMetricsSummary().score !== null ? Math.round(getMetricsSummary().score) : 'N/A'}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Score calculated from all metrics
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            {metrics.LCP && metrics.LCP > PERFORMANCE_THRESHOLDS.LCP.GOOD && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Optimize images and improve LCP by reducing initial load size</span>
              </div>
            )}
            {metrics.FID && metrics.FID > PERFORMANCE_THRESHOLDS.FID.GOOD && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Reduce JavaScript execution time to improve FID</span>
              </div>
            )}
            {metrics.CLS && metrics.CLS > PERFORMANCE_THRESHOLDS.CLS.GOOD && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>Reserve space for ads and dynamic content to reduce CLS</span>
              </div>
            )}
            {getMetricsSummary().score === null && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Performance metrics are still being collected...</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MetricItemProps {
  name: string
  description: string
  value: number | null
  unit: string
  icon: React.ReactNode
  thresholds: { GOOD: number; NEEDS_IMPROVEMENT: number; POOR: number }
  getStatus: (value: number | null, thresholds: any) => { status: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
  getStatusText: (status: string) => string
  getStatusIcon: (status: string) => React.ReactNode
}

function MetricItem({ name, description, value, unit, icon, thresholds, getStatus, getStatusText, getStatusIcon }: MetricItemProps) {
  const { status, variant } = getStatus(value, thresholds)
  const statusText = getStatusText(status)
  const statusIcon = getStatusIcon(status)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium">{name}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">
          {value !== null ? value.toFixed(0) : 'N/A'}{unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
        </div>
        <Badge variant={variant} className="flex items-center gap-1">
          {statusIcon}
          {statusText}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}