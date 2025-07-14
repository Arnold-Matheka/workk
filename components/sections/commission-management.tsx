"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye, DollarSign } from "lucide-react"

const mockCommissions = [
  {
    id: "COM001",
    intermediary: "ABC Brokers",
    product: "Motor Insurance",
    policyId: "POL001",
    client: "John Doe",
    premium: 25000,
    commissionRate: 15,
    commissionAmount: 3750,
    status: "Paid",
    paidDate: "2024-01-20",
  },
  {
    id: "COM002",
    intermediary: "XYZ Insurance",
    product: "Health Insurance",
    policyId: "POL002",
    client: "Jane Smith",
    premium: 45000,
    commissionRate: 12,
    commissionAmount: 5400,
    status: "Unpaid",
    paidDate: null,
  },
  {
    id: "COM003",
    intermediary: "DEF Brokers",
    product: "Life Insurance",
    policyId: "POL003",
    client: "Mike Johnson",
    premium: 120000,
    commissionRate: 10,
    commissionAmount: 12000,
    status: "Pending",
    paidDate: null,
  },
]

export function CommissionManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")

  const filteredCommissions = mockCommissions.filter((commission) => {
    const matchesSearch =
      commission.intermediary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commission.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || commission.status.toLowerCase() === statusFilter
    const matchesProduct =
      productFilter === "all" || commission.product.toLowerCase().includes(productFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesProduct
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Unpaid":
        return "destructive"
      case "Pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  const totalCommissions = mockCommissions.reduce((sum, c) => sum + c.commissionAmount, 0)
  const paidCommissions = mockCommissions
    .filter((c) => c.status === "Paid")
    .reduce((sum, c) => sum + c.commissionAmount, 0)
  const unpaidCommissions = mockCommissions
    .filter((c) => c.status === "Unpaid")
    .reduce((sum, c) => sum + c.commissionAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Commission Management</h2>
          <p className="text-muted-foreground">Manage intermediary commissions by product</p>
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
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {totalCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {paidCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unpaid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {unpaidCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Outstanding amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Intermediaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active brokers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Commissions</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Database</CardTitle>
              <CardDescription>View and manage all intermediary commissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search commissions..."
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
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Intermediary</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Rate (%)</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommissions.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell className="font-medium">{commission.intermediary}</TableCell>
                      <TableCell>{commission.product}</TableCell>
                      <TableCell>{commission.policyId}</TableCell>
                      <TableCell>{commission.client}</TableCell>
                      <TableCell>KSh {commission.premium.toLocaleString()}</TableCell>
                      <TableCell>{commission.commissionRate}%</TableCell>
                      <TableCell>KSh {commission.commissionAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(commission.status) as any}>{commission.status}</Badge>
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
                          {commission.status === "Unpaid" && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              style={{
                                borderRadius: '9999px',
                                padding: '0.25rem',
                                height: 'auto',
                                width: 'auto',
                                color: '#10B981' // Green color for dollar sign
                              }}
                              className="hover:opacity-90"
                            >
                              <DollarSign className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid">
          <Card>
            <CardHeader>
              <CardTitle>Paid Commissions</CardTitle>
              <CardDescription>Commissions that have been paid</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Showing {mockCommissions.filter((c) => c.status === "Paid").length} paid commissions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unpaid">
          <Card>
            <CardHeader>
              <CardTitle>Unpaid Commissions</CardTitle>
              <CardDescription>Outstanding commission payments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Showing {mockCommissions.filter((c) => c.status === "Unpaid").length} unpaid commissions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
