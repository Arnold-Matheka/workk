"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { MainContent } from "./components/main-content"
import { AuthProvider } from "./contexts/auth-context"
import { ProtectedRoute } from "./components/auth/protected-route"

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <AuthProvider>
      <ProtectedRoute>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full bg-gray-50">
            <AppSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
            />
            <MainContent activeSection={activeSection} />
          </div>
        </SidebarProvider>
      </ProtectedRoute>
    </AuthProvider>
  )
}