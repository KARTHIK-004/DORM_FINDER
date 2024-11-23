import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function FeaturedProperty() {
  const features = [
    "Find excellent deals",
    "Friendly host & Fast support",
    "Secure payment system",
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img
              src="../public/FeaturedProperty.png"
              alt="Featured Property"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              Best Rated Hostels On Popular Booking Sites
            </h2>
            <p className="text-lg text-muted-foreground">
              We carefully select and verify all our listings to ensure you get
              the best accommodation experience possible.
            </p>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Checkbox checked disabled />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <Button size="lg">Learn more</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
