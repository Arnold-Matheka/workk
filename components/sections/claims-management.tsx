"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Send, Eye, AlertTriangle } from "lucide-react"

const mockClaims = [
  {
    id: "CLM001",
    policyId: "POL001",
    client: "John Doe",
    product: "Motor Insurance",
    claimAmount: 150000,
    incidentDate: "2024-01-10",
    reportedDate: "2024-01-12",
    status: "Under Review",
    assignedTo: "Claims Team A",
    lastUpdate: "2024-01-15",
  },
  {
    id: "CLM002",
    policyId: "POL002",
    client: "Jane Smith",
    product: "Health Insurance",
    claimAmount: 85000,
    incidentDate: "2024-01-08",
    reportedDate: "2024-01-09",
    status: "Approved",
    assignedTo: "Claims Team B",
    lastUpdate: "2024-01-14",
  },
  {
    id: "CLM003",
    policyId: "POL003",
    client: "Mike Johnson",
    product: "Property Insurance",
    claimAmount: 320000,
    incidentDate: "2024-01-05",
    reportedDate: "2024-01-06",
    status: "Rejected",
    assignedTo: "Claims Team A",
    lastUpdate: "2024-01-13",
  },
  {
    id: "CLM004",
    policyId: "POL004",
    client: "Sarah Wilson",
    product: "Life Insurance",
    claimAmount: 500000,
    incidentDate: "2024-01-01",
    reportedDate: "2024-01-02",
    status: "Pending Documents",
    assignedTo: "Claims Team C",
    lastUpdate: "2024-01-12",
  },
]

export function ClaimsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")

  const filteredClaims = mockClaims.filter((claim) => {
    const matchesSearch =
      claim.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || claim.status.toLowerCase().includes(statusFilter.toLowerCase())
    const matchesProduct = productFilter === "all" || claim.product.toLowerCase().includes(productFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesProduct
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "default"
      case "Under Review":
        return "secondary"
      case "Rejected":
        return "destructive"
      case "Pending Documents":
        return "outline"
      default:
        return "secondary"
    }
  }

  const totalClaims = mockClaims.length
  const pendingClaims = mockClaims.filter((c) => c.status === "Under Review" || c.status === "Pending Documents").length
  const approvedClaims = mockClaims.filter((c) => c.status === "Approved").length
  const totalClaimAmount = mockClaims.reduce((sum, c) => sum + c.claimAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Claims Management</h2>
          <p className="text-muted-foreground">View and manage insurance claims notifications</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClaims}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingClaims}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedClaims}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {totalClaimAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Claimed amount</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claims Database</CardTitle>
          <CardDescription>View raised claims and manage notifications to claims teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
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
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Policy ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Claim Amount</TableHead>
                <TableHead>Incident Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.id}</TableCell>
                  <TableCell>{claim.policyId}</TableCell>
                  <TableCell>{claim.client}</TableCell>
                  <TableCell>{claim.product}</TableCell>
                  <TableCell>KSh {claim.claimAmount.toLocaleString()}</TableCell>
                  <TableCell>{claim.incidentDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(claim.status) as any}>{claim.status}</Badge>
                  </TableCell>
                  <TableCell>{claim.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Resend Notification">
                        <Send className="h-4 w-4" />
                      </Button>
                      {claim.status === "Pending Documents" && (
                        <Button variant="ghost" size="sm" title="Urgent Follow-up">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
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
    </div>
  )
}
