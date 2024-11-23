import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { Badge } from "../ui/badge";

const agents = [
  {
    name: "Chris Patt",
    image: "/placeholder.svg?height=400&width=400",
    phone: "+1 234 567 890",
    email: "chris@homeya.com",
  },
  {
    name: "Esther Howard",
    image: "/placeholder.svg?height=400&width=400",
    phone: "+1 234 567 890",
    email: "esther@homeya.com",
  },
  {
    name: "Darrell Steward",
    image: "/placeholder.svg?height=400&width=400",
    phone: "+1 234 567 890",
    email: "darrell@homeya.com",
  },
  {
    name: "Robert Fox",
    image: "/placeholder.svg?height=400&width=400",
    phone: "+1 234 567 890",
    email: "robert@homeya.com",
  },
];

export function AgentsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className=" px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4">OUR TEAMS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Agents
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our agents are here to help you with any questions or concerns you
            have
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => (
            <Card key={index} className="overflow-hidden bg-card">
              <CardHeader className="p-0">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full aspect-square object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-4">{agent.name}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
