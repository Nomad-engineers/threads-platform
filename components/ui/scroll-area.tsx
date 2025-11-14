"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        className="h-full w-full overflow-y-auto overflow-x-hidden rounded-[inherit] scrollbar-hide"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
        onWheel={(e) => {
          // Ensure scrolling works in modal contexts
          if (e.currentTarget === e.target || e.currentTarget.contains(e.target as Node)) {
            // Let the scroll happen naturally
            return
          }
        }}
        onTouchMove={(e) => {
          // Ensure touch scrolling works in modal contexts
          if (e.currentTarget === e.target || e.currentTarget.contains(e.target as Node)) {
            // Let the scroll happen naturally
            return
          }
        }}
      >
        {children}
      </div>
    </div>
  )
)
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }