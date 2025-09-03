import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { query, filters } = await request.json()

    // Simple AI-like query processing (in a real app, you'd use an LLM API)
    const processedQuery = processNaturalLanguageQuery(query)

    const supabase = await createClient()

    // Build dynamic query based on processed natural language
    let dbQuery = supabase.from("neighborhoods").select(`
        *,
        properties(count),
        crime_data(year, crime_rate_per_1000),
        schools(name, rating, type)
      `)

    // Apply AI-processed filters
    if (processedQuery.maxPrice) {
      dbQuery = dbQuery.lte("median_home_price", processedQuery.maxPrice)
    }

    if (processedQuery.minSafetyScore) {
      dbQuery = dbQuery.gte("crime_score", processedQuery.minSafetyScore)
    }

    if (processedQuery.minSchoolRating) {
      dbQuery = dbQuery.gte("school_rating", processedQuery.minSchoolRating)
    }

    if (processedQuery.location) {
      dbQuery = dbQuery.or(`city.ilike.%${processedQuery.location}%,name.ilike.%${processedQuery.location}%`)
    }

    const { data: neighborhoods, error } = await dbQuery.limit(20)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to search neighborhoods" }, { status: 500 })
    }

    // Rank results based on AI analysis
    const rankedResults = rankNeighborhoodsByQuery(neighborhoods || [], processedQuery)

    return NextResponse.json({
      results: rankedResults,
      interpretation: processedQuery.interpretation,
      appliedFilters: processedQuery,
    })
  } catch (error) {
    console.error("AI search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}

// Simple natural language processing (in production, use a proper LLM)
function processNaturalLanguageQuery(query: string) {
  const lowerQuery = query.toLowerCase()
  const processed: any = {
    interpretation: `Searching for: ${query}`,
  }

  // Extract price preferences
  const priceMatch = lowerQuery.match(/under \$?(\d+)k?|below \$?(\d+)k?|less than \$?(\d+)k?/)
  if (priceMatch) {
    const price = Number.parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3])
    processed.maxPrice = price * (lowerQuery.includes("k") ? 1000 : 1)
  }

  // Extract safety preferences
  if (lowerQuery.includes("safe") || lowerQuery.includes("low crime") || lowerQuery.includes("secure")) {
    processed.minSafetyScore = 80
    processed.interpretation += " • Prioritizing safety"
  }

  // Extract school preferences
  if (lowerQuery.includes("good school") || lowerQuery.includes("education") || lowerQuery.includes("family")) {
    processed.minSchoolRating = 7
    processed.interpretation += " • Prioritizing schools"
  }

  // Extract location
  const locationMatch = lowerQuery.match(/in ([a-zA-Z\s]+)|near ([a-zA-Z\s]+)|around ([a-zA-Z\s]+)/)
  if (locationMatch) {
    processed.location = locationMatch[1] || locationMatch[2] || locationMatch[3]
  }

  // Extract walkability preferences
  if (lowerQuery.includes("walkable") || lowerQuery.includes("walk") || lowerQuery.includes("pedestrian")) {
    processed.minWalkScore = 70
    processed.interpretation += " • Prioritizing walkability"
  }

  return processed
}

function rankNeighborhoodsByQuery(neighborhoods: any[], query: any) {
  return neighborhoods
    .map((neighborhood) => {
      let score = 0

      // Score based on query preferences
      if (query.minSafetyScore && neighborhood.crime_score >= query.minSafetyScore) {
        score += 3
      }

      if (query.minSchoolRating && neighborhood.school_rating >= query.minSchoolRating) {
        score += 3
      }

      if (query.maxPrice && neighborhood.median_home_price <= query.maxPrice) {
        score += 2
      }

      if (query.minWalkScore && neighborhood.walkability_score >= query.minWalkScore) {
        score += 2
      }

      return {
        ...neighborhood,
        aiScore: score,
        highlights: generateHighlights(neighborhood, query),
      }
    })
    .sort((a, b) => b.aiScore - a.aiScore)
}

function generateHighlights(neighborhood: any, query: any) {
  const highlights = []

  if (neighborhood.crime_score >= 85) highlights.push("Very Safe")
  if (neighborhood.school_rating >= 8) highlights.push("Excellent Schools")
  if (neighborhood.median_home_price < 400000) highlights.push("Affordable")
  if (neighborhood.walkability_score >= 80) highlights.push("Very Walkable")
  if (neighborhood.property_tax_rate < 0.02) highlights.push("Low Taxes")

  return highlights
}
