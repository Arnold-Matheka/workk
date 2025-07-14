"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react"

const transactionData = [
  { month: "Jan", premiums: 450000, claims: 120000, commissions: 45000 },
  { month: "Feb", premiums: 520000, claims: 80000, commissions: 52000 },
  { month: "Mar", premiums: 480000, claims: 150000, commissions: 48000 },
  { month: "Apr", premiums: 610000, claims: 100000, commissions: 61000 },
  { month: "May", premiums: 550000, claims: 180000, commissions: 55000 },
  { month: "Jun", premiums: 670000, claims: 140000, commissions: 67000 },
]

const productPerformance = [
  { product: "Motor", premiums: 1200000, policies: 450, claims: 89 },
  { product: "Health", premiums: 980000, policies: 320, claims: 45 },
  { product: "Life", premiums: 1500000, policies: 180, claims: 12 },
  { product: "Property", premiums: 750000, policies: 95, claims: 23 },
]

const claimsData = [
  { status: "Approved", count: 156, value: 2400000 },
  { status: "Pending", count: 45, value: 890000 },
  { status: "Rejected", count: 23, value: 450000 },
]

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function ReportsAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analysis</h2>
          <p className="text-muted-foreground">Comprehensive business analytics and reporting</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="monthly">
            <SelectTrigger 
              className="w-[180px]"
              style={{
                borderRadius: '9999px',
                height: 'auto',
                padding: '0.5rem 1.5rem'
              }}
            >
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly" className="cursor-pointer hover:bg-gray-100">
                Weekly
              </SelectItem>
              <SelectItem value="monthly" className="cursor-pointer hover:bg-gray-100">
                Monthly
              </SelectItem>
              <SelectItem value="quarterly" className="cursor-pointer hover:bg-gray-100">
                Quarterly
              </SelectItem>
              <SelectItem value="yearly" className="cursor-pointer hover:bg-gray-100">
                Yearly
              </SelectItem>
            </SelectContent>
          </Select>
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
            Export All Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Premiums</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 3.28M</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claims Paid</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 870K</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-600">-8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-600">+5.4%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.4%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Transaction Overview</CardTitle>
                <CardDescription>Premiums, claims, and commissions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    premiums: { label: "Premiums", color: "hsl(var(--chart-1))" },
                    claims: { label: "Claims", color: "hsl(var(--chart-2))" },
                    commissions: { label: "Commissions", color: "hsla(0, 0%, 20%, 0.6)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="premiums" fill="var(--color-premiums)" />
                      <Bar dataKey="claims" fill="var(--color-claims)" />
                      <Bar dataKey="commissions" fill="var(--color-commissions)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premium Trend</CardTitle>
                <CardDescription>Monthly premium collection trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    premiums: { label: "Premiums", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="premiums" stroke="var(--color-premiums)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Performance metrics by insurance product</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  premiums: { label: "Premiums", color: "hsl(var(--chart-1))" },
                  policies: { label: "Policies", color: "hsl(var(--chart-2))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productPerformance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="product" type="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="premiums" fill="var(--color-premiums)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims Analysis</CardTitle>
              <CardDescription>Claims distribution by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  approved: { label: "Approved", color: colors[0] },
                  pending: { label: "Pending", color: colors[1] },
                  rejected: { label: "Rejected", color: colors[2] },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={claimsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                    >
                      {claimsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Customer growth and retention metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Customer analytics dashboard coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
