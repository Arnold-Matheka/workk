"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Edit, Send, Bell } from "lucide-react"

const mockReminders = [
  {
    id: "REM001",
    product: "Motor Insurance",
    type: "SMS",
    title: "Payment Due Reminder",
    message: "Your insurance payment is due in 3 days. Please make payment to avoid policy lapse.",
    triggerDays: 3,
    status: "Active",
    lastSent: "2024-01-15",
  },
  {
    id: "REM002",
    product: "Health Insurance",
    type: "Email",
    title: "Policy Renewal Notice",
    message: "Your health insurance policy expires soon. Contact us to renew your coverage.",
    triggerDays: 30,
    status: "Active",
    lastSent: "2024-01-10",
  },
  {
    id: "REM003",
    product: "Life Insurance",
    type: "SMS",
    title: "Cancellation Warning",
    message: "Final notice: Your policy will be cancelled due to non-payment. Pay now to avoid cancellation.",
    triggerDays: 0,
    status: "Inactive",
    lastSent: "2024-01-05",
  },
]

export function RemindersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")

  const filteredReminders = mockReminders.filter((reminder) => {
    const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || reminder.type.toLowerCase() === typeFilter
    const matchesProduct =
      productFilter === "all" || reminder.product.toLowerCase().includes(productFilter.toLowerCase())
    return matchesSearch && matchesType && matchesProduct
  })

  const getStatusColor = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  const activeReminders = mockReminders.filter((r) => r.status === "Active").length
  const totalReminders = mockReminders.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Automatic Reminders</h2>
          <p className="text-muted-foreground">Configure SMS and email reminders per product</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
            <Button 
              style={{
                backgroundColor: '#AC1F2D',
                borderRadius: '9999px',
                padding: '0.5rem 1.5rem',
                height: 'auto',
                color: 'white'
              }}
              className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Reminder
            </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Reminder</DialogTitle>
                <DialogDescription>Set up automatic reminders for customers</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product" className="text-right">
                    Product
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motor">Motor Insurance</SelectItem>
                      <SelectItem value="health">Health Insurance</SelectItem>
                      <SelectItem value="life">Life Insurance</SelectItem>
                      <SelectItem value="property">Property Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="days" className="text-right">
                    Trigger Days
                  </Label>
                  <Input id="days" type="number" className="col-span-3" placeholder="Days before due date" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Textarea id="message" className="col-span-3" rows={4} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="active" className="text-right">
                    Active
                  </Label>
                  <Switch id="active" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  style={{
                    borderRadius: '9999px',
                    padding: '0.5rem 1.5rem',
                    height: 'auto'
                  }}
                  className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    backgroundColor: '#AC1F2D',
                    borderRadius: '9999px',
                    padding: '0.5rem 1.5rem',
                    height: 'auto',
                    color: 'white'
                  }}
                  className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
                >
                  Create Reminder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReminders}</div>
            <p className="text-xs text-muted-foreground">Configured reminders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeReminders}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SMS Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReminders.filter((r) => r.type === "SMS").length}</div>
            <p className="text-xs text-muted-foreground">Text messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Email Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReminders.filter((r) => r.type === "Email").length}</div>
            <p className="text-xs text-muted-foreground">Email notifications</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reminders</TabsTrigger>
          <TabsTrigger value="payment">Payment Reminders</TabsTrigger>
          <TabsTrigger value="cancellation">Cancellation Warnings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reminder Configuration</CardTitle>
              <CardDescription>Manage automatic reminder settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reminders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={productFilter} onValueChange={setProductFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="motor">Motor Insurance</SelectItem>
                    <SelectItem value="health">Health Insurance</SelectItem>
                    <SelectItem value="life">Life Insurance</SelectItem>
                    <SelectItem value="property">Property Insurance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Trigger Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReminders.map((reminder) => (
                    <TableRow key={reminder.id}>
                      <TableCell>{reminder.product}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          {reminder.type === "SMS" ? <Bell className="h-3 w-3" /> : <Send className="h-3 w-3" />}
                          {reminder.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{reminder.title}</TableCell>
                      <TableCell>{reminder.triggerDays} days</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(reminder.status) as any}>{reminder.status}</Badge>
                      </TableCell>
                      <TableCell>{reminder.lastSent}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            style={{
                              borderRadius: '9999px',
                              padding: '0.25rem',
                              height: 'auto',
                              width: 'auto'
                            }}
                            className="hover:opacity-90"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            style={{
                              borderRadius: '9999px',
                              padding: '0.25rem',
                              height: 'auto',
                              width: 'auto'
                            }}
                            className="hover:opacity-90"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Reminders</CardTitle>
              <CardDescription>Reminders for upcoming payments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payment reminder configurations will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancellation">
          <Card>
            <CardHeader>
              <CardTitle>Cancellation Warnings</CardTitle>
              <CardDescription>Final notices before policy cancellation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Cancellation warning configurations will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
