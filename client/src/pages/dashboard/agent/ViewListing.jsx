import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Calendar,
  Users,
  Bed,
  Home,
  Bath,
  Building,
  Square,
  Clock,
  DollarSign,
  Phone,
  Mail,
  Star,
  Wifi,
  Utensils,
  Car,
  Wind,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Map from "@/components/Map";
import ReviewSection from "@/components/ReviewSection";
import { getListing } from "@/utils/api";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
    <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
    <span className="font-medium min-w-24">{label}</span>
    <span className="text-muted-foreground">{value}</span>
  </div>
);

const AmenityItem = ({ icon: Icon, label, value }) => (
  <div
    className={`flex items-center space-x-2 p-2 ${
      value ? "text-primary" : "text-muted-foreground/50"
    }`}
  >
    <Icon className="h-5 w-5 shrink-0" />
    <span className="font-medium">{label}</span>
  </div>
);

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative">
      <div className="aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Property view ${currentIndex + 1}`}
          className="object-cover w-full h-full transition-opacity duration-500"
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={prevImage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={nextImage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function ViewListing() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);
        const response = await getListing(id);
        setListing(response.data.listing);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching the listing."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleBooking = () => {
    console.log("Booking initiated for listing:", listing._id);
    setIsBookingDialogOpen(false);
  };

  // Mock reviews data
  const currentUserId = "current-user-id";
  const reviews = [
    {
      id: 1,
      author: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Sunshine Student Living is an amazing place! The amenities are top-notch, and the location is perfect for students. I love the study areas and the social spaces.",
      rating: 5,
      createdAt: "2023-06-01T12:00:00Z",
      userId: "user-1",
    },
    {
      id: 2,
      author: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I've been living here for a semester now, and it's been a great experience. The staff is friendly, and the rooms are well-maintained. The only downside is that the Wi-Fi can be a bit slow during peak hours.",
      rating: 4,
      createdAt: "2023-05-28T09:15:00Z",
      userId: "user-2",
    },
    {
      id: 3,
      author: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Sunshine Student Living has exceeded my expectations. The community events are fantastic, and I've made great friends here. The location near Central University is super convenient.",
      rating: 5,
      createdAt: "2023-06-05T14:30:00Z",
      userId: "current-user-id",
    },
  ];

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {listing.propertyName}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {listing.address}, {listing.city}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{averageRating}</span>
                  <span className="text-sm ml-1">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${listing.price}</p>
              <p className="text-sm text-muted-foreground">
                per {listing.pricingPeriod}
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={listing.images} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>
                  <Badge variant="outline" className="text-base">
                    {listing.capacity - listing.totalBeds} rooms available
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoItem
                    icon={Home}
                    label="Property Type"
                    value={listing.propertyType}
                  />
                  <InfoItem
                    icon={Bed}
                    label="Room Type"
                    value={listing.roomType}
                  />
                  <InfoItem
                    icon={Users}
                    label="Gender Policy"
                    value={listing.genderPolicy}
                  />
                  <InfoItem
                    icon={Users}
                    label="Total Capacity"
                    value={listing.capacity}
                  />
                  <InfoItem
                    icon={Bath}
                    label="Bathrooms"
                    value={`${listing.bathroomsPerFloor} per floor`}
                  />
                  <InfoItem
                    icon={Building}
                    label="Total Floors"
                    value={listing.floors}
                  />
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: listing.description }}
                  />
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <AmenityItem
                      icon={Wifi}
                      label="Wi-Fi"
                      value={listing.amenities.internet}
                    />
                    <AmenityItem
                      icon={Utensils}
                      label="Kitchen"
                      value={listing.amenities.kitchen}
                    />
                    <AmenityItem
                      icon={Car}
                      label="Parking"
                      value={listing.amenities.parking}
                    />
                    <AmenityItem
                      icon={Wind}
                      label="AC"
                      value={listing.amenities.airConditioning}
                    />
                    <AmenityItem
                      icon={BookOpen}
                      label="Study Area"
                      value={listing.amenities.studyArea}
                    />
                    <AmenityItem
                      icon={Sparkles}
                      label="Laundry"
                      value={listing.amenities.washerDryer}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <ReviewSection reviews={reviews} currentUserId={currentUserId} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=100&width=100"
                      alt="Agent"
                    />
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Agent Name</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>4.5</span>
                      <span className="mx-1">•</span>
                      <span>10 listings</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    Message Agent
                  </Button>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      +1 (555) 123-4567
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      agent@example.com
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className=" lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Map
                  center={[listing.latitude, listing.longitude]}
                  popupContent={listing.propertyName}
                />
                <div className="grid gap-2">
                  {listing.nearbyLocations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-muted-foreground"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>{`${location.name} - ${location.distance} miles`}</span>
                    </div>
                  ))}
                </div>
                {/* Booking Dialog */}
                <Dialog
                  open={isBookingDialogOpen}
                  onOpenChange={setIsBookingDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full">
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Booking</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to book a room at{" "}
                        {listing.propertyName}?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsBookingDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleBooking}>Confirm Booking</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
