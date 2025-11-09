"use client"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer } from "./chart-container"

interface EngagementData {
  date: string
  likes: number
  comments: number
  shares: number
  views: number
}

interface EngagementChartProps {
  data: EngagementData[]
  timeRange: string
  className?: string
}

export function EngagementChart({
  data,
  timeRange,
  className,
}: EngagementChartProps) {
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2 text-popover-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium text-foreground">{formatValue(entry.value)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ChartContainer
      title="Engagement Overview"
      description={`Total engagement metrics for the ${timeRange}`}
      badge="Live"
      className={className}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-border"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="likes"
            stackId="1"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorLikes)"
          />
          <Area
            type="monotone"
            dataKey="comments"
            stackId="1"
            stroke="hsl(var(--chart-2))"
            fillOpacity={1}
            fill="url(#colorComments)"
          />
          <Area
            type="monotone"
            dataKey="shares"
            stackId="1"
            stroke="hsl(var(--chart-3))"
            fillOpacity={1}
            fill="url(#colorShares)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}