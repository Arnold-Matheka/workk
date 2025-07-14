"use client"

import { useState } from "react"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { MainContent } from "./components/main-content"
import { AuthProvider } from "./contexts/auth-context"
import { ProtectedRoute } from "./components/auth/protected-route"

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <AuthProvider>
      <ProtectedRoute>
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full bg-gray-50 relative">
            <div className={`fixed inset-y-0 left-0 z-10 bg-white shadow transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
              <AppSidebar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
                isCollapsed={isCollapsed} 
                toggleCollapse={() => setIsCollapsed(!isCollapsed)} 
              />
            </div>
            <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'pl-16' : 'pl-64'}`}>
              <MainContent 
                activeSection={activeSection} 
                toggleSidebar={() => setIsCollapsed(!isCollapsed)}
                isSidebarCollapsed={isCollapsed}
              />
            </div>
          </div>
        </SidebarProvider>
      </ProtectedRoute>
    </AuthProvider>
  )
}
