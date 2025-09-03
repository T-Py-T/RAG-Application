"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AISearch } from "@/components/ai-search"
import SearchMap from "@/components/search-map"
import {
  MapPin,
  Shield,
  GraduationCap,
  TrendingUp,
  Search,
  Filter,
  DollarSign,
  Users,
  ChevronDown,
  Map,
  Grid3X3,
} from "lucide-react"

interface SearchFilters {
  location: string
  maxPrice: number[]
  minSafetyScore: number[]
  minSchoolRating: number[]
  propertyTypes: string[]
  priorities: string[]
  ethnicPreferences: string[]
  religiousPreferences: string[]
  diversityIndex: number[]
}

interface NeighborhoodResult {
  id: string
  name: string
  city: string
  state: string
  safetyScore: number
  schoolRating: number
  medianPrice: number
  taxRate: number
  crimeRate: string
  walkScore: number
  highlights: string[]
  ethnicComposition: { [key: string]: number }
  religiousComposition: { [key: string]: number }
  diversityIndex: number
  image?: string
}

const mockResults: NeighborhoodResult[] = [
  {
    id: "downtown-austin",
    name: "Downtown Austin",
    city: "Austin",
    state: "TX",
    safetyScore: 7.2,
    schoolRating: 8.5,
    medianPrice: 650000,
    taxRate: 2.1,
    crimeRate: "Low",
    walkScore: 95,
    highlights: ["Urban lifestyle", "Great walkability", "Entertainment"],
    image: "/modern-downtown-austin-homes.png",
    ethnicComposition: { White: 38.5, "Hispanic/Latino": 35.2, Asian: 15.8, "Black/African American": 7.1, Other: 3.4 },
    religiousComposition: {
      "Non-Religious": 48.3,
      Christian: 28.7,
      Catholic: 10.2,
      Jewish: 6.8,
      Muslim: 3.5,
      Other: 2.5,
    },
    diversityIndex: 8.1,
  },
  {
    id: "south-austin",
    name: "South Austin",
    city: "Austin",
    state: "TX",
    safetyScore: 8.1,
    schoolRating: 7.8,
    medianPrice: 485000,
    taxRate: 1.9,
    crimeRate: "Low",
    walkScore: 78,
    highlights: ["Family-friendly", "Good schools", "Affordable"],
    image: "/south-austin-residential-homes.png",
    ethnicComposition: { White: 52.3, "Hispanic/Latino": 28.1, Asian: 12.4, "Black/African American": 4.8, Other: 2.4 },
    religiousComposition: {
      Christian: 45.2,
      "Non-Religious": 32.8,
      Catholic: 12.1,
      Jewish: 4.3,
      Muslim: 2.8,
      Other: 2.8,
    },
    diversityIndex: 7.3,
  },
  {
    id: "cedar-park",
    name: "Cedar Park",
    city: "Austin",
    state: "TX",
    safetyScore: 9.1,
    schoolRating: 9.2,
    medianPrice: 425000,
    taxRate: 2.3,
    crimeRate: "Very Low",
    walkScore: 65,
    highlights: ["Top-rated schools", "Very safe", "Family-oriented"],
    image: "/cedar-park-suburban-homes.png",
    ethnicComposition: { White: 68.4, "Hispanic/Latino": 18.2, Asian: 8.1, "Black/African American": 3.8, Other: 1.5 },
    religiousComposition: {
      Christian: 52.1,
      "Non-Religious": 28.3,
      Catholic: 11.4,
      Jewish: 4.2,
      Muslim: 2.1,
      Other: 1.9,
    },
    diversityIndex: 6.2,
  },
  {
    id: "east-austin",
    name: "East Austin",
    city: "Austin",
    state: "TX",
    safetyScore: 6.8,
    schoolRating: 7.2,
    medianPrice: 520000,
    taxRate: 2.0,
    crimeRate: "Moderate",
    walkScore: 82,
    highlights: ["Trendy area", "Great food scene", "Investment potential"],
    image: "/east-austin-trendy-homes.png",
    ethnicComposition: { "Hispanic/Latino": 42.1, White: 35.8, Asian: 10.2, "Black/African American": 8.4, Other: 3.5 },
    religiousComposition: {
      Catholic: 38.2,
      Christian: 25.4,
      "Non-Religious": 24.1,
      Muslim: 6.8,
      Jewish: 3.2,
      Other: 2.3,
    },
    diversityIndex: 6.9,
  },
  {
    id: "westlake",
    name: "Westlake",
    city: "Austin",
    state: "TX",
    safetyScore: 9.5,
    schoolRating: 9.8,
    medianPrice: 1200000,
    taxRate: 2.4,
    crimeRate: "Very Low",
    walkScore: 45,
    highlights: ["Luxury homes", "Excellent schools", "Low crime"],
    image: "/luxury-homes-in-westlake-austin.png",
    ethnicComposition: { White: 78.2, Asian: 12.1, "Hispanic/Latino": 6.8, "Black/African American": 1.9, Other: 1.0 },
    religiousComposition: {
      Christian: 48.3,
      "Non-Religious": 35.2,
      Jewish: 8.4,
      Catholic: 5.1,
      Muslim: 1.8,
      Other: 1.2,
    },
    diversityIndex: 4.2,
  },
  {
    id: "mueller",
    name: "Mueller",
    city: "Austin",
    state: "TX",
    safetyScore: 8.3,
    schoolRating: 8.1,
    medianPrice: 575000,
    taxRate: 2.0,
    crimeRate: "Low",
    walkScore: 88,
    highlights: ["Planned community", "Walkable", "Modern amenities"],
    image: "/modern-planned-community-mueller-austin.png",
    ethnicComposition: { White: 45.2, "Hispanic/Latino": 28.4, Asian: 16.8, "Black/African American": 6.1, Other: 3.5 },
    religiousComposition: {
      "Non-Religious": 42.1,
      Christian: 31.2,
      Catholic: 12.8,
      Jewish: 7.2,
      Muslim: 4.1,
      Other: 2.6,
    },
    diversityIndex: 7.8,
  },
  {
    id: "travis-heights",
    name: "Travis Heights",
    city: "Austin",
    state: "TX",
    safetyScore: 7.9,
    schoolRating: 7.6,
    medianPrice: 695000,
    taxRate: 2.1,
    crimeRate: "Low",
    walkScore: 72,
    highlights: ["Historic charm", "Close to downtown", "Tree-lined streets"],
    image: "/historic-travis-heights-austin-homes.png",
    ethnicComposition: { White: 58.3, "Hispanic/Latino": 24.1, Asian: 9.2, "Black/African American": 5.8, Other: 2.6 },
    religiousComposition: {
      "Non-Religious": 38.4,
      Christian: 32.1,
      Catholic: 15.2,
      Jewish: 8.1,
      Muslim: 3.8,
      Other: 2.4,
    },
    diversityIndex: 6.8,
  },
  {
    id: "round-rock",
    name: "Round Rock",
    city: "Austin",
    state: "TX",
    safetyScore: 8.7,
    schoolRating: 8.9,
    medianPrice: 395000,
    taxRate: 2.2,
    crimeRate: "Very Low",
    walkScore: 58,
    highlights: ["Affordable", "Great schools", "Family-friendly"],
    image: "/suburban-round-rock-austin-family-homes.png",
    ethnicComposition: { White: 55.1, "Hispanic/Latino": 25.8, Asian: 12.4, "Black/African American": 4.2, Other: 2.5 },
    religiousComposition: {
      Christian: 49.2,
      "Non-Religious": 28.1,
      Catholic: 13.8,
      Jewish: 4.1,
      Muslim: 2.9,
      Other: 1.9,
    },
    diversityIndex: 6.5,
  },
]

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    maxPrice: [800000],
    minSafetyScore: [7],
    minSchoolRating: [6],
    propertyTypes: [],
    priorities: [],
    ethnicPreferences: [],
    religiousPreferences: [],
    diversityIndex: [5],
  })
  const [showFilters, setShowFilters] = useState(false)
  const [results, setResults] = useState<NeighborhoodResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [aiResults, setAIResults] = useState<any[]>([])
  const [showAIInterpretation, setShowAIInterpretation] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults)
      setIsSearching(false)
    }, 1500)
  }

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const togglePriority = (priority: string) => {
    setFilters((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter((p) => p !== priority)
        : [...prev.priorities, priority],
    }))
  }

  const toggleEthnicPreference = (ethnicity: string) => {
    setFilters((prev) => ({
      ...prev,
      ethnicPreferences: prev.ethnicPreferences.includes(ethnicity)
        ? prev.ethnicPreferences.filter((e) => e !== ethnicity)
        : [...prev.ethnicPreferences, ethnicity],
    }))
  }

  const toggleReligiousPreference = (religion: string) => {
    setFilters((prev) => ({
      ...prev,
      religiousPreferences: prev.religiousPreferences.includes(religion)
        ? prev.religiousPreferences.filter((r) => r !== religion)
        : [...prev.religiousPreferences, religion],
    }))
  }

  const handleAIResults = (results: any[], interpretation: string) => {
    setAIResults(results)
    setResults(
      results.map((r) => ({
        id: r.id,
        name: r.name,
        city: r.city,
        state: r.state,
        safetyScore: r.crime_score / 10,
        schoolRating: r.school_rating,
        medianPrice: r.median_home_price,
        taxRate: r.property_tax_rate * 100,
        crimeRate: r.crime_score >= 85 ? "Very Low" : r.crime_score >= 70 ? "Low" : "Moderate",
        walkScore: r.walkability_score,
        highlights: r.highlights || [],
        ethnicComposition: r.ethnic_composition || {},
        religiousComposition: r.religious_composition || {},
        diversityIndex: r.diversity_index || 5,
        image: r.image,
      })),
    )
    setShowAIInterpretation(interpretation)
  }

  const handleAILoading = (loading: boolean) => {
    setIsSearching(loading)
  }

  const handleNeighborhoodSelect = (neighborhood: NeighborhoodResult) => {
    window.location.href = `/neighborhood/${neighborhood.id}`
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
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="/search" className="text-foreground font-medium">
              Search
            </a>
            <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Neighborhood</h1>
          <p className="text-muted-foreground">Search and compare neighborhoods based on your priorities</p>
        </div>

        {/* AI Search Component */}
        <AISearch onResults={handleAIResults} onLoading={handleAILoading} />

        {/* Traditional Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="location" className="text-sm font-medium mb-2 block">
                  Location (Traditional Search)
                </Label>
                <Input
                  id="location"
                  placeholder="Enter city, neighborhood, or ZIP code"
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>
                <Button onClick={handleSearch} disabled={isSearching} className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Search Filters</CardTitle>
              <CardDescription>Customize your search based on your priorities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Max Price: ${filters.maxPrice[0].toLocaleString()}
                  </Label>
                  <Slider
                    value={filters.maxPrice}
                    onValueChange={(value) => updateFilter("maxPrice", value)}
                    max={2000000}
                    min={100000}
                    step={25000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$100K</span>
                    <span>$2M+</span>
                  </div>
                </div>

                {/* Safety Score */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Min Safety Score: {filters.minSafetyScore[0]}/10
                  </Label>
                  <Slider
                    value={filters.minSafetyScore}
                    onValueChange={(value) => updateFilter("minSafetyScore", value)}
                    max={10}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                {/* School Rating */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Min School Rating: {filters.minSchoolRating[0]}/10
                  </Label>
                  <Slider
                    value={filters.minSchoolRating}
                    onValueChange={(value) => updateFilter("minSchoolRating", value)}
                    max={10}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              {/* Diversity Index */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Min Diversity Index: {filters.diversityIndex[0]}/10
                </Label>
                <Slider
                  value={filters.diversityIndex}
                  onValueChange={(value) => updateFilter("diversityIndex", value)}
                  max={10}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 (Less Diverse)</span>
                  <span>10 (Very Diverse)</span>
                </div>
              </div>

              {/* Ethnic Preferences */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Ethnic Composition Preferences</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["White", "Hispanic/Latino", "Asian", "Black/African American", "Native American", "Mixed Race"].map(
                    (ethnicity) => (
                      <div key={ethnicity} className="flex items-center space-x-2">
                        <Checkbox
                          id={ethnicity}
                          checked={filters.ethnicPreferences.includes(ethnicity)}
                          onCheckedChange={() => toggleEthnicPreference(ethnicity)}
                        />
                        <Label htmlFor={ethnicity} className="text-sm cursor-pointer">
                          {ethnicity}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Select ethnicities you'd like to see represented in the neighborhood
                </p>
              </div>

              {/* Religious Preferences */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Religious Community Preferences</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Christian", "Catholic", "Jewish", "Muslim", "Hindu", "Buddhist", "Non-Religious"].map(
                    (religion) => (
                      <div key={religion} className="flex items-center space-x-2">
                        <Checkbox
                          id={religion}
                          checked={filters.religiousPreferences.includes(religion)}
                          onCheckedChange={() => toggleReligiousPreference(religion)}
                        />
                        <Label htmlFor={religion} className="text-sm cursor-pointer">
                          {religion}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Select religious communities you'd like to see represented in the neighborhood
                </p>
              </div>

              {/* Priorities */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Your Priorities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Safety",
                    "Schools",
                    "Affordability",
                    "Walkability",
                    "Investment Potential",
                    "Family-Friendly",
                    "Urban Lifestyle",
                    "Quiet Area",
                    "Cultural Diversity",
                  ].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        id={priority}
                        checked={filters.priorities.includes(priority)}
                        onCheckedChange={() => togglePriority(priority)}
                      />
                      <Label htmlFor={priority} className="text-sm cursor-pointer">
                        {priority}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{results.length} Neighborhoods Found</h2>
                {showAIInterpretation && <p className="text-sm text-muted-foreground mt-1">{showAIInterpretation}</p>}
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Best Match</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="safety">Safety Score</SelectItem>
                    <SelectItem value="schools">School Rating</SelectItem>
                    <SelectItem value="diversity">Diversity Index</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                    className="rounded-l-none border-l"
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Map
                  </Button>
                </div>
              </div>
            </div>

            {viewMode === "map" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Neighborhood Map View</CardTitle>
                  <CardDescription>
                    Interactive map showing all {results.length} neighborhoods with safety indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SearchMap neighborhoods={results} onNeighborhoodSelect={handleNeighborhoodSelect} className="h-96" />
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((neighborhood) => (
                  <Card key={neighborhood.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    {neighborhood.image && (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={neighborhood.image || "/placeholder.svg"}
                          alt={`${neighborhood.name} neighborhood`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{neighborhood.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {neighborhood.city}, {neighborhood.state}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {neighborhood.crimeRate} Crime
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-accent" />
                          <div>
                            <div className="text-sm font-medium">{neighborhood.safetyScore}/10</div>
                            <div className="text-xs text-muted-foreground">Safety</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-accent" />
                          <div>
                            <div className="text-sm font-medium">{neighborhood.schoolRating}/10</div>
                            <div className="text-xs text-muted-foreground">Schools</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <div>
                            <div className="text-sm font-medium">${(neighborhood.medianPrice / 1000).toFixed(0)}K</div>
                            <div className="text-xs text-muted-foreground">Median Price</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          <div>
                            <div className="text-sm font-medium">{neighborhood.taxRate}%</div>
                            <div className="text-xs text-muted-foreground">Tax Rate</div>
                          </div>
                        </div>
                      </div>

                      {/* Demographics */}
                      <div>
                        <div className="text-sm font-medium mb-2">Demographics</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Diversity Index:</span>
                            <span className="font-medium">{neighborhood.diversityIndex}/10</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Top Ethnicity:</span>
                            <span className="font-medium">
                              {Object.entries(neighborhood.ethnicComposition).sort(([, a], [, b]) => b - a)[0]?.[0] ||
                                "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Top Religion:</span>
                            <span className="font-medium">
                              {Object.entries(neighborhood.religiousComposition).sort(
                                ([, a], [, b]) => b - a,
                              )[0]?.[0] || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <div className="text-sm font-medium mb-2">Highlights</div>
                        <div className="flex flex-wrap gap-1">
                          {neighborhood.highlights.map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Walk Score */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Walk Score: {neighborhood.walkScore}</span>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`/neighborhood/${neighborhood.id}`}>View Details</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 && !isSearching && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Start Your Neighborhood Search</h3>
              <p className="text-muted-foreground mb-6">
                Enter a location above and use filters to find neighborhoods that match your priorities
              </p>
              <Button onClick={() => updateFilter("location", "Austin, TX")}>Try Sample Search: Austin, TX</Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isSearching && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-foreground mb-2">Analyzing Neighborhoods</h3>
              <p className="text-muted-foreground">Gathering crime data, school ratings, and market insights...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
