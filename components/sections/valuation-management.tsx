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
import { Search, Download, Eye, Plus } from "lucide-react"

const mockValuations = [
  {
    id: "VAL001",
    policyId: "POL001",
    client: "John Doe",
    product: "Motor Insurance",
    valuationDate: "2024-01-15",
    valuationAmount: 850000,
    status: "Completed",
    valuator: "ABC Valuers",
    reportAvailable: true,
  },
  {
    id: "VAL002",
    policyId: "POL002",
    client: "Jane Smith",
    product: "Property Insurance",
    valuationDate: "2024-01-16",
    valuationAmount: 2500000,
    status: "Pending",
    valuator: "XYZ Valuers",
    reportAvailable: false,
  },
  {
    id: "VAL003",
    policyId: "POL003",
    client: "Mike Johnson",
    product: "Motor Insurance",
    valuationDate: null,
    valuationAmount: null,
    status: "Not Valued",
    valuator: null,
    reportAvailable: false,
  },
]

export function ValuationManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredValuations = mockValuations.filter((val) => {
    const matchesSearch =
      val.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.policyId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || val.status.toLowerCase().includes(statusFilter.toLowerCase())
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "Pending":
        return "secondary"
      case "Not Valued":
        return "destructive"
      default:
        return "outline"
    }
  }

  const valuedPolicies = mockValuations.filter((v) => v.status === "Completed").length
  const unvaluedPolicies = mockValuations.filter((v) => v.status === "Not Valued").length
  const pendingValuations = mockValuations.filter((v) => v.status === "Pending").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Valuation Management</h2>
          <p className="text-muted-foreground">Manage property and asset valuations</p>
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
              Add Valuation
            </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Valuation</DialogTitle>
                <DialogDescription>Enter valuation details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy" className="text-right">
                    Policy ID
                  </Label>
                  <Input id="policy" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input id="amount" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valuator" className="text-right">
                    Valuator
                  </Label>
                  <Input id="valuator" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Valuation</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Valuations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockValuations.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valued Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{valuedPolicies}</div>
            <p className="text-xs text-muted-foreground">Completed valuations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unvalued Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unvaluedPolicies}</div>
            <p className="text-xs text-muted-foreground">Require valuation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingValuations}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Valuations</TabsTrigger>
          <TabsTrigger value="valued">Valued</TabsTrigger>
          <TabsTrigger value="unvalued">Unvalued</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Valuation Database</CardTitle>
              <CardDescription>View and manage all property valuations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search valuations..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="not valued">Not Valued</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Valuation ID</TableHead>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Valuation Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valuator</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredValuations.map((valuation) => (
                    <TableRow key={valuation.id}>
                      <TableCell className="font-medium">{valuation.id}</TableCell>
                      <TableCell>{valuation.policyId}</TableCell>
                      <TableCell>{valuation.client}</TableCell>
                      <TableCell>{valuation.product}</TableCell>
                      <TableCell>
                        {valuation.valuationAmount ? `KSh ${valuation.valuationAmount.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(valuation.status) as any}>{valuation.status}</Badge>
                      </TableCell>
                      <TableCell>{valuation.valuator || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {valuation.reportAvailable && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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

        <TabsContent value="valued">
          <Card>
            <CardHeader>
              <CardTitle>Valued Policies</CardTitle>
              <CardDescription>Policies with completed valuations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Showing {valuedPolicies} valued policies.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unvalued">
          <Card>
            <CardHeader>
              <CardTitle>Unvalued Policies</CardTitle>
              <CardDescription>Policies requiring valuation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Showing {unvaluedPolicies} unvalued policies.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
