"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
  }
  trend?: "up" | "down" | "neutral"
  icon?: React.ReactNode
  description?: string
  className?: string
}

export function MetricCard({
  title,
  value,
  change,
  trend = "neutral",
  icon,
  description,
  className,
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success"
      case "down":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className={cn("text-sm font-medium", getTrendColor())}>
                {change.value}%
              </span>
            </div>
          )}
        </div>
        {change && (
          <p className="text-xs text-muted-foreground mt-1">
            {change.label}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}