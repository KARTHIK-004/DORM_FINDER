export async function fetchDashboardData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate API response
  return {
    agentName: "John Doe",
    activeListings: 12,
    activeListingsChange: "+2",
    totalStudents: 48,
    totalStudentsChange: "+5",
    monthlyRevenue: 24500,
    monthlyRevenueChange: "+12%",
    averageRating: 4.8,
    averageRatingChange: "+0.2",
    listings: [
      {
        id: 1,
        name: "Sunshine Student Living",
        location: "Central University",
        price: "$599/month",
        status: "Active",
        image: "/Room1.png",
      },
      {
        id: 2,
        name: "Campus View Residence",
        location: "University District",
        price: "$699/month",
        status: "Active",
        image: "/Room2.png",
      },
      {
        id: 3,
        name: "Lakeside Dorms",
        location: "Lakefront Campus",
        price: "$549/month",
        status: "Inactive",
        image: "/Room3.png",
      },
    ],
    recentBookings: [
      {
        id: 1,
        name: "Emma Wilson",
        property: "Sunshine Student Living",
        date: "2024-03-15",
        status: "Confirmed",
      },
      {
        id: 2,
        name: "James Brown",
        property: "Campus View Residence",
        date: "2024-03-14",
        status: "Pending",
      },
      {
        id: 3,
        name: "Sophia Lee",
        property: "Lakeside Dorms",
        date: "2024-03-13",
        status: "Confirmed",
      },
    ],
  };
}

export const listings = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Sunshine Student Living",
    location: "Central University",
    price: 599,
    status: "Active",
    occupancy: "85%",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Campus View Residence",
    location: "University District",
    price: 699,
    status: "Active",
    occupancy: "92%",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=100&h=100&q=80",
    name: "The Student Hub",
    location: "Downtown Campus",
    price: 549,
    status: "Maintenance",
    occupancy: "0%",
  },
];
