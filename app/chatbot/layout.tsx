import { Navigation } from "../../components/layout/navigation"
import { GradientBackground } from "../../components/ui/gradient-background"
import { GeometricPattern } from "../../components/ui/geometric-pattern"

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed inset-0 -z-10 h-full">
        <GradientBackground />
        <GeometricPattern variant="dark" density="medium" />
      </div>
      <div className="flex-none">
        <Navigation />
      </div>
      <div className="h-[calc(100vh-4rem)] pt-28">
        {children}
      </div>
    </div>
  )
} 