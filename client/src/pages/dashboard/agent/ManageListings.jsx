import React, { useState, useEffect } from "react";
import { MoreHorizontal, Plus, ArrowUpDown } from "lucide-react";
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
import { Link } from "react-router-dom";
import { getListings, updateListing, deleteListing } from "@/utils/api";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function ManageListings() {
  const [listings, setListings] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listingToDelete, setListingToDelete] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      const data = await getListings();
      console.log("Fetched listings:", data);
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast({
        title: "Error",
        description: "Failed to fetch listings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredListings = listings
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

  const handleEdit = async (id) => {
    try {
      toast({
        title: "Edit Listing",
        description: `Editing listing with ID: ${id}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to edit listing",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!listingToDelete) return;

    try {
      await deleteListing(listingToDelete.id);
      setListings(
        listings.filter((listing) => listing.id !== listingToDelete.id)
      );
      toast({
        title: "Success",
        description: "Listing has been deleted",
      });
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to delete listing. Please ensure you are logged in.",
        variant: "destructive",
      });
    } finally {
      setListingToDelete(null);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (selectedListing) {
      try {
        const updatedListing = await updateListing(selectedListing.id, {
          status: newStatus,
        });
        setListings(
          listings.map((listing) =>
            listing.id === selectedListing.id ? updatedListing : listing
          )
        );
        setSelectedListing(updatedListing);
        toast({
          title: "Status Updated",
          description: `${selectedListing.name} status changed to ${newStatus}`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update listing status",
          variant: "destructive",
        });
      }
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
        <Link to="/agent/manage-listings/create-listings">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Listing
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Listings"
          value={listings.filter((l) => l.status === "Active").length}
        />
        <StatCard title="Total Listings" value={listings.length} />
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
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell colSpan={6}>
                        <Skeleton className="h-12 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredListings.length > 0 ? (
                  filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <span>{listing.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{listing.location}</TableCell>
                      <TableCell>${listing.price}/month</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(listing.status)}>
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
                              onClick={() => {
                                if (listing._id) {
                                  window.location.href = `/listings/${listing._id}`;
                                } else {
                                  toast({
                                    title: "Error",
                                    description: "Invalid listing ID",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(listing.id)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setListingToDelete(listing)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No listings found
                    </TableCell>
                  </TableRow>
                )}
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
                  <span className="font-medium">Property Type:</span>
                  <span className="col-span-3">
                    {selectedListing.propertyType}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Room Type:</span>
                  <span className="col-span-3">{selectedListing.roomType}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">Amenities:</span>
                  <div className="col-span-3">
                    {Object.entries(selectedListing.amenities).map(
                      ([key, value]) =>
                        value && (
                          <Badge key={key} className="mr-2 mb-2">
                            {key}
                          </Badge>
                        )
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!listingToDelete}
        onOpenChange={() => setListingToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              listing and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
