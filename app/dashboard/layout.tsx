import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  )
}