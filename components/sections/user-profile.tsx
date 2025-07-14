"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "../../contexts/auth-context"
import { Save, Upload, Key, Shield } from "lucide-react"

export function UserProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "",
  })

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    style={{
                      borderRadius: '9999px',
                      padding: '0.25rem 1rem',
                      height: 'auto'
                    }}
                    className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+254 700 000 000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="flex items-center h-10">
                    <Badge variant="secondary">{user.role}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button 
                      onClick={handleSave}
                      style={{
                        borderRadius: '9999px',
                        padding: '0.5rem 1.5rem',
                        height: 'auto'
                      }}
                      className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      style={{
                        borderRadius: '9999px',
                        padding: '0.5rem 1.5rem',
                        height: 'auto'
                      }}
                      className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    style={{
                      borderRadius: '9999px',
                      padding: '0.5rem 1.5rem',
                      height: 'auto'
                    }}
                    className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Change Password</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                  </div>
                  <Button className="mt-4" size="sm">
                    <Key className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Permissions</CardTitle>
              <CardDescription>Your current access levels and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Full Admin Access</h4>
                    <p className="text-sm text-muted-foreground">Complete access to all portal features</p>
                  </div>
                  <Badge>Granted</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">User Management</h4>
                    <p className="text-sm text-muted-foreground">Create, edit, and delete user accounts</p>
                  </div>
                  <Badge>Granted</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Financial Reports</h4>
                    <p className="text-sm text-muted-foreground">Access to financial data and reports</p>
                  </div>
                  <Badge>Granted</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">System Configuration</h4>
                    <p className="text-sm text-muted-foreground">Modify system settings and configurations</p>
                  </div>
                  <Badge>Granted</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
