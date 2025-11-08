"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  loading?: boolean
  error?: string
  className?: string
  footer?: React.ReactNode
  badge?: string
}

export function ChartContainer({
  title,
  description,
  children,
  loading = false,
  error,
  className,
  footer,
  badge,
}: ChartContainerProps) {
  if (error) {
    return (
      <Card className={cn("relative", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-destructive">
            {error}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("relative", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {badge && <Badge variant="secondary">{badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
        {footer && (
          <div className="border-t px-6 py-4">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  )
}