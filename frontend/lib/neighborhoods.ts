// frontend/lib/neighborhoods.ts
// Defines the synthetic neighborhood records shared by HomeScope's public demo.
// It does not represent live listings, official statistics, or housing advice.

export interface Neighborhood {
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
  coordinates: [number, number]
}

export const DEMO_NEIGHBORHOODS: Neighborhood[] = [
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
    coordinates: [30.2672, -97.7431],
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
    highlights: ["Parks nearby", "Good schools", "Mid-range sample price"],
    coordinates: [30.224, -97.7738],
  },
  {
    id: "cedar-park",
    name: "Cedar Park",
    city: "Cedar Park",
    state: "TX",
    safetyScore: 9.1,
    schoolRating: 9.2,
    medianPrice: 425000,
    taxRate: 2.3,
    crimeRate: "Very Low",
    walkScore: 65,
    highlights: ["Top-rated schools", "Very safe", "Lower sample price"],
    coordinates: [30.5052, -97.8203],
  },
  {
    id: "east-austin",
    name: "East Austin",
    city: "Austin",
    state: "TX",
    safetyScore: 6.8,
    schoolRating: 7.2,
    medianPrice: 520000,
    taxRate: 2,
    crimeRate: "Moderate",
    walkScore: 82,
    highlights: ["Walkable", "Restaurants nearby", "Central location"],
    coordinates: [30.2672, -97.7031],
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
    highlights: ["High sample price", "Excellent schools", "Low crime"],
    coordinates: [30.3077, -97.8081],
  },
  {
    id: "mueller",
    name: "Mueller",
    city: "Austin",
    state: "TX",
    safetyScore: 8.3,
    schoolRating: 8.1,
    medianPrice: 575000,
    taxRate: 2,
    crimeRate: "Low",
    walkScore: 88,
    highlights: ["Planned community", "Walkable", "Modern amenities"],
    coordinates: [30.2955, -97.7033],
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
    highlights: ["Historic homes", "Close to downtown", "Tree-lined streets"],
    coordinates: [30.244, -97.7594],
  },
  {
    id: "round-rock",
    name: "Round Rock",
    city: "Round Rock",
    state: "TX",
    safetyScore: 8.7,
    schoolRating: 8.9,
    medianPrice: 395000,
    taxRate: 2.2,
    crimeRate: "Very Low",
    walkScore: 58,
    highlights: ["Lower sample price", "Great schools", "Suburban setting"],
    coordinates: [30.5083, -97.6789],
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}
