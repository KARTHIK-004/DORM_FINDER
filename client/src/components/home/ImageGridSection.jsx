import { Button } from "@/components/ui/button";

export function ImageGridSection() {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Simple & easy way to find your dream Appointment
            </h2>
            <p className="text-lg text-muted-foreground">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. In a free hour, when our power of choice is untrammelled
              and when nothing prevents our being able to do what we like best,
              every pleasure is to be welcomed.
            </p>
            <Button size="lg" variant="default">
              Get Started
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder.svg?height=300&width=300"
              alt="Property"
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="grid gap-4">
              <img
                src="/placeholder.svg?height=140&width=300"
                alt="Meeting"
                className="w-full h-[140px] object-cover rounded-lg"
              />
              <img
                src="/placeholder.svg?height=140&width=300"
                alt="Interior"
                className="w-full h-[140px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
