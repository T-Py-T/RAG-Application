// frontend/app/page.tsx
// Presents the HomeScope prototype and a small set of synthetic neighborhood examples.
// It does not claim live market coverage, customer adoption, or decision-grade data.

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DEMO_NEIGHBORHOODS, formatPrice } from "@/lib/neighborhoods"
import { DollarSign, GraduationCap, MapPin, Search, Shield, Sparkles } from "lucide-react"

const capabilities = [
  {
    icon: Search,
    title: "Filter a sample dataset",
    description: "Compare synthetic records by price, safety score, school rating, and walkability.",
  },
  {
    icon: Sparkles,
    title: "Try natural-language input",
    description: "A deterministic parser turns a few plain-language phrases into the same bounded filters.",
  },
  {
    icon: MapPin,
    title: "Switch between cards and a map",
    description: "Review the same sample records in two interfaces without suggesting live coverage.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2" aria-label="HomeScope home">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="size-5 text-primary-foreground" />
            </span>
            <span className="text-xl font-bold text-foreground">HomeScope</span>
          </Link>
          <Button asChild>
            <Link href="/search">Open the prototype</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">
              Local prototype · synthetic data
            </Badge>
            <h1 className="text-balance text-4xl font-bold text-foreground md:text-6xl">
              Explore how neighborhood comparison could feel
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-xl text-muted-foreground">
              HomeScope is an interactive software prototype for comparing clearly labeled sample records. It focuses
              on price, schools, safety, taxes, and walkability—not who lives in a neighborhood.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/search">
                  <Search className="size-5" />
                  Search sample neighborhoods
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://github.com/T-Py-T/RAG-Application">View source</a>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Values in this demo are illustrative and must not be used for housing or investment decisions.
            </p>
          </div>
        </section>

        <section className="bg-muted/30 px-4 py-16" aria-labelledby="sample-heading">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <Badge variant="outline">Austin-area examples</Badge>
              <h2 id="sample-heading" className="mt-3 text-3xl font-bold text-foreground">
                A transparent sample, not a live feed
              </h2>
              <p className="mt-3 text-muted-foreground">
                These records exist only to exercise the interface. The repository contains the exact values shown.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {DEMO_NEIGHBORHOODS.slice(0, 3).map((neighborhood) => (
                <Card key={neighborhood.id} className="overflow-hidden">
                  <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-muted">
                    <MapPin className="size-10 text-primary" aria-hidden="true" />
                  </div>
                  <CardHeader>
                    <CardTitle>{neighborhood.name}</CardTitle>
                    <CardDescription>
                      {neighborhood.city}, {neighborhood.state} · synthetic example
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="size-4" /> Sample median price
                      </span>
                      <span className="font-medium">{formatPrice(neighborhood.medianPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="size-4" /> Safety score
                      </span>
                      <span className="font-medium">{neighborhood.safetyScore}/10</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="size-4" /> School rating
                      </span>
                      <span className="font-medium">{neighborhood.schoolRating}/10</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16" aria-labelledby="capability-heading">
          <div className="container mx-auto max-w-6xl">
            <h2 id="capability-heading" className="text-center text-3xl font-bold text-foreground">
              Implemented in the prototype
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, description }) => (
                <Card key={title}>
                  <CardHeader>
                    <Icon className="size-6 text-primary" />
                    <CardTitle className="pt-2 text-lg">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8">
        <div className="container mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <span>HomeScope open-source prototype</span>
          <Link className="hover:text-foreground" href="/search">
            Explore synthetic sample data
          </Link>
        </div>
      </footer>
    </div>
  )
}
