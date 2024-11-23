import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

const hostels = [
  {
    id: 1,
    name: "Backpackers Paradise",
    location: "Barcelona, Spain",
    rating: 4.8,
    price: 25,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "City Center Hostel",
    location: "Amsterdam, Netherlands",
    rating: 4.6,
    price: 30,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Beachfront Bunk",
    location: "Bali, Indonesia",
    rating: 4.9,
    price: 20,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export function FeaturedHostels() {
  return (
    <section className="py-16 ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Hostels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden">
              <img
                src={hostel.image}
                alt={hostel.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{hostel.name}</CardTitle>
                  <Badge variant="secondary" className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {hostel.rating}
                  </Badge>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {hostel.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ${hostel.price}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    per night
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
