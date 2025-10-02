"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Shield,
  GraduationCap,
  TrendingUp,
  Search,
  Users,
  BarChart3,
  Home,
  DollarSign,
  Filter,
  X,
} from "lucide-react"

export default function HomePage() {
  const [filters, setFilters] = useState({
    minSafety: 0,
    maxSafety: 10,
    minSchools: 0,
    maxSchools: 10,
    minPrice: 0,
    maxPrice: 1000000,
    maxTaxRate: 5,
    minDiversity: 0,
    maxDiversity: 10,
  })

  const [showFilters, setShowFilters] = useState(false)

  const featuredNeighborhoods = [
    {
      id: "downtown-austin",
      name: "Downtown Austin",
      avgPrice: 650000,
      safetyScore: 7.2,
      taxRate: 2.1,
      schoolRating: 8.5,
      priceChange: 5.2,
      image: "/modern-downtown-austin-homes.png",
      diversityIndex: 8.1,
      topEthnicity: "White",
      topEthnicityPercent: 38.5,
      topReligion: "Non-Religious",
      topReligionPercent: 48.3,
      ethnicComposition: {
        White: 38.5,
        "Hispanic/Latino": 35.2,
        Asian: 15.8,
        "Black/African American": 7.1,
        Other: 3.4,
      },
      religiousComposition: {
        "Non-Religious": 48.3,
        Christian: 28.7,
        Catholic: 10.2,
        Jewish: 6.8,
        Muslim: 3.5,
        Other: 2.5,
      },
    },
    {
      id: "south-austin",
      name: "South Austin",
      avgPrice: 485000,
      safetyScore: 8.1,
      taxRate: 1.9,
      schoolRating: 7.8,
      priceChange: 3.8,
      image: "/south-austin-residential-homes.png",
      diversityIndex: 7.3,
      topEthnicity: "White",
      topEthnicityPercent: 52.3,
      topReligion: "Christian",
      topReligionPercent: 45.2,
      ethnicComposition: {
        White: 52.3,
        "Hispanic/Latino": 28.1,
        Asian: 12.4,
        "Black/African American": 4.8,
        Other: 2.4,
      },
      religiousComposition: {
        Christian: 45.2,
        "Non-Religious": 32.8,
        Catholic: 12.1,
        Jewish: 4.3,
        Muslim: 2.8,
        Other: 2.8,
      },
    },
    {
      id: "cedar-park",
      name: "Cedar Park",
      avgPrice: 425000,
      safetyScore: 9.1,
      taxRate: 2.3,
      schoolRating: 9.2,
      priceChange: 2.1,
      image: "/cedar-park-suburban-homes.png",
      diversityIndex: 6.2,
      topEthnicity: "White",
      topEthnicityPercent: 68.4,
      topReligion: "Christian",
      topReligionPercent: 52.1,
      ethnicComposition: {
        White: 68.4,
        "Hispanic/Latino": 18.2,
        Asian: 8.1,
        "Black/African American": 3.8,
        Other: 1.5,
      },
      religiousComposition: {
        Christian: 52.1,
        "Non-Religious": 28.3,
        Catholic: 11.4,
        Jewish: 4.2,
        Muslim: 2.1,
        Other: 1.9,
      },
    },
    {
      id: "east-austin",
      name: "East Austin",
      avgPrice: 520000,
      safetyScore: 6.8,
      taxRate: 2.0,
      schoolRating: 7.2,
      priceChange: 8.5,
      image: "/east-austin-trendy-homes.png",
      diversityIndex: 6.9,
      topEthnicity: "Hispanic/Latino",
      topEthnicityPercent: 42.1,
      topReligion: "Catholic",
      topReligionPercent: 38.2,
      ethnicComposition: {
        "Hispanic/Latino": 42.1,
        White: 35.8,
        Asian: 10.2,
        "Black/African American": 8.4,
        Other: 3.5,
      },
      religiousComposition: {
        Catholic: 38.2,
        Christian: 25.4,
        "Non-Religious": 24.1,
        Muslim: 6.8,
        Jewish: 3.2,
        Other: 2.3,
      },
    },
    {
      id: "westlake",
      name: "Westlake",
      avgPrice: 1200000,
      safetyScore: 9.5,
      taxRate: 2.4,
      schoolRating: 9.8,
      priceChange: 1.2,
      image: "/luxury-homes-in-westlake-austin.png",
      diversityIndex: 4.2,
      topEthnicity: "White",
      topEthnicityPercent: 78.2,
      topReligion: "Christian",
      topReligionPercent: 48.3,
      ethnicComposition: {
        White: 78.2,
        Asian: 12.1,
        "Hispanic/Latino": 6.8,
        "Black/African American": 1.9,
        Other: 1.0,
      },
      religiousComposition: {
        Christian: 48.3,
        "Non-Religious": 35.2,
        Jewish: 8.4,
        Catholic: 5.1,
        Muslim: 1.8,
        Other: 1.2,
      },
    },
    {
      id: "mueller",
      name: "Mueller",
      avgPrice: 575000,
      safetyScore: 8.3,
      taxRate: 2.0,
      schoolRating: 8.1,
      priceChange: 4.1,
      image: "/modern-planned-community-mueller-austin.png",
      diversityIndex: 7.8,
      topEthnicity: "White",
      topEthnicityPercent: 45.2,
      topReligion: "Non-Religious",
      topReligionPercent: 42.1,
      ethnicComposition: {
        White: 45.2,
        "Hispanic/Latino": 28.4,
        Asian: 16.8,
        "Black/African American": 6.1,
        Other: 3.5,
      },
      religiousComposition: {
        "Non-Religious": 42.1,
        Christian: 31.2,
        Catholic: 12.8,
        Jewish: 7.2,
        Muslim: 4.1,
        Other: 2.6,
      },
    },
    {
      id: "travis-heights",
      name: "Travis Heights",
      avgPrice: 695000,
      safetyScore: 7.9,
      taxRate: 2.1,
      schoolRating: 7.6,
      priceChange: 3.2,
      image: "/historic-travis-heights-austin-homes.png",
      diversityIndex: 6.8,
      topEthnicity: "White",
      topEthnicityPercent: 58.3,
      topReligion: "Non-Religious",
      topReligionPercent: 38.4,
      ethnicComposition: {
        White: 58.3,
        "Hispanic/Latino": 24.1,
        Asian: 9.2,
        "Black/African American": 5.8,
        Other: 2.6,
      },
      religiousComposition: {
        "Non-Religious": 38.4,
        Christian: 32.1,
        Catholic: 15.2,
        Jewish: 8.1,
        Muslim: 3.8,
        Other: 2.4,
      },
    },
    {
      id: "round-rock",
      name: "Round Rock",
      avgPrice: 395000,
      safetyScore: 8.7,
      taxRate: 2.2,
      schoolRating: 8.9,
      priceChange: 2.8,
      image: "/suburban-round-rock-austin-family-homes.png",
      diversityIndex: 6.5,
      topEthnicity: "White",
      topEthnicityPercent: 55.1,
      topReligion: "Christian",
      topReligionPercent: 49.2,
      ethnicComposition: {
        White: 55.1,
        "Hispanic/Latino": 25.8,
        Asian: 12.4,
        "Black/African American": 4.2,
        Other: 2.5,
      },
      religiousComposition: {
        Christian: 49.2,
        "Non-Religious": 28.1,
        Catholic: 13.8,
        Jewish: 4.1,
        Muslim: 2.9,
        Other: 1.9,
      },
    },
  ]

  const filteredNeighborhoods = featuredNeighborhoods.filter((neighborhood) => {
    return (
      neighborhood.safetyScore >= filters.minSafety &&
      neighborhood.safetyScore <= filters.maxSafety &&
      neighborhood.schoolRating >= filters.minSchools &&
      neighborhood.schoolRating <= filters.maxSchools &&
      neighborhood.avgPrice >= filters.minPrice &&
      neighborhood.avgPrice <= filters.maxPrice &&
      neighborhood.taxRate <= filters.maxTaxRate &&
      neighborhood.diversityIndex >= filters.minDiversity &&
      neighborhood.diversityIndex <= filters.maxDiversity
    )
  })

  const resetFilters = () => {
    setFilters({
      minSafety: 0,
      maxSafety: 10,
      minSchools: 0,
      maxSchools: 10,
      minPrice: 0,
      maxPrice: 1000000,
      maxTaxRate: 5,
      minDiversity: 0,
      maxDiversity: 10,
    })
  }

  const getSafetyColor = (score: number) => {
    if (score >= 8.5) return "bg-green-500"
    if (score >= 7.0) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getTaxColor = (rate: number) => {
    if (rate <= 1.8) return "bg-green-500"
    if (rate <= 2.2) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getPriceChangeColor = (change: number) => {
    if (change <= 3.0) return "text-green-600"
    if (change <= 6.0) return "text-yellow-600"
    return "text-red-600"
  }

  const getDiversityColor = (index: number) => {
    if (index >= 7.5) return "bg-blue-500"
    if (index >= 6.0) return "bg-purple-500"
    return "bg-gray-500"
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">HomeScope</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="/auth/login">Sign In</a>
            </Button>
            <Button size="sm" asChild>
              <a href="/auth/signup">Get Started</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-6">
            Trusted by 10,000+ Home Buyers
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Home buying made
            <span className="text-primary"> easier</span> with neighborhood insights
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            HomeScope aggregates crime data, school ratings, property valuations, and tax trends to help you evaluate
            neighborhoods and find the perfect home with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/search">
                <Search className="w-5 h-5 mr-2" />
                Start Exploring Neighborhoods
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Neighborhoods Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Data Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Neighborhoods */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Featured: Austin, TX Metro Area
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore Austin Neighborhoods</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See real data and insights for popular Austin neighborhoods with our full analysis
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Filter Neighborhoods</h3>
                <Badge variant="outline" className="text-xs">
                  {filteredNeighborhoods.length} of {featuredNeighborhoods.length} shown
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                {(filters.minSafety > 0 ||
                  filters.maxSafety < 10 ||
                  filters.minSchools > 0 ||
                  filters.maxSchools < 10 ||
                  filters.minPrice > 0 ||
                  filters.maxPrice < 1000000 ||
                  filters.maxTaxRate < 5 ||
                  filters.minDiversity > 0 ||
                  filters.maxDiversity < 10) && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="flex items-center gap-1">
                    <X className="w-3 h-3" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {showFilters && (
              <Card className="p-6 mb-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Safety Score Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Safety Score Range
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={filters.minSafety}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, minSafety: Number.parseFloat(e.target.value) || 0 }))
                          }
                          className="w-20 h-8 text-xs"
                          placeholder="Min"
                        />
                        <span className="text-xs text-muted-foreground">to</span>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={filters.maxSafety}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, maxSafety: Number.parseFloat(e.target.value) || 10 }))
                          }
                          className="w-20 h-8 text-xs"
                          placeholder="Max"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">Example: Safety ≥ 7 for good neighborhoods</div>
                    </div>
                  </div>

                  {/* School Rating Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      School Rating Range
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={filters.minSchools}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, minSchools: Number.parseFloat(e.target.value) || 0 }))
                          }
                          className="w-20 h-8 text-xs"
                          placeholder="Min"
                        />
                        <span className="text-xs text-muted-foreground">to</span>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={filters.maxSchools}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, maxSchools: Number.parseFloat(e.target.value) || 10 }))
                          }
                          className="w-20 h-8 text-xs"
                          placeholder="Max"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">Example: Schools ≥ 9 for top-rated districts</div>
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price Range
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          step="10000"
                          value={filters.minPrice}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, minPrice: Number.parseInt(e.target.value) || 0 }))
                          }
                          className="w-24 h-8 text-xs"
                          placeholder="Min"
                        />
                        <span className="text-xs text-muted-foreground">to</span>
                        <Input
                          type="number"
                          min="0"
                          step="10000"
                          value={filters.maxPrice}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, maxPrice: Number.parseInt(e.target.value) || 1000000 }))
                          }
                          className="w-24 h-8 text-xs"
                          placeholder="Max"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">Example: Under $500k for affordability</div>
                    </div>
                  </div>

                  {/* Tax Rate Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Max Tax Rate
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={filters.maxTaxRate}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, maxTaxRate: Number.parseFloat(e.target.value) || 5 }))
                          }
                          className="w-20 h-8 text-xs"
                          placeholder="Max %"
                        />
                        <span className="text-xs text-muted-foreground">%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Example: Tax ≤ 2% for lower costs</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Diversity Index Range
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={filters.minDiversity}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, minDiversity: Number.parseFloat(e.target.value) || 0 }))
                          }
                          className="w-20 h-8 text-xs"
                          placeholder="Min"
                        />
                        <span className="text-xs text-muted-foreground">to</span>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={filters.maxDiversity}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, maxDiversity: Number.parseFloat(e.target.value) || 10 }))
                          }
                          className="w-20 h-8 text-xs"
                          placeholder="Max"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Example: Diversity ≥ 7 for multicultural areas
                      </div>
                    </div>
                  </div>

                  {/* Quick Filter Presets */}
                  <div className="space-y-3 lg:col-span-3">
                    <Label className="text-sm font-medium">Quick Filters</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters((prev) => ({ ...prev, minSafety: 8, minSchools: 8 }))}
                        className="text-xs h-7"
                      >
                        Family Friendly (Safety ≥8, Schools ≥8)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters((prev) => ({ ...prev, maxPrice: 500000, maxTaxRate: 2 }))}
                        className="text-xs h-7"
                      >
                        Budget Conscious (&lt;$500k, Tax ≤2%)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters((prev) => ({ ...prev, minSafety: 9, minSchools: 9 }))}
                        className="text-xs h-7"
                      >
                        Premium Areas (Safety ≥9, Schools ≥9)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters((prev) => ({ ...prev, minDiversity: 7.5 }))}
                        className="text-xs h-7"
                      >
                        Diverse Communities (Diversity ≥7.5)
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {filteredNeighborhoods.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredNeighborhoods.map((neighborhood, index) => (
                <Card
                  key={index}
                  className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={neighborhood.image || "/placeholder.svg"}
                      alt={`${neighborhood.name} homes`}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <Home className="w-4 h-4" />
                        {formatPrice(neighborhood.avgPrice)}
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {neighborhood.name}
                      <div className={`text-sm font-medium ${getPriceChangeColor(neighborhood.priceChange)}`}>
                        +{neighborhood.priceChange}%
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Safety Indicator */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Safety</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getSafetyColor(neighborhood.safetyScore)}`}></div>
                          <span className="text-sm font-medium">{neighborhood.safetyScore}/10</span>
                        </div>
                      </div>

                      {/* Tax Rate Indicator */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Tax Rate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getTaxColor(neighborhood.taxRate)}`}></div>
                          <span className="text-sm font-medium">{neighborhood.taxRate}%</span>
                        </div>
                      </div>

                      {/* School Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Schools</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < Math.floor(neighborhood.schoolRating / 2) ? "bg-primary" : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{neighborhood.schoolRating}/10</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Diversity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getDiversityColor(neighborhood.diversityIndex)}`}
                          ></div>
                          <span className="text-sm font-medium">{neighborhood.diversityIndex}/10</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>Top Ethnicity:</span>
                            <span className="font-medium">
                              {neighborhood.topEthnicity} ({neighborhood.topEthnicityPercent}%)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Top Religion:</span>
                            <span className="font-medium">
                              {neighborhood.topReligion} ({neighborhood.topReligionPercent}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" asChild>
                      <a href={`/neighborhood/${neighborhood.id}`}>View Details</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No neighborhoods match your criteria</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <a href="/search">
                <Search className="w-5 h-5 mr-2" />
                Explore All Austin Neighborhoods
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Visual Legend for Indicators */}
      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">Understanding Our Indicators</h3>
            <p className="text-muted-foreground">Color-coded system to help you quickly assess neighborhoods</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Safety Score</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>8.5+ Excellent</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>7.0+ Good</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>&lt;7.0 Fair</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Tax Rate</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>≤1.8% Low</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>1.8-2.2% Moderate</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>&gt;2.2% High</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Price Growth</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-600 font-medium">≤3%</span>
                  <span>Stable</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-yellow-600 font-medium">3-6%</span>
                  <span>Growing</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-red-600 font-medium">&gt;6%</span>
                  <span>Hot Market</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Diversity Index</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>7.5+ Very Diverse</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>6.0+ Diverse</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span>&lt;6.0 Less Diverse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Evaluate Neighborhoods
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get full insights from multiple data sources in one unified platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Crime Analytics</CardTitle>
                <CardDescription>
                  FBI crime statistics with neighborhood-level comparisons and safety scores
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">School Ratings</CardTitle>
                <CardDescription>
                  full school district ratings and performance metrics from trusted sources
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Property Valuations</CardTitle>
                <CardDescription>
                  Aggregated home valuations from Zillow, Realtor.com and market trend analysis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Tax Insights</CardTitle>
                <CardDescription>
                  Property tax trends, municipal debt analysis, and affordability metrics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* User Personas */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Built for Smart Home Buyers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're buying your first home or expanding your investment portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">First-Time Homebuyers</CardTitle>
                    <CardDescription>Ages 25-35, Young Professionals</CardDescription>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Navigate the complex home buying process with confidence. Get full neighborhood insights to
                  find safe, affordable areas that match your lifestyle and budget.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Limited neighborhood knowledge
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Fear of hidden costs and risks
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Need for long-term expense planning
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Real Estate Investors</CardTitle>
                    <CardDescription>Ages 35-55, Seasoned Professionals</CardDescription>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Maximize your investment returns with data-driven neighborhood analysis. Compare markets efficiently
                  and identify high-ROI opportunities while minimizing risk.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Manual data aggregation challenges
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Risk of poor ROI investments
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Need for market comparison tools
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Neighborhood?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of smart home buyers who trust HomeScope for their real estate decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Search className="w-5 h-5 mr-2" />
              Start Your Search
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">HomeScope</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 HomeScope. All rights reserved. Empowering informed real estate decisions.
          </div>
        </div>
      </footer>
    </div>
  )
}
