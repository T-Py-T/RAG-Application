// frontend/app/search/page.tsx
// Provides filter, natural-language, card, and map views over synthetic neighborhood data.
// It does not access live housing data or rank neighborhoods by resident characteristics.

"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AISearch } from "@/components/ai-search"
import SearchMap from "@/components/search-map"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { DEMO_NEIGHBORHOODS, formatPrice, type Neighborhood } from "@/lib/neighborhoods"
import { DollarSign, Filter, GraduationCap, Grid3X3, Map, MapPin, Search, Shield } from "lucide-react"

interface SearchFilters {
  location: string
  maxPrice: number
  minSafetyScore: number
  minSchoolRating: number
}

const DEFAULT_FILTERS: SearchFilters = {
  location: "",
  maxPrice: 800000,
  minSafetyScore: 0,
  minSchoolRating: 0,
}

function matchesFilters(neighborhood: Neighborhood, filters: SearchFilters): boolean {
  const location = filters.location.trim().toLowerCase()
  const matchesLocation =
    location.length === 0 ||
    neighborhood.name.toLowerCase().includes(location) ||
    neighborhood.city.toLowerCase().includes(location) ||
    neighborhood.state.toLowerCase() === location

  return (
    matchesLocation &&
    neighborhood.medianPrice <= filters.maxPrice &&
    neighborhood.safetyScore >= filters.minSafetyScore &&
    neighborhood.schoolRating >= filters.minSchoolRating
  )
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const showLinkedResults = searchParams.get("view") === "results"
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)
  const [showFilters, setShowFilters] = useState(false)
  const [results, setResults] = useState<Neighborhood[]>(() =>
    showLinkedResults ? DEMO_NEIGHBORHOODS.filter((neighborhood) => matchesFilters(neighborhood, DEFAULT_FILTERS)) : [],
  )
  const [isSearching, setIsSearching] = useState(false)
  const [interpretation, setInterpretation] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  const updateFilter = <Key extends keyof SearchFilters>(key: Key, value: SearchFilters[Key]) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const handleSearch = () => {
    setIsSearching(true)
    setInterpretation("")
    setResults(DEMO_NEIGHBORHOODS.filter((neighborhood) => matchesFilters(neighborhood, filters)))
    setIsSearching(false)
  }

  const handleAIResults = (nextResults: Neighborhood[], nextInterpretation: string) => {
    setResults(nextResults)
    setInterpretation(nextInterpretation)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2" aria-label="HomeScope home">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="size-5 text-primary-foreground" />
            </span>
            <span className="text-xl font-bold text-foreground">HomeScope</span>
          </Link>
          <Badge variant="secondary">Synthetic data only</Badge>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Search the sample dataset</h1>
          <p className="mt-2 text-muted-foreground">
            Compare eight illustrative Austin-area records. Values are not live and are not housing advice.
          </p>
        </div>

        <AISearch onResults={handleAIResults} onLoading={setIsSearching} />

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1">
                <Label htmlFor="location" className="mb-2 block text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Try Austin, Cedar Park, or TX"
                  value={filters.location}
                  onChange={(event) => updateFilter("location", event.target.value)}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button variant="outline" onClick={() => setShowFilters((current) => !current)}>
                  <Filter className="size-4" />
                  {showFilters ? "Hide filters" : "Filters"}
                </Button>
                <Button onClick={handleSearch} disabled={isSearching}>
                  <Search className="size-4" />
                  {isSearching ? "Searching…" : "Search"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Comparison filters</CardTitle>
              <CardDescription>All controls operate on the repository&apos;s synthetic records.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-3">
              <div>
                <Label className="mb-3 block">Maximum price: {formatPrice(filters.maxPrice)}</Label>
                <Slider
                  value={[filters.maxPrice]}
                  onValueChange={([value]) => updateFilter("maxPrice", value)}
                  min={100000}
                  max={1500000}
                  step={25000}
                />
              </div>
              <div>
                <Label className="mb-3 block">Minimum safety score: {filters.minSafetyScore}/10</Label>
                <Slider
                  value={[filters.minSafetyScore]}
                  onValueChange={([value]) => updateFilter("minSafetyScore", value)}
                  min={0}
                  max={10}
                  step={0.5}
                />
              </div>
              <div>
                <Label className="mb-3 block">Minimum school rating: {filters.minSchoolRating}/10</Label>
                <Slider
                  value={[filters.minSchoolRating]}
                  onValueChange={([value]) => updateFilter("minSchoolRating", value)}
                  min={0}
                  max={10}
                  step={0.5}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {results.length > 0 ? (
          <section className="space-y-6" data-evidence-state="results" aria-labelledby="results-heading">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 id="results-heading" className="text-2xl font-bold text-foreground">
                  {results.length} sample {results.length === 1 ? "record" : "records"}
                </h2>
                {interpretation && <p className="mt-1 text-sm text-muted-foreground">{interpretation}</p>}
              </div>
              <div className="flex rounded-lg border">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="size-4" /> Grid
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="size-4" /> Map
                </Button>
              </div>
            </div>

            {viewMode === "map" ? (
              <Card>
                <CardContent className="p-0">
                  <SearchMap
                    neighborhoods={results}
                    className="h-[560px]"
                    onNeighborhoodSelect={(neighborhood) => {
                      window.location.href = `/neighborhood/${neighborhood.id}`
                    }}
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((neighborhood) => (
                  <Card key={neighborhood.id} className="overflow-hidden">
                    <div className="flex h-28 items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-muted">
                      <MapPin className="size-9 text-primary" aria-hidden="true" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle>{neighborhood.name}</CardTitle>
                          <CardDescription>
                            {neighborhood.city}, {neighborhood.state}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">Sample</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Metric icon={DollarSign} label="Median price" value={formatPrice(neighborhood.medianPrice)} />
                      <Metric icon={Shield} label="Safety score" value={`${neighborhood.safetyScore}/10`} />
                      <Metric icon={GraduationCap} label="School rating" value={`${neighborhood.schoolRating}/10`} />
                      <Metric icon={MapPin} label="Walk score" value={`${neighborhood.walkScore}/100`} />
                      <div className="flex flex-wrap gap-2 pt-2">
                        {neighborhood.highlights.map((highlight) => (
                          <Badge key={highlight} variant="secondary">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild variant="outline" className="mt-2 w-full">
                        <Link href={`/neighborhood/${neighborhood.id}`}>View sample details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-14 text-center">
              <Search className="mx-auto size-8 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold">Run a search to view sample records</h2>
              <p className="mt-2 text-sm text-muted-foreground">No live listings or personal data are queried.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

interface MetricProps {
  icon: typeof DollarSign
  label: string
  value: string
}

function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" /> {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
