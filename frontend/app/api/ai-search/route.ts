// frontend/app/api/ai-search/route.ts
// Parses a bounded set of search phrases and filters the local synthetic dataset.
// It does not call external AI, housing, identity, or resident-data services.

import { NextResponse, type NextRequest } from "next/server"
import { DEMO_NEIGHBORHOODS, type Neighborhood } from "@/lib/neighborhoods"

interface ParsedQuery {
  location?: string
  maxPrice?: number
  minSafetyScore?: number
  minSchoolRating?: number
  minWalkScore?: number
}

function parseQuery(query: string): ParsedQuery {
  const normalized = query.toLowerCase()
  const parsed: ParsedQuery = {}
  const priceMatch = normalized.match(/(?:under|below|less than)\s+\$?(\d+)(k)?/)

  if (priceMatch) {
    const amount = Number.parseInt(priceMatch[1], 10)
    parsed.maxPrice = priceMatch[2] ? amount * 1000 : amount
  }
  if (normalized.includes("safe") || normalized.includes("low crime")) parsed.minSafetyScore = 8
  if (normalized.includes("good school") || normalized.includes("excellent school")) parsed.minSchoolRating = 8
  if (normalized.includes("walkable") || normalized.includes("walkability")) parsed.minWalkScore = 75

  const locationMatch = normalized.match(/(?:in|near|around)\s+([a-z][a-z\s-]*)/)
  if (locationMatch) parsed.location = locationMatch[1].trim()

  return parsed
}

function matches(neighborhood: Neighborhood, query: ParsedQuery): boolean {
  const location = query.location?.toLowerCase()
  const matchesLocation =
    !location ||
    neighborhood.name.toLowerCase().includes(location) ||
    neighborhood.city.toLowerCase().includes(location) ||
    neighborhood.state.toLowerCase() === location

  return (
    matchesLocation &&
    (!query.maxPrice || neighborhood.medianPrice <= query.maxPrice) &&
    (!query.minSafetyScore || neighborhood.safetyScore >= query.minSafetyScore) &&
    (!query.minSchoolRating || neighborhood.schoolRating >= query.minSchoolRating) &&
    (!query.minWalkScore || neighborhood.walkScore >= query.minWalkScore)
  )
}

function describeQuery(query: ParsedQuery): string {
  const details: string[] = []
  if (query.location) details.push(`location contains “${query.location}”`)
  if (query.maxPrice) details.push(`price at or below $${query.maxPrice.toLocaleString("en-US")}`)
  if (query.minSafetyScore) details.push(`safety score at least ${query.minSafetyScore}`)
  if (query.minSchoolRating) details.push(`school rating at least ${query.minSchoolRating}`)
  if (query.minWalkScore) details.push(`walk score at least ${query.minWalkScore}`)
  return details.length > 0 ? `Applied: ${details.join(" · ")}` : "No supported filter phrase was found; showing all samples."
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    if (typeof body !== "object" || body === null || !("query" in body) || typeof body.query !== "string") {
      return NextResponse.json({ error: "A text query is required." }, { status: 400 })
    }

    const query = parseQuery(body.query)
    return NextResponse.json({
      results: DEMO_NEIGHBORHOODS.filter((neighborhood) => matches(neighborhood, query)),
      interpretation: describeQuery(query),
    })
  } catch {
    return NextResponse.json({ error: "The request could not be parsed." }, { status: 400 })
  }
}
