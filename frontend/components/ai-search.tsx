"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Loader2 } from "lucide-react"

interface AISearchProps {
  onResults: (results: any[], interpretation: string) => void
  onLoading: (loading: boolean) => void
}

export function AISearch({ onResults, onLoading }: AISearchProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [lastInterpretation, setLastInterpretation] = useState("")

  const handleAISearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    onLoading(true)

    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()
      setLastInterpretation(data.interpretation)
      onResults(data.results, data.interpretation)
    } catch (error) {
      console.error("AI search error:", error)
      // Fallback to mock data for demo
      const mockResults = [
        {
          id: "1",
          name: "Cedar Park",
          city: "Cedar Park",
          state: "TX",
          crime_score: 90,
          school_rating: 9,
          median_home_price: 400000,
          property_tax_rate: 0.0181,
          walkability_score: 45,
          highlights: ["Very Safe", "Excellent Schools", "Family-Friendly"],
        },
      ]
      onResults(mockResults, `AI Search: ${query}`)
    } finally {
      setIsSearching(false)
      onLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAISearch()
    }
  }

  const sampleQueries = [
    "Find me a safe neighborhood with good schools under $500k",
    "Low crime areas near downtown Austin with walkable amenities",
    "Family-friendly neighborhoods with excellent schools",
    "Affordable areas with investment potential",
  ]

  return (
    <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI-Powered Search</h3>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Describe what you're looking for... (e.g., 'safe area with good schools under $500k')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-base"
            />
            <Button
              onClick={handleAISearch}
              disabled={isSearching || !query.trim()}
              className="flex items-center gap-2"
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isSearching ? "Searching..." : "AI Search"}
            </Button>
          </div>

          {lastInterpretation && (
            <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <strong>AI Interpretation:</strong> {lastInterpretation}
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1 px-2 bg-transparent"
                  onClick={() => setQuery(sample)}
                >
                  {sample}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
