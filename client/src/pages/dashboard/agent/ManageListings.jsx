import React, { useState, useEffect } from "react";
import { MoreHorizontal, Plus, ArrowUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const fetchDashboardData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate API response
  return {
    agentName: "John Doe",
    activeListings: 12,
    totalStudents: 48,
    monthlyRevenue: 24500,
    averageRating: 4.8,
    listings: [
      {
        id: 1,
        name: "Sunshine Student Living",
        location: "Central University",
        price: 599,
        status: "Active",
        image: "/Room1.png",
        occupancy: "85%",
      },
      {
        id: 2,
        name: "Campus View Residence",
        location: "University District",
        price: 699,
        status: "Active",
        image: "/Room2.png",
        occupancy: "92%",
      },
      {
        id: 3,
        name: "Lakeside Dorms",
        location: "Lakefront Campus",
        price: 549,
        status: "Inactive",
        image: "/Room3.png",
        occupancy: "0%",
      },
      {
        id: 4,
        name: "Downtown Apartments",
        location: "City Center",
        price: 799,
        status: "Maintenance",
        image: "/Room4.png",
        occupancy: "50%",
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
};

export default function ManageListings() {
  const [dashboardData, setDashboardData] = useState(null);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then((data) => {
      setDashboardData(data);
      setIsLoading(false);
    });
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredListings = dashboardData?.listings
    .filter((listing) =>
      filterStatus === "all" ? true : listing.status === filterStatus
    )
    .filter(
      (listing) =>
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

  const handleEdit = (id) => {
    toast({
      title: "Edit Listing",
      description: `Editing listing with ID: ${id}`,
    });
  };

  const handleDelete = (id) => {
    toast({
      title: "Delete Listing",
      description: `Deleting listing with ID: ${id}`,
      variant: "destructive",
    });
  };

  const openDialog = (listing) => {
    setSelectedListing(listing);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedListing) {
      const updatedListings = dashboardData.listings.map((listing) =>
        listing.id === selectedListing.id
          ? { ...listing, status: newStatus }
          : listing
      );
      setDashboardData({ ...dashboardData, listings: updatedListings });
      setSelectedListing({ ...selectedListing, status: newStatus });
      toast({
        title: "Status Updated",
        description: `${selectedListing.name} status changed to ${newStatus}`,
      });
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Maintenance":
        return "warning";
      case "Inactive":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const StatCard = ({ title, value }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-[100px]" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
          <p className="text-muted-foreground">Manage your hostel listings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Listing
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Listings"
          value={dashboardData?.activeListings}
        />
        <StatCard title="Total Students" value={dashboardData?.totalStudents} />
        <StatCard
          title="Monthly Revenue"
          value={`$${dashboardData?.monthlyRevenue}`}
        />
        <StatCard title="Average Rating" value={dashboardData?.averageRating} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Listings</CardTitle>
          <CardDescription>
            Manage and monitor your property listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" onClick={() => handleSort("name")}>
                      Property
                      {sortColumn === "name" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("price")}>
                      Price
                      {sortColumn === "price" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("occupancy")}
                    >
                      Occupancy
                      {sortColumn === "occupancy" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={6}>
                          <Skeleton className="h-12 w-full" />
                        </TableCell>
                      </TableRow>
                    ))
                  : filteredListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <img
                              src={listing.image}
                              alt={listing.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                            <span>{listing.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{listing.location}</TableCell>
                        <TableCell>${listing.price}/month</TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(listing.status)}
                          >
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{listing.occupancy}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => openDialog(listing)}
                              >
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(listing.id)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(listing.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedListing && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedListing.name}</DialogTitle>
                <DialogDescription>
                  {selectedListing.location}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Price:</span>
                  <span className="col-span-3">
                    ${selectedListing.price}/month
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Status:</span>
                  <Select
                    value={selectedListing.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Occupancy:</span>
                  <span className="col-span-3">
                    {selectedListing.occupancy}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Image:</span>
                  <img
                    src={selectedListing.image}
                    alt={selectedListing.name}
                    className="col-span-3 rounded-md"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
