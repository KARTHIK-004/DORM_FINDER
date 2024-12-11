import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Building2,
  Users,
  DollarSign,
  Star,
  Plus,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDashboardData } from "@/lib/data";
import { RevenueChart } from "@/components/ui/revenue-chart";
import { BookingsChart } from "@/components/ui/booking-chart";

export default function AgentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    {
      title: "Active Listings",
      value: dashboardData?.activeListings ?? "0",
      icon: Building2,
      change: dashboardData?.activeListingsChange ?? "+0",
      iconClass: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Students",
      value: dashboardData?.totalStudents ?? "0",
      icon: Users,
      change: dashboardData?.totalStudentsChange ?? "+0",
      iconClass: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Monthly Revenue",
      value: dashboardData?.monthlyRevenue
        ? `$${dashboardData.monthlyRevenue.toLocaleString()}`
        : "$0",
      icon: DollarSign,
      change: dashboardData?.monthlyRevenueChange ?? "+0%",
      iconClass: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      title: "Average Rating",
      value: dashboardData?.averageRating?.toFixed(1) ?? "0.0",
      icon: Star,
      change: dashboardData?.averageRatingChange ?? "+0.0",
      iconClass: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {dashboardData?.agentName ?? "Agent"}
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link to="/agent/create-listing">
            <Plus className="h-5 w-5" />
            Add New Listing
          </Link>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.iconClass}`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 font-medium mt-1">
                    {stat.change}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <RevenueChart />
        <BookingsChart />
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Listings</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/agent/listings">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {dashboardData?.listings.slice(0, 3).map((listing) => (
                  <div key={listing.id} className="flex items-center gap-4">
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{listing.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {listing.location}
                      </p>
                      <p className="text-sm font-medium">{listing.price}</p>
                    </div>
                    <Badge
                      variant={
                        listing.status === "Active" ? "success" : "secondary"
                      }
                      className={
                        listing.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }
                    >
                      {listing.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/agent/bookings">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {dashboardData?.recentBookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{booking.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.property}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        booking.status === "Confirmed" ? "success" : "warning"
                      }
                      className={
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
