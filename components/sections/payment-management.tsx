"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Download, Eye, CheckCircle } from "lucide-react"

const mockPayments = [
  {
    id: "PAY001",
    mpesaCode: "QA12345678",
    policyId: "POL001",
    client: "John Doe",
    amount: 5000,
    date: "2024-01-15",
    time: "14:30:25",
    status: "Validated",
    phoneNumber: "+254712345678",
  },
  {
    id: "PAY002",
    mpesaCode: "QB23456789",
    policyId: "POL002",
    client: "Jane Smith",
    amount: 10000,
    date: "2024-01-16",
    time: "09:15:42",
    status: "Pending",
    phoneNumber: "+254723456789",
  },
  {
    id: "PAY003",
    mpesaCode: "QC34567890",
    policyId: "POL003",
    client: "Mike Johnson",
    amount: 7500,
    date: "2024-01-17",
    time: "16:45:18",
    status: "Failed",
    phoneNumber: "+254734567890",
  },
]

export function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.mpesaCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Validated":
        return "default"
      case "Pending":
        return "secondary"
      case "Failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const totalPayments = mockPayments.length
  const validatedPayments = mockPayments.filter((p) => p.status === "Validated").length
  const pendingPayments = mockPayments.filter((p) => p.status === "Pending").length
  const totalAmount = mockPayments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Management</h2>
          <p className="text-muted-foreground">Manage M-Pesa payments and validations</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            style={{
              borderRadius: '9999px',
              padding: '0.5rem 1.5rem',
              height: 'auto'
            }}
            className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Payments
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPayments}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Validated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validatedPayments}</div>
            <p className="text-xs text-muted-foreground">Confirmed payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Awaiting validation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>M-Pesa Payments</CardTitle>
          <CardDescription>View and validate M-Pesa payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
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
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>M-Pesa Code</TableHead>
                <TableHead>Policy ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.mpesaCode}</TableCell>
                  <TableCell>{payment.policyId}</TableCell>
                  <TableCell>{payment.client}</TableCell>
                  <TableCell>KSh {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.time}</TableCell>
                  <TableCell>{payment.phoneNumber}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(payment.status) as any}>{payment.status}</Badge>
                  </TableCell>
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
                        <Eye className="h-4 w-4" />
                      </Button>
                      {payment.status === "Pending" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              style={{
                                borderRadius: '9999px',
                                padding: '0.25rem',
                                height: 'auto',
                                width: 'auto',
                                color: '#10B981' // Green color for check action
                              }}
                              className="hover:opacity-90"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Validate Payment</DialogTitle>
                              <DialogDescription>Manually validate this M-Pesa payment</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">M-Pesa Code</Label>
                                <div className="col-span-3">{payment.mpesaCode}</div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Amount</Label>
                                <div className="col-span-3">KSh {payment.amount.toLocaleString()}</div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Client</Label>
                                <div className="col-span-3">{payment.client}</div>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button>Validate Payment</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
