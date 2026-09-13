// frontend/components/search-map.tsx
// Plots synthetic neighborhood coordinates on a deterministic local map canvas.
// It does not fetch map tiles or display live locations or resident data.

"use client"

import type { Neighborhood } from "@/lib/neighborhoods"

interface SearchMapProps {
  neighborhoods: Neighborhood[]
  onNeighborhoodSelect?: (neighborhood: Neighborhood) => void
  className?: string
}

const LATITUDE_BOUNDS = { minimum: 30.18, maximum: 30.56 }
const LONGITUDE_BOUNDS = { minimum: -97.87, maximum: -97.64 }

function markerPosition([latitude, longitude]: [number, number]): { left: string; top: string } {
  const horizontal =
    ((longitude - LONGITUDE_BOUNDS.minimum) / (LONGITUDE_BOUNDS.maximum - LONGITUDE_BOUNDS.minimum)) * 100
  const vertical = 100 - ((latitude - LATITUDE_BOUNDS.minimum) / (LATITUDE_BOUNDS.maximum - LATITUDE_BOUNDS.minimum)) * 100

  return {
    left: `${Math.min(94, Math.max(6, horizontal))}%`,
    top: `${Math.min(90, Math.max(10, vertical))}%`,
  }
}

export default function SearchMap({ neighborhoods, onNeighborhoodSelect, className = "" }: SearchMapProps) {
  return (
    <div
      className={`relative min-h-[500px] overflow-hidden rounded-lg border bg-[linear-gradient(135deg,hsl(var(--muted))_25%,transparent_25%),linear-gradient(225deg,hsl(var(--muted))_25%,transparent_25%),linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%),linear-gradient(315deg,hsl(var(--muted))_25%,hsl(var(--card))_25%)] bg-[length:32px_32px] bg-[position:16px_0,16px_0,0_0,0_0] ${className}`}
      aria-label="Illustrative map of synthetic Austin-area neighborhood samples"
    >
      <div className="absolute inset-x-0 top-0 border-b bg-card/90 p-3 text-sm text-muted-foreground">
        Relative demo coordinates · not a navigation map
      </div>
      {neighborhoods.map((neighborhood) => (
        <button
          type="button"
          key={neighborhood.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-foreground bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring"
          style={markerPosition(neighborhood.coordinates)}
          title={`${neighborhood.name}: safety ${neighborhood.safetyScore}/10, walk score ${neighborhood.walkScore}/100`}
          onClick={() => onNeighborhoodSelect?.(neighborhood)}
        >
          {neighborhood.name}
        </button>
      ))}
      <div className="absolute bottom-3 left-3 rounded-md bg-card/90 px-3 py-2 text-xs text-muted-foreground shadow">
        North ↑
      </div>
    </div>
  )
}
