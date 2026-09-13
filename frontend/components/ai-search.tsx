// frontend/components/ai-search.tsx
// Offers deterministic natural-language search over the local synthetic dataset.
// It does not call a language model or send housing preferences to an external service.

"use client"

import { useState, type KeyboardEvent } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Neighborhood } from "@/lib/neighborhoods"
import { Loader2, Sparkles } from "lucide-react"

interface SearchResponse {
  results: Neighborhood[]
  interpretation: string
}

interface AISearchProps {
  onResults: (results: Neighborhood[], interpretation: string) => void
  onLoading: (loading: boolean) => void
}

const SAMPLE_QUERIES = [
  "Safe neighborhoods with good schools under $500k",
  "Walkable areas under $700k",
  "Good schools near Austin",
]

function isSearchResponse(value: unknown): value is SearchResponse {
  if (typeof value !== "object" || value === null) return false
  const candidate = value as Partial<SearchResponse>
  return Array.isArray(candidate.results) && typeof candidate.interpretation === "string"
}

export function AISearch({ onResults, onLoading }: AISearchProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    onLoading(true)

    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) throw new Error(`Search returned ${response.status}`)
      const data: unknown = await response.json()
      if (!isSearchResponse(data)) throw new Error("Search returned an unexpected response")

      onResults(data.results, data.interpretation)
    } catch (error) {
      console.error("Natural-language search failed:", error)
      onResults([], "The local search could not be completed. Try the standard filters instead.")
    } finally {
      setIsSearching(false)
      onLoading(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") void handleSearch()
  }

  return (
    <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Natural-language search</h2>
          <Badge variant="secondary">Deterministic demo</Badge>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            aria-label="Natural-language search query"
            placeholder="Try “safe with good schools under $500k”"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={() => void handleSearch()} disabled={isSearching || !query.trim()}>
            {isSearching ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {isSearching ? "Searching…" : "Search"}
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Sample queries">
          {SAMPLE_QUERIES.map((sample) => (
            <Button key={sample} variant="outline" size="sm" onClick={() => setQuery(sample)}>
              {sample}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
