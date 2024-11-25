import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Filter, Search } from "lucide-react";
import { format } from "date-fns";

// Simulated API call
const fetchBookings = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      id: 1,
      hostelName: "Sunny Dorm",
      guestName: "John Doe",
      checkIn: "2023-06-01",
      checkOut: "2023-06-07",
      status: "confirmed",
      totalAmount: 420,
    },
    {
      id: 2,
      hostelName: "Quiet Haven",
      guestName: "Jane Smith",
      checkIn: "2023-06-15",
      checkOut: "2023-06-20",
      status: "pending",
      totalAmount: 375,
    },
    {
      id: 3,
      hostelName: "Campus View",
      guestName: "Bob Johnson",
      checkIn: "2023-07-01",
      checkOut: "2023-07-10",
      status: "confirmed",
      totalAmount: 675,
    },
    {
      id: 4,
      hostelName: "Urban Oasis",
      guestName: "Alice Brown",
      checkIn: "2023-07-15",
      checkOut: "2023-07-20",
      status: "cancelled",
      totalAmount: 300,
    },
  ];
};

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchBookings().then((data) => {
      setBookings(data);
      setIsLoading(false);
    });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}.`,
    });
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="max-w-7xl mx-auto ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Bookings</CardTitle>
        <CardDescription>
          Manage and monitor your hostel bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center w-full sm:w-auto">
            <Search className="w-4 h-4 mr-2 opacity-50" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 opacity-50" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hostel</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={7}>
                        <Skeleton className="h-12 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.hostelName}
                      </TableCell>
                      <TableCell>{booking.guestName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 opacity-50" />
                          {format(new Date(booking.checkIn), "MMM dd, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 opacity-50" />
                          {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${booking.totalAmount}</TableCell>
                      <TableCell>
                        {booking.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusChange(booking.id, "confirmed")
                            }
                          >
                            Confirm
                          </Button>
                        )}
                        {booking.status === "confirmed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(booking.id, "cancelled")
                            }
                          >
                            Cancel
                          </Button>
                        )}
                        {booking.status === "cancelled" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(booking.id, "confirmed")
                            }
                          >
                            Reactivate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
