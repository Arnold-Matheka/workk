"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Mail, Eye, Upload, FileText, ImageIcon, File } from "lucide-react"

const mockDocuments = [
  {
    id: "DOC001",
    name: "Motor Insurance Certificate",
    type: "Certificate",
    policyId: "POL001",
    client: "John Doe",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    format: "PDF",
    status: "Active",
  },
  {
    id: "DOC002",
    name: "Health Insurance Schedule",
    type: "Schedule",
    policyId: "POL002",
    client: "Jane Smith",
    uploadDate: "2024-01-16",
    size: "1.8 MB",
    format: "PDF",
    status: "Active",
  },
  {
    id: "DOC003",
    name: "Valuation Report",
    type: "Valuation",
    policyId: "POL001",
    client: "John Doe",
    uploadDate: "2024-01-17",
    size: "3.2 MB",
    format: "PDF",
    status: "Active",
  },
]

const sentDocuments = [
  {
    id: "SENT001",
    document: "Confirmation Letter",
    client: "John Doe",
    email: "john@example.com",
    sentDate: "2024-01-15",
    status: "Delivered",
  },
  {
    id: "SENT002",
    document: "Policy Schedule",
    client: "Jane Smith",
    email: "jane@example.com",
    sentDate: "2024-01-16",
    status: "Opened",
  },
]

export function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || doc.type.toLowerCase() === typeFilter
    return matchesSearch && matchesType
  })

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-4 w-4 text-blue-500" />
      default:
        return <File className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Document Management</h2>
          <p className="text-muted-foreground">Manage policy documents and customer communications</p>
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
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">All policy documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">Insurance certificates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">789</div>
            <p className="text-xs text-muted-foreground">Policy schedules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">Of 10 GB available</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attached" className="space-y-4">
        <TabsList>
          <TabsTrigger value="attached">Attached Documents</TabsTrigger>
          <TabsTrigger value="sent">Sent Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="attached" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Policy Documents</CardTitle>
              <CardDescription>Documents attached to policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="valuation">Valuation</SelectItem>
                    <SelectItem value="claim">Claim</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFileIcon(doc.format)}
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell>{doc.policyId}</TableCell>
                      <TableCell>{doc.client}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
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

        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent Documents</CardTitle>
              <CardDescription>Documents sent to customers via email</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.document}</TableCell>
                      <TableCell>{doc.client}</TableCell>
                      <TableCell>{doc.email}</TableCell>
                      <TableCell>{doc.sentDate}</TableCell>
                      <TableCell>
                        <Badge variant={doc.status === "Delivered" ? "default" : "secondary"}>{doc.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Resend
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
