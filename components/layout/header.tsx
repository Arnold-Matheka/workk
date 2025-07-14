"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../../contexts/auth-context"
import { LogOut, Settings, User, Bell } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-1 flex justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Welcome back, {user.name}</h3>
          <p className="text-sm text-muted-foreground">Last login: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center">
          <div className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary/90 border border-primary/20 whitespace-nowrap">
            {user.role}
          </div>
        </div>
        <div className="flex items-center justify-center w-9">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative hover:bg-primary/5">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </Button>
        </div>

        <div className="flex items-center justify-center w-9">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-blue-600 text-white">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
