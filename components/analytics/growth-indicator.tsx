"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface GrowthIndicatorProps {
  label: string
  current: number
  target: number
  previous?: number
  unit?: string
  showPercentage?: boolean
  className?: string
}

export function GrowthIndicator({
  label,
  current,
  target,
  previous,
  unit = "",
  showPercentage = true,
  className,
}: GrowthIndicatorProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const hasPrevious = previous !== undefined
  const growthRate = hasPrevious ? ((current - previous) / previous) * 100 : 0
  const isPositiveGrowth = growthRate > 0

  return (
    <Card className={cn("p-4", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          {hasPrevious && (
            <div className="flex items-center space-x-1">
              {isPositiveGrowth ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <Badge
                variant={isPositiveGrowth ? "default" : "destructive"}
                className="text-xs"
              >
                {Math.abs(growthRate).toFixed(1)}%
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold">
              {current.toLocaleString()}
              {unit}
            </span>
            <span className="text-sm text-muted-foreground">
              / {target.toLocaleString()}
              {unit}
            </span>
          </div>

          {showPercentage && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{percentage.toFixed(1)}% of target</span>
              <span>
                {Math.max(0, target - current).toLocaleString()}
                {unit} remaining
              </span>
            </div>
          )}

          <Progress value={percentage} className="h-2" />
        </div>

        {hasPrevious && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Previous period</span>
              <span>{previous?.toLocaleString()}{unit}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}