import { Award, PencilRuler, HandshakeIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge";

const benefits = [
  {
    icon: Award,
    title: "Proven Expertise",
    description:
      "Our seasoned team excels with years of successful market navigation, offering informed decisions and optimal results.",
  },
  {
    icon: PencilRuler,
    title: "Customized Solutions",
    description:
      "We pride ourselves on crafting personalized strategies to match your unique goals, ensuring a seamless journey.",
  },
  {
    icon: HandshakeIcon,
    title: "Transparent Partnerships",
    description:
      "Transparency is key in our client relationships. We prioritize clear communication and ethical practices, fostering trust and reliability throughout.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16  bg-muted/50">
      <div className=" px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4">Why Choose Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            DormMap Benefit
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            DormMap simplifies your search for the perfect accommodation by
            connecting you with reliable listings tailored to your needs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none text-center ">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
