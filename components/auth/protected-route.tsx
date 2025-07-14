"use client"

import type { ReactNode } from "react"
import { useAuth } from "../../contexts/auth-context"
import { LoginForm } from "./login-form"
import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Shield className="h-12 w-12 text-blue-600 animate-pulse mb-4" />
            <p className="text-lg font-medium text-gray-700">Loading...</p>
            <p className="text-sm text-gray-500 mt-2">Checking authentication status</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <>{children}</>
}
