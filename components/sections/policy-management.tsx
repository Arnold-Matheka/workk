"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Download, Eye, Edit } from "lucide-react"

const mockPolicies = [
  {
    id: "POL001",
    client: "John Doe",
    product: "Motor Insurance",
    intermediary: "ABC Brokers",
    premium: 25000,
    downPayment: 5000,
    installmentsPaid: 3,
    installmentsPending: 2,
    installmentsDue: 1,
    installmentsExpired: 0,
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
  },
  {
    id: "POL002",
    client: "Jane Smith",
    product: "Health Insurance",
    intermediary: "XYZ Insurance",
    premium: 45000,
    downPayment: 10000,
    installmentsPaid: 8,
    installmentsPending: 4,
    installmentsDue: 0,
    installmentsExpired: 0,
    status: "Active",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
  },
  {
    id: "POL003",
    client: "Mike Johnson",
    product: "Life Insurance",
    intermediary: "DEF Brokers",
    premium: 120000,
    downPayment: 20000,
    installmentsPaid: 2,
    installmentsPending: 8,
    installmentsDue: 2,
    installmentsExpired: 1,
    status: "Expired",
    startDate: "2023-12-01",
    endDate: "2024-12-01",
  },
]

export function PolicyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")

  const filteredPolicies = mockPolicies.filter((policy) => {
    const matchesSearch =
      policy.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || policy.status.toLowerCase() === statusFilter
    const matchesProduct = productFilter === "all" || policy.product.toLowerCase().includes(productFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesProduct
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Expired":
        return "destructive"
      case "Cancelled":
        return "secondary"
      case "Discontinued":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Policy Management</h2>
          <p className="text-muted-foreground">Manage policies, payments, and installments</p>
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
            Export Policies
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expired Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Require renewal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 12.4M</div>
            <p className="text-xs text-muted-foreground">Annual premium</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Payment collection</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Policies</TabsTrigger>
          <TabsTrigger value="expired">Expired/Discontinued</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Policies</CardTitle>
              <CardDescription>View and manage all active insurance policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search policies..."
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Intermediary</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Payment Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPolicies.map((policy) => {
                    const totalInstallments =
                      policy.installmentsPaid +
                      policy.installmentsPending +
                      policy.installmentsDue +
                      policy.installmentsExpired
                    const progressPercentage = (policy.installmentsPaid / totalInstallments) * 100

                    return (
                      <TableRow key={policy.id}>
                        <TableCell className="font-medium">{policy.id}</TableCell>
                        <TableCell>{policy.client}</TableCell>
                        <TableCell>{policy.product}</TableCell>
                        <TableCell>{policy.intermediary}</TableCell>
                        <TableCell>KSh {policy.premium.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>
                                {policy.installmentsPaid}/{totalInstallments} paid
                              </span>
                              <span>{Math.round(progressPercentage)}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(policy.status) as any}>{policy.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired">
          <Card>
            <CardHeader>
              <CardTitle>Expired & Discontinued Policies</CardTitle>
              <CardDescription>Policies that have expired or been discontinued</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No expired policies to display.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Policies</CardTitle>
              <CardDescription>Policies that have been cancelled</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No cancelled policies to display.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
