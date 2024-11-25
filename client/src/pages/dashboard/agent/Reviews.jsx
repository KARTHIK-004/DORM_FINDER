import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageCircle, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

// Simulated API call
const fetchReviews = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      id: 1,
      hostelName: "Sunny Dorm",
      guestName: "John D.",
      rating: 4,
      comment:
        "Great place, very clean and comfortable. The staff was friendly and helpful. Would definitely stay here again on my next visit.",
      date: "2023-05-15",
    },
    {
      id: 2,
      hostelName: "Quiet Haven",
      guestName: "Sarah M.",
      rating: 5,
      comment:
        "Absolutely loved my stay here. Peaceful and well-maintained. The amenities were top-notch and the location was perfect for exploring the city.",
      date: "2023-05-20",
    },
    {
      id: 3,
      hostelName: "Campus View",
      guestName: "Mike R.",
      rating: 3,
      comment:
        "Decent place, but could use some improvements in amenities. The location was great for university access, but the Wi-Fi was a bit spotty.",
      date: "2023-05-25",
    },
    {
      id: 4,
      hostelName: "Urban Oasis",
      guestName: "Emma L.",
      rating: 5,
      comment:
        "An amazing experience! The hostel had a great atmosphere, modern facilities, and organized fun social events. Met some wonderful people here.",
      date: "2023-06-02",
    },
    {
      id: 5,
      hostelName: "Backpackers' Hub",
      guestName: "Alex T.",
      rating: 2,
      comment:
        "Disappointing stay. The rooms were not as clean as expected and the noise levels were high throughout the night. Needs better management.",
      date: "2023-06-10",
    },
  ];
};

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    fetchReviews().then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    return matchesSearch && matchesRating;
  });

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  const averageRating = reviews.length
    ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Guest Reviews</CardTitle>
            <CardDescription>
              See what our guests are saying about their stays
            </CardDescription>
          </div>
          {!isLoading && (
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-2xl font-bold mr-2">{averageRating}</span>
              <div className="flex">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center w-full sm:w-auto">
            <Search className="w-4 h-4 mr-2 opacity-50" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 opacity-50" />
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-grow">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-16 w-full mt-4" />
                  </CardContent>
                </Card>
              ))
            : filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.guestName}`}
                        />
                        <AvatarFallback>
                          {review.guestName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-semibold">
                              {review.guestName}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {review.hostelName}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-500">
                              {format(new Date(review.date), "MMM dd, yyyy")}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          <MessageCircle className="inline mr-2 h-4 w-4 text-gray-400" />
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
        {!isLoading && filteredReviews.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No reviews found matching your criteria.
          </p>
        )}
        {!isLoading && filteredReviews.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
