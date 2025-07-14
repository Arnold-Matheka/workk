"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo admin credentials - in production, this would be handled by your backend
const DEMO_ADMIN = {
  id: "admin-001",
  email: "admin@insurance.com",
  password: "admin123",
  name: "Admin User",
  role: "Super Admin",
  avatar: "/placeholder.svg?height=40&width=40",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("insurance_admin_user")
        const sessionExpiry = localStorage.getItem("insurance_admin_session_expiry")

        if (savedUser && sessionExpiry) {
          const now = new Date().getTime()
          const expiry = Number.parseInt(sessionExpiry)

          if (now < expiry) {
            setUser(JSON.parse(savedUser))
          } else {
            // Session expired, clear storage
            localStorage.removeItem("insurance_admin_user")
            localStorage.removeItem("insurance_admin_session_expiry")
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials against demo admin
      if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
        const userData = {
          id: DEMO_ADMIN.id,
          email: DEMO_ADMIN.email,
          name: DEMO_ADMIN.name,
          role: DEMO_ADMIN.role,
          avatar: DEMO_ADMIN.avatar,
        }

        // Set session expiry to 24 hours from now
        const sessionExpiry = new Date().getTime() + 24 * 60 * 60 * 1000

        // Save to localStorage
        localStorage.setItem("insurance_admin_user", JSON.stringify(userData))
        localStorage.setItem("insurance_admin_session_expiry", sessionExpiry.toString())

        setUser(userData)
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("insurance_admin_user")
    localStorage.removeItem("insurance_admin_session_expiry")
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
