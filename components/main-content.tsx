"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Dashboard } from "./sections/dashboard"
import { UsersManagement } from "./sections/users-management"
import { QuoteManagement } from "./sections/quote-management"
import { PolicyManagement } from "./sections/policy-management"
import { DocumentManagement } from "./sections/document-management"
import { ValuationManagement } from "./sections/valuation-management"
import { PaymentManagement } from "./sections/payment-management"
import { CommissionManagement } from "./sections/commission-management"
import { RemindersManagement } from "./sections/reminders-management"
import { ClaimsManagement } from "./sections/claims-management"
import { ReportsAnalysis } from "./sections/reports-analysis"
import { Header } from "./layout/header"
import { UserProfile } from "./sections/user-profile"

interface MainContentProps {
  activeSection: string
}

export function MainContent({ activeSection }: MainContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "users":
        return <UsersManagement />
      case "quotes":
        return <QuoteManagement />
      case "policies":
        return <PolicyManagement />
      case "documents":
        return <DocumentManagement />
      case "valuations":
        return <ValuationManagement />
      case "payments":
        return <PaymentManagement />
      case "commissions":
        return <CommissionManagement />
      case "reminders":
        return <RemindersManagement />
      case "claims":
        return <ClaimsManagement />
      case "reports":
        return <ReportsAnalysis />
      case "profile":
        return <UserProfile />
      default:
        return <Dashboard />
    }
  }

  const getSectionTitle = (section: string) => {
    return section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white sticky top-0 z-10">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h2 className="text-lg font-medium text-gray-900">
          {getSectionTitle(activeSection)}
        </h2>
        <div className="flex-1">
          <Header />
        </div>
      </header>
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </SidebarInset>
  )
}