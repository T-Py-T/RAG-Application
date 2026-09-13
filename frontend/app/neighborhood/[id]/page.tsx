// frontend/app/neighborhood/[id]/page.tsx
// Displays one transparent, synthetic neighborhood record from the demo dataset.
// It does not provide live statistics, resident data, or a recommendation to buy or rent.

"use client"

import { use } from "react"
import Link from "next/link"
import NeighborhoodMap from "@/components/neighborhood-map"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DEMO_NEIGHBORHOODS, formatPrice } from "@/lib/neighborhoods"
import { ArrowLeft, DollarSign, Footprints, GraduationCap, MapPin, Shield } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function NeighborhoodDetailsPage({ params }: PageProps) {
  const { id } = use(params)
  const neighborhood = DEMO_NEIGHBORHOODS.find((candidate) => candidate.id === id)

  if (!neighborhood) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Sample not found</h1>
        <p className="mt-3 text-muted-foreground">That identifier is not part of the bundled demo dataset.</p>
        <Button asChild className="mt-6">
          <Link href="/search">Return to search</Link>
        </Button>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Button asChild variant="ghost">
            <Link href="/search">
              <ArrowLeft className="size-4" /> Back to search
            </Link>
          </Button>
          <div className="flex items-center gap-2 font-bold">
            <MapPin className="size-5 text-primary" /> HomeScope
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-10">
        <Badge variant="secondary">Synthetic example</Badge>
        <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold text-foreground">{neighborhood.name}</h1>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" /> {neighborhood.city}, {neighborhood.state}
            </p>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            All values on this page are fixed fixtures for interface testing. Verify real decisions with authoritative
            local sources and qualified professionals.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br from-primary/15 via-accent/10 to-muted">
            <MapPin className="size-20 text-primary" aria-hidden="true" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Sample metrics</CardTitle>
              <CardDescription>Illustrative values stored directly in the repository.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Metric icon={DollarSign} label="Median price" value={formatPrice(neighborhood.medianPrice)} />
              <Score icon={Shield} label="Safety score" value={neighborhood.safetyScore} maximum={10} />
              <Score icon={GraduationCap} label="School rating" value={neighborhood.schoolRating} maximum={10} />
              <Score icon={Footprints} label="Walk score" value={neighborhood.walkScore} maximum={100} />
              <Metric icon={DollarSign} label="Property-tax rate" value={`${neighborhood.taxRate}%`} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <CardHeader>
              <CardTitle>Interface tags</CardTitle>
              <CardDescription>Labels attached to this synthetic record for card rendering.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {neighborhood.highlights.map((highlight) => (
                <Badge key={highlight} variant="outline">
                  {highlight}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Map interaction</CardTitle>
              <CardDescription>The marker uses fixed demo coordinates on a local visual canvas.</CardDescription>
            </CardHeader>
            <CardContent>
              <NeighborhoodMap
                neighborhood={{
                  id: neighborhood.id,
                  name: neighborhood.name,
                  coordinates: neighborhood.coordinates,
                  safetyScore: neighborhood.safetyScore,
                  averagePrice: formatPrice(neighborhood.medianPrice),
                }}
                className="h-80"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function Metric({ icon: Icon, label, value }: { icon: typeof DollarSign; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" /> {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function Score({
  icon: Icon,
  label,
  value,
  maximum,
}: {
  icon: typeof Shield
  label: string
  value: number
  maximum: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="size-4" /> {label}
        </span>
        <span className="font-medium">
          {value}/{maximum}
        </span>
      </div>
      <Progress value={(value / maximum) * 100} />
    </div>
  )
}
