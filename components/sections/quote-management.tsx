"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const mockQuotes: Quote[] = [
  {
    id: "Q001",
    client: "John Doe",
    product: "Motor Insurance",
    amount: 25000,
    status: "Pending",
    date: "2024-01-15",
    validUntil: "2024-02-15",
  },
  {
    id: "Q002",
    client: "Jane Smith",
    product: "Health Insurance",
    amount: 45000,
    status: "Approved",
    date: "2024-01-16",
    validUntil: "2024-02-16",
  },
  {
    id: "Q003",
    client: "Mike Johnson",
    product: "Life Insurance",
    amount: 120000,
    status: "Rejected",
    date: "2024-01-17",
    validUntil: "2024-02-17",
  },
  {
    id: "Q004",
    client: "Sarah Wilson",
    product: "Property Insurance",
    amount: 85000,
    status: "Converted",
    date: "2024-01-18",
    validUntil: "2024-02-18",
  },
]

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

interface Quote {
  id: string
  client: string
  product: string
  amount: number
  status: "Pending" | "Approved" | "Rejected" | "Converted"
  date: string
  validUntil: string
}

export function QuoteManagement() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)
  const [conversionSuccess, setConversionSuccess] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [addForm, setAddForm] = useState({
    client: '',
    product: '',
    amount: '',
    validUntil: '',
  });

  const handleCloseQuoteForm = () => {
    setSelectedProduct(null);
  };

  // Example product list (can be replaced with real data)
  const products = [
    {
      key: 'CIC Seniors Mediplan',
      title: 'CIC Seniors Mediplan',
      desc: 'Medical Cover built for Comfort in Old Age',
      img: '/placeholder.svg',
    },
    {
      key: 'CIC Family Medisure',
      title: 'CIC Family Medisure',
      desc: 'The cover protects insured persons against valid medical expenses. Eligible expenses are paid subject to annual benefit limits provided for.',
      img: '/placeholder.svg',
    },
    {
      key: 'Golfers / Sportsman Insurance',
      title: 'Golfers / Sportsman Insurance',
      desc: 'As a sportsperson, your career depends on your well-being. This insurance covers accidents or disabilities that could impact your career.',
      img: '/placeholder.svg',
    },
    {
      key: 'Motor Commercial Insurance',
      title: 'Motor Commercial Insurance',
      desc: 'This policy provides cover for loss or damage to the insured vehicle and legal liability to third parties for bodily injury and property damage. It also c...',
      img: '/placeholder.svg',
    },
    {
      key: 'Student/Personal Accident Cover',
      title: 'Student/Personal Accident Cover',
      desc: 'The Policy will provide monetary payments in the event of body injury sustained by the insured. It covers ...',
      img: '/placeholder.svg',
    },
    {
      key: 'Private Motor Insurance',
      title: 'Private Motor Insurance',
      desc: 'CIC Easy Bima is a monthly motor insurance cover from CIC General Insurance Company. The cover enables you to pay for your motor ve...',
      img: '/placeholder.svg',
    },
    {
      key: 'Marine Cargo Policy',
      title: 'Marine Cargo Policy',
      desc: 'An insurance cover on all risk basis (ICC-A) that covers losses or damage to goods and/or merchandise in transit from port of ...',
      img: '/placeholder.svg',
    },
  ];

  // Simulate navigation to other sections (replace with context/prop later)
  function goToPolicyManagement(newPolicyId?: string) {
    alert(`Navigate to Policy Management${newPolicyId ? ' for policy ' + newPolicyId : ''}`)
    // TODO: Integrate with main app navigation
  }

  // Simulate creating a policy from a quote
  function handleConvertToPolicy() {
    if (!selectedQuote) return
    // In a real app, send to backend or update global state
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === selectedQuote.id ? { ...q, status: "Converted" } : q
      )
    )
    setConversionSuccess(selectedQuote.id)
    setIsConvertModalOpen(false)
    // Optionally, navigate to Policy Management and pass new policy info
    goToPolicyManagement(selectedQuote.id)
  }

  const filteredQuotes = quotes.filter((quote) => {
    const parts = quote.date.split("-").map((p) => parseInt(p, 10))
    const quoteDate = new Date(parts[0], parts[1] - 1, parts[2])

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let matchesDate = true

    switch (dateRange) {
      case "today":
        matchesDate = quoteDate.getTime() === today.getTime()
        break
      case "week":
        const firstDayOfWeek = new Date(today)
        firstDayOfWeek.setDate(today.getDate() - today.getDay())
        matchesDate = quoteDate >= firstDayOfWeek
        break
      case "month":
        matchesDate =
          quoteDate.getMonth() === today.getMonth() &&
          quoteDate.getFullYear() === today.getFullYear()
        break
      case "all":
      default:
        matchesDate = true
        break
    }

    const matchesSearch =
      quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || quote.status.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const totalQuotes = quotes.length
  const pendingQuotes = quotes.filter((quote) => quote.status === "Pending").length
  const convertedQuotes = quotes.filter((quote) => quote.status === "Converted").length
  const conversionRate = totalQuotes > 0 ? Math.round((convertedQuotes / totalQuotes) * 100) : 0
  const totalValue = quotes.reduce((sum, quote) => sum + quote.amount, 0)

  const getStatusColor = (status: string): BadgeVariant => {
    switch (status) {
      case "Pending":
        return "outline"
      case "Approved":
        return "secondary"
      case "Rejected":
        return "destructive"
      case "Converted":
        return "default"
      default:
        return "outline"
    }
  }

  const generateReport = () => {
    if (filteredQuotes.length === 0) {
      alert("No data available to generate a report for the selected filters.")
      return
    }

    const headers = ["Quote ID", "Client", "Product", "Amount (KSh)", "Status", "Date", "Valid Until"]
    const csvContent = [
      headers.join(","),
      ...filteredQuotes.map(
        (q) =>
          `"${q.id}","${q.client}","${q.product}",${q.amount},"${q.status}","${q.date}","${q.validUntil}"`
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "quotes_report.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleUpdateQuote = (updatedQuote: Quote) => {
    setQuotes(quotes.map((q) => (q.id === updatedQuote.id ? updatedQuote : q)))
    setIsEditModalOpen(false)
  }


  // If Mediplan form is selected, show it as a full page overlay
  if (isAddModalOpen && selectedProduct && selectedProduct.key === 'CIC Seniors Mediplan') {
    // Use the new MediplanQuoteForm as a full page overlay
    const MediplanQuoteForm = require('./quote-forms/MediplanQuoteForm').default;
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto flex flex-col">
        <MediplanQuoteForm onClose={handleCloseQuoteForm} />
      </div>
    );
  }

  // If Family Medisure form is selected, show it as a full page overlay
  if (isAddModalOpen && selectedProduct && selectedProduct.key === 'CIC Family Medisure') {
    const FamilyMedisureQuoteForm = require('./quote-forms/FamilyMedisureQuoteForm').default;
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto flex flex-col">
        <FamilyMedisureQuoteForm onClose={handleCloseQuoteForm} />
      </div>
    );
  }

  // If Motor Commercial Insurance form is selected, show it as a full page overlay
  if (isAddModalOpen && selectedProduct && selectedProduct.key === 'Motor Commercial Insurance') {
    const MotorCommercialInsuaranceForm = require('./quote-forms/MotorCommercialInsuaranceForm').default;
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto flex flex-col">
        <MotorCommercialInsuaranceForm onClose={handleCloseQuoteForm} />
      </div>
    );
  }

  // If Private Motor Insurance form is selected, show it as a full page overlay
  if (isAddModalOpen && selectedProduct && selectedProduct.key === 'Private Motor Insurance') {
    const PrivateMotorInsuranceForm = require('./quote-forms/PrivateMotorInsurance').default;
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto flex flex-col">
        <PrivateMotorInsuranceForm onClose={handleCloseQuoteForm} />
      </div>
    );
  }

  // If Student/Personal Accident Cover form is selected, show it as a full page overlay
  if (isAddModalOpen && selectedProduct && selectedProduct.key === 'Student/Personal Accident Cover') {
    const StudentAccidentForm = require('./quote-forms/PersonalAccidentCover').default;
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto flex flex-col">
        <StudentAccidentForm onClose={handleCloseQuoteForm} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quote Management</h2>
          <p className="text-muted-foreground">View quotes by date range and generate reports</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={generateReport}
            style={{
              borderRadius: '9999px',
              padding: '0.5rem 1.5rem',
              height: 'auto'
            }}
            className="hover:opacity-90 [&>span]:flex [&>span]:items-center [&>span]:justify-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
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
                Add Quote
              </Button>
            </DialogTrigger>
            {/* Product selection dialog */}
            <DialogContent style={{ maxWidth: '90vw', width: '1100px', minHeight: '500px' }}>
              {!selectedProduct ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Select product to quote for.</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
                    {products.map((prod) => (
                      <div
                        key={prod.key}
                        className="border rounded-lg p-4 cursor-pointer hover:shadow-lg flex flex-col items-center h-full bg-white"
                        onClick={() => {
                          setSelectedProduct(prod);
                        }}
                        style={{ minHeight: 220 }}
                      >
                        <img src={prod.img} alt={prod.title} className="h-20 mb-2" />
                        <div className="font-semibold text-lg text-center">{prod.title}</div>
                        <div className="text-gray-500 text-sm text-center mt-1">{prod.desc}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : selectedProduct.key === 'CIC Seniors Mediplan' || selectedProduct.key === 'CIC Family Medisure' || selectedProduct.key === 'Motor Commercial Insurance' ? null : (
                <>
                  <DialogHeader>
                    <DialogTitle>Add New Quote</DialogTitle>
                    <DialogDescription>Enter the details for the new quote</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="client" className="text-right">Client *</Label>
                      <Input id="client" className="col-span-3" value={addForm.client} onChange={e => setAddForm(f => ({ ...f, client: e.target.value }))} required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product" className="text-right">Product *</Label>
                      <Input id="product" className="col-span-3" value={selectedProduct.title} disabled />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">Amount (KSh) *</Label>
                      <Input id="amount" type="number" className="col-span-3" value={addForm.amount} onChange={e => setAddForm(f => ({ ...f, amount: e.target.value }))} required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="validUntil" className="text-right">Valid Until *</Label>
                      <Input id="validUntil" type="date" className="col-span-3" value={addForm.validUntil} onChange={e => setAddForm(f => ({ ...f, validUntil: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                      &larr; Back
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => {
                        setIsAddModalOpen(false);
                        setAddForm({ client: '', product: '', amount: '', validUntil: '' });
                        setSelectedProduct(null);
                      }}>Cancel</Button>
                      <Button onClick={() => {
                        if (!addForm.client || !selectedProduct || !addForm.amount || !addForm.validUntil) return;
                        // Generate a new quote ID
                        const newId = `Q${(quotes.length + 1).toString().padStart(3, '0')}`;
                        const today = new Date();
                        const dateStr = today.toISOString().split('T')[0];
                        setQuotes(prev => [
                          {
                            id: newId,
                            client: addForm.client,
                            product: selectedProduct.title,
                            amount: Number(addForm.amount),
                            status: 'Pending',
                            date: dateStr,
                            validUntil: addForm.validUntil,
                          },
                          ...prev
                        ]);
                        setIsAddModalOpen(false);
                        setAddForm({ client: '', product: '', amount: '', validUntil: '' });
                        setSelectedProduct(null);
                      }}>
                        Save Quote
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingQuotes}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertedQuotes}</div>
            <p className="text-xs text-muted-foreground">{conversionRate}% conversion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quote Database</CardTitle>
          <CardDescription>View and manage all insurance quotes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quotes..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount (KSh)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>
                    <button
                      className="text-blue-600 underline hover:text-blue-800"
                      onClick={() => {
                        // TODO: Integrate with navigation to Users/Clients section
                        alert(`Navigate to user profile for: ${quote.client}`)
                      }}
                    >
                      {quote.client}
                    </button>
                  </TableCell>
                  <TableCell>{quote.product}</TableCell>
                  <TableCell>{quote.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(quote.status)}>{quote.status}</Badge>
                  </TableCell>
                  <TableCell>{quote.date}</TableCell>
                  <TableCell>{quote.validUntil}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuote(quote)
                          setIsViewModalOpen(true)
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuote(quote)
                          setIsEditModalOpen(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={quote.status === "Converted"}
                        onClick={() => {
                          setSelectedQuote(quote)
                          setIsConvertModalOpen(true)
                        }}
                      >
                        Convert to Policy
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isConvertModalOpen} onOpenChange={setIsConvertModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert Quote to Policy</DialogTitle>
            <DialogDescription>
              Are you sure you want to convert this quote into a policy? This will mark the quote as "Converted" and (in a real app) create a new policy record.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <div><b>Quote ID:</b> {selectedQuote?.id}</div>
            <div><b>Client:</b> {selectedQuote?.client}</div>
            <div><b>Product:</b> {selectedQuote?.product}</div>
            <div><b>Amount:</b> KSh {selectedQuote?.amount?.toLocaleString()}</div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleConvertToPolicy} disabled={!selectedQuote}>Convert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {conversionSuccess && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          Quote <b>{conversionSuccess}</b> converted! 
          <button
            className="ml-2 underline text-blue-700 hover:text-blue-900"
            onClick={() => goToPolicyManagement(conversionSuccess ?? undefined)}
          >
            View Policy
          </button>
        </div>
      )}
    </div>
  );
}

