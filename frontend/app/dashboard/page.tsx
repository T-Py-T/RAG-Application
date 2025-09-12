"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Shield,
  GraduationCap,
  TrendingUp,
  Heart,
  Bell,
  Settings,
  Search,
  Eye,
  Bookmark,
  BarChart3,
  Home,
  Users,
} from "lucide-react"

const savedNeighborhoods = [
  {
    id: "1",
    name: "Westfield Heights",
    city: "Austin",
    state: "TX",
    safetyScore: 9.2,
    schoolRating: 8.8,
    medianPrice: 485000,
    priceChange: "+2.1%",
    savedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Downtown District",
    city: "Austin",
    state: "TX",
    safetyScore: 7.8,
    schoolRating: 7.2,
    medianPrice: 625000,
    priceChange: "+1.8%",
    savedDate: "2024-01-12",
  },
  {
    id: "3",
    name: "Riverside Commons",
    city: "Austin",
    state: "TX",
    safetyScore: 8.5,
    schoolRating: 8.1,
    medianPrice: 395000,
    priceChange: "+3.2%",
    savedDate: "2024-01-10",
  },
]

const recentActivity = [
  {
    type: "price_alert",
    neighborhood: "Westfield Heights",
    message: "Median price increased by 2.1% this month",
    time: "2 hours ago",
  },
  {
    type: "new_listing",
    neighborhood: "Downtown District",
    message: "3 new properties listed in your price range",
    time: "1 day ago",
  },
  {
    type: "market_update",
    neighborhood: "Riverside Commons",
    message: "School ratings updated - now 8.1/10",
    time: "3 days ago",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">HomeScope</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
              Search
            </a>
            <a href="/dashboard" className="text-foreground font-medium">
              Dashboard
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your saved neighborhoods</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{savedNeighborhoods.length}</div>
                  <div className="text-sm text-muted-foreground">Saved Areas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">24</div>
                  <div className="text-sm text-muted-foreground">Areas Viewed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">New Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">+2.4%</div>
                  <div className="text-sm text-muted-foreground">Avg Growth</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved">Saved Areas</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Updates from your saved neighborhoods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {activity.type === "price_alert" && <TrendingUp className="w-4 h-4 text-accent" />}
                        {activity.type === "new_listing" && <Home className="w-4 h-4 text-accent" />}
                        {activity.type === "market_update" && <BarChart3 className="w-4 h-4 text-accent" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.neighborhood}</div>
                        <div className="text-sm text-muted-foreground">{activity.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <a href="/search">
                      <Search className="w-4 h-4 mr-2" />
                      Search New Neighborhoods
                    </a>
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Price Alerts
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Compare Neighborhoods
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Connect with Agents
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Saved Areas Tab */}
          <TabsContent value="saved" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Saved Neighborhoods</h2>
              <Button asChild>
                <a href="/search">
                  <Search className="w-4 h-4 mr-2" />
                  Find More Areas
                </a>
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {savedNeighborhoods.map((neighborhood) => (
                <Card key={neighborhood.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{neighborhood.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {neighborhood.city}, {neighborhood.state}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-accent" />
                        <div>
                          <div className="text-sm font-medium">{neighborhood.safetyScore}/10</div>
                          <div className="text-xs text-muted-foreground">Safety</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-accent" />
                        <div>
                          <div className="text-sm font-medium">{neighborhood.schoolRating}/10</div>
                          <div className="text-xs text-muted-foreground">Schools</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <div className="text-lg font-bold">${(neighborhood.medianPrice / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-green-600">{neighborhood.priceChange}</div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/neighborhood/${neighborhood.id}`}>View Details</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Alerts</CardTitle>
                <CardDescription>Get notified when prices change in your saved areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">Westfield Heights</div>
                      <div className="text-sm text-muted-foreground">Alert when median price changes by ±5%</div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">Downtown District</div>
                      <div className="text-sm text-muted-foreground">Alert when new listings under $600K</div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    <Badge variant="outline" className="mt-1">
                      First-time Buyer
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Connected Accounts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
