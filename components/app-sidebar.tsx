"use client"

import {
  Users,
  FileText,
  Shield,
  FolderOpen,
  Calculator,
  CreditCard,
  Percent,
  Bell,
  AlertTriangle,
  BarChart3,
  Home,
  Search,
  User,
} from "lucide-react"
import { useState, useRef } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInput,
} from "@/components/ui/sidebar"

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: Home },
  { id: "users", title: "Users/Clients", icon: Users },
  { id: "quotes", title: "Quote Management", icon: FileText },
  { id: "policies", title: "Policy Management", icon: Shield },
  { id: "documents", title: "Document Management", icon: FolderOpen },
  { id: "valuations", title: "Valuation Management", icon: Calculator },
  { id: "payments", title: "Payment Management", icon: CreditCard },
  { id: "commissions", title: "Commission Management", icon: Percent },
  { id: "reminders", title: "Automatic Reminders", icon: Bell },
  { id: "claims", title: "Claims Management", icon: AlertTriangle },
  { id: "reports", title: "Reports & Analysis", icon: BarChart3 },
  { id: "profile", title: "Profile Settings", icon: User },
]

import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isCollapsed: boolean
  toggleCollapse: () => void
}

export function AppSidebar({ activeSection, setActiveSection, isCollapsed, toggleCollapse }: AppSidebarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const handleSearchClick = () => {
    if (isCollapsed) {
      toggleCollapse();
      // Focus the search input after the sidebar has expanded
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <Sidebar
      className={cn(
        "h-full bg-white/80 backdrop-blur-md flex flex-col border-r border-gray-200",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
        <SidebarHeader className="p-4 flex-shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 items-center">
              <img
                src="https://cic.co.ke/wp-content/uploads/2022/01/CIC_Group_Logo@2x.png"
                alt="CIC Insurance"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30"><text x="0" y="20" font-family="Arial" font-weight="bold" font-size="20" fill="%230066CC">CIC Insurance</text></svg>'
                }}
              />
            </div>
            {!isCollapsed && (
              <div className="border-l border-gray-200 pl-3">
                <h1 className="text-lg font-bold text-[#AC1F2D]">Easybima</h1>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className={cn("relative", isCollapsed ? "hidden" : "block")}>
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <SidebarInput 
                ref={searchInputRef}
                placeholder="Search..." 
                className="pl-8" 
              />
            </div>
            {isCollapsed && (
              <div 
                className="flex items-center justify-center cursor-pointer"
                onClick={handleSearchClick}
              >
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 overflow-y-auto py-2 pr-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] hover:[&::-webkit-scrollbar]:block hover:[-ms-overflow-style:auto] hover:[scrollbar-width:thin]">
          <SidebarGroup>
            {!isCollapsed && (
              <SidebarGroupLabel className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Management
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className={cn("pr-2", isCollapsed ? "px-1" : "px-2")}>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <SidebarMenuButton
                      isActive={activeSection === item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`text-sm font-medium transition-colors ${
                        isCollapsed 
                          ? 'flex justify-center items-center w-10 h-10 mx-auto my-1' 
                          : 'flex items-center w-full px-3 py-2 rounded-md'
                      } ${
                        activeSection === item.id
                          ? isCollapsed 
                            ? 'bg-[#AC1F2D] text-white rounded-full' 
                            : 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className={cn("flex-shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
                      {!isCollapsed && (
                        <span className="ml-3 truncate">
                          {item.title}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}
