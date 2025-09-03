"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), { ssr: false })

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
  coordinates?: [number, number]
}

interface SearchMapProps {
  neighborhoods: NeighborhoodResult[]
  onNeighborhoodSelect?: (neighborhood: NeighborhoodResult) => void
  className?: string
}

// Austin area coordinates for neighborhoods
const neighborhoodCoordinates: { [key: string]: [number, number] } = {
  "downtown-austin": [30.2672, -97.7431],
  "south-austin": [30.224, -97.7738],
  "cedar-park": [30.5052, -97.8203],
  "east-austin": [30.2672, -97.7031],
  westlake: [30.3077, -97.8081],
  mueller: [30.2955, -97.7033],
  "travis-heights": [30.244, -97.7594],
  "round-rock": [30.5083, -97.6789],
}

export default function SearchMap({ neighborhoods, onNeighborhoodSelect, className = "" }: SearchMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center h-96 ${className}`}>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  // Add coordinates to neighborhoods
  const neighborhoodsWithCoords = neighborhoods.map((n) => ({
    ...n,
    coordinates: neighborhoodCoordinates[n.id] || [30.2672, -97.7431],
  }))

  // Color based on safety score
  const getMarkerColor = (score: number) => {
    if (score >= 8.5) return "#22c55e" // green
    if (score >= 7) return "#eab308" // yellow
    if (score >= 5) return "#f97316" // orange
    return "#ef4444" // red
  }

  // Austin center coordinates
  const austinCenter: [number, number] = [30.2672, -97.7431]

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={austinCenter}
        zoom={11}
        style={{ height: "100%", width: "100%", minHeight: "500px" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {neighborhoodsWithCoords.map((neighborhood) => (
          <div key={neighborhood.id}>
            {/* Neighborhood marker */}
            <Marker position={neighborhood.coordinates!}>
              <Popup>
                <div className="text-center min-w-48">
                  <h3 className="font-semibold text-base mb-2">{neighborhood.name}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Safety Score:</span>
                      <span className="font-medium">{neighborhood.safetyScore}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>School Rating:</span>
                      <span className="font-medium">{neighborhood.schoolRating}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Median Price:</span>
                      <span className="font-medium">${(neighborhood.medianPrice / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Diversity:</span>
                      <span className="font-medium">{neighborhood.diversityIndex}/10</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNeighborhoodSelect?.(neighborhood)}
                    className="mt-3 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>

            {/* Safety indicator circle */}
            <Circle
              center={neighborhood.coordinates!}
              radius={1200}
              pathOptions={{
                color: getMarkerColor(neighborhood.safetyScore),
                fillColor: getMarkerColor(neighborhood.safetyScore),
                fillOpacity: 0.15,
                weight: 2,
              }}
            />
          </div>
        ))}
      </MapContainer>
    </div>
  )
}
