"use client"

import React from "react";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Download, Edit, Eye, Trash2, Check, X } from "lucide-react"
import { format } from "date-fns"

// Backend API base URL
const API_URL = typeof window !== 'undefined' ? 'http://localhost:5000/api/users' : '';


interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  policies: number;
  joinDate: string;
}

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setUsers(data);
      } else {
        // Set dummy users if no data is returned
        setUsers([
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            status: 'Active',
            policies: 3,
            joinDate: '2024-01-15',
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1987654321',
            status: 'Inactive',
            policies: 1,
            joinDate: '2023-11-22',
          },
          {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            phone: '+1122334455',
            status: 'Active',
            policies: 2,
            joinDate: '2024-03-10',
          },
        ]);
      }
      setError(null);
    } catch (err) {
      // Set dummy users on error
      setUsers([
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          status: 'Active',
          policies: 3,
          joinDate: '2024-01-15',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1987654321',
          status: 'Inactive',
          policies: 1,
          joinDate: '2023-11-22',
        },
        {
          id: 3,
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          phone: '+1122334455',
          status: 'Active',
          policies: 2,
          joinDate: '2024-03-10',
        },
      ]);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on mount
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewUser = (user: User) => {
    router.push(`/client-profile/${user.id}`);
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteUser = async (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`${API_URL}/${userId}`, { method: 'DELETE' });
        fetchUsers();
      } catch {
        setError('Failed to delete user');
      }
    }
  }

  const toggleUserStatus = async (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    try {
      await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: user.status === 'Active' ? 'Inactive' : 'Active' })
      });
      fetchUsers();
    } catch {
      setError('Failed to update user status');
    }
  }

  const handleExportReport = () => {
    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Status', 'Policies', 'Join Date']
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.id,
        `"${user.name}"`,
        `"${user.email}"`,
        `"${user.phone}"`,
        `"${user.status}"`,
        user.policies,
        `"${user.joinDate}"`
      ].join(','))
    ].join('\n')

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    // Create a temporary link to trigger the download
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `users-report-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    
    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleSaveUser = async () => {
    if (!userForm.name || !userForm.email || !userForm.phone) return;

    if (isEditing && selectedUser) {
      // Update existing user
      try {
        await fetch(`${API_URL}/${selectedUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userForm)
        });
        await fetchUsers();
      } catch {
        setError('Failed to update user');
      }
    } else {
      // Add new user
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userForm)
        });
        // Try to get the created user from the response
        const newUser = await res.json();
        if (newUser && newUser.id) {
          setUsers(prev => [newUser, ...prev]);
        } else {
          // fallback: refetch all users
          await fetchUsers();
        }
      } catch {
        setError('Failed to add user');
      }
    }
    // Reset form and close dialog
    setUserForm({ name: '', email: '', phone: '' });
    setIsDialogOpen(false);
    setIsEditing(false);
    setSelectedUser(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Users/Clients Management</h2>
          <p className="text-muted-foreground">Manage customer details and generate reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReport} className="rounded-full px-4">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                style={{
                  backgroundColor: '#AC1F2D',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.5rem',
                  height: 'auto'
                }}
                className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Enter the details for the new user</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name *
                  </Label>
                  <Input 
                    id="name" 
                    className="col-span-3" 
                    value={userForm.name}
                    onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email *
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="col-span-3" 
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone *
                  </Label>
                  <Input 
                    id="phone" 
                    className="col-span-3" 
                    value={userForm.phone}
                    onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false)
                    setUserForm({ name: '', email: '', phone: '' })
                    setIsEditing(false)
                    setSelectedUser(null)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveUser}>
                  {isEditing ? 'Update User' : 'Save User'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Database</CardTitle>
          <CardDescription>View and manage all registered users and clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Policies</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.policies}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewUser(user)}
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditUser(user)}
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete user"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleUserStatus(user.id)}
                        title={user.status === 'Active' ? 'Deactivate user' : 'Activate user'}
                        className={user.status === 'Active' ? 'text-green-600 hover:text-green-800' : 'text-gray-500 hover:text-gray-700'}
                      >
                        {user.status === 'Active' ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>
                  Viewing details for {selectedUser.name}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Name</Label>
                  <div className="col-span-3">{selectedUser.name}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Email</Label>
                  <div className="col-span-3">{selectedUser.email}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Phone</Label>
                  <div className="col-span-3">{selectedUser.phone}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Status</Label>
                  <div className="col-span-3">
                    <Badge variant={selectedUser.status === "Active" ? "default" : "secondary"}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Join Date</Label>
                  <div className="col-span-3">
                    {format(new Date(selectedUser.joinDate), 'PP')}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  setIsViewDialogOpen(false)
                  handleEditUser(selectedUser)
                }}>
                  Edit User
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
