import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Shield, Clock } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Star,
      title: "Top-rated Hostels",
      description:
        "Carefully curated selection of the best-rated hostels worldwide.",
    },
    {
      icon: Users,
      title: "Meet Fellow Travelers",
      description:
        "Connect with like-minded individuals from around the globe.",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Your safety and security are our top priorities.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Our team is always available to assist you with any queries.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4">Why Choose Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the DormMap Difference
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover why travelers choose DormMap for their hostel bookings
            worldwide.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg">Explore Hostels</Button>
        </div>
      </div>
    </section>
  );
}
