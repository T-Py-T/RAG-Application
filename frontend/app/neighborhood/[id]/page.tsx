"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import NeighborhoodMap from "@/components/neighborhood-map"
import {
  MapPin,
  Shield,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Users,
  ArrowLeft,
  Star,
  CheckCircle,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Mock data for visualizations
const crimeData = [
  { year: "2019", violent: 2.1, property: 8.3, total: 10.4 },
  { year: "2020", violent: 1.8, property: 7.9, total: 9.7 },
  { year: "2021", violent: 1.5, property: 7.2, total: 8.7 },
  { year: "2022", violent: 1.3, property: 6.8, total: 8.1 },
  { year: "2023", violent: 1.1, property: 6.2, total: 7.3 },
  { year: "2024", violent: 0.9, property: 5.8, total: 6.7 },
]

const propertyValueData = [
  { month: "Jan 2023", value: 425000, trend: 2.1 },
  { month: "Apr 2023", value: 438000, trend: 3.1 },
  { month: "Jul 2023", value: 452000, trend: 3.2 },
  { month: "Oct 2023", value: 461000, trend: 2.0 },
  { month: "Jan 2024", value: 475000, trend: 3.0 },
  { month: "Apr 2024", value: 485000, trend: 2.1 },
  { month: "Jul 2024", value: 492000, trend: 1.4 },
  { month: "Oct 2024", value: 498000, trend: 1.2 },
]

const schoolPerformanceData = [
  { school: "Westfield Elementary", rating: 9.2, students: 485, type: "Elementary" },
  { school: "Heritage Middle School", rating: 8.8, students: 672, type: "Middle" },
  { school: "Austin Heights High", rating: 8.5, students: 1240, type: "High" },
  { school: "Riverside Elementary", rating: 8.9, students: 398, type: "Elementary" },
]

const taxTrendData = [
  { year: "2019", rate: 1.85, revenue: 12.4 },
  { year: "2020", rate: 1.92, revenue: 13.1 },
  { year: "2021", rate: 1.98, revenue: 13.8 },
  { year: "2022", rate: 2.05, revenue: 14.2 },
  { year: "2023", rate: 2.1, revenue: 14.8 },
  { year: "2024", rate: 2.15, revenue: 15.2 },
]

const crimeTypeData = [
  { name: "Theft", value: 45, color: "#ef4444" },
  { name: "Vandalism", value: 25, color: "#f97316" },
  { name: "Burglary", value: 15, color: "#eab308" },
  { name: "Assault", value: 10, color: "#84cc16" },
  { name: "Other", value: 5, color: "#6b7280" },
]

const neighborhoodComparison = [
  { metric: "Safety", westfield: 9.2, cityAvg: 7.1, nationalAvg: 6.8 },
  { metric: "Schools", westfield: 8.8, cityAvg: 7.3, nationalAvg: 6.9 },
  { metric: "Walkability", westfield: 7.8, cityAvg: 6.2, nationalAvg: 5.4 },
  { metric: "Affordability", westfield: 6.5, cityAvg: 7.8, nationalAvg: 7.2 },
  { metric: "Investment", westfield: 8.4, cityAvg: 6.9, nationalAvg: 6.1 },
]

// Mock data for demographics
const ethnicDemographics = [
  { name: "White", value: 52.3, color: "#3b82f6" },
  { name: "Hispanic/Latino", value: 28.1, color: "#10b981" },
  { name: "Asian", value: 12.4, color: "#f59e0b" },
  { name: "Black/African American", value: 4.8, color: "#ef4444" },
  { name: "Other", value: 2.4, color: "#8b5cf6" },
]

const religiousDemographics = [
  { name: "Christian", value: 45.2, color: "#3b82f6" },
  { name: "Non-Religious", value: 32.8, color: "#6b7280" },
  { name: "Catholic", value: 12.1, color: "#10b981" },
  { name: "Jewish", value: 4.3, color: "#f59e0b" },
  { name: "Muslim", value: 2.8, color: "#ef4444" },
  { name: "Other", value: 2.8, color: "#8b5cf6" },
]

const demographicTrends = [
  { year: "2019", diversity: 6.2, medianAge: 34.2, households: 2850 },
  { year: "2020", diversity: 6.4, medianAge: 34.8, households: 2920 },
  { year: "2021", diversity: 6.7, medianAge: 35.1, households: 3010 },
  { year: "2022", diversity: 6.9, medianAge: 35.4, households: 3080 },
  { year: "2023", diversity: 7.1, medianAge: 35.7, households: 3150 },
  { year: "2024", diversity: 7.3, medianAge: 36.0, households: 3220 },
]

export default function NeighborhoodDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  const neighborhoodData = {
    id: params.id,
    name: "Westfield Heights",
    coordinates: [30.3077, -97.7431] as [number, number], // Austin, TX coordinates
    safetyScore: 9.2,
    averagePrice: "$498K",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/search">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </a>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">HomeScope</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Neighborhood Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Westfield Heights</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Austin, TX 78731 • 2.3 miles from downtown
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                Very Low Crime
              </Badge>
              <Button>Save Neighborhood</Button>
              <Button variant="outline">Share</Button>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">9.2</div>
                    <div className="text-sm text-muted-foreground">Safety Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">8.8</div>
                    <div className="text-sm text-muted-foreground">School Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">$498K</div>
                    <div className="text-sm text-muted-foreground">Median Price</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">2.15%</div>
                    <div className="text-sm text-muted-foreground">Tax Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Visualization Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="crime">Crime Data</TabsTrigger>
            <TabsTrigger value="schools">Schools</TabsTrigger>
            <TabsTrigger value="market">Market Trends</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Neighborhood Radar</CardTitle>
                  <CardDescription>Compare key metrics against city and national averages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={neighborhoodComparison}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={90} domain={[0, 10]} />
                        <Radar
                          name="Westfield Heights"
                          dataKey="westfield"
                          stroke="hsl(var(--chart-1))"
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="City Average"
                          dataKey="cityAvg"
                          stroke="hsl(var(--chart-2))"
                          fill="hsl(var(--chart-2))"
                          fillOpacity={0.1}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Potential</CardTitle>
                  <CardDescription>Property value growth and market indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>5-Year Appreciation</span>
                      <span className="font-medium text-green-600">+18.2%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Market Demand</span>
                      <span className="font-medium text-green-600">High</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rental Yield</span>
                      <span className="font-medium">4.2%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Development Activity</span>
                      <span className="font-medium text-blue-600">Moderate</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Strong investment potential</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Neighborhood Map</CardTitle>
                    <CardDescription>Interactive map showing location and safety indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NeighborhoodMap neighborhood={neighborhoodData} className="h-96" />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Location Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>Austin, TX 78731</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Downtown</span>
                        <span className="text-muted-foreground">2.3 miles</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Airport</span>
                        <span className="text-muted-foreground">8.1 miles</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>University of Texas</span>
                        <span className="text-muted-foreground">3.7 miles</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nearest Hospital</span>
                        <span className="text-muted-foreground">1.2 miles</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transportation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Walk Score</span>
                      <Badge variant="secondary">78 - Very Walkable</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Transit Score</span>
                      <Badge variant="secondary">65 - Good Transit</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bike Score</span>
                      <Badge variant="secondary">72 - Very Bikeable</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Crime Data Tab */}
          <TabsContent value="crime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Safety Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100">35% Below City Average</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Crime rate significantly lower</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100">24/7 Patrol Coverage</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Enhanced police presence</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-purple-900 dark:text-purple-100">Active Community Watch</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Strong neighborhood network</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crime Trends (6-Year)</CardTitle>
                  <CardDescription>Crime rates per 1,000 residents showing consistent improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={crimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="violent"
                          stroke="#ef4444"
                          strokeWidth={3}
                          name="Violent Crime"
                          dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="property"
                          stroke="#f97316"
                          strokeWidth={3}
                          name="Property Crime"
                          dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#3b82f6"
                          strokeWidth={4}
                          name="Total Crime"
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crime Types (2024)</CardTitle>
                  <CardDescription>Breakdown of reported incidents by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={crimeTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {crimeTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schools Tab */}
          <TabsContent value="schools" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {schoolPerformanceData.map((school, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {school.type}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{school.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-medium text-sm">{school.school}</h3>
                      <p className="text-xs text-muted-foreground">{school.students} students</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>School Performance</CardTitle>
                <CardDescription>Ratings and enrollment for schools serving this neighborhood</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={schoolPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="school" angle={-45} textAnchor="end" height={100} />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="rating" fill="hsl(var(--chart-3))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Trends Tab */}
          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">+1.2%</div>
                    <div className="text-sm text-muted-foreground">YoY Growth</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-foreground mb-1">18</div>
                    <div className="text-sm text-muted-foreground">Days on Market</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">102%</div>
                    <div className="text-sm text-muted-foreground">Price to List Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-foreground mb-1">2.1</div>
                    <div className="text-sm text-muted-foreground">Months Supply</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Value Trends</CardTitle>
                  <CardDescription>Median home values over the past 2 years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={propertyValueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Median Value"]} />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Rate History</CardTitle>
                  <CardDescription>Property tax rates and municipal revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={taxTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="right" dataKey="revenue" fill="#f97316" opacity={0.3} />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="rate"
                          stroke="#3b82f6"
                          strokeWidth={4}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Demographics Tab */}
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">7.3</div>
                    <div className="text-sm text-muted-foreground">Diversity Index</div>
                    <div className="text-xs text-green-600 mt-1">+18% from 2019</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">36.0</div>
                    <div className="text-sm text-muted-foreground">Median Age</div>
                    <div className="text-xs text-blue-600 mt-1">+1.8 years since 2019</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">3,220</div>
                    <div className="text-sm text-muted-foreground">Total Households</div>
                    <div className="text-xs text-green-600 mt-1">+13% growth</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ethnic Composition</CardTitle>
                  <CardDescription>Population breakdown by ethnicity (2024 Census estimates)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ethnicDemographics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {ethnicDemographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Population"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Religious Affiliation</CardTitle>
                  <CardDescription>Religious demographics based on survey data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={religiousDemographics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {religiousDemographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Population"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Demographic Trends</CardTitle>
                <CardDescription>Population diversity and household changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={demographicTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="diversity"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="Diversity Index"
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="medianAge"
                        stroke="#10b981"
                        strokeWidth={3}
                        name="Median Age"
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="households"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        name="Total Households"
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Neighborhood Comparison</CardTitle>
                <CardDescription>How Westfield Heights compares to similar neighborhoods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {neighborhoodComparison.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>{item.metric}</span>
                        <span>{item.westfield}/10</span>
                      </div>
                      <div className="relative">
                        <Progress value={item.westfield * 10} className="h-3" />
                        <div className="absolute top-0 left-0 w-full h-3 flex items-center">
                          <div
                            className="w-1 h-5 bg-chart-2 opacity-70"
                            style={{ marginLeft: `${item.cityAvg * 10}%` }}
                          />
                          <div
                            className="w-1 h-5 bg-muted-foreground opacity-50"
                            style={{ marginLeft: `${(item.nationalAvg - item.cityAvg) * 10}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>City Avg: {item.cityAvg}</span>
                        <span>National Avg: {item.nationalAvg}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
