import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Find Your Perfect Hostel Stay
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover and book the best student accommodations near your
              university. Verified listings, seamless booking, and trusted by
              thousands of students.
            </p>
            <div className="bg-card rounded-lg shadow-lg p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by university, city, or hostel name..."
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Hostel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dorm">Dormitory</SelectItem>
                      <SelectItem value="private">Private Room</SelectItem>
                      <SelectItem value="female">Female-only Dorm</SelectItem>
                      <SelectItem value="male">Male-only Dorm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" size="lg">
                  <Search className="mr-2 h-4 w-4" /> Search Hostels
                </Button>
              </form>
            </div>
          </div>
          <div className="hidden lg:block relative h-[500px] rounded-lg overflow-hidden">
            <img
              src="/Room4.png"
              alt="Cozy hostel interior"
              className="rounded-lg shadow-lg h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
