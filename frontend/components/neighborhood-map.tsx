// frontend/components/neighborhood-map.tsx
// Displays one synthetic coordinate on the same deterministic local map canvas.
// It does not fetch map tiles or assert a real property or neighborhood boundary.

interface NeighborhoodMapProps {
  neighborhood: {
    id: string
    name: string
    coordinates: [number, number]
    safetyScore: number
    averagePrice: string
  }
  className?: string
}

export default function NeighborhoodMap({ neighborhood, className = "" }: NeighborhoodMapProps) {
  return (
    <div
      className={`relative flex min-h-72 items-center justify-center overflow-hidden rounded-lg border bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12),transparent_45%),linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%),linear-gradient(315deg,hsl(var(--muted))_25%,hsl(var(--card))_25%)] bg-[length:auto,36px_36px,36px_36px] ${className}`}
      aria-label={`Illustrative coordinate card for ${neighborhood.name}`}
    >
      <div className="absolute inset-x-0 top-0 border-b bg-card/90 p-3 text-sm text-muted-foreground">
        Fixed demo coordinate · not a property boundary
      </div>
      <div className="rounded-xl border-2 border-primary-foreground bg-primary px-5 py-4 text-center text-primary-foreground shadow-xl">
        <p className="font-semibold">{neighborhood.name}</p>
        <p className="mt-1 text-xs opacity-90">
          {neighborhood.coordinates[0].toFixed(4)}, {neighborhood.coordinates[1].toFixed(4)}
        </p>
        <p className="mt-2 text-xs">Sample price {neighborhood.averagePrice}</p>
        <p className="text-xs">Safety score {neighborhood.safetyScore}/10</p>
      </div>
    </div>
  )
}
