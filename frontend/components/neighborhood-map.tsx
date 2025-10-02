"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), { ssr: false })

interface NeighborhoodMapProps {
  neighborhood: {
    id: string
    name: string
    coordinates: [number, number] // [lat, lng]
    safetyScore: number
    averagePrice: string
  }
  className?: string
}

export default function NeighborhoodMap({ neighborhood, className = "" }: NeighborhoodMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center h-64 ${className}`}>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  // Color based on safety score
  const getCircleColor = (score: number) => {
    if (score >= 8) return "#22c55e" // green
    if (score >= 6) return "#eab308" // yellow
    return "#ef4444" // red
  }

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={neighborhood.coordinates}
        zoom={13}
        style={{ height: "100%", width: "100%", minHeight: "300px" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Neighborhood center marker */}
        <Marker position={neighborhood.coordinates}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">{neighborhood.name}</h3>
              <p className="text-sm text-muted-foreground">Avg Price: {neighborhood.averagePrice}</p>
              <p className="text-sm text-muted-foreground">Safety Score: {neighborhood.safetyScore}/10</p>
            </div>
          </Popup>
        </Marker>

        {/* Safety indicator circle */}
        <Circle
          center={neighborhood.coordinates}
          radius={800}
          pathOptions={{
            color: getCircleColor(neighborhood.safetyScore),
            fillColor: getCircleColor(neighborhood.safetyScore),
            fillOpacity: 0.2,
            weight: 2,
          }}
        />
      </MapContainer>
    </div>
  )
}
